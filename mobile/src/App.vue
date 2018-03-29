<template>
  <div id="app">
    <router-view/>
    <footer>
      <span class="home active">
        热门
      </span>
      <span class="new">
        最新
      </span>
      <span class="special">
        专题
      </span>
      <span class="center">
        我的
      </span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">

footer {
  background: #fff;
  height: 2.2rem;
  line-height: 2.2rem;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  box-shadow: 0 -2px 6px rgba($color: #000000, $alpha: 0.05);
  span {
    height: 2.2rem;
    width: 25%;
    float: left;
    padding-top: 0.5rem;
    text-align: center;
    font-size: 0.6rem;
    color: #999;
    &.active {
      color: $mainSubColor;
    }
    &.home {
      background: url(#{$url}hot.png) no-repeat center 0.2rem;
      background-size: 20% auto;
    }
    &.home.active {
      background: url(#{$url}hot-active.png) no-repeat center 0.2rem;
      background-size: 20% auto;
    }
    &.new {
      background: url(#{$url}newest.png) no-repeat center 0.2rem;
      background-size: 20% auto;
    }
    &.new.active {
      background: url(#{$url}newest-active.png) no-repeat center 0.2rem;
      background-size: 20% auto;
    }
    &.special {
      background: url(#{$url}special.png) no-repeat center 0.2rem;
      background-size: 20% auto;
    }
    &.special.active {
      background: url(#{$url}special-active.png) no-repeat center 0.2rem;
      background-size: 20% auto;
    }
    &.center {
      background: url(#{$url}center.png) no-repeat center 0.2rem;
      background-size: 20% auto;
    }
    &.center.active {
      background: url(#{$url}center-active.png) no-repeat center 0.2rem;
      background-size: 20% auto;
    }
  }
}
</style>

