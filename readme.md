## puppeteer-douban

## feature
- 爬取豆瓣电影
- 使用puppteer，async/await完全无回调
- mysql存储数据
- 支持断点执行
- 支持代理

## init
1. cnpm/cnpm install || yarn 注:puppteer版本是1.19.0，1.2版本的部分函数异步机制有变动无法使用
2. 根据sql目录的数据表创建数据库
3. cp env.examle env 填写相关信息

## run
1. node src/index.js 可以添加参数 reset
2. node src/index.js reset 可以重置所有操作，从新开始

## run single
1. node src/movieId.js 爬取电影mid 生成一个**movies.json**文件

2. node src/movie_player.js 爬取电影和演员关系，同时生成一个**players.json**文件(需要movies.json)
3. node src/baseInfo.js 爬取详情页电影基本信息和详情(需要movies.json)
4. node src/comment.js 爬取电影短论(需要movies.json)
5. node src/review.js 爬取电影影评(需要movies.json)
6. node src/photo.js 爬取电影海报(需要movies.json)
7. node src/trailer.js 爬取电影预告视频(需要movies.json)

8. node src/player.js 爬取电影人物（导演和演员）(需要players.json)
9. node src/player_photo.js 爬取电影人物的相册（导演和演员）(需要players.json)

## 注意事项
1. 单独执行某个文件时，2-7需要1的前置条件（2-7可以并行），8,9需要2的前置条件
2. 爬取太快会被封ip