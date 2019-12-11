const Douban = require('../douban')
const mysql = require('../db/Mysql')
let players = require('../players.json')

const baseUrl = 'https://movie.douban.com'
const error = [] // 失败playerId
let count = 0 // 成功数量

// 人物相册
async function player_photo() {

  const douban = new Douban({headless: true}) // 为true为无头
  await douban.launch()
  console.time('time spend:')
  for(let playerId in players)  {
    const info = { 
      playerId, 
      update_time: new Date().getTime()
    } // 电影信息
    
    try {
      console.log('start open douban_photo url:' + playerId)
      await douban.goto(`${baseUrl}/celebrity/${playerId}/photos/`) // 进入照片页
      await douban.wait('.article')
      console.log('start scripy ...')

      const imgs = await douban.$$eval('#content .article ul li img', eles=> eles.map(({ src })=> src)) // 照片

      const img10 = imgs.splice(0, 20) // 取前20条
      info.img = JSON.stringify(img10)

      // 查询电影是否存在
      const find = await mysql.table('t_douban_player_photo').select('id').where('playerId', playerId).first()
      if(find) {
        await mysql.table('t_douban_player_photo').where('id', find.id).update(info)
        console.log('update player playerId:' + playerId)
      }else {
        // 新增电影记录
        const { insertId } = await mysql.table('t_douban_player_photo').insert(info)
        console.log('insert player playerId:' + playerId)
      }
      count++
    }catch (e) {
      error.push(playerId)
      console.log(e)
      console.log('error playerId:' + playerId)
      console.log('sql is:' + mysql.getLastSql())
    }finally {
      console.log('count is:' + count)
      console.log('start next player')
    }
  }
  console.timeEnd('time spend:')
  console.log('successed count:' + count)
  console.log('faild count:' + error.length)
  error.length && console.log('failed playerId:' + JSON.stringify(error))

  // await mysql.end()
  await douban.pageClose()
  await douban.browserClose()
}
exports = module.exports = player_photo

if(__filename === process.mainModule.filename) {
  ;(async ()=> {
    await player_photo()
  })()
}