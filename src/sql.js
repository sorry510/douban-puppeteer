const mysql = require('../db/Mysql')

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
    // const [rows, fields] = await mysql.query('select id from t_douban_movie where mId = ? limit 1', [1])
    // const [rows, fields] = await mysql.query("update t_douban_movie set genres='ab', update_time='23432' where mId=? limit 1", [1])
    const res = await mysql.table('t_douban_movie')
      // .select('id', 'title')
      // .where([
      //   ['id', '>', 1],
      //   ['mId', 2],
      // ])
      .where('mId', '=', '27119724')
      // // .where('id', '1')
      // // .orderBy('id', 'asc')
      // .limit(1)
      .get()
      // .insert(data)
    // const sql2 = mysql.query("select id,title from t_douban_movie where 1=1 and id='1' and mId='1' order by id asc limit 1, 9").first()
    console.log(res.length)

    // for(let {id, aka} of rows) {
    //   const str_aka = JSON.stringify(aka.split('/'))
    //   await mysql.execute('update t_douban_subject set aka = ? where id = ?', [str_aka, id])
    //   console.log('next...')
    // }
    await mysql.end()
    console.timeEnd()
  }catch (e) {
    console.log(e)
  }
})()