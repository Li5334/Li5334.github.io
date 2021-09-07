<template>
  <div id="app">
    <HeadIcon v-if="$route.meta.showNavBar" class="headicon" />
    <ul id="nav" v-if="$route.meta.showNavBar">
      <li><router-link to="/">推荐音乐</router-link></li>
      <li><router-link to="/hot">热歌榜</router-link></li>
      <li><router-link to="/search">搜索</router-link></li>
    </ul>
    <section class="routes" :class="{ homehight: showhight }">
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__slideInRight"
        leave-active-class="animate__animated animate__slideOutLeft"
      >
        <!-- <keep-alive> -->
        <router-view
          @change-current-song="changeCurrentSong"
          @change-current-play-list="changeCurrentPlayList"
          @change-current-add-song="changeCurrentAddSong"
          :currentSongId="currentSong ? currentSong.id : null"
          :playing="playing"
          style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow-y: auto;
          "
          :class="{ homehight: showhight }"
        />
        <!-- </keep-alive> -->
      </transition>
    </section>
    <!-- controls显示audio autoplay自动播放 -->
    <audio
      ref="audio"
      :src="currentSongUrl"
      controls
      autoplay
      @playing="playing = true"
      @pause="playing = false"
      @timeupdate="timeupdate"
      @durationchange="durationchange"
    ></audio>

    <Play
      v-if="currentSong"
      :currentSong="currentSong"
      :playing="playing"
      :currentTime="currentTime"
      :duration="duration"
      :currentPlayList="currentPlayList"
      :playbackMode="playbackMode"
      :playBack="playBack"
      @toggle-playing-state="togglePlayingState"
      @change-current-song="changeCurrentSong"
      @last-song="lastSong"
      @next-song="nextSong"
      @current-time-change="$refs.audio.currentTime = $event"
      @playback-mode="
        playbackMode = !playbackMode;
        playback = false;
      "
      @play-back="playBack = true"
    ></Play>
  </div>
</template>

<script>
import HeadIcon from "./components/HeadIcon.vue";
import Play from "./components/Play.vue";
export default {
  components: { HeadIcon, Play },
  data: function () {
    return {
      currentSong: null,
      playing: false,
      currentTime: 0,
      duration: 0,
      currentPlayList: [],
      showhight: false,
      playbackMode: false,
      playBack: false,
    };
  },
  computed: {
    currentSongUrl: function () {
      // 判断currentSong是否有数据
      if (this.currentSong) {
        return `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
      } else {
        return null;
      }
    },
  },
  watch: {
    currentTime: function (n) {
      if (n == this.duration && !this.playbackMode && !this.playBack) {
        var index = this.currentPlayList.findIndex((item) => {
          return item.id === this.currentSong.id;
        });
        index++;
        index = index >= this.currentPlayList.length - 1 ? 0 : index;
        index = index <= 0 ? 0 : index;
        this.changeCurrentSong(this.currentPlayList[index]);
      } else if (n == this.duration && this.playbackMode && !this.playBack) {
        // this.currentSong = {};
        // var inde = this.currentPlayList.findIndex((item) => {
        //   return item.id === this.currentSong.id;
        // });
        // this.currentSong = this.currentPlayList[inde];
        // this.changeCurrentSong(this.currentPlayList[inde]);
        this.$refs.audio.play();
      } else if (n == this.duration && this.playBack) {
        var num = this.currentPlayList.length;
        var i = this.getRandomInt(0, num);
        this.changeCurrentSong(this.currentPlayList[i]);
      }
    },
  },
  methods: {
    // 通过 SongListItem传给Home再传到这里获得数据
    changeCurrentSong: function (song) {
      this.currentSong = song;
      this.showhight = true;
    },
    changeCurrentPlayList: function (list) {
      this.currentPlayList = list;
    },
    changeCurrentAddSong: function (v) {
      this.currentPlayList.push(v);
      // this.currentPlayList = [...new Set([...this.currentPlayList])];
    },
    togglePlayingState: function () {
      if (this.playing) {
        // 暂停歌曲
        this.$refs.audio.pause();
      } else {
        // 播放歌曲
        this.$refs.audio.play();
      }
    },
    timeupdate: function (event) {
      this.currentTime = event.target.currentTime;
    },
    durationchange: function (event) {
      this.duration = event.target.duration;
    },
    lastSong: function () {
      
      if (this.playBack) {
        var num = this.currentPlayList.length;
        var i = this.getRandomInt(0, num);
        this.changeCurrentSong(this.currentPlayList[i]);
      } else {// console.log("上一首");
        var index = this.currentPlayList.findIndex((item) => {
          return item.id === this.currentSong.id;
        });
        index--;
        index = index >= this.currentPlayList.length - 1 ? 0 : index;
        index = index <= 0 ? 0 : index;
        this.changeCurrentSong(this.currentPlayList[index]);
      }
    },
    nextSong: function () {
      
      if (this.playBack) {
        var num = this.currentPlayList.length;
        var i = this.getRandomInt(0, num);
        this.changeCurrentSong(this.currentPlayList[i]);
      } else {// console.log("下一首");
        var index = this.currentPlayList.findIndex((item) => {
          return item.id === this.currentSong.id;
        });
        index++;
        index = index >= this.currentPlayList.length - 1 ? 0 : index;
        index = index <= 0 ? 0 : index;
        this.changeCurrentSong(this.currentPlayList[index]);
      }
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
};
</script>

<style lang="less">
.animate__animated {
  animation-direction: 0.01s;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // audio {
  // height: 40px;
  // margin-bottom: 80px;
  // }
  .headicon {
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 5;
  }
}

#nav {
  // padding: 30px;
  width: 100vw;
  display: flex;
  box-shadow: 0 -1px 1px 0px rgb(231, 231, 231) inset;
  position: fixed;
  top: 84px;
  z-index: 5;
  background-color: white;
  li {
    flex: 1;
    text-align: center;
    a {
      display: inline-block;
      line-height: 40px;
      font-size: 15px;
      padding: 0 5px;
      color: #000000;
      text-decoration: none;
      &.router-link-exact-active {
        color: #dd001b;
        border-bottom: 2px solid #dd001b;
      }
    }
  }
}

.routes {
  position: relative;
  top: 0;
  left: 0;
  // height: calc(100vh - 42px);
  height: 100vh;
  overflow-y: auto;
}

.homehight {
  // height: calc(100% -200px);
  padding-bottom: 30px;
}
</style>
