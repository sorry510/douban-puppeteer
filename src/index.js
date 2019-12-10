const fs = require('fs')
const traceFile = '../trace/index.json'
const traceFilePath = __dirname + '/' + traceFile
if(fs.existsSync(traceFilePath)) {
  global.traceIndex = require(traceFile)
}else {
  global.traceIndex = {
    baseInfo: 0,
    comment: 0,
    movie_player: 0,
    photo: 0,
    review: 0,
    trailer: 0,
  }
}

const movie_id = require('./movie_id')
const movie_player = require('./movie_player')

const baseInfo = require('./baseInfo')
const comment = require('./comment')
const photo = require('./photo')
const review = require('./review')
const trailer = require('./trailer')
const player = require('./player')

;(async ()=> {
  if(!fs.existsSync('./movies.json')) {
    await movie_id() // 必须在最前面执行
  }
  
  // await baseInfo()
  // await comment()
  // await movie_player() // 必须在player前面执行
  // await photo()
  // await review()
  // await trailer()

  if(!fs.existsSync('./players.json')) {
    console.log('create player data must has players.json, may be you can run movie_player.js create players.json or from movie_player.sql created')
  }else {
    await player()
  }
})()

// 内部必须使用同步代码，否则exit退出后会放弃执行队列中的任务
process.on('exit', (code) => {
  fs.writeFileSync(traceFilePath, JSON.stringify(global.traceIndex))
})




