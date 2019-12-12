/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-12 11:04:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_player
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_player`;
CREATE TABLE `t_douban_player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `playerId` varchar(10) DEFAULT NULL COMMENT '演员/导演id',
  `name` varchar(20) DEFAULT '' COMMENT '演员名称',
  `avatar` varchar(300) DEFAULT '' COMMENT '头像',
  `sex` char(1) DEFAULT '',
  `constellation` varchar(100) DEFAULT '' COMMENT '星座',
  `birthday` varchar(50) DEFAULT '' COMMENT '出生日期',
  `birthplace` varchar(100) DEFAULT '' COMMENT '出生地',
  `role` varchar(255) DEFAULT '' COMMENT '职业',
  `name_en` varchar(50) DEFAULT '' COMMENT '更多外文名',
  `name_cn` varchar(50) DEFAULT '' COMMENT '更多中文名',
  `family` varchar(100) DEFAULT '' COMMENT '家庭成员',
  `introduce` text DEFAULT NULL COMMENT '人物简介',
  `movies` text DEFAULT NULL COMMENT '作品信息json字符串',
  `update_time` bigint(20) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `playerId` (`playerId`)
) ENGINE=InnoDB AUTO_INCREMENT=12298 DEFAULT CHARSET=utf8;
