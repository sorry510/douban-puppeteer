require('dotenv').config()
const reduce = require('lodash/reduce')
const mysql = require('mysql2')
const Orm = require('./Orm')

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

class Mysql extends Orm {
  constructor() {
    super()
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

  /**
   * @param {*} table 表名
   * @param {*} data {key: value}
   * @param {*} other 
   * @retrun string sql 
   */
  insertSql(table, data) {
    const keys = Object.keys(data).join(',')
    const values = Object.values(data).map(v=>`'${v}'`).join(',')
    return `insert into ${table} (${keys}) values (${values})`
  }

  /**
   * 
   * @param {*} table 表名
   * @param {*} data {key: value}
   * @param {*} other example: where 1=1 limit 1
   * @retrun string sql 
   */
  updateSql(table, data, other='limit 1') {
    const start = `update ${table} set `
    const set = reduce(data, (sql, value, key)=> `${sql}${key}='${value}',`, '')
    return start + set.slice(0, -1) + ' ' + other
  }

  // async insert(table, data) {
  //   const keys = Object.keys(data).join(',')
  //   const values = Object.values(data)
  //   const pre = Array(values.length).fill('?')
  //   const sql = `insert into ${table} (${keys}) values (${pre})`
  //   return await this.conn.execute(sql, values)
  // }

  // async update(table, data, other='limit 1') {
  //   const keys = Object.keys(data)
  //   const values = Object.values(data)
  //   const start = `update ${table} set `
  //   const set = keys.reduce((sql, key)=> `${sql}${key}='?',`, '')
  //   const sql = start + set.slice(0, -1) + ' ' + other
  //   return await this.conn.execute(sql, values)
  // }

  async _query(sql, data) {
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

  async first() {
    super.first()
    const [ rows ] = await this.conn.query(this._sql)
    return rows.length > 0 ? rows[0] : null
  }

  async get() {
    super.get()
    const [ rows ] = await this.conn.query(this._sql)
    return rows
  }

  async insert(data) {
    super.insert(data)
    const [ ResultSetHeader ] = await this.conn.query(this._sql)
    // const { insertId } = ResultSetHeader
    return ResultSetHeader
  }

  async update(data) {
    super.update(data)
    const [ ResultSetHeader ] = await this.conn.query(this._sql)
    // {affectedRows: 3, changedRows: 0} 
    return ResultSetHeader
  }

  async delete() {
    super.delete()
    const [ ResultSetHeader ] = await this.conn.query(this._sql) 
    // {affectedRows: 1}
    return ResultSetHeader
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