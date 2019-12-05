/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-05 21:00:57
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
  `prevue_img` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '预告片图片',
  `prevue_movie` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '预告片视频',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
