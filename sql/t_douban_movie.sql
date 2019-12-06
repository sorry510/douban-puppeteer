/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-06 18:41:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_movie
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_movie`;
CREATE TABLE `t_douban_movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT '' COMMENT '名称',
  `original_title` varchar(100) DEFAULT '' COMMENT '原产地名称',
  `mId` varchar(10) DEFAULT NULL COMMENT '电影id',
  `rating_max` varchar(5) DEFAULT '' COMMENT '最高评分 ',
  `rating_min` varchar(5) DEFAULT '' COMMENT '最低评分 ',
  `rating_average` varchar(5) DEFAULT '' COMMENT '平均评分 ',
  `rating_stars` varchar(5) DEFAULT '' COMMENT '不知含义（没有）',
  `genres` varchar(100) DEFAULT NULL COMMENT '分类',
  `alt` varchar(200) DEFAULT '' COMMENT '详情页地址',
  `collect_count` varchar(10) DEFAULT '0' COMMENT '点击量(没有)',
  `subtype` varchar(20) DEFAULT '' COMMENT '子类型:movie',
  `large` varchar(300) DEFAULT '' COMMENT '海报',
  `medium` varchar(300) DEFAULT NULL,
  `small` varchar(300) DEFAULT NULL,
  `type` char(1) DEFAULT '0' COMMENT '0 正在热映 ; 1 即将上映; 2 top250',
  `year` char(4) DEFAULT '' COMMENT '出产年份',
  `director` varchar(100) DEFAULT '' COMMENT '导演',
  `scriptwriter` varchar(100) DEFAULT '' COMMENT '编剧',
  `countries` varchar(100) DEFAULT '' COMMENT '出产地',
  `language` varchar(100) DEFAULT '' COMMENT '语言',
  `show_date` varchar(100) DEFAULT '' COMMENT '上映日期',
  `longtime` varchar(50) DEFAULT '' COMMENT '片长',
  `update_time` bigint(20) DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4586 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_douban_movie
-- ----------------------------
INSERT INTO `t_douban_movie` VALUES ('4583', '小丑', 'Joker', '27119724', '10', '0', '8.8', '40', '[\"剧情\",\"惊悚\",\"犯罪\"]', 'https://movie.douban.com/subject/27119724', '0', 'movie', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.webp', '0', '2019', '[\"托德·菲利普斯\"]', '[\"托德·菲利普斯\",\"斯科特·西尔弗\",\"鲍勃·凯恩\",\"比尔·芬格\",\"杰瑞·罗宾逊\"]', '[\"加拿大\",\"美国\"]', '[\"英语\"]', '[\"2019-08-31(威尼斯电影节)\",\"2019-10-04(美国)\"]', '[\"122分钟\",\"118分钟(威尼斯电影节)\"]', '1575628841607');
INSERT INTO `t_douban_movie` VALUES ('4584', '好莱坞往事', 'Once Upon a Time... in Hollywood', '27087724', '10', '0', '7.4', '40', '[\"剧情\",\"喜剧\"]', 'https://movie.douban.com/subject/27087724', '0', 'movie', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551119672.webp', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551119672.webp', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2551119672.webp', '0', '2019', '[\"昆汀·塔伦蒂诺\"]', '[\"昆汀·塔伦蒂诺\"]', '[\"美国\",\"英国\",\"中国大陆\"]', '[\"英语\",\"意大利语\",\"西班牙语\"]', '[\"2019(中国大陆)\",\"2019-05-21(戛纳电影节)\",\"2019-07-26(美国)\"]', '[\"165分钟\",\"161分钟(戛纳电影节)\",\"162分钟(院线版)\",\"171分钟(加长版)\"]', '1575628847988');
INSERT INTO `t_douban_movie` VALUES ('4585', '宝贝男孩', 'Honey Boy', '30129008', '10', '0', '7.7', '40', '[\"剧情\"]', 'https://movie.douban.com/subject/30129008', '0', 'movie', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2568099437.webp', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2568099437.webp', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2568099437.webp', '0', '2019', '[\"阿尔玛·哈勒\"]', '[\"希亚·拉博夫\"]', '[\"美国\"]', '[\"英语\"]', '[\"2019-01-25(圣丹斯电影节)\",\"2019-11-27(美国)\"]', '[\"93分钟\"]', '1575628853961');
