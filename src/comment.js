const _ = require('lodash')
const Douban = require('../douban')
const mysql = require('../db/Mysql')
const mids = require('../movies.json')
const { jsonSplitStr, speicalFilter } = require('../util')

const baseUrl = 'https://movie.douban.com'
const error = [] // 失败mId
let count = 0 // 成功数量

// 短评
;(async () => {
    const douban = await new Douban({headless: true}) // 为true为无头
    await douban.launch()
    console.time('time spend:')
    for(let { mId, type, title } of mids) {
      try {
        console.log('start open douban_comment url:' + mId)
        await douban.goto(`${baseUrl}/subject/${mId}/comments?status=P`) // 进入短评页
        await douban.wait('.article')
        console.log('start scripy ...')

        const comments = await douban.$$('#content .article .comment-item') // 评论doms,20条
        const infoList = await Promise.all(comments.map(async el=> {
          const info = { type: 0, mId, update_time: new Date().getTime() }
          info.cid = await douban.page.evaluate(el=> el.getAttribute('data-cid'), el) || ''
          info.avatar = await el.$('.avatar img') ? await el.$eval('.avatar img', ({ src })=> src) : ''
          info.vote = await el.$('.comment .votes') ? await el.$eval('.comment .votes', ({ innerText })=> innerText) : ''
          info.author = await el.$('.comment .comment-info a') ? speicalFilter(await el.$eval('.comment .comment-info a', ({ innerText })=> innerText)) : 0
          const { star_class='0', star_title='' } = await el.$('.comment .rating') ? await el.$eval('.comment .rating', el=> ({star_class: el.classList.value, star_title: el.title})) : {}
          info.star = star_class.match(/\d+/)[0]
          info.star_title = star_title
          const { date='', time='' } = await el.$('.comment .comment-time') ? await el.$eval('.comment .comment-time', ({ innerText, title })=> ({date: innerText, time: title})) : {}
          info.date = date
          info.time = time
          info.content = await el.$('.comment .short') ? speicalFilter(await el.$eval('.comment .short', ({ innerText })=> innerText)) : ''
          await el.dispose()
          return info
        }))

        await Promise.all(infoList.map(async info=> {
          // 查询评论id是否存在
          const find = await mysql.table('t_douban_comment').select('id').where([
            ['type', 0],
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