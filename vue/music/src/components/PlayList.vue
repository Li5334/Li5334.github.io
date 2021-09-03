<template>
  <section class="play-list">
    <div
      class="mask animate__animated animate__fadeIn"
      @click.stop="$emit('toggle-show-play-list', false)"
    ></div>
    <div class="swiper animate__animated animate__slideInUp">
      <div class="card">
        <ul class="ullist">
          <SongListItem
            v-for="(item, index) in currentPlayList"
            :key="item.id"
            :currentSongId="currentSong.id"
            :playing="playing"
            :item="item"
            @change-current-song="$emit('change-current-song', $event)"
            >{{ (index + 1).toString().padStart(2, "0") }}</SongListItem
          >
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import SongListItem from "@/components/SongListItem.vue";
export default {
  components: { SongListItem },
  props: {
    showPlayList: Boolean,
    currentPlayList: Array,
    currentSong: Object,
    playing: Boolean,
  },
};
</script>

<style lang="less">
.play-list {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;
  
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }
  .swiper {
    width: 100%;
    height: 60vh;
    padding: 0 10px;
    // background-color: rgba(205, 92, 92, 0.247);
    position: absolute;
    bottom: 40px;
    left: 0;
    .card {
      height: 100%;
      background-color: white;
      border-radius: 10px;
      ul.ullist {
        height: 100%;
        padding: 10px 0;
        overflow: auto;
      }
    }
  }
}
</style>