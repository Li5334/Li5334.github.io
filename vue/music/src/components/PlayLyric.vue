<template>
  <div class="lyric" @click="$emit('play-lyric')">
    <ul class="lyric-ul" ref="lyricul" :style="{ marginTop: -scrollH + 'px' }">
      <li
        class="lyric-li"
        v-for="(lyr, index) in parsedLyric"
        :key="index"
        :class="{ active: currentLyricIndex === index }"
      >
        {{ lyr.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: Number,
    playlyric: Boolean,
    currentSong: Object,
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
    // 'currentSong.id': function (n) {
    //   if (this.playlyric && lyric) {
    //     this.axios
    //       .get("http://apis.netstart.cn/music/lyric",{
    //         params:{
    //           id:
    //         }
    //       })
    //       .then((res) => {
    //         // console.log(this,res);
    //         this.personalizeds = res.data.result;
    //       });
    //   }
    // },
    currentLyricIndex: function (index) {
      // 当前歌词前的高度
      var h = this.lisH.slice(0, index).reduce(function (total, item) {
        return total + item;
      }, 0);
      h = h > 200 ? h - 200 : 0;
      h = h > 1928 ? 1928 : h;
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
          this.lyric = res.data.lrc.lyric;
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
.lyric {
  width: 100vw;
  height: 65vh;
  // background-color: tomato;
  text-align: center;
  overflow: hidden;
  transition: all .5s;
  // .lyric-ul {
  //   .lyric-li {
  //   }
  // }
}
.active {
  color: blanchedalmond;
}
</style>