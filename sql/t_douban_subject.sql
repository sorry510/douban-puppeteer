/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-06 18:42:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_subject
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_subject`;
CREATE TABLE `t_douban_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aka` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '别名',
  `collect_count` int(11) DEFAULT 0 COMMENT '收藏数',
  `comments_count` int(10) DEFAULT 0 COMMENT '短评论数',
  `countries` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '上映国家',
  `current_season` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '未知',
  `do_count` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '未知',
  `douban_site` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '未知',
  `episodes_count` int(11) DEFAULT 0 COMMENT '未知',
  `genres` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '类别',
  `mId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '电影id',
  `small` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '封面',
  `large` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '封面',
  `medium` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '封面',
  `mobile_url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '手机详情页地址',
  `original_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '原产地名称',
  `rating_min` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '最高分',
  `rating_max` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '最低分',
  `rating_average` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '平均分',
  `rating_stars` int(11) DEFAULT 0 COMMENT '星星评分数量（无从获取）',
  `ratings_count` int(11) DEFAULT 0 COMMENT '总评价人数',
  `review_count` int(11) DEFAULT 0 COMMENT '影评数量',
  `schedule_url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '电影院查询地址',
  `season_count` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '未知',
  `share_url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '分项地址',
  `subtype` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '类别',
  `summary` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '摘要',
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '电影名称',
  `wish_count` int(11) DEFAULT 0 COMMENT '想看人数（无从获取）',
  `year` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '出产年份',
  `prevue_movie` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '预告片视频',
  `prevue_poster` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '预告片海报',
  `update_time` bigint(20) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of t_douban_subject
-- ----------------------------
INSERT INTO `t_douban_subject` VALUES ('206', '[\"小丑起源电影：罗密欧\",\"Romeo\",\"Joker Origin Movie\"]', '0', '114277', '[\"加拿大\",\"美国\"]', '', '', '', '0', '[\"剧情\",\"惊悚\",\"犯罪\"]', '27119724', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', '', 'Joker', '0', '10', '8.8', '40', '0', '3213', 'https://movie.douban.com/subject/27119724/cinema/', '', 'https://m.douban.com/movie/subject/27119724', 'movie', '　　电影《小丑》以同名DC漫画角色为基础，由华纳兄弟影业公司发行，计划于2019年10月4日上映。本片的故事将独立于DCEU之外，故事背景设置在20世纪80年代，讲述了一位生活陷入困境的脱口秀喜剧演员渐渐走向精神的崩溃，在哥谭市开始了疯狂的犯罪生涯，最终成为了蝙蝠侠的宿敌“小丑”的故事。\n　　本片由《宿醉》的导演托德菲利普斯执导，他与编剧斯科特西尔弗一起撰写了编剧。杰昆菲尼克斯本片中饰演主人公“小丑”，其他的主演包括罗伯特德尼罗、莎姬贝兹、马克马龙等。', '小丑', '0', '2019', '', '', null);
INSERT INTO `t_douban_subject` VALUES ('207', '[\"小丑起源电影：罗密欧\",\"Romeo\",\"Joker Origin Movie\"]', '0', '114263', '[\"加拿大\",\"美国\"]', '', '', '', '0', '[\"剧情\",\"惊悚\",\"犯罪\"]', '27119724', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', '', 'Joker', '0', '10', '8.8', '40', '0', '3213', 'https://movie.douban.com/subject/27119724/cinema/', '', 'https://m.douban.com/movie/subject/27119724', 'movie', '　　电影《小丑》以同名DC漫画角色为基础，由华纳兄弟影业公司发行，计划于2019年10月4日上映。本片的故事将独立于DCEU之外，故事背景设置在20世纪80年代，讲述了一位生活陷入困境的脱口秀喜剧演员渐渐走向精神的崩溃，在哥谭市开始了疯狂的犯罪生涯，最终成为了蝙蝠侠的宿敌“小丑”的故事。\n　　本片由《宿醉》的导演托德菲利普斯执导，他与编剧斯科特西尔弗一起撰写了编剧。杰昆菲尼克斯本片中饰演主人公“小丑”，其他的主演包括罗伯特德尼罗、莎姬贝兹、马克马龙等。', '小丑', '0', '2019', '', '', '0');
INSERT INTO `t_douban_subject` VALUES ('208', '[\"小丑起源电影：罗密欧\",\"Romeo\",\"Joker Origin Movie\"]', '0', '114263', '[\"加拿大\",\"美国\"]', '', '', '', '0', '[\"剧情\",\"惊悚\",\"犯罪\"]', '27119724', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', '', 'Joker', '0', '10', '8.8', '40', '0', '3213', 'https://movie.douban.com/subject/27119724/cinema/', '', 'https://m.douban.com/movie/subject/27119724', 'movie', '　　电影《小丑》以同名DC漫画角色为基础，由华纳兄弟影业公司发行，计划于2019年10月4日上映。本片的故事将独立于DCEU之外，故事背景设置在20世纪80年代，讲述了一位生活陷入困境的脱口秀喜剧演员渐渐走向精神的崩溃，在哥谭市开始了疯狂的犯罪生涯，最终成为了蝙蝠侠的宿敌“小丑”的故事。\n　　本片由《宿醉》的导演托德菲利普斯执导，他与编剧斯科特西尔弗一起撰写了编剧。杰昆菲尼克斯本片中饰演主人公“小丑”，其他的主演包括罗伯特德尼罗、莎姬贝兹、马克马龙等。', '小丑', '0', '2019', '', '', '0');
INSERT INTO `t_douban_subject` VALUES ('209', '[\"小丑起源电影：罗密欧\",\"Romeo\",\"Joker Origin Movie\"]', '0', '114264', '[\"加拿大\",\"美国\"]', '', '', '', '0', '[\"剧情\",\"惊悚\",\"犯罪\"]', '27119724', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', '', 'Joker', '0', '10', '8.8', '40', '0', '3213', 'https://movie.douban.com/subject/27119724/cinema/', '', 'https://m.douban.com/movie/subject/27119724', 'movie', '　　电影《小丑》以同名DC漫画角色为基础，由华纳兄弟影业公司发行，计划于2019年10月4日上映。本片的故事将独立于DCEU之外，故事背景设置在20世纪80年代，讲述了一位生活陷入困境的脱口秀喜剧演员渐渐走向精神的崩溃，在哥谭市开始了疯狂的犯罪生涯，最终成为了蝙蝠侠的宿敌“小丑”的故事。\n　　本片由《宿醉》的导演托德菲利普斯执导，他与编剧斯科特西尔弗一起撰写了编剧。杰昆菲尼克斯本片中饰演主人公“小丑”，其他的主演包括罗伯特德尼罗、莎姬贝兹、马克马龙等。', '小丑', '0', '2019', '', '', '0');
INSERT INTO `t_douban_subject` VALUES ('210', '[\"从前，有个荷里活(港)\",\"从前，有个好莱坞...(台)\",\"好莱坞杀人事件\",\"荷里活往事\",\"Once Upon a Time in Hollywood\",\"Once Upon a Time in… Hollywood\"]', '0', '22728', '[\"美国\",\"英国\",\"中国大陆\"]', '', '', '', '0', '[\"剧情\",\"喜剧\"]', '27087724', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551119672.webp', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551119672.webp', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551119672.webp', '', 'Once Upon a Time... in Hollywood', '0', '10', '7.4', '40', '0', '404', 'https://movie.douban.com/subject/27087724/cinema/', '', 'https://m.douban.com/movie/subject/27087724', 'movie', '　　故事在1969年瞬息万变的洛杉矶展开，在那个风起云涌的变革时代，嬉皮文化盛行，好莱坞大制片厂制度瓦解，新的好莱坞明星纷纷崛起。电视明星里克·道尔顿（莱昂纳多·迪卡普里奥 Leonardo DiCaprio饰）与他长期合作替身搭档克里夫·布斯（布拉德·皮特 Brad Pitt 饰）如何在逐渐陌生的娱乐圈里，找到自己的一席之地。他们正力图扬名电影圈，却发现这个行业早已不是他们想象的样子了…… 这是昆汀自编自导第9部影片，汇集星光闪闪的卡司与交错的情节，纪念好莱坞不再复返的黄金年代。', '好莱坞往事', '0', '2019', '', '', '0');
