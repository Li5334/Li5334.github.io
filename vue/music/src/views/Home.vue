<template>
  <div class="home">
    <!-- HomeTitle组件,用于标题说明 -->
    <HomeTitle>编辑推荐</HomeTitle>
    <ul class="home-cardlist">
      <!-- CardItem组件,用于推荐音乐的排版 -->
      <CardItem
        v-for="item in personalizeds"
        :key="item.id"
        :item="item"
      ></CardItem>
    </ul>
    <!-- HomeTitle组件,用于标题说明 -->
    <HomeTitle>最新音乐</HomeTitle>

    <ul>
      <!-- SongListItem组件，此处用于最新音乐列表 -->
      <SongListtwo
        v-for="item in newsongs"
        :key="item.id"
        :item="item"
        @change-current-song="
          $emit('change-current-song', $event);
          $emit('change-current-play-list', newsongs);
        "
        :currentSongId="currentSongId"
        :playing="playing"
      ></SongListtwo>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import CardItem from "@/components/CardItem.vue";
import HomeTitle from "@/components/HomeTitle.vue";
import SongListtwo from "@/components/SongListtwo.vue";

export default {
  name: "Home",
  components: {
    CardItem,
    HomeTitle,
    SongListtwo,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  data: function () {
    return {
      personalizeds: [],
      newsongs: [],
    };
  },
  created: function () {
    // 创建完成后发起Ajax请求 这里最早可以访问this
    // 编辑推荐板块数据
    this.axios
      .get("http://apis.netstart.cn/music/personalized?limit=6")
      .then((res) => {
        // console.log(this,res);
        this.personalizeds = res.data.result;
      });

    // 最新音乐板块数据
    this.axios
      .get("http://apis.netstart.cn/music/personalized/newsong")
      .then((res) => {
        // console.log(this,res);
        this.newsongs = res.data.result;
      });
  },
};
</script>

<style  lang="less" scoped>
.home {
  padding-top: 130px;
}
.home-cardlist {
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
}

</style>
