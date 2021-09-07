<template>
  <div class="hot" @scroll="scroll">
    <div class="inp">
      <div class="inps">
        <i class="fa fa-search"></i>
        <input
          class="inpson"
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model.trim="value"
          @keyup.enter="value && (searching = true)"
          @focus="inputing = true"
          @blur="inputing = false"
        />
        <i
          @click="
            value = '';
            searching = false;
          "
          ><span class="fa fa-close spanfa" v-if="value"></span
        ></i>
      </div>
    </div>

    <section class="searchhots" v-if="!value && !searching">
      <h3 class="hots-title">热门搜索</h3>

      <ul class="hots-list">
        <li
          class="hots-li"
          v-for="searchitem in searchhots"
          :key="searchitem.first"
          @click="
            searching = true;
            value = searchitem.first;
          "
        >
          {{ searchitem.first }}
        </li>
      </ul>

      <div class="eliminate">
        <span @click="removehistory">清空记录 <i class="fa fa-times"></i></span>
      </div>
      <ul class="hots-ol">
        <li
          class="ol-li"
          v-for="his in history"
          :key="his"
          @click="
            searching = true;
            value = his;
          "
        >
          <i class="fa fa-clock-o"></i>
          <span>{{ his }}</span>
          <i class="fa fa-times" @click.stop="close($event)"></i>
        </li>
      </ul>
    </section>

    <section class="suggests" v-if="value && !searching">
      <h3
        class="hots-title"
        @click="
          searching = true;
          value = value;
        "
      >
        搜索"{{ value }}"
      </h3>

      <ul class="suggests-list">
        <li
          class="suggests-li"
          v-for="(suggestsitem, index) in suggests"
          :key="index"
          @click="
            searching = true;
            value = suggestsitem.keyword;
          "
        >
          <i class="fa fa-search"></i><span>{{ suggestsitem.keyword }}</span>
        </li>
      </ul>
    </section>

    <section class="searchRe" v-if="value && searching">
      <h3 class="hots-title">最佳匹配</h3>

      <ul>
        <SongListItem
          v-for="(searchReitem, index) in searchRe"
          :key="index"
          :item="searchReitem"
          @change-current-song="
            $emit('change-current-song', searchReitem);
            $emit('change-current-play-list', [searchRe[index]]);
          "
          @change-current-add-song="$emit('change-current-add-song', $event)"
          :currentSongId="currentSongId"
          :playing="playing"
        ><i class="fa fa-plus-square"></i></SongListItem>
      </ul>

      <p v-if="!hasMore">全部加载完成</p>
    </section>
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
      searchhots: [],
      value: "",
      suggests: [],
      searching: false,
      searchRe: [],
      inputing: false,
      page: 0,
      hasMore: false,
      history: JSON.parse(window.localStorage.getItem("history")) || [],
      spanValue: "",
    };
  },
  created: function () {
    this.axios.get("http://apis.netstart.cn/music/search/hot").then((res) => {
      // console.log(this,res);
      this.searchhots = res.data.result.hots;
    });
  },
  methods: {
    scroll: function (event) {
      // console.log(event);
      if (this.hasMore) {
        if (
          event.target.offsetHeight + event.target.scrollTop ===
          event.target.scrollHeight
        ) {
          this.getSearch();
        }
      }
    },
    getSearch: function () {
      this.axios
        .get("http://apis.netstart.cn/music/search", {
          params: {
            keywords: this.value,
            limit: 30,
            offset: this.page * 30,
          },
        })
        .then((res) => {
          this.searchRe.push(...res.data.result.songs);
          this.page++;
          this.hasMore = res.data.result.hasMore;
        });
      this.history = [...new Set([...this.history, this.value])];
      window.localStorage.setItem("history", JSON.stringify(this.history));
    },
    close: function (obj) {
      // console.log(obj.currentTarget);
      var toggle = obj.currentTarget;
      toggle.parentNode.parentNode.removeChild(toggle.parentNode);
      // 获取当前点击元素的前一个元素
      // console.log(obj.currentTarget.previousElementSibling.innerHTML);
      var spanValue = obj.currentTarget.previousElementSibling.innerHTML;
      this.spanValue = spanValue;
      // this.history.findIndex((item)=>item = spanValue);
      // console.log(this.history.findIndex((val)=>val = spanValue));
      // this.history = hisval;
    },
    removehistory: function () {
      if(this.history){
        window.localStorage.clear();
        this.history = [];
      }
      
    },
  },
  watch: {
    value: function (n) {
      if (this.inputing) {
        this.searching = false;
      }

      if (n && !this.searching) {
        this.axios
          .get("http://apis.netstart.cn/music/search/suggest", {
            params: {
              keywords: n,
              type: "mobile",
            },
          })
          .then((res) => {
            // console.log(res.data.result.allMatch);
            this.suggests = res.data.result.allMatch;
          });
      } else {
        this.suggests = [];
      }
    },
    searching: function (n) {
      if (n && this.value) {
        this.getSearch();
      } else {
        this.searchRe = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.hot {
  padding-top: 130px;
  .inp {
    padding: 15px 16px;
    box-shadow: 0 -1px 1px 0px rgb(231, 231, 231) inset;
    .inps {
      display: flex;
      .inpson {
        width: 280px;
        height: 30px;
        border: none;
        outline: none;
        background-color: #ebecec;
        &::-webkit-input-placeholder {
          color: rgb(172, 170, 170);
        }
      }
      i {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #ebecec;
        font-size: 9px;
        color: rgb(172, 170, 170);
        &:nth-of-type(1) {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        &:nth-of-type(2) {
          display: flex;
          justify-content: center;
          align-items: center;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
        }
      }
      .spanfa {
        display: block;
        width: 15px;
        height: 15px;
        padding-left: 1px;
        line-height: 11px;
        border: 2px solid rgb(172, 170, 170);
        border-radius: 50%;
      }
    }
  }

  .searchhots {
    padding: 15px 10px 0;
    .hots-title {
      font-size: 12px;
      line-height: 12px;
      color: #666;
    }
    .eliminate {
      padding-right: 3px;
      display: flex;
      justify-content: flex-end;
      span {
        display: inline-block;
        width: 90px;
        height: 20px;
        text-align: center;
        font-size: 15px;
        border-radius: 10px;
        background-color: rgb(214, 211, 206);
        i {
          color: rgb(126, 126, 126);
        }
      }
    }
    .hots-list {
      margin: 10px 0 7px;
      .hots-li {
        display: inline-block;
        height: 32px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 0 14px;
        font-size: 14px;
        line-height: 32px;
        color: #333;
        border: 1px solid #d3d4da;
        border-radius: 60px;
      }
    }
    .hots-ol {
      list-style: none;
      .ol-li {
        height: 45px;
        box-sizing: border-box;
        list-style: none;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(219, 219, 219, 0.61);
        span {
          padding-left: 10px;
          flex: 1;
        }
        i {
          font-size: 18;
          color: rgba(168, 165, 165, 0.61);
          &:nth-of-type(2) {
            text-align: center;
            width: 30px;
          }
        }
      }
    }
  }

  .suggests {
    .hots-title {
      height: 50px;
      margin-left: 10px;
      padding-right: 10px;
      font-size: 15px;
      line-height: 50px;
      color: #507daf;
      box-shadow: 0 -1px 1px 0px rgb(231, 231, 231) inset;
    }
    .suggests-list {
      .suggests-li {
        align-items: center;
        height: 45px;
        padding-left: 10px;
        display: flex;
        align-items: center;
        i {
          color: rgb(177, 177, 177);
          margin-right: 7px;
        }

        span {
          flex: 1;
          display: inline-block;
          height: 45px;
          line-height: 45px;
          font-size: 15px;
          box-shadow: 0 -1px 1px 0px rgb(231, 231, 231) inset;
        }
      }
    }
  }

  .searchRe {
    .hots-title {
      margin-top: 5px;
      margin-left: 14px;
      font-size: 20px;
      color: rgb(223, 81, 37);
    }
    ul {
      li {
        i {
          font-size: 20px;
          color: #f12d2359;
        }
      }
    }
  }
}
</style>