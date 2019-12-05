require('dotenv').config()
const Douban = require('../douban')
const fs = require('fs')

const { MOVIE_TAG, MOVIE_COUNT } = process.env

const typelist = ['热门', '最新', '经典'] // 对应type 0,1,2

// process.exit()

const movieSearchUrl = `https://movie.douban.com/explore#!type=movie&tag=${MOVIE_TAG}&sort=recommend&page_limit=20&page_start=0`

;(async () => {
  try {
    const type = typelist.indexOf(MOVIE_TAG)
    const douban = await new Douban({headless: true})
    await douban.launch()
    await douban.goto(movieSearchUrl) // 进入搜索页
    console.log('open search url')
    await douban.wait('.list-wp')
    console.log('wait for movie list')

    // 点击一次20条
    for(let i=1; i<MOVIE_COUNT/20; i++) {
      console.log('click get more')
      await douban.click('#content .list-wp .more')
      await douban.wait(1000)
    }

    const mIds = await douban.$$eval('#content .list-wp .item', eles=> eles.map(({ href })=> href.match(/.*subject\/([0-9]*)/)[1]))
    const titles = await douban.$$eval('#content .list-wp .item .cover-wp img', eles=> eles.map(({ alt })=> alt))

    const movies = mIds.map((mId, index)=> ({title: titles[index], mId, type}))

    console.log(movies[0])
    console.log('movie list count:' + movies.length)

    fs.writeFile('movies.json', JSON.stringify(movies), (err) => {
      if (err) throw err
      console.log('mid saved in movies.json')
    })
    await douban.browserClose()

    // 加载更多
    // const [rows, fields] = await mysql.query('select * from t_douban_movie where status = 0 order by id asc limit 1')
    // for(let row of rows) {
    //   const { id, status, ...rest } = row
    //   const subject = rest // 初始化详情数据
    //   console.log('start open douban url')
    //   await douban.goto(row.alt) // 进入详情页
    //   await douban.wait('#wrapper')
    //   console.log('start scripy ...')

    //   subject.small = await douban.$eval('#mainpic img', el => el.src) // 电影海报

    //   const strInfo = await douban.$eval('#info', el => el.textContent) // 电影相关信息
    //   strInfo.trim().split('\n').map(item=> {
    //     const [key, value] = item.split(':')
    //     const info = value.trim()
    //     switch(key.trim()) {
    //       case '导演':
    //         subject.

    //     }
    //     return {[key.trim()]: value.trim()}
    //   })
    //   // console.log(arrInfo)
     

    //   // 更新状态为已更新
    //   // const res = await mysql.execute('update t_douban_movie set status = ? where id = ?', [1, id])
    // }
    // await mysql.end()
    // console.log(fields)

      // const browser = await puppeteer.launch({
      //   // headless: false,
      //   // slowMo: 100,
      //   // defaultViewport: {
      //   // 	width: 1920 - 60, 
      //   // 	height: 950
      //   // },
      //   // devtools: true
      // })

      // await page.waitFor(500) // 等待500ms

      // const page = await browser.newPage();
      //
      // await page.goto(subjectUrl, {
      //   // timeout: 0,
      //   waitUntil: 'domcontentloaded'
      // })
      // console.log('open douban url')
      // await page.waitForSelector('#wrapper') // 等待元素加载之后，否则获取不异步加载的元素
      // console.log('start...')
      // const img = await page.$eval('#mainpic img', el => el.src) // 电影海报

      // console.log(img)

      // const strInfo = await page.$eval('#info', el => el.textContent) // 电影相关信息
      // console.log(strInfo)
      // const arrInfo = strInfo.trim().split('\n').map(item=> {
      //   const [key, value] = item.split(':')
      //   return {[key.trim()]: value.trim()}
      // })
      // console.log(arrInfo)

      // const summaryDom = '#link-report'
      // const issummary = await page.$(summaryDom)
      // const summary = issummary ? await page.$eval(summaryDom, el => el.innerText) : '' // 摘要
      // console.log(summary)

      // const shortReviewDom = '#comments-section .pl a'
      // const isshortReview = await page.$(shortReviewDom)
      // const shortReview = isshortReview ? await page.$eval(shortReviewDom, el => el.innerText) : '' // 短评论数量文字
      // const [shortReviewCount = 0] = shortReview.match(/[0-9]+/) // 短评论数量
      // console.log(shortReviewCount)

      // const reviewDom = '.reviews.mod.movie-content .pl a'
      // const isreview = await page.$(reviewDom)
      // const review = isreview ? await page.$eval(reviewDom, el => el.innerText) : '' // 影评数量文字
      // const [reviewCount = 0] = review.match(/[0-9]+/) // 影评数量
      // console.log(reviewCount)

      // const ratingDom = '#interest_sectl .rating_num'
      // const israting = await page.$(ratingDom)
      // const ratingNum = israting ? await page.$eval(ratingDom, el => el.innerText) : '' // 平均分数
      // console.log(ratingNum)

    // await browser.close()
  }catch (e) {
    console.log(e)
  }
})()