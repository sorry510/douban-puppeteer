const _ = require('lodash')
const Douban = require('../douban')
const mysql = require('../db/Mysql')
const { speicalFilter } = require('../util')
let mids = require('../movies.json')

const baseUrl = 'https://movie.douban.com'
const getCount = 5 // 抓取5条数据
const error = [] // 失败mId
let count = 0 // 成功数量

// 影评
async function review() {
  mids = mids.slice(global.traceIndex.review)
  
  const douban = new Douban({headless: true}) // 为true为无头
  await douban.launch()
  console.time('time spend:')
  for(let i in mids)  {
    const { mId } = mids[i]
    try {
      console.log('start open douban_review url:' + mId)
      await douban.goto(`${baseUrl}/subject/${mId}/reviews`) // 进入影评页
      await douban.wait('.article')
      console.log('start scripy ...')

      await douban.$('.btn-unfold') && douban.click('.btn-unfold') // 可能又被隐藏的评论，点击展开
      await douban.wait(1000)

      const unfolds = (await douban.$$('#content .article a.unfold')).splice(0, getCount) // 展开
      for(let el of unfolds) {
        // 不能同时点击，而且需要给浏览器延迟时间
        await el.click()
        await douban.wait(600)
      }
      console.log('unfolds complate')  
      const reivews = (await douban.$$('#content .article .review-list > div')).splice(0, getCount) // 评论doms5条
      const infoList = await Promise.all(reivews.map(async el=> {
        const info = { type: 1, mId, update_time: new Date().getTime() }
        info.cid = await douban.page.evaluate(el=> el.getAttribute('data-cid'), el) || ''
        info.avatar = await el.$('.avator img') ? await el.$eval('.avator img', ({ src })=> src) : ''
        info.vote = await el.$('.main-bd .action-btn.up span') ? await el.$eval('.main-bd .action-btn.up span', ({ innerText })=> innerText) : 0
        info.author = await el.$('.main-hd a.name') ? speicalFilter(await el.$eval('.main-hd a.name', ({ innerText })=> innerText)) : ''
        const { star_class='0', star_title='' } = await el.$('.main-hd .main-title-rating') ? await el.$eval('.main-hd .main-title-rating', el=> ({star_class: el.classList.value, star_title: el.title})) : {}
        info.star = star_class.match(/\d+/)[0]
        info.star_title = star_title
        const { date='', time='' } = await el.$('.main-hd .main-meta') ? await el.$eval('.main-hd .main-meta', el=> ({date: el.getAttribute('content'), time: el.innerHTML})) : {}
        info.date = date
        info.time = time
        info.content = await el.$('.review-content') ? speicalFilter(await el.$eval('.review-content', ({ innerHTML })=> innerHTML)) : ''
        await el.dispose()
        return info
      }))

      await Promise.all(infoList.map(async info=> {
        // 查询评论id是否存在
        const find = await mysql.table('t_douban_comment').select('id').where([
          ['type', 1],
          ['cid', info.cid],
        ]).first()
        if(find) {
          await mysql.table('t_douban_comment').where('id', find.id).update(info)
          console.log('update comment cid:' + info.cid)
        }else {
          // 新增电影记录
          const { insertId } = await mysql.table('t_douban_comment').insert(info)
          console.log('insert comment cid:' + info.cid)
        }
        return true
      }))
      count++
    }catch (e) {
      error.push(mId)
      console.log(e)
      console.log('error mId:' + mId)
      console.log('sql is:' + mysql.getLastSql())
    }finally {
      global.traceIndex.review++
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
}
exports = module.exports = review

if(__filename === process.mainModule.filename) {
  ;(async ()=> {
    await review()
  })()
}