const fs = require('fs')
const traceFile = '../trace/index.json'
const traceFilePath = __dirname + '/' + traceFile
const movieFilePath = __dirname + '/' + '../movies.json'
const playerFilePath = __dirname + '/' + '../players.json'

const args = process.argv.slice(2)
if(args.includes('reset')) {
  // 删除json文件
  fs.existsSync(traceFilePath) && fs.unlinkSync(traceFilePath)
  fs.existsSync(movieFilePath) && fs.unlinkSync(movieFilePath)
  fs.existsSync(playerFilePath) && fs.unlinkSync(playerFilePath)
  console.log('reset successed')
}

// 获取断点记录
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

// 记录断点，内部必须使用同步代码，否则exit退出后会放弃执行队列中的任务
process.on('exit', code=> {
  fs.writeFileSync(traceFilePath, JSON.stringify(global.traceIndex))
})

async function createMovieId() {
  const movie_id = require('./movie_id')
  await movie_id()
}

async function start() {
  const baseInfo = require('./baseInfo')
  const comment = require('./comment')
  const movie_player = require('./movie_player')
  const photo = require('./photo')
  const review = require('./review')
  const trailer = require('./trailer')

  await baseInfo()
  await comment()
  await movie_player() // 必须在player前面执行
  await photo()
  await review()
  await trailer()

  if(!fs.existsSync(playerFilePath)) {
    console.log('create player data must has players.json, may be you can run movie_player.js create players.json or from movie_player.sql created')
  }else {
    const player = require('./player')
    await player()
  }
}

;(async ()=> {
  if(!fs.existsSync(movieFilePath)) {
    await createMovieId()
  }
  await start()
})()






