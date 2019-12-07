const Douban = require('../douban')
const mysql = require('../db/Mysql')
const mids = require('../movies.json')

const baseUrl = 'https://movie.douban.com'
const error = [] // 失败mId
let count = 0 // 成功数量

;(async () => {
    const douban = await new Douban({headless: true}) // 为true为无头
    await douban.launch()
    console.time('time spend:')
    for(let { mId, type, title } of mids) {
      const info = { 
        mId, 
        update_time: new Date().getTime()
      } // 电影信息
      
      try {
        console.log('start open douban_photo url:' + mId)
        await douban.goto(`${baseUrl}/subject/${mId}/all_photos`) // 进入照片页
        await douban.wait('.article')
        console.log('start scripy ...')

        const imgs = await douban.$$eval('#content .article ul li img', eles=> eles.map(({ src })=> src)) // 照片

        const img10 = imgs.splice(0, 10) // 取前10条
        info.img = JSON.stringify(img10)

        // 查询电影是否存在
        const find = await mysql.table('t_douban_photo').select('id').where('mId', mId).first()
        if(find) {
          await mysql.table('t_douban_photo').where('id', find.id).update(info)
          console.log('update movie mId:' + mId)
        }else {
          // 新增电影记录
          const { insertId } = await mysql.table('t_douban_photo').insert(info)
          console.log('insert movie mId:' + mId)
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