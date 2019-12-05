const Douban = require('../douban')
const mysql = require('../db/Mysql')
const { regIncludes } = require('./util')

// const tag = '热门'
// const movieSearchUrl = `https://movie.douban.com/explore#!type=movie&tag=${tag}&sort=recommend&page_limit=20&page_start=0`
const baseUrl = 'https://movie.douban.com'
const mbaseUrl = 'https://m.douban.com'
process.exit()

;(async () => {
  try {
    const douban = await new Douban({headless: true}) // 为true为无头
    await douban.launch()
    console.time('time spend:')
    const [rows, fields] = await mysql.query('select id, title, original_title, mId, rating_max, rating_min, rating_average, genres, alt, collect_count, subtype, large, medium, small, year from t_douban_movie where status = 0 order by id asc')
    for(let row of rows) {
      const { id, alt, ...rest } = row

      const subject = rest // 初始化详情数据

      console.log('start open douban url')
      await douban.goto(alt) // 进入详情页
      await douban.wait('#wrapper')
      console.log('start scripy ...')

      const strInfo = await douban.$eval('#info', el => el.textContent) // 电影相关信息
      strInfo.trim().split('\n').map(item=> {
        const [key='', value=''] = item.split(':')
        const info = value.trim()
        switch(key.trim()) {
          case '又名':
            subject.aka = JSON.stringify(info.split('/'))
            break
          case '上映日期':
            subject.countries = regIncludes(info)
            break

        }
      })

      const comments = await douban.$eval('#comments-section .pl a', el=> el.innerText)
      const [commentsCount = 0] = comments.match(/[0-9]+/) // 短评论数量
      subject.comments_count = commentsCount

      const review = await douban.$eval('.reviews.mod.movie-content .pl a', el=> el.innerText)
      const [reviewCount = 0] = review.match(/[0-9]+/) // 影评数量
      subject.review_count = reviewCount

      subject.rating_average = await douban.$eval('#interest_sectl .rating_num', el=> el.innerText)  // 平均分数
      subject.summary = await douban.$eval('#link-report', el=> el.innerText)  // 摘要
      subject.rating_stars = 40 // 默认值
      subject.schedule_url = `${baseUrl}/subject/${row.mId}/cinema/`
      subject.share_url = `${mbaseUrl}/movie/subject/${row.mId}`

      console.log(subject)

      // 新增明细记录
      const keys = Object.keys(subject).join(',')
      const values = Object.values(subject)
      const pre = Array(values.length).fill('?')
      const subjectSql = `insert into t_douban_subject (${keys}) values (${pre})`
      // console.log(subjectSql)
      await mysql.execute(subjectSql, values)
      // 更新状态为已更新
      await mysql.execute('update t_douban_movie set status = ? where id = ?', [1, id])
      // await douban.pageClose()
      console.log('next movie')
    }
    console.timeEnd('time spend:')
    await mysql.end()
    await douban.browserClose()
  }catch (e) {
    console.log(e)
  }
})()