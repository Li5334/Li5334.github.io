<template>
  <div v-if="detail" class="play-list">
    <!-- <h2>{{ $route.query.id }}</h2> -->
    <div class="heards">
      <div class="heardsfh">
        <router-link to="/"><i class="fa fa-reply"></i></router-link>
      </div>
      <div
        class="mask"
        :style="{ backgroundImage: `url(${coverImgUrl})` }"
      ></div>

      <div class="solo">
        <div class="solocenter">
          <div class="solo-left" v-if="backgroundCoverUrl === null">
            <img
              :src="`${coverImgUrl}?imageView=1&type=webp&thumbnail=126x0`"
            />
            <div class="songsheet">歌单</div>
            <div class="num">
              <img
                style="width: 11px"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+"
              />
              {{ detail.playCount | parseCount }}
            </div>
          </div>
          <div class="solo-right">
            <h2 v-if="backgroundCoverUrl === null">
              {{ detail.name }}
            </h2>
            <h2 class="active" v-if="backgroundCoverUrl !== null">
              {{ detail.name }}
            </h2>
            <p v-if="backgroundCoverUrl !== null">
              {{ detail.updateFrequency }}
            </p>
            <div class="description" v-if="backgroundCoverUrl !== null">
              {{ detail.description }}
            </div>
            <div class="user" v-if="backgroundCoverUrl === null">
              <img
                class="user-img"
                :src="`${creator.avatarUrl}?imageView=1&type=webp&thumbnail=90x0`"
              />
              <span v-if="creator" class="user-name">{{
                creator.nickname
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="explain">歌曲列表</div>
    <ul>
      <SongListItem
        v-for="(item, index) in detail.tracks"
        :key="item.id"
        :item="item"
        :currentSongId="currentSongId"
        :playing="playing"
        @change-current-song="
          $emit('change-current-song', item);
          $emit('change-current-play-list', detail.tracks);
        "
        >{{ index + 1 }}</SongListItem
      >
    </ul>
    <div class="explain">精彩评论</div>
    <div class="explain">最新评论</div>
  </div>
</template>

<script>
import SongListItem from "@/components/SongListItem.vue";

export default {
  components: {
    SongListItem,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  data: function () {
    return {
      detail: null,
      creator: null,
      coverImgUrl: null,
      backgroundCoverUrl: null,
      activatedFlag: false,
    };
  },
  methods: {
    getPlayListDetail: function (id) {
      this.axios
        .get("http://apis.netstart.cn/music/playlist/detail", {
          params: {
            id,
          },
        })
        .then((res) => {
          // console.log(res);
          this.detail = res.data.playlist;
          this.creator = res.data.playlist.creator;
          this.coverImgUrl = res.data.playlist.coverImgUrl;
          this.backgroundCoverUrl = res.data.playlist.backgroundCoverUrl;
        });
    },
  },
  created: function () {
    this.getPlayListDetail(this.$route.query.id);
  },
  // watch: {
  //   "$route.query.id": function (n) {
  //     if (n && this.activatedFlag) {
  //       this.getPlayListDetail(n);
  //     }
      // this.detail = this.getPlayListDetail(n);
      // this.creator = this.getPlayListDetail(n);
      // this.coverImgUrl = this.getPlayListDetail(n);
      // this.backgroundCoverUrl = this.getPlayListDetail(n);
  //   },
  // },
  // activated: function () {
  //   this.activatedFlag = true;
  // },
  // deactivated: function () {
  //   this.activatedFlag = false;
  // },
  filters: {
    parseCount: function (value) {
      // return value + "0";
      if (value > 100000000) {
        return (value / 100000000).toFixed(1) + "亿";
      } else if (value > 10000) {
        return (value / 10000).toFixed(1) + "万";
      } else {
        return value;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.play-list {
  .heards {
    height: 186px;
    padding: 30px 10px 30px 15px;
    overflow: hidden;
    position: relative;
    // filter: blur(20px);
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
    .heardsfh {
      position: absolute;
      top: 0;
      left: 10px;
      z-index: 6;
      font-size: 20px;
      i {
        color: rgb(255, 255, 255);
      }
    }
    .mask {
      width: 100%;
      height: 186px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(1.5);
      filter: blur(20px);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .solo {
      position: relative;
      top: 0;
      left: 0;
      z-index: 2;
      .solocenter {
        display: flex;
        // padding-left: 15px;
        .solo-left {
          width: 126px;
          height: 126px;
          position: relative;
          .songsheet {
            width: 40px;
            height: 17px;
            color: #fff;
            font-size: 9px;
            text-align: center;
            line-height: 17px;
            background-color: rgba(217, 48, 48, 0.8);
            border-top-right-radius: 17px;
            border-bottom-right-radius: 17px;
            position: absolute;
            top: 8%;
            left: 0;
          }
          .num {
            // width: 60px;
            // height: 30px;
            font-size: 12px;
            color: white;
            position: absolute;
            top: 1px;
            right: 1px;
          }
        }
        .solo-right {
          width: 193px;
          padding-top: 3px;
          margin-left: 16px;
          h2 {
            height: 45px;
            font-size: 17px;
            line-height: 1.3;
            color: #fefefe;
          }
          p {
            padding-left: 3px;
            padding-right: 3px;
            margin-top: 10px;
            display: inline-block;
            background-color: hsla(0, 0%, 100%, 0.2);
            font-size: 10px;
            color: hsla(0, 0%, 100%, 0.6);
          }
          .description {
            width: 200px;
            margin-top: 20px;
            font-size: 14px;
            color: hsla(0, 0%, 100%, 0.8);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .user {
            display: flex;
            align-items: center;
            .user-img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
            .user-name {
              display: inline-block;
              width: 120px;
              margin-left: 10px;
              font-size: 14px;
              color: rgb(240, 239, 239);
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .explain {
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
  }
}
.active {
  width: 320px;
  height: 45px;
  font-size: 20px;
  line-height: 1.3;
  color: #fefefe;
}
</style>