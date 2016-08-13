-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-08-13 05:55:08
-- 服务器版本： 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mlgmusic`
--

-- --------------------------------------------------------

--
-- 表的结构 `music`
--

CREATE TABLE IF NOT EXISTS `music` (
  `musicid` int(11) NOT NULL,
  `musicName` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `musicFile` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `lrc` text CHARACTER SET utf8 COLLATE utf8_bin
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `music`
--

INSERT INTO `music` (`musicid`, `musicName`, `musicFile`, `lrc`) VALUES
(3, '陈奕迅 - 斯德哥尔摩情人.mp3', 'music/', '\n[00:00.60]斯德哥尔摩情人\n[00:02.56]词：林夕 曲：C. Y. Kong\n[00:04.42]演唱：陈奕迅\n[00:06.46]\n[00:13.65]逃避 分开的孤独\n[00:16.83]情愿 一起不舒服\n[00:20.20]其实你那占有欲 咬噬我血肉\n[00:23.93]怕我也有份 教育\n[00:26.69]未能做 空虚的枯木\n[00:29.94]滞留在 挤涌的监狱\n[00:33.49]明白你有控制欲 我为了大局\n[00:37.20]上了瘾也不 戒 毒\n[00:40.00]没有献出我的脸怎 拍响\n[00:43.29]没有两巴掌 怎制止 痕痒\n[00:46.69]糊涂地 软弱当善良\n[00:48.57]谁就 这样变善良\n[00:50.52]你更放肆得漂 亮\n[00:53.51]也许 当我感到窒息 想 逃亡\n[00:57.19]却未戒掉浴血 的 欲望\n[01:00.43]也许早已恋上共绑匪苦 海慈航\n[01:03.63]原谅你越爱越恶\n[01:05.45]满足我 预计的失 望\n[01:07.69]是盲目地伟大成狂\n[01:10.12]还是受害 受用 犯贱 犯到 被虐成狂\n[01:13.56]能为你忍 受\n[01:15.20]然后当享受 那 又 何 妨\n[01:30.18]为逃避 轻松得孤独\n[01:33.39]便宁愿 紧张得舒服\n[01:36.75]无谓设计了布局 这样快结局\n[01:40.60]爱与痛也不到肉\n[01:43.36]像战争片 最好有死有伤\n[01:46.71]未吓到 尖叫 哭也不流畅\n[01:49.96]完全为 配合我软弱 才令 你乐意肆虐\n[01:53.88]作恶也要好对象\n[01:56.83]也许 早已不觉窒息 想投降\n[02:00.52]舔尽 你赠我的 一额汗\n[02:03.69]也许早已适应 就此跟绑 匪 同床\n[02:06.83]谁料你 谁料我 能合作到 爱死对方\n[02:09.99]应该也 不只一次 幻想怎么 逃亡\n[02:13.90]却未戒掉 妥协 的 欲望\n[02:17.06]也许早已恋上共绑匪 苦 海慈航\n[02:20.09]情欲 要被你 勒索\n[02:22.02]也许有助 刺激心脏\n[02:24.09]是盲目地伟大成狂\n[02:27.06]还是受害 受用 犯贱 犯到 被虐成狂\n[02:30.33]能为你忍 受\n[02:31.80]然后当享受 那 又 何 妨\n[02:46.91]没有我 给你操纵的 快感\n[02:49.97]问你的 兴奋 知觉 怎膨胀\n[02:53.22]完全为 配合我软弱\n[02:55.19]才令你 乐意肆虐\n[02:57.20]作恶也要好 对 象\n[03:01.82]也许 早已不觉窒息 想投降\n[03:05.50]舔尽 你赠我的 一额汗\n[03:08.70]也许早已适应 就此跟绑匪 同床\n[03:11.82]谁料你 谁料我 能合作到 爱死对方\n[03:14.89]应该也 不只一次 幻想怎么逃亡\n[03:18.82]却未戒掉 妥协 的 欲望\n[03:21.94]也许早已恋上共绑匪 苦海慈航\n[03:25.16]情欲 要被你 勒索\n[03:27.15]也许有助 刺激心脏\n[03:29.38]但无论是 伟大成狂\n[03:31.76]还是 受害 受用 犯贱 犯到 被虐成狂\n[03:35.17]看着 是谁令幸福 给殓葬\n[03:38.53]别喊冤 别叫屈 别诉苦 在这 宗 惨 案\n[03:42.10]全赖我忍受 才令你享受\n[03:48.45]我是同谋\n[03:55.37]绝对是同谋\n[03:56.37]\n'),
(9, 'SNH48 - 星愿.mp3', 'music/', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`musicid`), ADD UNIQUE KEY `musicid` (`musicid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `musicid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
