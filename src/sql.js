const mysql = require('../db/Mysql')

;(async () => {
  try {
    console.time()
    const [rows, fields] = await mysql.query('select id, aka from t_douban_subject')
    for(let {id, aka} of rows) {
      const str_aka = JSON.stringify(aka.split('/'))
      await mysql.execute('update t_douban_subject set aka = ? where id = ?', [str_aka, id])
      console.log('next...')
    }
    await mysql.end()
    console.timeEnd()
  }catch (e) {
    console.log(e)
  }
})()