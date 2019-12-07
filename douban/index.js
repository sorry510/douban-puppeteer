const puppeteer = require('puppeteer')

module.exports = class Douban {
  constructor(config={}) {
    const defaultConfig = {
      headless: false, // true为无头
      slowMo: 100,
      defaultViewport: {
      	width: 1920 - 60, 
      	height: 950
      },
      // devtools: true
    }
    this.config = {...defaultConfig, ...config}
  }

  getPage() {
    return this.page
  }

  async launch() {
    this.browser = await puppeteer.launch(this.config)
    this.page = await this.browser.newPage()
  }

  async goto(url) {
    await this.page.goto(url, {
      // timeout: 0,
      waitUntil: 'domcontentloaded'
    })
    !this.config.headless && await this.page.evaluate(()=>document.documentElement.webkitRequestFullScreen()) // 全屏
  }

  async $(el) {
    return await this.page.$(el)
  }

  async $$(el) {
    return await this.page.$$(el)
  }

  async click(el, options={}) {
    await this.page.click(el, Object.assign({
      delay: 500
    }, options))
  }

  async $eval(el, callback) {
    const isExist = await this.page.$(el)
    const res = isExist ? await this.page.$eval(el, callback) : ''
    return res
  }

  async $$eval(el, callback) {
    const isExist = await this.page.$(el)
    const res = isExist ? await this.page.$$eval(el, callback) : []
    return res
  }

  async wait(data) {
    if(!isNaN(Number(data))) {
      await this.page.waitFor(data)
    }else {
      await this.page.waitForSelector(data)
    }
  }

  async pageClose() {
    await this.page.close()
    this.page = null
  }

  async browserClose() {
    await this.browser.close()
    this.browser = null
  }

}