//Music引用类型
function Music(musicid,musicName,musicPath,lyric){
    this.musicName = musicName;
    this.lyric = lyric;
    this.musicid = musicid;
    this.musicPath = musicPath;
    //用于计数当前歌词
    this.lrcNum = 0;
}
Music.prototype = {
    constructor:Music,
    //解析歌词
    parseLyric:function(){
        if(this.lyric){
            var lrcArr = this.lyric.split("\n");
            var lrcObjArr = [];
            for(var i=0;i<lrcArr.length;i++){
                var lrcObj = lrcArr[i];
                var timeExg = /\[\d*\:\d*((\:|\.)\d*)*\]/g;
                var timeArr = lrcObj.match(timeExg);
                if(!timeArr)continue;
                var lrcContent = lrcObj.replace(timeExg,'');

                for(var j=0;j<timeArr.length;j++){
                    var min = Number(String(timeArr[j].match(/\[\d*/i)).slice(1));
                    var sec = Number(String(timeArr[j].match(/\:\d*/i)).slice(1));
                    var myTime = min*60+sec;
                    lrcObjArr.push({"myTime":myTime,"lrcContent":lrcContent});
                }   
            }
            return lrcObjArr;
        }else{
            return null;
        }
    },
    addLrc:function(ulObj){
        ulObj.html(" ");
        var lrcObjArr = this.parseLyric();
        if(!lrcObjArr){
            ulObj.html("<h4>没有歌词</h4>");
        }else{
            for(var i=0;i<lrcObjArr.length;i++){
                var liObj = $("<li/>");
                liObj.html(lrcObjArr[i].lrcContent);
                liObj.data("lrcTime",lrcObjArr[i].myTime);
                ulObj.append(liObj);
            }
        }
    },
    //滚动歌词
    scrollLrc:function(){
        var curTime = parseInt($("#audioPlay")[0].currentTime);
        var lrcShow = $("#lrcShow");
        if(!lrcShow.find("h4")[0]){
            var keepTime = 100;  //歌词整齐了，之前500太长
            //判断当前active的歌词对应的播放时间是在curTime之前还是之后
            //此处为写了进度条拖动后，再来写歌词拖动后效果
            var countEmptyContent = 0;
            lrcShow.find("li").each(function(index){
                if(!$(this).html()){
                    countEmptyContent++;
                }
                if(curTime >= $(this).data("lrcTime")){
                    lrcShow.find("li.lrcActive").removeClass("lrcActive");
                    $(this).addClass("lrcActive");
                    var move = index - countEmptyContent;
                    if(move<=7){
                        lrcShow.css("top","0px");
                    }else{
                        lrcShow[0].style.top = -(move-8)*27+"px";
                    }
                    keepTime = 1000;
                }
            });
            var _this = this;
            playClock = setTimeout(function(){
                _this.scrollLrc();
            },keepTime);
        }
    },
    //点击音乐
    clickMusic:function(liObj){
        liObj.innerHTML = this.musicName;
        var _this = this;
        liObj.onclick = function(){
            _this.musicPlay(liObj);
        };
    },
    changeMusic:function(liObj){
        //设置播放列表样式
        this.musicPlay(liObj);
    },
    musicPlay:function(liObj){
        //将歌词计数重新置零
        this.lrcNum = 0;
        //如果有之前设置的歌词滚动，清除
        if(playClock){
            clearTimeout(playClock);
        }
        var liArr = $("#musicList li");
        for(var k=0;k<liArr.length;k++){
            liArr[k].setAttribute("class"," ");
        }
        liObj.setAttribute("class","musicListActive");
        //改变播放按钮|暂停按钮
        var playClass = $("#playMusic").attr("class").replace("play","pause");
        $("#playMusic").attr("class",playClass);
        //音乐播放
        var audioObj = document.getElementById("audioPlay");
        if(this.musicName.indexOf("mp3")<0){
            this.musicName += ".mp3";
        }
        audioObj.src = this.musicPath+this.musicName;
        audioObj.play();
        //进度条和时间
        setTimeout(progressShow,100);
        //歌词显示
        this.addLrc($("#lrcShow"));
        //歌曲名字部分        
        $("#lyricTitle").html(liObj.innerHTML);
    }
};

//数据部分
var musicObjs = [];

$(document).ready(function($){
    //获取音乐数据
    var getData = $.get("loadMusic.php",function(data){
        //data是一个对象数组
        for(var i=0;i<data.length;i++){
            theData = JSON.parse(data[i]);
            musicObjs[i] = new Music(theData['musicid'],theData['musicName'],theData['musicPath'],theData["lrc"]);
        }
    },"json");
    //等待数据获取完成后执行
    getData.done(function(){
        //展示音乐列表
        if(musicObjs.length == 0){
            $("#musicList").append("<h4>没有歌曲</h4>");
            return;
        }
        var num = [];
        for(var i=0;i<musicObjs.length;i++){
            var liObj = document.createElement("li");
            num[i] = function(n,liObj){
                return function(){
                    musicObjs[n].clickMusic(liObj);
                }
            }(i,liObj);
            $("#musicList").append(liObj);
        } 
        for(var j=0;j<num.length;j++){
            num[j]();
            num[j] = null;
        }
    });
});

var playClock;
//播放中的音乐，有歌词的也在滚动
$("#audioPlay").bind("play",function(){
    var activeLiIndx = getActiveMusic();
    musicObjs[activeLiIndx].scrollLrc();
});
//循环播放，没有事件监听，自己写
//把循环设置删除，自己监听结束，再重新播放
$("#audioPlay").bind("ended",function(){
    var reptMusic = document.getElementById("reptMusic");
    clearTimeout(playClock);
    if(reptMusic.getAttribute("class").indexOf("repeat")>=0){
        var activeLiIndx = getActiveMusic();
        musicObjs[activeLiIndx].addLrc($("#lrcShow"));
        this.play();
    }else{
        var liObj = $("#musicList li");
        var activeLiIndx = getActiveMusic();
        if(activeLiIndx < liObj.length-1){
            musicObjs[activeLiIndx+1].changeMusic(liObj[activeLiIndx+1]);
        }else if(activeLiIndx == liObj.length-1){
            activeLiIndx = 0;
            musicObjs[activeLiIndx].changeMusic(liObj[activeLiIndx]);
        }
    }
});

//切换曲目控件
//上一首
$("#prevMusic").click(function(){
    var liObj = $("#musicList li");
    var activeLiIndx = getActiveMusic();
    if(activeLiIndx<liObj.length){
        if(activeLiIndx > 0){
            musicObjs[activeLiIndx-1].changeMusic(liObj[activeLiIndx-1]);
        }
    }
});
//下一首
$("#nextMusic").click(function(){
    var liObj = $("#musicList li");
    var activeLiIndx = getActiveMusic();
    if(getActiveMusic()>=0){
        if(activeLiIndx < liObj.length-1){
            musicObjs[activeLiIndx+1].changeMusic(liObj[activeLiIndx+1]);
        }
    }
});
//获取当前播放的音乐
function getActiveMusic(){
    var musicLi = $("#musicList li");
    for(var i=0;i<musicLi.length;i++){
        if(musicLi[i].getAttribute("class") != null && musicLi[i].getAttribute("class").indexOf("musicListActive")>=0){
            break;
        }
    }
    if(i == musicLi.length) i=-1;
    return i;
}

//进度条和时间的显示
var timeClock;
function progressShow(){
    //时间的显示
    var audioObj = $("#audioPlay")[0];
    var durationMin = parseInt(audioObj.duration/60);
    var durationSec = parseInt(audioObj.duration-durationMin*60);
    var curMin = parseInt(audioObj.currentTime/60);
    var curSec = parseInt(audioObj.currentTime-curMin*60);
    if(curSec<10){
        curSec = "0"+curSec;
    }
    $("#musicTime").html(curMin+":"+curSec+"/"+(durationMin+":"+durationSec));
    //进度条的显示
    $("#progressBar").css("width",((audioObj.currentTime/audioObj.duration)*100+"%"));
    var progressBtnLeft = $("#progressBtn").css("left");
    progressBtnLeft = audioObj.currentTime/audioObj.duration*305+15;
    if(progressBtnLeft<15) progressBtnLeft=15;
    if(progressBtnLeft>310)progressBtnLeft=310;
    $("#progressBtn").css("left",progressBtnLeft);
    //重复调用
    timeClock = setTimeout(arguments.callee,1000);
}
//进度条按钮的拖动
var moveProgress = false;
var progressX,curTime;
$("#progressBtn").mousedown(function(event){
    moveProgress = true;
    progressX = event.pageX;
    curTime = $("#audioPlay")[0].currentTime;
    clearTimeout(timeClock);
    clearTimeout(playClock);
});
$("#progressBtn").mousemove(function(event){
    var _x = parseInt($(this).css("left"));
    if(moveProgress){
        if(progressX<parseInt(event.pageX)){   
            _x++;
        }else{  
            _x--;
        }
        if(_x<15) _x=15;
        if(_x>310)_x=310; 
        
        $(this).css("left",_x+"px");
        $("#progressBar").css("width",((_x-15)/305*100)+"%");
        var audioObj = $("#audioPlay")[0];
        audioObj.currentTime = parseFloat($("#progressBar").css("width"))/305*audioObj.duration;
        //进度条的显示
        progressShow();
    }
});
$("#progressBtn").bind("mouseup mouseout",function(event){
    moveProgress = false;
    var activeLiIndx = getActiveMusic();
    musicObjs[activeLiIndx].scrollLrc();
});
//进度条按钮的点击
$(".progress").click(function(event){
    clearTimeout(timeClock);
    clearTimeout(playClock);
    var ltX = parseInt($(".progress").parent().offset().left);
    var curX = parseInt(event.pageX);
    var _x = curX - ltX -20;
    $("#progressBtn").css("left",_x+"px");
    $("#progressBar").css("width",_x);
    var audioObj = $("#audioPlay")[0];
    audioObj.currentTime = parseFloat($("#progressBar").css("width"))/305*audioObj.duration;
    //进度条的显示
    progressShow();
    var activeLiIndx = getActiveMusic();
    musicObjs[activeLiIndx].scrollLrc();
});
//控件操作
//播放机|暂停键的操作
$("#playMusic").click(function(){
    var classVal = $(this).attr("class");
    if(classVal.indexOf("play")>=0){
        classVal = classVal.replace("play","pause");
        $(this).attr("class",classVal);
        $("#audioPlay")[0].play();
    }else{
        classVal = classVal.replace("pause","play");
        $(this).attr("class",classVal);
        $("#audioPlay")[0].pause();
    }
});
//静音键
$("#mute").click(function(){
    var classVal = $(this).attr("class");
    if(classVal.indexOf("up")>=0){
        classVal = classVal.replace("up","off");
        $(this).attr("class",classVal);
        $("#voiceControl span").css("top","100px");
        $("#audioPlay")[0].muted = true;
        $("#voiceControl span").attr("title",0);
    }else{
        classVal = classVal.replace("off","up");
        $(this).attr("class",classVal);
        $("#voiceControl span").css("top","0px");
        $("#audioPlay")[0].muted = false;
        $("#voiceControl span").attr("title",100);
        $("#audioPlay")[0].volume = 1;
    }
});
$("#mute").hover(function(){
    $("#voiceWrap").fadeIn(100);
},function(){
    $("#voiceWrap").fadeOut(200);
});
//音量调节
//音量调节出现|消失
$("#voiceWrap").hover(function(){
    $("#voiceWrap").fadeIn(100);
},function(){
    $("#voiceWrap").fadeOut(200);
});
//音量改变 拖动效果
var moveVoice = false;
//起始Y坐标
var voiceY;
$("#voiceControl span").bind("mousedown",function(event){
    moveVoice = true;
    voiceY = parseInt(event.pageY);
});
$("#voiceControl span").bind("mousemove",function(event){
    //激活音量调节控件
    $("#voiceWrap").addClass("voiceWrapActive");
    //改变音量
    if(moveVoice){
        //获取变化后的坐标
        var _y;
        if(parseInt(event.pageY)-voiceY>0){  
            _y = parseInt($(this).css("top"));
            _y++;
        }else{
            _y = parseInt($(this).css("top"));
            _y--;
        }
        if(_y<0){
            _y = 0;
        }else if(_y > 100){
            _y = 100;
        }
        //设置拖动样式
        $(this).css("top",_y+"px");
        _y = 100-_y;
        $(this).attr("title",_y);
        //如果音量为0，则将图标变为静音
        var classVal = $("#mute").attr("class");
        if(_y == 0){
            classVal = classVal.replace("up","off");
            $("#mute").attr("class",classVal);
            $("#audioPlay")[0].muted = true;
        }else{
            classVal = classVal.replace("off","up");
            $("#mute").attr("class",classVal);
            $("#audioPlay")[0].muted = false;
            //设置音效改变
            $("#audioPlay")[0].volume = _y/100;
        }
    }
});
$("#voiceControl span").bind("mouseup mouseout",function(event){
    moveVoice = false;
    //音量调节控件
    $("#voiceWrap").removeClass("voiceWrapActive");
});
//音量改变 点击效果
$("#voiceControl").click(function(event){
    var hy = parseInt($("#voiceWrap").offset().top)+15;
    var ly = parseInt($("#voiceWrap").offset().top)+125;
    var _y = parseInt(event.pageY);//event里有三种clientY,screenY,pageY
    if(_y<=ly){
        _y -= hy;
        if(_y>100){
            _y = 100;
        }
        $("#voiceControl span").css("top",_y+"px");
        _y = 100-_y;
        $("#voiceControl span").attr("title",_y);
        //如果音量为0，则将图标变为静音
        var classVal = $("#mute").attr("class");
        if(_y == 0){
            classVal = classVal.replace("up","off");
            $("#mute").attr("class",classVal);
            $("#audioPlay")[0].muted = true;
        }else{
            classVal = classVal.replace("off","up");
            $("#mute").attr("class",classVal);
            $("#audioPlay")[0].muted = false;
            //设置音效改变
            $("#audioPlay")[0].volume = _y/100;
        }
    }
});
//音量调节激活样式
$("#voiceControl").hover(function(){
    $("#voiceWrap").addClass("voiceWrapActive");
},function(){
    $("#voiceWrap").removeClass("voiceWrapActive");
});
//循环键的操作
$("#reptMusic").click(function(){
    var classVal = $(this).attr("class");
    if(classVal.indexOf("repeat")>0){
        classVal = classVal.replace("repeat","arrow-right");
        $(this).attr("class",classVal);
    }else{
        classVal = classVal.replace("arrow-right","repeat");
        $(this).attr("class",classVal);
    }
});

//展示摸态框
$("#musicAdd").click(function(){
    $("#addModal").css("display","block");
    var divObj = document.createElement("div");
    divObj.setAttribute("class","modal-backdrop fade in");
    document.getElementsByTagName("body")[0].appendChild(divObj);
    if($("#addMusic").val()){
        $("#addMusic").prev("span").text($("#addMusic").val());    
    }
    if($("#addLrc").val()){
        $("#addLrc").prev("span").text($("#addMusic").val());       
    }
    //获取文件
    $("#addMusic").change(function(event){
        $(this).prev("span").text($("#addMusic").val());
        //获取文件路径
    });
    $("#addLrc").change(function(event){
        $(this).prev("span").text($("#addLrc").val());
        //读取歌词文件
    });
});
//添加音乐
$("#sureAdd").click(function(){
    var musicName = $("#addMusic").val();
    var lrcfile = $("#addLrc").val();
    if(!musicName){
        //判断是否有文件，无文件输出危险提示
        if($("#addModal .modal-body").find(".alert").get(0) == undefined){
            $("#addModal .modal-body").append("<div class='alert alert-danger fade in'><button type='button' class='close'>&times;</button>请选择文件</div>");
            $(".close").click(function(){
                $(".alert").alert('close');
            });
        }
    }else{
        //有文件
        //歌曲文件
        var fileObj;
        var musicSuffix = musicName.slice(musicName.indexOf("."));
        if(musicSuffix != ".mp3"){
            if($("#addModal .modal-body").find(".alert").get(0) == undefined){
                $("#addModal .modal-body").append("<div class='alert alert-warning fade in'><button type='button' class='close'>&times;</button>文件格式不正确，请添加mp3格式文件</div>");
                $(".close").click(function(){
                    $(".alert").alert('close');
                });
            }
        }
        if(lrcfile){
            //歌词文件存在
            var lrcSuffix = lrcfile.slice(lrcfile.indexOf("."));
            if(lrcSuffix != ".lrc"){
                if($("#addModal .modal-body").find(".alert").get(0) == undefined){
                    $("#addModal .modal-body").append("<div class='alert alert-danger fade in'><button type='button' class='close'>&times;</button>文件格式不正确，请添加lrc格式文件</div>");
                    $(".close").click(function(){
                        $(".alert").alert('close');
                    });
                }
            }
        }
        if(!$("#addModal").find(".alert")[0]){
            $("#fileForm").submit()[0];
        }
    }
});
function closeModal(){
    $("#addModal").css("display","none");
    $(document).find(".modal-backdrop").remove();
    $("#addMusic").val("");
    $("#addLrc").val("");
}
$("#closeAdd").click(closeModal);
$(".close").click(closeModal);
//删除音乐
$("#musicDele").click(function(){
    var activeLiIndx = getActiveMusic();
    if(activeLiIndx<0){
        alert("请选择要删除的音乐");
    }else{
        var musicID = musicObjs[activeLiIndx].musicid;
        $.post("deleMusic.php",{"musicid":musicID},function(data){
            if(data == "删除成功")
            {
                alert(data);    
            }else{
                alert("删除失败");
            }
            window.location.reload();
        });
    }
});