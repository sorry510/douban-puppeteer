/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-06 18:42:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_comment
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_comment`;
CREATE TABLE `t_douban_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mId` varchar(50) DEFAULT '' COMMENT '电影id',
  `type` char(1) DEFAULT '0' COMMENT '0: 短评，1影评',
  `author` varchar(50) DEFAULT '' COMMENT '作者',
  `star` float(10,0) DEFAULT 0 COMMENT '评分数',
  `content` text DEFAULT NULL COMMENT '评论内容',
  `like` int(10) DEFAULT 0 COMMENT '点赞数量',
  `date` varchar(50) DEFAULT '' COMMENT '评论日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of t_douban_comment
-- ----------------------------
