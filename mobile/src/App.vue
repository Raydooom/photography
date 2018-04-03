<template>
  <div class="main">
    <router-view class="main-page"/>
    <footer>
      <router-link class="home" to="/home">
        热门
      </router-link>
      <router-link class="new" to="/newest">
        最新
      </router-link>
      <router-link class="special" to="/special">
        专题
      </router-link>
      <router-link class="center" to="/center">
        我的
      </router-link>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "App",
    mounted: function () {
      // console.log(this.$router);
    }
  };
</script>

<style lang="scss">
  .app-view {
    background: #fff;
    min-height: 100%;
    border-radius: 0.6rem 0.6rem 0 0;
    overflow: hidden;
  }

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

    a {
      height: 2.2rem;
      width: 25%;
      float: left;
      padding-top: 0.6rem;
      text-align: center;
      font-size: 0.6rem;
      color: nth($fontColor, 2);
      &.router-link-active {
        color: nth($mainColor, 1);
      }
      &.home {
        background: url(#{$url}hot.png) no-repeat center top;
        background-size: 30% auto;
      }
      &.home.router-link-active {
        background: url(#{$url}hot-active.png) no-repeat center top;
        background-size: 30% auto;
      }
      &.new {
        background: url(#{$url}newest.png) no-repeat center top;
        background-size: 30% auto;
      }
      &.new.router-link-active {
        background: url(#{$url}newest-active.png) no-repeat center top;
        background-size: 30% auto;
      }
      &.special {
        background: url(#{$url}special.png) no-repeat center top;
        background-size: 30% auto;
      }
      &.special.router-link-active {
        background: url(#{$url}special-active.png) no-repeat center top;
        background-size: 30% auto;
      }
      &.center {
        background: url(#{$url}center.png) no-repeat center top;
        background-size: 30% auto;
      }
      &.center.router-link-active {
        background: url(#{$url}center-active.png) no-repeat center top;
        background-size: 30% auto;
      }
    }
  }
</style>

