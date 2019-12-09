## puppeteer-douban

## 爬取豆瓣详情页
1. cnpm/cnpm install || yarn 注:puppteer版本是1.19.0，1.2版本的部分函数异步机制有变动无法使用
2. cp env.examle env 填写相关信息

## 运行
1. node src/movieId.js 爬取电影mid 生成一个movies.json文件
2. node src/movie_player.js 爬取电影和演员关系，同时生成一个players.json文件(需要movies.json)
3. node src/baseInfo.js 爬取详情页电影基本信息和详情(需要movies.json)
3. node src/comment.js 爬取电影短论(需要movies.json)
3. node src/review.js 爬取电影影评(需要movies.json)
3. node src/photo.js 爬取电影海报(需要movies.json)
3. node src/player.js 爬取电影人物（导演和演员）(需要players.json)
3. node src/trailer.js 爬取电影预告视频(需要movies.json)