const _ = require('lodash')
const Douban = require('../douban')
const mysql = require('../db/Mysql')
let mids = require('../movies.json')

const baseUrl = 'https://movie.douban.com'
const error = [] // 失败mId
let count = 0 // 成功数量

// 预告片视频
async function trailer() {
  mids = mids.slice(global.traceIndex.trailer)

  const douban = new Douban({headless: true}) // 为true为无头
  await douban.launch()
  console.time('time spend:')
  for(let i in mids)  {
    const { mId } = mids[i]
    const info = { 
      mId, 
      update_time: new Date().getTime()
    } // 电影信息
    
    try {
      console.log('start open douban_trailer url:' + mId)
      await douban.goto(`${baseUrl}/subject/${mId}/trailer#trailer`) // 进入预告片页
      await douban.wait('.article')
      console.log('start scripy ...')

      const videoUrls = await douban.$$eval('#content .article ul li a.pr-video', eles=> eles.map(({ href })=> href)) // 视频页地址
      
      // 分批获取url，防止一次请求过多卡死
      async function getUrl(urls, batch=3) {
        const arr = []
        for(let v of _.chunk(urls, batch)) {
          const temp = await Promise.all(v.map(async url=> {
            // 同时打开新的tab页，加快抓取速度，同时避免污染this.page
            const newPage = await douban.browser.newPage()
            await newPage.goto(url, {
              timeout: 0,
              waitUntil: 'domcontentloaded'
            })
            console.log('open movie url success')
            await newPage.waitForSelector('.article')
            const isExist = await newPage.$('#player video source')
            const res = isExist ? await newPage.$eval('#player video source', ({src})=> src) : ''
            await newPage.close()
            return res
          }))
          arr.push(...temp)
        }
        return arr.filter(el=>el !== '')
      }

      const videos = await getUrl(videoUrls.splice(0, 6), 3)
    
      info.video = JSON.stringify(videos)

      // 查询电影是否存在
      const find = await mysql.table('t_douban_trailer').select('id').where('mId', mId).first()
      if(find) {
        await mysql.table('t_douban_trailer').where('id', find.id).update(info)
        console.log('update movie mId:' + mId)
      }else {
        // 新增电影记录
        const { insertId } = await mysql.table('t_douban_trailer').insert(info)
        console.log('last insertId:' + insertId)
        console.log('insert movie mId:' + mId)
      }
      count++
    }catch (e) {
      error.push(mId)
      console.log(e)
      console.log('error mId:' + mId)
      console.log('sql is:' + mysql.getLastSql())
    }finally {
      global.traceIndex.trailer++
      console.log('count is:' + count)
      console.log('start next movie')
    }
  }
  console.timeEnd('time spend:')
  console.log('successed count:' + count)
  console.log('faild count:' + error.length)
  error.length && console.log('failed mId:' + JSON.stringify(error))

  // await mysql.end()
  await douban.pageClose()
  await douban.browserClose()
}
exports = module.exports = trailer

if(__filename === process.mainModule.filename) {
  ;(async ()=> {
    await trailer()
  })()
}