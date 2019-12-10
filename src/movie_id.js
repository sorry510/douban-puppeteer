require('dotenv').config()
const Douban = require('../douban')
const fs = require('fs')

const { MOVIE_TAG, MOVIE_COUNT } = process.env

const typelist = ['热门', '最新', '经典'] // 对应type 0,1,2

// process.exit()

const movieSearchUrl = `https://movie.douban.com/explore#!type=movie&tag=${MOVIE_TAG}&sort=recommend&page_limit=20&page_start=0`

// 电影id
async function movie_id() {
  try {
    const type = typelist.indexOf(MOVIE_TAG)
    const douban = await new Douban({headless: true})
    await douban.launch()
    await douban.goto(movieSearchUrl) // 进入搜索页
    console.log('open search url')
    await douban.wait('.list-wp')
    console.log('wait for movie list')

    // 点击一次20条
    for(let i=1; i<MOVIE_COUNT/20; i++) {
      console.log('click get more + 20 numbers')
      await douban.click('#content .list-wp .more')
      await douban.wait(1000)
    }

    const mIds = await douban.$$eval('#content .list-wp .item', eles=> eles.map(({ href })=> href.match(/.*subject\/([0-9]*)/)[1]))
    const titles = await douban.$$eval('#content .list-wp .item .cover-wp img', eles=> eles.map(({ alt })=> alt))

    const movies = mIds.map((mId, index)=> ({title: titles[index], mId, type}))

    console.log('movie list count:' + movies.length)

    fs.writeFile('movies.json', JSON.stringify(movies), (err) => {
      if (err) throw err
      console.log('mid saved in movies.json')
    })
    await douban.browserClose()
  }catch (e) {
    console.log(e)
  }
}
exports = module.exports = movie_id

if(__filename === process.mainModule.filename) {
  ;(async ()=> {
    await movie_id()
  })()
}