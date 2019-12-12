/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-12 11:07:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_player_photo
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_player_photo`;
CREATE TABLE `t_douban_player_photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `playerId` varchar(20) DEFAULT '',
  `img` text DEFAULT NULL,
  `update_time` bigint(20) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `playerId` (`playerId`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3768 DEFAULT CHARSET=utf8mb4 COMMENT='人物相册';
