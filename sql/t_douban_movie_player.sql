/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-08 13:51:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_movie_player
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_movie_player`;
CREATE TABLE `t_douban_movie_player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mId` varchar(50) DEFAULT '',
  `playerId` varchar(50) DEFAULT '',
  `type` char(1) DEFAULT '0' COMMENT '0:导演,1:演员',
  `name` varchar(50) DEFAULT '' COMMENT '姓名',
  `avatar` varchar(100) DEFAULT '' COMMENT '人物头像',
  `role` varchar(50) DEFAULT '' COMMENT '扮演角色',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5113 DEFAULT CHARSET=utf8mb4;
