<?php
	if($_FILES['addMusic']['name']){
		//处理传入的数据
		//将传入的音乐放到音乐文件夹下
		//如果文件存在则返回提示
		if(!file_exists('music/'.mb_convert_encoding($_FILES['addMusic']['name'],'gbk','utf-8'))){
			copy($_FILES['addMusic']['tmp_name'], 'music/'.mb_convert_encoding($_FILES['addMusic']['name'],'gbk','utf-8'));
			//读取lrc文件
			if($_FILES['addLrc']['tmp_name']){
				$file = fopen($_FILES['addLrc']['tmp_name'], 'r');
				$lrcContent = fread($file,filesize($_FILES['addLrc']['tmp_name']));	
				$sql = "insert into music(musicName,musicFile,lrc) values('".$_FILES['addMusic']['name']."','music/','".$lrcContent."')";
			}else{
				$sql = "insert into music(musicName,musicFile) values('".$_FILES['addMusic']['name']."','music/')";
			}
			//将数据存入数据库
			$conn = mysql_connect('localhost','shaw&root','sr101045') or die("数据库连接失败");
			mysql_query('set names utf8');
			mysql_select_db('mlgmusic',$conn) or die("数据库访问失败");
			mysql_query($sql) or die("数据库插入失败".mysql_error());
			mysql_close($conn);
			echo "歌曲添加成功，即将跳转...";
			$url = "MLGmusic.php";
			header("refresh:1;url=$url");
		}else{
			echo "歌曲已经存在,不要重复添加,返回原页面...";
			$url = "MLGmusic.php";
			header("refresh:1;url=$url");
		}
		
	}
?>