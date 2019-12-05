require('dotenv').config()
const mysql = require('mysql2')

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

class Mysql {
  constructor() {
    if(!Mysql.instance) {
      this.pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 50,
        queueLimit: 0
      })
      this.conn = this.pool.promise()
      Mysql.instance = this
    }
    return Mysql.instance
  }

  async query(sql, data) {
    if(!data) {
      return await this.conn.query(sql)
    }else {
      return await this.conn.query(sql, data)
    }
  }

  // 预加载
  async execute(sql, data) {
    return await this.conn.execute(sql, data)
  }

  async end() {
    await this.conn.end()
  }
}

module.exports = new Mysql()

// // now get a Promise wrapped instance of that pool
// const promisePool = pool.promise();
// // query database using promises
// const [rows,fields] = await promisePool.query("SELECT 1");