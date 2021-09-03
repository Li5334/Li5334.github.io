<template>
  <section class="play-page">
    <!-- 关闭当前页面 -->
    <div class="dowm" @click="$emit('toggle-show-play-page', false)">
      <i class="fa fa-chevron-down"></i>
    </div>
    <!-- <button @click="$emit('toggle-show-play-page', false)">playpage</button> -->
    <!-- 背景图遮盖层 -->
    <div
      v-if="!currentSong.album"
      class="mask"
      :style="{
        backgroundImage: `url(${
          currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
        }?imageView=1&type=webp&thumbnail=246x0)`,
      }"
    ></div>
    <div
      v-if="currentSong.album"
      class="mask"
      :style="{
        backgroundImage: `url(${
          currentSong.song
            ? currentSong.picUrl
            : currentSong.album.artist.img1v1Url
        }?imageView=1&type=webp&thumbnail=246x0)`,
      }"
    ></div>
    <!-- 图片动画效果 -->
    <section class="imgs" v-if="!playlyric" @click="playlyric = true">
      <img
        class="rocker"
        :class="{ paused: playing }"
        src="https://s3.music.126.net/mobile-new/img/needle-ab.png"
      />
      <section class="imgson" :class="{ playing: playing }">
        <img
          v-if="!currentSong.album"
          class="portrait"
          :src="currentSong.song ? currentSong.picUrl : currentSong.al.picUrl"
        />
        <img
          v-if="currentSong.album"
          class="portrait"
          :src="
            currentSong.song
              ? currentSong.picUrl
              : currentSong.album.artist.img1v1Url
          "
        />
        <img
          class="film"
          src="https://s3.music.126.net/mobile-new/img/disc.png"
        />
      </section>
      <p class="singer">{{ currentSong.name }}</p>
      <p class="song-title">
        <span v-if="!currentSong.album">{{
          currentSong.song
            ? currentSong.song.artists[0].name
            : currentSong.ar[0].name
        }}</span>
        <span v-if="currentSong.album">{{
          currentSong.song
            ? currentSong.song.artists[0].name
            : currentSong.artists[0].name
        }}</span>
      </p>
    </section>
    <PlayLyric
      v-else-if="playlyric"
      @play-lyric="playlyric = false"
      :playlyric="playlyric"
      :currentSong="currentSong"
      :currentTime="currentTime"
    />

    <!-- 音乐功能 -->
    <section class="icon">
      <ProgressBar
        :currentTime="currentTime"
        :duration="duration"
        @current-time-change="$emit('current-time-change', $event)"
      />
      <ul class="icon-son">
        <!-- 模式 -->
        <li><i class="fa fa-exchange"></i></li>
        <!-- 上一首 -->
        <li @click="$emit('last-song')"><i class="fa fa-backward"></i></li>
        <!-- 播放停止 -->
        <li @click.stop="$emit('toggle-playing-state')">
          <i :class="['fa', playing ? 'fa-pause' : 'fa-play']"></i>
        </li>
        <!-- 下一首 -->
        <li @click="$emit('next-song')"><i class="fa fa-forward"></i></li>
        <!-- 歌单列表弹窗 -->
        <li @click="$emit('toggle-show-play-list', true)">
          <i class="fa fa-list"></i>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import ProgressBar from "@/components/ProgressBar.vue";
import PlayLyric from "@/components/PlayLyric.vue";
export default {
  components: {
    ProgressBar,
    PlayLyric,
  },
  props: {
    currentSong: Object,
    playing: Boolean,
    currentTime: Number,
    duration: Number,
  },
  data: function () {
    return {
      playlyric: false,
    };
  },
};
</script>

<style lang="less">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.play-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(66, 64, 63);
  z-index: 6;

  .dowm {
    width: 30px;
    height: 20px;
    text-align: center;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.534);
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-color: #333;
  }

  .mask {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(30px) brightness(0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: scale(1.5);
    transition: all 0.3s;
  }

  .imgs {
    position: relative;
    padding-top: 20vw;
    .rocker {
      width: 75px;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -15px;
      z-index: 2;
      transform-origin: 15px 15px;
      transform: rotate(-20deg);
      transition: all 0.3s;
      &.paused {
        transform: rotate(0deg);
      }
    }
    .imgson {
      width: 247px;
      height: 247px;
      margin: 0 auto;
      position: relative;
      border-radius: 50%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 247px;
        border-radius: 50%;
        &.portrait {
          transform: scale(0.8);
        }
      }
      animation: rotate 8s linear infinite;
      animation-play-state: paused;
      &.playing {
        animation-play-state: running;
      }
    }
    .singer,
    .song-title {
      font-size: 15px;
      margin-top: 10px;
      text-align: center;
      color: white;
    }
    .singer {
      font-size: 18px;
    }
  }

  .icon {
    width: 100vw;
    position: fixed;
    bottom: 30px;
    left: 0;
    ul.icon-son {
      // width: 65vw;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      color: white;
      li {
        width: 50px;
        height: 50px;
        margin: 0 5px;
        line-height: 50px;
        text-align: center;
        // background-color: tomato;
        font-size: 25px;
      }
    }
  }
}
</style>