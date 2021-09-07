<template>
  <footer class="play" :class="{ playing: playing }">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <keep-alive>
        <PlayPage
          v-if="showPlayPage"
          @toggle-show-play-page="showPlayPage = $event"
          @toggle-show-play-list="showPlayList = $event"
          @toggle-playing-state="$emit('toggle-playing-state')"
          @last-song="$emit('last-song')"
          @next-song="$emit('next-song')"
          :currentSong="currentSong"
          :playing="playing"
          :currentTime="currentTime"
          :duration="duration"
          :playbackMode="playbackMode"
          :playBack="playBack"
          @playback-mode="$emit('playback-mode')"
          @play-back="$emit('play-back')"
          @current-time-change="$emit('current-time-change', $event)"
        />
      </keep-alive>
    </transition>

    <PlayBar
      v-show="!showPlayPage"
      :currentSong="currentSong"
      :playing="playing"
      :currentTime="currentTime"
      :duration="duration"
      :currentPlayList="currentPlayList"
      @last-song="$emit('last-song')"
      @next-song="$emit('next-song')"
      @toggle-playing-state="$emit('toggle-playing-state')"
      @toggle-show-play-list="showPlayList = $event"
      @toggle-show-play-page="showPlayPage = $event"
    />

    <PlayList
      v-if="showPlayList"
      :currentSong="currentSong"
      :currentPlayList="currentPlayList"
      :playing="playing"
      @toggle-show-play-list="showPlayList = $event"
      @change-current-song="$emit('change-current-song', $event)"
    />
  </footer>
</template>

<script>
import PlayBar from "@/components/PlayBar.vue";
import PlayPage from "@/components/PlayPage.vue";
import PlayList from "@/components/PlayList.vue";
export default {
  components: {
    PlayBar,
    PlayPage,
    PlayList,
  },
  props: {
    currentSong: Object,
    playing: Boolean,
    currentTime: Number,
    duration: Number,
    currentPlayList: Array,
    playbackMode:Boolean,
    playBack:Boolean,
  },
  data: function () {
    return {
      showPlayList: false,
      showPlayPage: false,
    };
  },
};
</script>

<style lang="less">
.animate__animated {
  animation-direction: 0.3s;
}
</style>