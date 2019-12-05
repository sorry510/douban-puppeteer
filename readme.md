## puppeteer-douban

## 爬取豆瓣详情页
1. cnpm/cnpm install || yarn 注:puppteer版本是1.19.0，1.2版本的部分函数异步机制有变动无法使用
2. cp env.examle env 填写相关信息

## 运行
1. node src/index.js 爬取详情页
2. node src/movieId.js 爬取电影mid 生成一个movies.json文件
3. node src/dragon.js 