/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-08 13:51:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_mid
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_mid`;
CREATE TABLE `t_douban_mid` (
  `mId` int(11) NOT NULL,
  `type` char(1) NOT NULL DEFAULT '0' COMMENT '0 正在热映 ; 1 即将上映; 2 top250',
  `title` varchar(100) NOT NULL DEFAULT '',
  `movie_status` char(1) NOT NULL DEFAULT '0' COMMENT 'movie更新状态',
  `photo_status` char(1) NOT NULL DEFAULT '0',
  `comment_status` char(1) NOT NULL DEFAULT '0',
  `subject_status` char(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`mId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
