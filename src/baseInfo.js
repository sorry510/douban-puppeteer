const Douban = require('../douban')
const mysql = require('../db/Mysql')
const { jsonSplitStr, speicalFilter } = require('../util')
const mids = require('../movies.json')

const baseUrl = 'https://movie.douban.com'
const mbaseUrl = 'https://m.douban.com'
const error = [] // 失败mId
let count = 0 // 成功数量

;(async () => {
    const douban = await new Douban({headless: true}) // 为true为无头
    await douban.launch()
    console.time('time spend:')
    for(let { mId, type, title } of mids) {
      const movieinfo = { 
        mId, 
        type, 
        title,
        rating_max: 10,
        rating_min: 0,
        rating_stars: 40,
        subtype: 'movie',
        update_time: new Date().getTime()
      } // 电影信息
      // const subject = rest // 初始化详情数据
      try {
        console.log('start open douban_subject url:' + mId)
        movieinfo.alt = `${baseUrl}/subject/${mId}`
        await douban.goto(movieinfo.alt) // 进入详情页
        await douban.wait('#wrapper')
        console.log('start scripy ...')

        const imgpic = await douban.$eval('#mainpic img', el=> el.src) // 电影海报
        movieinfo.small = imgpic
        movieinfo.medium = imgpic
        movieinfo.large = imgpic

        const strtitle = await douban.$eval('#content h1 span', el=> el.innerText) // 电影名称和原名称
        movieinfo.original_title = speicalFilter(strtitle.substr(strtitle.indexOf(' ') + 1)) // 假设他是原名称,不再做复杂判断

        movieinfo.year = await douban.$eval('#content h1 .year', el=> el.innerText.substr(1, 4)) // 出产年份

        let aka = '' // 别名
        const strInfo = await douban.$eval('#info', el => el.textContent) // 电影相关信息
        strInfo.trim().split('\n').map(item=> {
          const [key='', value=''] = item.split(':')
          switch(key.trim()) {
            case '又名':
              aka = jsonSplitStr(value)
              break
            case '导演':
              movieinfo.director = jsonSplitStr(value)
              break
            case '编剧':
              movieinfo.scriptwriter = jsonSplitStr(value)
              break
            case '类型':
              movieinfo.genres = jsonSplitStr(value)
              break
            case '制片国家/地区':
              movieinfo.countries = jsonSplitStr(value)
              break
            case '语言':
              movieinfo.language = jsonSplitStr(value)
                break
            case '上映日期':
              movieinfo.show_date = jsonSplitStr(value)
              break
            case '片长':
              movieinfo.longtime = jsonSplitStr(value)
              break
          }
        })

        movieinfo.rating_average = await douban.$eval('#interest_sectl .rating_num', el=> el.innerText)  // 平均分数

        // 查询电影是否存在
        const find = await mysql.table('t_douban_movie').select('id').where('mId', mId).first()
        if(find) {
          await mysql.table('t_douban_movie').where('id', find.id).update(movieinfo)
          console.log('update movie mId:' + mId)
        }else {
          // 新增电影记录
          const { insertId } = await mysql.table('t_douban_movie').insert(movieinfo)
          console.log('insert movie mId:' + mId)
        }

        // 电影明细
        const subject = (function(info) {
          const { alt, type, director, scriptwriter, language, show_date, longtime, update_time, ...rest } = info
          return rest
        })(movieinfo)

        subject.aka = aka // 别名
        const summary = await douban.$eval('#link-report', el=> el.innerText)  // 摘要
        subject.summary = speicalFilter(summary) // 替换'和"

        const comments = await douban.$eval('#comments-section .pl a', el=> el.innerText)
        const [commentsCount = 0] = comments.match(/[0-9]+/) // 短评论数量
        subject.comments_count = commentsCount

        const review = await douban.$eval('.reviews.mod.movie-content .pl a', el=> el.innerText)
        const [reviewCount = 0] = review.match(/[0-9]+/) // 影评数量
        subject.review_count = reviewCount
     
        subject.schedule_url = `${baseUrl}/subject/${mId}/cinema/` // 售票地址
        subject.share_url = `${mbaseUrl}/movie/subject/${mId}` // 分项地址

        // 更新明细
        const findSubject = await mysql.table('t_douban_subject').select('id').where('mId', mId).first()
        if(findSubject) {
          await mysql.table('t_douban_subject').where('id', findSubject.id).update(subject)
          console.log('update subject mId:' + mId)
        }else {
          const { insertId } = await mysql.table('t_douban_subject').insert(subject)
          console.log('insert subject mId:' + mId)
        }
        count++
      }catch (e) {
        error.push(mId)
        console.log(e)
        console.log('error mId:' + mId)
        console.log('sql is:' + mysql.getLastSql())
      }finally {
        console.log('count is:' + count)
        console.log('start next movie')
      }
    }
    console.timeEnd('time spend:')
    console.log('successed count:' + count)
    console.log('faild count:' + error.length)
    error.length && console.log('failed mId:' + JSON.stringify(error))

    await mysql.end()
    await douban.pageClose()
    await douban.browserClose()
})()