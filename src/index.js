const baseInfo = require('./baseInfo')
const movie_player = require('./movie_player')
const comment = require('./comment')
const photo = require('./photo')
const review = require('./review')
const trailer = require('./trailer')

;(async ()=> {
  await movie_player() // 必须在player前面执行
  await baseInfo()
  await comment()
  await photo()
  await review()
  await trailer()
})()


