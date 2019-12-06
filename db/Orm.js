const _ = require('lodash')
module.exports = class Orm {

  constructor() {
    this._sql = null
    this._table = null
    this._fields = '*'
    this._where = []
    this._limit = null
    // this._groupBy = null
    this._order = []
    this._type = 'select'
  }

  table(table) {
    this._table = table
    return this
  }
  
  where(field, condition, value) {
    if(_.isArray(field)) {
      this._where.push(...field)
    }else if(value === undefined) {
      this._where.push([field, '=', condition])
    }else {
      this._where.push([field, condition, value])
    }
    return this
  }

  orderBy(field, sort='asc') {
    this._order.push([field, sort])
    return this
  }

  limit(...nums) {
    this._limit = ` limit ${nums.join(',')}`
    return this
  }

  /**
   * 原生sql
   * @param {*} sql 
   */
  query(sql) {
    this._sql = sql
    return this
  }

  /**
   * 
   * @param  {...any} fields [id, name, ...] or id, name, ... 
   */
  select(...fields) {
    if(fields.length === 0) {
      this._fields = '*'
    }else {
      this._fields = _.flatten(fields).join(',')
    }
    return this
  }

  first() {
    this._type = 'select'
    this.composer()
  }

  get() {
    this._type = 'select'
    this.composer()
  }

  insert(data) {
    this._type = 'insert'
    this.composer(data)
  }

  update(data) {
    this._type = 'update'
    this.composer(data)
  }

  delete() {
    this._type = 'delete'
    this.composer()
  }

  // 组装sql
  composer(data) {
    if(this._sql === null) {
      switch(this._type) {
        case 'select':
          this._selectSql()
          break;
        case 'insert':
            this._insertSql(data)
            break;
        case 'update':
          this._updateSql(data)
          break;
        case 'delete':
          this._deleteSql()
          break
      }
    }
    return this
  }

  _handleWhere() {
    if(this._where.length > 0) {
      const where = this._where.reduce((sql, val)=> {
        if(val.length === 2) {
          return `${sql} and ${val[0]}='${val[1]}'`
        }else {
          return `${sql} and ${val[0]}${val[1]}'${val[2]}'`
        }
      }, '')
      this._sql += where
    }
  }

  _handleOrderBy() {
    if(this._order.length > 0) {
      const order = this._order.reduce((sql, [field, sort])=> `${sql}${field} ${sort},`, '')
      this._sql += ' order by ' + order.slice(0, -1)
    }
  }

  _handleLimit() {
    if(this._limit) {
      this._sql += this._limit
    }
  }

  _selectSql() {
    this._sql = `select ${this._fields} from ${this._table} where 1=1`
    this._handleWhere()
    this._handleOrderBy()
    this._handleLimit()
  }

  _insertSql(data) {
    const keys = Object.keys(data).join(',')
    const values = Object.values(data).map(v=>`'${v}'`).join(',')
    this._sql = `insert into ${this._table} (${keys}) values (${values})`
  }

  _updateSql(data) {
    this._sql = `update ${this._table} set `
    const set = _.reduce(data, (sql, value, key)=> `${sql}${key}='${value}',`, '').slice(0, -1)
    this._sql += set + ' where 1=1'
    this._handleWhere()
    this._handleOrderBy()
    this._handleLimit()
  }

  _deleteSql() {
    this._sql = `delete from ${this._table} where 1=1`
    this._handleWhere()
    this._handleOrderBy()
    this._handleLimit()
  }

}