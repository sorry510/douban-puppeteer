const _ = require('lodash')
const Douban = require('../douban')
const mysql = require('../db/Mysql')
const players = require('../players.json')
const { jsonSplitStr, speicalFilter } = require('../util')
// const randomUseragent = require('random-useragent')

const baseUrl = 'https://movie.douban.com'
const error = [] // 失败playerId
let count = 0 // 成功数量

// 人物表
;(async () => {
    const douban = await new Douban({headless: false }) // 为true为无头
    await douban.launch()
    console.time('time spend:')

    // 一次3个并行执行
    async function threads(list, batch=3) {
      for(let v of _.chunk(list, batch)) {
        await Promise.all(v.map(async playerId=> {
          // 同时打开新的tab页，加快抓取速度，同时避免污染this.page
          try {
            // 查询人员是否被记录过
            const find = await mysql.table('t_douban_player').select('id').where('playerId', playerId).first()
            if(find) return true // 已记录，直接下一个
            const newPage = await douban.browser.newPage()
            // 随机一个代理
            // const newUserAgent = randomUseragent.getRandom()
            // await newPage.setUserAgent(newUserAgent)
            console.log('start open douban_celebrity url:' + playerId)
            await newPage.goto(`${baseUrl}/celebrity/${playerId}/`, {
              timeout: 0,
              waitUntil: 'domcontentloaded'
            })
            console.log('start scripy ...')
            await newPage.waitForSelector('.article')
            await newPage.$('#intro .a_show_full') && newPage.click('#intro .a_show_full') // 可能又被隐藏的简介，点击展开
            await newPage.waitFor(500)

            const info = { playerId, update_time: new Date().getTime() }
            info.name = speicalFilter(await newPage.$eval('#content h1', ({ innerText })=> innerText)) // 姓名
            info.avatar = await newPage.$('.pic img') ? await newPage.$eval('.pic img', ({ src })=> src) : '' // 头像

            const strInfo = await newPage.$eval('#headline .info', el => el.innerText) // 人物相关信息
            strInfo.trim().split('\n').map(item=> {
              const [key='', value=''] = item.split(':')
              switch(key.trim()) {
                case '性别':
                  info.sex = value.trim()
                  break
                case '星座':
                  info.constellation = value.trim()
                  break
                case '出生日期':
                  info.birthday = value.trim()
                  break
                case '出生地':
                  info.birthplace = value.trim()
                  break
                case '职业':
                  info.role = jsonSplitStr(value)
                  break
                case '更多外文名':
                  info.name_en = speicalFilter(value.trim())
                    break
                case '更多中文名':
                  info.name_cn = speicalFilter(value.trim())
                  break
                case '家庭成员':
                  info.family = speicalFilter(value.trim())
                  break
              }
            })
            
            if(await newPage.$('#intro .bd .all.hidden')) {
              info.introduce = speicalFilter(await newPage.$eval('#intro .bd .all.hidden', ({ innerHTML })=> innerHTML))
            }else {
              info.introduce = speicalFilter(await newPage.$eval('#intro .bd', ({ innerHTML })=> innerHTML))
            }
            // 新增人物记录
            const { insertId } = await mysql.table('t_douban_player').insert(info)
            console.log('insert player id:' + info.playerId)
            await newPage.close()
            count++
          }catch (e) {
            error.push(playerId)
            console.log(e)
            console.log('error playerId:' + playerId)
            console.log('sql is:' + mysql.getLastSql())
          }finally {
            console.log('count is:' + count)
            console.log('start next movie')
          }
         
        }))
      }
    }
    await threads(players)

    // 单线程执行
    async function one(list) {
      for(let playerId of list) {
        try {
          // 查询人员是否被记录过
          const find = await mysql.table('t_douban_player').select('id').where('playerId', playerId).first()
          if(find) continue // 已记录，直接下一个
          console.log('start open douban_celebrity url:' + playerId)
          // const newUserAgent = randomUseragent.getRandom()
          // await douban.page.setUserAgent(newUserAgent)
          await douban.goto(`${baseUrl}/celebrity/${playerId}/`) // 进入人物详情页
          await douban.wait('.article')
          console.log('start scripy ...')

          await douban.$('#intro .a_show_full') && douban.click('#intro .a_show_full') // 可能又被隐藏的简介，点击展开
          await douban.wait(500)

          const info = { playerId, update_time: new Date().getTime() }
          info.name = speicalFilter(await douban.$eval('#content h1', ({ innerText })=> innerText)) // 姓名
          info.avatar = await douban.$eval('.pic img', ({ src })=> src) // 头像

          const strInfo = await douban.$eval('#headline .info', el => el.innerText) // 人物相关信息
          strInfo.trim().split('\n').map(item=> {
            const [key='', value=''] = item.split(':')
            switch(key.trim()) {
              case '性别':
                info.sex = value.trim()
                break
              case '星座':
                info.constellation = value.trim()
                break
              case '出生日期':
                info.birthday = value.trim()
                break
              case '出生地':
                info.birthplace = value.trim()
                break
              case '职业':
                info.role = jsonSplitStr(value)
                break
              case '更多外文名':
                info.name_en = speicalFilter(value.trim())
                  break
              case '更多中文名':
                info.name_cn = speicalFilter(value.trim())
                break
              case '家庭成员':
                info.family = speicalFilter(value.trim())
                break
            }
          })
          
          if(await douban.$('#intro .bd .all.hidden')) {
            info.introduce = speicalFilter(await douban.$eval('#intro .bd .all.hidden', ({ innerHTML })=> innerHTML))
          }else {
            info.introduce = speicalFilter(await douban.$eval('#intro .bd', ({ innerHTML })=> innerHTML))
          }
          // 新增人物记录
          const { insertId } = await mysql.table('t_douban_player').insert(info)
          console.log('insert player id:' + info.playerId)
          count++
        }catch (e) {
          error.push(playerId)
          console.log(e)
          console.log('error playerId:' + playerId)
          console.log('sql is:' + mysql.getLastSql())
        }finally {
          console.log('count is:' + count)
          console.log('start next movie')
        }
      }
    }
    // await one(players)
    
    console.timeEnd('time spend:')
    console.log('successed count:' + count)
    console.log('faild count:' + error.length)
    error.length && console.log('failed playerId:' + JSON.stringify(error))

    await mysql.end()
    await douban.pageClose()
    await douban.browserClose()
})()