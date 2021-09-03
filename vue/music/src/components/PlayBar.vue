<template>
  <section
    class="playbar"
    :class="{ playing: playing }"
    @click="$emit('toggle-show-play-page', true)"
  >
    <img
      v-if="!currentSong.album"
      :src="`${
        currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
      }?imageView=1&type=webp&thumbnail=80x0`"
    />
    <img
      v-if="currentSong.album"
      :src="`${
        currentSong.song ? currentSong.picUrl : currentSong.album.artist.img1v1Url
      }?imageView=1&type=webp&thumbnail=80x0`"
    />
    <h3>
      {{ currentSong.name }} -
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
    </h3>
    <div class="progress" @click.stop="$emit('toggle-playing-state')">
      <canvas width="40" height="40" ref="canvas"></canvas>
      <div class="icon" :class="[playing ? 'pause' : 'play']"></div>
    </div>
    <!-- <button>列表</button> -->
    <div class="tubiao" @click.stop="$emit('toggle-show-play-list', true)">
      <svg
        t="1629944316231"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="13558"
        width="30"
        height="30"
      >
        <path
          d="M887.210667 149.845333a24.746667 24.746667 0 0 1 30.122666 24.021334v110.08a24.789333 24.789333 0 0 1-20.138666 24.192l-161.877334 32.298666a24.405333 24.405333 0 0 0-19.797333 23.68v392.405334h-0.512a117.76 117.76 0 0 1-92.202667 108.8l-32.170666 7.253333c-50.218667 11.434667-98.261333-25.984-97.92-76.629333 0.170667-37.12 29.269333-68.053333 66.133333-76.501334l61.226667-14.08c24.362667-5.632 41.472-26.837333 41.472-51.2V219.946667c0-14.592 10.496-27.008 25.045333-29.994667zM376.917333 702.890667v76.373333H106.666667v-76.373333h270.208z m231.594667-171.818667v76.373333H106.666667v-76.373333h501.845333z m0-171.776v76.373333H106.666667V359.253333h501.845333z m0-171.776v76.373333H106.666667v-76.373333h501.845333z"
          p-id="13559"
        ></path>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currentSong: Object,
    playing: Boolean,
    currentTime: Number,
    duration: Number,
    currentPlayList: Array,
  },
  mounted: function () {
    // console.log(this.$refs.canvas);
  },
  computed: {
    percentage: function () {
      return this.currentTime / this.duration;
    },
  },
  watch: {
    percentage: function (n) {
      var context = this.$refs.canvas.getContext("2d");
      context.clearRect(0, 0, 40, 40);

      context.beginPath();
      context.arc(
        20,
        20,
        18,
        (Math.PI / 180) * (0 - 90),
        (Math.PI / 180) * (360 * n - 90)
      );
      context.strokeStyle = "#d43c33";
      context.lineWidth = 2;
      context.stroke();

      context.beginPath();
      context.arc(
        20,
        20,
        18,
        (Math.PI / 180) * (360 * n - 90),
        (Math.PI / 180) * (360 - 90)
      );
      context.strokeStyle = "gray";
      context.lineWidth = 2;
      context.stroke();
    },
  },
};
</script>

<style lang="less" scoped>
.animate__animated {
  animation-direction: 0.3s;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.playbar {
  width: 100%;
  height: 50px;
  // background-color: white;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  padding: 0 12px;

  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    animation: rotate 8s linear infinite;
    animation-play-state: paused;
  }
  h3 {
    flex: 1;
    padding: 0 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      color: rgb(151, 151, 151);
      font-size: 10px;
    }
  }
  .progress {
    width: 30px;
    height: 30px;
    position: relative;
    top: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    canvas {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .icon {
      width: 12px;
      height: 12px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &.play {
        // background: lightcoral;
        border-top: 6px solid transparent;
        // border-right: 0px solid rgb(0, 132, 255);
        border-bottom: 6px solid transparent;
        border-left: 10px solid rgb(0, 0, 0);
        transform: translateX(3px);
      }
      &.pause {
        // background: lightblue;
        &::before,
        &::after {
          content: "";
          display: block;
          height: 80%;
          width: 20%;
          background: black;
        }
      }
    }
  }
  .tubiao {
    margin-left: 10px;
    line-height: 10px;
  }
}
&.playing {
  img {
    animation-play-state: running;
  }
}
</style>