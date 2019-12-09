const _ = require('lodash')
const Douban = require('../douban')
const mysql = require('../db/Mysql')
const mids = require('../movies.json')
const { regInOne, speicalFilter } = require('../util')
const fs = require('fs')

const baseUrl = 'https://movie.douban.com'
const player = new Set() // 记录所有人物
const error = [] // 失败mId
let count = 0 // 成功数量

// 电影人物页
;(async () => {
    const douban = await new Douban({headless: true}) // 为true为无头
    await douban.launch()
    console.time('time spend:')
    for(let { mId, type, title } of mids) {
      try {
        console.log('start open douban_celebrities url:' + mId)
        await douban.goto(`${baseUrl}/subject/${mId}/celebrities`) // 进入电影人物页
        await douban.wait('.article')
        console.log('start scripy ...')

        const listTypes = await douban.$$('#content .article .list-wrapper') // 人物分类列表1.导演，2演员，3编剧，4制片人
        const [drectoreType, castType] = listTypes
        
        if(drectoreType) {
          // 导演信息
          const list = await drectoreType.$$('.celebrity') // 人物列表
          const drectores = await Promise.all(list.map(async el=> {
            const info = { type: 0, mId, role: '导演' }
            const { name='', playerId='' } = await el.$('.info a.name') ? await el.$eval('.info a.name', ({ href, innerText })=> ({ name: innerText, playerId: href.match(/\d+/)[0] })) : {}
            info.name = speicalFilter(name)
            info.playerId = playerId
            info.avatar = await el.$('div.avatar') ? await el.$eval('div.avatar', el=> el.style.backgroundImage.slice(5, -2)) : ''
            player.add(playerId)
            return info
          }))
          await Promise.all(drectores.map(async info=> {
            // 查询评论id是否存在
            const find = await mysql.table('t_douban_movie_player').select('id').where([
              ['mId', info.mId],
              ['playerId', info.playerId],
            ]).first()
            if(find) {
              await mysql.table('t_douban_movie_player').where('id', find.id).update(info)
              console.log(`update t_douban_movie_player mid:${info.mId}, playerId:${info.playerId}`)
            }else {
              // 新增电影记录
              const { insertId } = await mysql.table('t_douban_movie_player').insert(info)
              console.log(`insert t_douban_movie_player mid:${info.mId}, playerId:${info.playerId}`)
            }
            return true
          }))
        }
        
        if(castType) {
           // 演员信息
          const list = await castType.$$('.celebrity') // 人物列表
          const castes = await Promise.all(list.map(async el=> {
            const info = { type: 1, mId }
            const { name='', playerId=''} = await el.$('.info a.name') ? await el.$eval('.info a.name', ({ href, innerText })=> ({ name: innerText, playerId: href.match(/\d+/)[0] })) : {}
            info.name = speicalFilter(name)
            info.playerId = playerId
            info.avatar = await el.$('div.avatar') ? await el.$eval('div.avatar', el=> el.style.backgroundImage.slice(5, -2)) : ''
            const role = await el.$('span.role') ? await el.$eval('span.role', ({ innerText })=> innerText) : ''
            info.role = speicalFilter(regInOne(role))
            player.add(playerId)
            return info
          }))
          await Promise.all(castes.map(async info=> {
            // 查询评论id是否存在
            const find = await mysql.table('t_douban_movie_player').select('id').where([
              ['mId', info.mId],
              ['playerId', info.playerId],
            ]).first()
            if(find) {
              await mysql.table('t_douban_movie_player').where('id', find.id).update(info)
              console.log(`update t_douban_movie_player mid:${info.mId}, playerId:${info.playerId}`)
            }else {
              // 新增电影记录
              const { insertId } = await mysql.table('t_douban_movie_player').insert(info)
              console.log(`insert t_douban_movie_player mid:${info.mId}, playerId:${info.playerId}`)
            }
            return true
          }))
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
    // save player.json
    fs.writeFile('players.json', JSON.stringify(Array.from(player)), (err) => {
      if (err) throw err
      console.log('player saved in players.json')
    })
    await mysql.end()
    await douban.pageClose()
    await douban.browserClose()
})()