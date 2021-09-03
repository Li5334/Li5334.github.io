<template>
  <h3 class="home-title"><slot></slot></h3>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.home-title {
  font-size: 17px;
  border-left: 2px solid #d43c33;
  line-height: 1;
  padding-left: 10px;
  margin: 20px 0;
}
</style>
