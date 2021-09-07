<template>
  <div class="lyric" @click="$emit('play-lyric')">
    <div class="lyric-div">
      <ul
        class="lyric-ul"
        ref="lyricul"
        :style="{ marginTop: -scrollH + 'px' }"
        v-if="lyric"
      >
        <li class="lyric-li" v-for="(lyr, index) in parsedLyric" :key="index">
          <span
            :style="{
              animationDuration: parsedLyric[index + 1]
                ? parsedLyric[index + 1].time - lyr.time - 0.55 + 's'
                : '3s',
            }"
            :class="{
              active: currentLyricIndex === index,
              playing: playing && currentLyricIndex === index,
            }"
            >{{ lyr.text }}</span
          >
        </li>
      </ul>
      <div v-else class="chunmusic">纯音乐，请欣赏</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: Number,
    playlyric: Boolean,
    currentSong: Object,
    playing: Boolean,
  },
  data: function () {
    return {
      lyric: null,
      lisH: [],
      scrollH: 0,
    };
  },
  created: function () {
    this.getLyric(this.currentSong.id);
  },
  watch: {
    "currentSong.id": function (id) {
      this.getLyric(id);
    },
    currentLyricIndex: function (index) {
      // 当前歌词前的高度
      var h = this.lisH.slice(0, index).reduce(function (total, item) {
        return total + item;
      }, 0);
      h = h > 200 ? h - 200 : 0;
      // h = h > 1928 ? 1928 : h;
      this.scrollH = h;
    },
    parsedLyric: function () {
      this.$nextTick(() => {
        // console.log("nextTick", this.$refs.offsetHeight);
        var lis = this.$refs.lyricul.querySelectorAll("li");
        this.lisH = [...lis].map((item) => item.offsetHeight);
      });
    },
  },
  methods: {
    getLyric: function (id) {
      this.axios
        .get("http://apis.netstart.cn/music/lyric", {
          params: {
            id,
          },
        })
        .then((res) => {
          // console.log(this,res);
          if (res.data.lrc) {
            this.lyric = res.data.lrc.lyric;
          }else {
            return;
          }
        });
    },
  },
  computed: {
    parsedLyric: function () {
      if (this.lyric) {
        // console.log(this.$refs.lyricul.offsetHeight);
        return this.lyric
          .split("\n")
          .filter((s) => s)
          .map((s) => {
            var text = s.replace(/^\[\d{2}:\d{2}\.\d{2,3}\]/i, "");
            var timeStr = s.replace(text, "").replace(/(^\[|\]$)/g, "");
            var timeArr = timeStr.split(":").map((item) => Number(item));
            var time = timeArr[0] * 60 + timeArr[1];
            return { text, time };
          });
      } else {
        return [];
      }
    },
    currentLyricIndex: function () {
      var i = this.parsedLyric.findIndex(
        (item) => item.time > this.currentTime
      );
      var currentLyricIndex = i !== -1 ? i - 1 : this.parsedLyric.length - 1;
      return currentLyricIndex;
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes lyric {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: -100%;
  }
}
.lyric {
  width: 100vw;
  height: 65vh;
  // background-color: tomato;
  text-align: center;
  overflow: hidden;
  // transition: all 0.5s;
  .lyric-div {
    width: 80vw;
    height: 100%;
    margin: 0 auto;
    overflow-y: auto;
    .lyric-ul {
      width: 80vw;
      height: 100%;
      // background-color: rgba(223, 19, 19, 0.3);
      margin: 0 auto;
      transition: all 0.5s;
      // overflow-y: auto;
      li {
        line-height: 1.8;
        color: #ff9a44;
        span {
          &.active {
            animation-name: lyric;
            animation-timing-function: linear;
            animation-duration: 3s;
            background-image: linear-gradient(-20deg, #13d7f1 0%, #ff9a44 100%);
            background-size: 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation-play-state: paused;
            &.playing {
              animation-play-state: running;
            }
          }
        }
      }
    }
    .chunmusic {
      line-height: 65vh;
      font-size: 20px;
      color: white;
    }
  }
}
</style>