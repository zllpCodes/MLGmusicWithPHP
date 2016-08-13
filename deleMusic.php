<?php
	if($_POST['musicid']){
		$conn = mysql_connect('localhost','shaw&root','sr101045') or die("连接数据库失败".mysql_error());
		mysql_query("set names utf8");
		mysql_select_db("mlgmusic",$conn);
		$sqlGetName = "select * from music where musicid=".$_POST['musicid'];
		$sqlDele = "delete from music where musicid=".$_POST['musicid'];
		$result = mysql_query($sqlGetName,$conn);
		if(!$result){
			die("获取音乐名失败");
		}
		while($row = mysql_fetch_array($result)){
			$musicName = $row['musicName'];
		}
		//删除指定目录下的存放的音乐文件
		unlink("music/".mb_convert_encoding($musicName,'gbk','utf8')) or die("删除失败");
		//删除数据库中的数据
		mysql_query($sqlDele,$conn) or die("删除失败");
		mysql_close($conn);
		echo "删除成功";
	}
?>