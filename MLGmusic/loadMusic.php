<?php
	$conn = mysql_connect('localhost','shaw&root','sr101045');
	if(!$conn){
		die("连接数据库失败");
	}
	mysql_query("SET NAMES utf8");
	mysql_select_db("mlgmusic",$conn) or die(mysql_error());
	$sql = "select * from music";
	$result = mysql_query($sql,$conn);
	if(!$result){
		die("查找失败".mysql_error());
	}
	$response = array();
	while($row = mysql_fetch_array($result)){
		$lrc = split("\r\n",$row['lrc']);
		$lrc = join("\n",$lrc);
		$response[] = json_encode(array('musicid'=>$row['musicid'],'musicName'=>$row['musicName'],'musicPath'=>$row['musicFile'],'lrc'=>$lrc));
	}
	mysql_close($conn);
	echo json_encode($response);
?>