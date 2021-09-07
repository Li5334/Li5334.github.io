<template>
  <li
    v-if="item.song"
    class="listitem"
    @click="$emit('change-current-song', item)"
  >
    <div class="left">
      <div class="songmusic">
        {{ item.name }}
        <span v-for="n in item.song.alias" :key="n">{{ n }}</span>
      </div>
      <div class="songname">
        <em v-if="item.song.exclusive"></em>
        <i
          class="artist"
          v-for="artist in item.song.artists"
          :key="artist.id"
          >{{ artist.name }}</i
        >
        <span>{{ item.song.album.name }}</span>
      </div>
    </div>
    <div class="right-icon">
      <div class="play" :class="{ current: currentSongId === item.id, playing:playing }">
        <i></i><i></i><i></i>
      </div>
    </div>
  </li>
  <li
    v-else-if="item.ar"
    class="listitem"
    @click="$emit('change-current-song', item)"
  >
    <!-- <div class="nam"><slot></slot></div> -->
    <div class="left">
      <div class="songmusic">
        {{ item.name }}
        <span v-for="n in item.alia" :key="n">{{ n }}</span>
      </div>
      <div class="songname">
        <em v-if="item.no == 0 || item.no == 1"></em>
        <i class="artist" v-for="artist in item.ar" :key="artist.id">{{
          artist.name
        }}</i>
        <span>{{ item.al.name }}</span>
      </div>
    </div>
    <div class="right-icon">
      <div class="play" :class="{ current: currentSongId === item.id, playing:playing }">
        <i></i><i></i><i></i>
      </div>
    </div>
  </li>
</template>

<script>
export default {
props: {
    item: {
      type: Object,
      required: true,
    },
    currentSongId: {
      type: Number,
    },
    playing:Boolean,
  },
}
</script>

<style lang="less" scoped>
.listitem {
  display: flex;
  margin-left: 12px;
  padding: 5px 10px 5px 0;
  border-bottom: 1px solid rgb(241, 241, 241);
  align-items: center;
  .left {
    flex: 1;
    .songmusic {
      font-size: 17px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: #888;
        &::before {
          content: "(";
        }
        &::after {
          content: ")";
        }
      }
    }
    .songname {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      color: #888;
      line-height: 1.8;
      em {
        display: inline-block;
        width: 12px;
        height: 8px;
        background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png");
        background-repeat: no-repeat;
        background-size: 166px auto;
        margin-right: 4px;
      }
      i.artist {
        font-style: normal;
        &:after {
          content: "/";
          margin: 0 3px;
        }
        &:last-of-type {
          //   background: red;
          &::after {
            content: "-";
            margin: 0 5px;
          }
        }
      }
    }
  }
  .right-icon {
    width: 22px;
    height: 22px;
    margin-left: 12px;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .play {
      width: 100%;
      height: 100%;
      background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png");
      background-repeat: no-repeat;
      background-size: 166px auto;
      background-position: -24px 0;
    }
    .current {
      width: 15px;
      height: 15px;
      // background: red;
      background: none;
      display: flex;
      justify-content: space-around;
      i {
        width: 3px;
        height: 100%;
        // display: inline-block;
        background: #d43c33;
        transform-origin: bottom;
        animation: playing 0.9s linear 0s infinite alternate;
        animation-play-state: paused;
        &:nth-child(1) {
          animation-delay: -0.6s;
        }
        &:nth-child(2) {
          animation-delay: -0.3s;
        }
      }
      &.playing {
        i {
          animation-play-state: running;
        }
      }
    }
  }
}
@keyframes playing {
  from {
    // height: 20%;
    transform: scaleY(0.2);
  }
  to {
    // height: 100%;
    transform: scaleY(1);
  }
}
</style>