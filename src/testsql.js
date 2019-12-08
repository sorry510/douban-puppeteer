const mysql = require('../db/Mysql')
const fs = require('fs')

;(async () => {
  try {
    console.time()
    const data = {
      "mId": "27119724",
      "type": 0,
      "title": "小丑",
      "rating_max": 10,
      "rating_min": 0,
      "rating_stars": 40,
      "subtype": "movie",
      "update_time": 1575603828614,
      "alt": "https://movie.douban.com/subject/27119724",
      "small": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp",
      "medium": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp",
      "large": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp",
      "original_title": "Joker",
      "year": "2019",
      "director": "[\"托德·菲利普斯\"]",
      "scriptwriter": "[\"托德·菲利普斯\",\"斯科特·西尔弗\",\"鲍勃·凯恩\",\"比尔·芬格\",\"杰瑞·罗宾逊\"]",
      "genres": "[\"剧情\",\"惊悚\",\"犯罪\"]",
      "countries": "[\"加拿大\",\"美国\"]",
      "language": "[\"英语\"]",
      "show_date": "[\"2019-08-31(威尼斯电影节)\",\"2019-10-04(美国)\"]",
      "longtime": "[\"122分钟\",\"118分钟(威尼斯电影节)\"]",
      "rating_average": "8.1"
    }
    const list = await mysql.raw('select distinct playerId from t_douban_movie_player').get()
    const players = list.map(({ playerId })=> playerId)
    fs.writeFile('players.json', JSON.stringify(players), (err) => {
      if (err) throw err
      console.log('saved in players.json')
    })

    // await mysql.table('t_douban_movie_player')
    //   .select('id', 'title')
    //   .where([
    //     ['id', '>', 1],
    //     ['mId', 2],
    //   ])
    //   .orderBy('id', 'asc')
    //   .limit(1, 10)
    //   .get()
      // .insert(data)
    // console.log(res.length)

    await mysql.end()
    console.timeEnd()
  }catch (e) {
    console.log(e)
  }
})()