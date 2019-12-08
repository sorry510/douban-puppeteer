/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-08 13:52:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_trailer
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_trailer`;
CREATE TABLE `t_douban_trailer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mId` varchar(20) DEFAULT NULL,
  `video` text DEFAULT NULL COMMENT '预告片地址[''url1'', ''url2'']',
  `update_time` bigint(20) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `mId` (`mId`)
) ENGINE=MyISAM AUTO_INCREMENT=261 DEFAULT CHARSET=utf8mb4 COMMENT=' 预告片';
