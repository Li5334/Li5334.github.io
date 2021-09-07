<template>
  <div class="progress">
    <div class="progress-son">
      <input
        class="inp"
        type="range"
        :max="duration"
        step="0.5"
        v-model="value"
        @change="progressChange"
        @input="progressInput"
      />
      <span
        class="jingdu"
        :style="{ width: (value / duration) * 100 + '%' }"
      ></span>
    </div>
    <div class="texttime">
      <span>{{ formatTime(currentTime) }}</span>
      <span>{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: Number,
    duration: Number,
  },
  data: function () {
    return {
      value: this.currentTime,
      inputing: false,
    };
  },
  watch: {
    currentTime: function (n) {
      if (!this.inputing) {
        this.value = n;
      }
    },
  },
  methods: {
    formatTime: function (interval) {
      // 向下取整，想等于Math.floor()
      interval |= 0;
      // 获取分的部分
      const minute = (interval / 60) | 0;
      // 获取秒的部分
      const second = interval % 60;
      return `${minute.toString().padStart(2, "0")}:${second
        .toString()
        .padStart(2, "0")}`;
    },
    progressChange: function (event) {
      this.inputing = false;
      // console.log(event);
      this.$emit("current-time-change", event.target.value);
    },
    progressInput: function () {
      this.inputing = true;
    },
  },
};
</script>

<style lang="less">
.progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
  .progress-son {
    width: 80vw;
    height: 4px;
    margin-bottom: 15px;
    position: relative;
    background-color: white;
    border-radius: 10px;
    input {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      z-index: 1;
    }
    .jingdu {
      width: 100%;
      height: 100%;
      // background-color: tomato;
      background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
      position: absolute;
      top: 0;
      border-radius: inherit;
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        display: block;
        margin-right: -5px;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgba(0, 140, 255, 0.616);
        position: absolute;
        top: -3px;
        right: 0;
        border-radius: 50%;
      }
    }
  }
  .texttime {
    width: 80vw;
    color: white;
    display: flex;
    justify-content: space-between;
  }
}
</style>