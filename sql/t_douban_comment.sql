/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-12-08 13:51:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_douban_comment
-- ----------------------------
DROP TABLE IF EXISTS `t_douban_comment`;
CREATE TABLE `t_douban_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` varchar(50) DEFAULT '' COMMENT '评论id',
  `mId` varchar(50) DEFAULT '' COMMENT '电影id',
  `type` char(1) DEFAULT '0' COMMENT '0: 短评，1影评',
  `avatar` varchar(255) DEFAULT '' COMMENT '头像',
  `author` varchar(50) DEFAULT '' COMMENT '作者',
  `star` float(10,0) DEFAULT 0 COMMENT '评分数',
  `star_title` varchar(100) DEFAULT '' COMMENT '星星评价名称',
  `content` text DEFAULT NULL COMMENT '评论内容',
  `vote` int(10) DEFAULT 0 COMMENT '点赞数量',
  `date` varchar(50) DEFAULT '' COMMENT '评论日期',
  `time` varchar(50) DEFAULT '' COMMENT '评论时间',
  `update_time` bigint(20) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `mId` (`mId`),
  KEY `mId-type` (`mId`,`type`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=6432 DEFAULT CHARSET=utf8mb4 COMMENT='短品论和影评';
