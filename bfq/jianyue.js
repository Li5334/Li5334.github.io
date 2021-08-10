var audio = document.querySelector("audio");
var annius = document.querySelector(".annius");
var inp1 = document.querySelector(".jinduqiao input");
var x = document.querySelector(".jinduqiao .range .x");
var dot = document.querySelector(".jinduqiao .range .dot");
var musicname = document.querySelector(".musicname");
var shijian = document.querySelector(".shijian");
var imgs = document.querySelector(".imgs");
// console.log(x);
// 歌单按钮
var lie = document.querySelector(".lie");
var ul = document.querySelector(".liebiao ul");
var li = document.querySelectorAll(".liebiao ul li");

// 音量显示按钮调节
var yinlian = document.querySelector(".bi-volume-up-fill");
var inp2 = document.querySelector(".mian input");

// 上一首
var shan = document.querySelector(".bi-skip-start-fill");
// 下一首
var xia = document.querySelector(".bi-skip-end-fill");

// box-shadow: inset 5px 5px 10px #cee3f2, inset -5px -5px 10px #faffff;
// 歌单列表点击事件
var sum = 1;
lie.onclick = function () {
    sum++;
    if (sum % 2 == 0) {
        lie.style.boxShadow = "inset 5px 5px 10px #cee3f2, inset -5px -5px 10px #faffff";
        ul.style.display = "block";
        li.forEach(function (item) {
            item.classList.add("onopen");
        });

    } else {
        lie.style.boxShadow = "5px 5px 10px #cee3f2, -5px -5px 10px #faffff";
        ul.style.display = "none";
        li.forEach(function (item) {
            item.classList.remove("onopen");
        });
    }

    if (sum > 10) {
        sum = 1;
    }

}

function transTime(value) {
    var time = "";
    var h = parseInt(value / 3600);
    value %= 3600;
    var m = parseInt(value / 60);
    var s = parseInt(value % 60);
    if (h > 0) {
        time = formatTime(h + ":" + m + ":" + s);
    } else {
        time = formatTime(m + ":" + s);
    }

    return time;
}

function formatTime(value) {
    var time = "";
    var s = value.split(':');
    var i = 0;
    for (; i < s.length - 1; i++) {
        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
        time += ":";
    }
    time += s[i].length == 1 ? ("0" + s[i]) : s[i];

    return time;
}

// 开始播放
audio.onplay = function () {
    if (annius.innerHTML == '<i class="bi bi-play-fill"></i>') {
        annius.innerHTML = '<i class="bi bi-pause-fill"></i>';

    }
    imgs.style.animationPlayState = "running";
    // console.log(audio.volume);
}

// 暂停播放
audio.onpause = function () {
    if (annius.innerHTML == '<i class="bi bi-pause-fill"></i>') {
        annius.innerHTML = '<i class="bi bi-play-fill"></i>';

    }
    imgs.style.animationPlayState = "paused";
    // audio.loop();
}

// 点击按钮播放音乐
// var num = 1;
annius.onclick = function () {
    // num++;
    if (annius.innerHTML == '<i class="bi bi-play-fill"></i>') {
        annius.innerHTML = '<i class="bi bi-pause-fill"></i>';
        audio.play();
    }
    else if (annius.innerHTML == '<i class="bi bi-pause-fill"></i>') {
        annius.innerHTML = '<i class="bi bi-play-fill"></i>';
        audio.pause();
    }
}

// 调节歌曲播放进度
var toing = false;
// audio.onloadedmetadata = function (e) {
//     inp1.max = audio.duration;
// };

audio.ontimeupdate = function (e) {
    // inp1.value = audio.currentTime;
    if (!toing) {
        var v = (audio.currentTime / audio.duration) * 100;
        inp1.value = v;
        inp2.value = audio.volume;
        x.style.width = v + "%";
        dot.style.left = (v - 2) + "%";
        shijian.firstElementChild.innerHTML = transTime(audio.currentTime);
    }
}

inp1.oninput = function (e) {
    // console.log(e.target.value);
    var v = e.target.value;
    x.style.width = v + "%";
    dot.style.left = (v - 1) + "%";
    audio.currentTime = this.value;
    // shijian.firstElementChild.innerHTML = transTime(audio.currentTime);
    toing = true;
}
inp1.onchange = function (e) {
    var v = e.target.value;
    audio.currentTime = (v / 100) * audio.duration;
    toing = false;
};

var arr1 = [
    "http://api.kele8.cn/agent/http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_51684799&response=res&type=convert_url&",
    "http://api.kele8.cn/agent/http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_140262235&response=res&type=convert_url&",
    "http://api.kele8.cn/agent/http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_7095195&response=res&type=convert_url&",
    "http://api.kele8.cn/agent/http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_564085&response=res&type=convert_url&",
    "http://api.kele8.cn/agent/http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_21763850&response=res&type=convert_url&"];
var arr2 = ["01:40", "04:02", "05:13", "04:48", "04:17"];

var num3 = 0;
// 点击歌单换歌
li.forEach(function (item, index) {
    item.onclick = function () {
        num3 = index;
        audio.src = arr1[index];
        shijian.lastElementChild.innerHTML = arr2[index];
        imgs.src = `./img/${index}.webp`;
        musicname.firstElementChild.innerHTML = this.firstElementChild.innerHTML;
        musicname.lastElementChild.innerHTML = this.lastElementChild.innerHTML;
        audio.play();
    }
});

// 点击音量显示调节
var num2 = 1;
yinlian.onclick = function () {
    // 设置奇数偶数判断
    if (num2 % 2 == 1) {
        inp2.style.display = "block";
    } else {
        inp2.style.display = "none";
    }
    num2++;
    if (num2 > 20) {
        num2 = 1;
    }
}

// 设置音量数值等于input2的拖动值
inp2.oninput = function () {
    audio.volume = inp2.value;
}

// 上一首
shan.onclick = function () {
    // console.log(num3);
    num3 = (num3 - 1) % 5;
    if (num3 < 0) {
        num3 = 0;
    }
    audio.src = arr1[num3];
    shijian.lastElementChild.innerHTML = arr2[num3];
    imgs.src = `./img/${num3}.webp`;
    musicname.firstElementChild.innerHTML = li[num3].firstElementChild.innerHTML;
    musicname.lastElementChild.innerHTML = li[num3].lastElementChild.innerHTML;
    audio.play();
}

// 下一首
xia.onclick = function () {
    num3 = (num3 + 1) % 5;
    audio.src = arr1[num3];
    shijian.lastElementChild.innerHTML = arr2[num3];
    imgs.src = `./img/${num3}.webp`;
    musicname.firstElementChild.innerHTML = li[num3].firstElementChild.innerHTML;
    musicname.lastElementChild.innerHTML = li[num3].lastElementChild.innerHTML;
    audio.play();
}