/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-05 21:00:46
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4573 DEFAULT CHARSET=utf8;
