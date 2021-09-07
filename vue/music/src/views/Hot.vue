<template>
  <div class="hot">
    <div class="bkimg">
      <div class="hotmusic"></div>
      <p>更新日期：{{getMonth}}月{{getDate}}日</p>
    </div>

    <ul>
      <SongListItem
        v-for="(item, index) in HotSongList"
        :key="item.id"
        :item="item"
        :currentSongId="currentSongId"
        :playing="playing"
        @change-current-song="
          $emit('change-current-song', item);
          $emit('change-current-play-list',HotSongList);
        "
        :class="{ lt3: index < 3 }"
        >{{ index + 1 }}</SongListItem
      >
    </ul>
  </div>
</template>

<script>
import SongListItem from "@/components/SongListItem.vue";

export default {
  components: {
    SongListItem,
  },
  data:function(){
    return {
      HotSongList:[],
      getMonth:0,
      getDate:0,
    }
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  created: function () {
    // 创建完成后发起Ajax请求 这里最早可以访问this
    // 热歌榜数据
    this.axios
      .get("http://apis.netstart.cn/music/playlist/detail?id=3778678")
      .then((res) => {
        // console.log(res.data.playlist.tracks);
        let arr = res.data.playlist.tracks;
        this.HotSongList = arr.slice(0,20);
        var month = new Date(res.data.playlist.trackNumberUpdateTime).getMonth()+1;
        var dates = new Date(res.data.playlist.trackNumberUpdateTime).getDate();
        this.getMonth = month.toString().padStart(2, "0");
        this.getDate = dates.toString().padStart(2, "0");
      });
  },
};
</script>

<style lang="less" scoped>
.hot {
  padding-top: 130px;
  .bkimg {
    width: 100vw;
    height: 140px;
    padding-left: 15px;
    background-image: url("https://s3.music.126.net/mobile-new/img/hot_music_bg_3x.jpg?2bfefd3ba37eaffbd66b7d108b9de26a=");
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 0;
    }
    .hotmusic {
      width: 142px;
      height: 67px;
      background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
      background-size: 166px 97px;
      background-position: -23px -30px;
      z-index: 1;
    }
    p {
      margin-top: 10px;
      font-size: 10px;
      color: white;
    }
  }
}
</style>