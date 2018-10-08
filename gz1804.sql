/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : gz1804

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-09-30 20:29:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify` (
  `id` int(4) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `商品分类` varchar(255) CHARACTER SET utf32 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES ('0004', '艺术品');
INSERT INTO `classify` VALUES ('0005', '艺术品');
INSERT INTO `classify` VALUES ('0006', '艺术品');
INSERT INTO `classify` VALUES ('0007', '艺术品');
INSERT INTO `classify` VALUES ('0008', '艺术品');
INSERT INTO `classify` VALUES ('0009', '艺术品');

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` int(4) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `商品分类` varchar(255) DEFAULT NULL,
  `商品名称` varchar(255) DEFAULT NULL,
  `价格` varchar(255) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `发布状态` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('0050', '乐器', '吉他', '￥111', '2018-09-30 13:08:57', '发布');
INSERT INTO `goodslist` VALUES ('0046', '腌制品', '泡菜', '￥30', '2018-09-30 13:07:15', '发布');
INSERT INTO `goodslist` VALUES ('0045', '电影', '七月与安生', '￥60', '2018-09-30 13:06:40', '发布');
INSERT INTO `goodslist` VALUES ('0043', '美食', '可乐', '￥5', '2018-09-30 13:04:53', '发布');
INSERT INTO `goodslist` VALUES ('0042', '零食', '辣条', '￥35', '2018-09-30 13:03:56', '待发布');
INSERT INTO `goodslist` VALUES ('0044', '服装', ' 上衣', '￥123', '2018-09-30 13:05:47', '发布');
INSERT INTO `goodslist` VALUES ('0041', '服装', '裤子', '￥134', '2018-09-30 13:03:25', '发布');

-- ----------------------------
-- Table structure for userlist
-- ----------------------------
DROP TABLE IF EXISTS `userlist`;
CREATE TABLE `userlist` (
  `id` int(4) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `regtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip` varchar(255) DEFAULT NULL,
  `手机` varchar(255) DEFAULT NULL,
  `邮箱` varchar(255) DEFAULT NULL,
  `角色` varchar(255) NOT NULL,
  `审核状态` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userlist
-- ----------------------------
INSERT INTO `userlist` VALUES ('0006', 'xiexie', 'laoxie', '444444', '2018-09-30 19:28:32', null, '66666666', '666@qq.com', '管理员', '未审核', '男', '你好我也好', 'publicuploads2976995fe2b1721c4bac0084fbe587cc.jpg');
INSERT INTO `userlist` VALUES ('0012', 'laoF', 'fff', '777777', '2018-09-29 22:34:03', null, 'ffffffff', 'fff@qq.com', '超级管理员', '已审核', '男', '泥煤', null);
SET FOREIGN_KEY_CHECKS=1;
