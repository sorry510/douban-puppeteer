/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-05 21:00:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_player
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_player`;
CREATE TABLE `t_douban_player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mId` varchar(10) DEFAULT NULL COMMENT '电影id',
  `mType` char(1) DEFAULT NULL COMMENT '电影类型 0  正在热映 ; 1 马上上映 ; 2 top250',
  `playerId` varchar(10) DEFAULT NULL COMMENT '演员/导演id',
  `name` varchar(20) DEFAULT NULL COMMENT '演员名称',
  `alt` varchar(100) DEFAULT NULL COMMENT '链接',
  `large` varchar(300) DEFAULT NULL COMMENT '海报',
  `medium` varchar(300) DEFAULT NULL,
  `small` varchar(300) DEFAULT NULL,
  `type` char(1) DEFAULT '0' COMMENT '0 演员  1  导演',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18096 DEFAULT CHARSET=utf8;
