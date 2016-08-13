<!doctype html>
<html>
<head>
<title>摩洛哥音乐播放器</title>
<meta charset="utf-8" />
<meta name="viewport" chontent="width=device-width initial-scale=1.0" />
<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/MLGmusic.css">
</head>

<body>
	<nav class="navbar navbar-default">
		<div class="navbar-header">
			<button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a href="#" class="navbar-brand">摩洛哥播放器</a>
		</div>
		<div class="collapse navbar-collapse navbar-responsive-collapse">
			<ul class="nav navbar-nav">
				<li><a href="#">首页</a></li>
				<li><a href="#">点歌</a></li>
				<li><a href="#">唱歌</a></li>
			</ul>
			<form class="navbar-form navbar-right" role="search">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="歌曲名" />
				</div>
				<button type="button" class="btn btn-default">搜索</button>
			</form>
		</div>
	</nav>
	<section>
		<div class="container">
			<div class="row">
				<aside class="col-xs-4">
					<h4 class="title row">
						<span class="col-xs-5">已有音乐列表</span>
						<span id="musicAdd" class="col-xs-offset-3 col-xs-2 glyphicon glyphicon-plus" data-keyboard="false" data-backdrop="static"></span>
						<div class="modal" id="addModal">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close">&times;</button>
										<div class="modal-title">请选择您想要添加的音乐</div>
									</div>
									<div class="modal-body">
										<form id="fileForm" action="addMusic.php" method="post" enctype="multipart/form-data">
											<div class="addFile">
												<button class="btn btn-deafult">选择歌曲</button>
												<span>未选择文件</span>
												<input id="addMusic" type="file" name="addMusic"/>	
											</div>
											<div class="addFile">
												<button class="btn btn-deafult">选择歌词</button>
												<span>未选择文件</span>
												<input id="addLrc" type="file" name="addLrc"/>	
											</div>
										</form>
									</div>
									<div class="modal-footer">
										<button type="button" id="sureAdd" class="btn btn-info">确定</button>
										<button type="button" id="closeAdd" class="btn btn-default" >取消</button>
									</div>
								</div>
							</div>
							
						</div>
						<span id="musicDele" class="col-xs-1 glyphicon glyphicon-trash"></span>
					</h4>
					<ul id="musicList" class="list-unstyled"></ul>
				</aside>
				<main class="col-xs-7">
					<h4 id="lyricTitle" class="title">歌曲名称</h4>
					<audio id="audioPlay">您的浏览器不支持audio标签</audio>
					<div id="lrcWrap">
						<ul class="list-unstyled text-center" id="lrcShow"></ul>	
					</div>
				</main>
				<div id="musicConsole" class="col-xs-11">
					<div class="row">
						<div id="progressWrap" class="col-xs-5">
							<div class="row">
								<div class="col-xs-9">
									<div class="progress">
										<div id="progressBar" class="progress-bar progress-bar-info"></div>
										<span id="progressBtn"></span>
									</div>			
								</div>
								<span id="musicTime" class="col-xs-3">时间/时间</span>
							</div>
						</div>
						<div id="musicControl" class="col-xs-6">
							<div class="row">
								<div class="col-xs-2 col-xs-offset-2">
									<span id="prevMusic" class="glyphicon glyphicon-step-backward"></span>
								</div>
								<div class="col-xs-2">
									<span id="playMusic" class="glyphicon glyphicon-play"></span>
								</div><!-- glyphicon-pause -->
								<div class="col-xs-2">
									<span id="nextMusic" class="glyphicon glyphicon-step-forward"></span>
								</div>
								<div class="col-xs-2">
									<span id="mute" class="glyphicon glyphicon-volume-up"></span>
								</div><!-- glyphicon-volume-off -->
								<div id="voiceWrap">
									<div id="voiceControl"><span title="100"></span></div>
								</div>
								<div class="col-xs-2">
									<span id="reptMusic" class="glyphicon glyphicon-repeat"></span>	
								</div><!-- glyphicon-arrow-right -->
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</section>

	<script type="text/javascript" src="js/jQuery.js"></script>
	<script type="text/javascript" src="js/MLGmusic.js"></script>
	<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script> 
</body>
</html>