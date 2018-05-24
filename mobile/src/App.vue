<template>
  <div class="main">
    <keep-alive>
      <router-view class="main-page" />
    </keep-alive>
    <footer>
      <router-link class="home" to="/home">
        热门
      </router-link>
      <router-link class="new" to="/newest">
        最新
      </router-link>
      <router-link class="publish" to="/publish">
        <span></span>
        发布
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
  mounted: function() {
    // console.log(this.$router);
  }
};
</script>

<style lang="scss">
.main {
  padding-bottom: 2.2rem;
}

footer {
  background: #fff;
  height: 2.2rem;
  line-height: 2.2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  box-shadow: 0 -2px 6px rgba($color: #000000, $alpha: 0.05);

  a {
    height: 2.2rem;
    width: 20%;
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
      background-size: 36% auto;
    }
    &.home.router-link-active {
      background: url(#{$url}hot-active.png) no-repeat center top;
      background-size: 36% auto;
    }
    &.new {
      background: url(#{$url}newest.png) no-repeat center top;
      background-size: 36% auto;
    }
    &.new.router-link-active {
      background: url(#{$url}newest-active.png) no-repeat center top;
      background-size: 36% auto;
    }
    &.publish span {
      display: block;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      font-size: 0.6rem;
      border: 2px solid #fff;
      margin: -1.2rem auto -0.8rem;
      background: #fff url(#{$url}publish.png) no-repeat center center;
      background-size: auto 100%;
      padding: 0;
      box-shadow: 0 -2px 6px rgba($color: #000000, $alpha: 0.05);
    }
    &.publish.router-link-active span{
       background: #fff url(#{$url}publish-on.png) no-repeat center center;
      background-size: auto 100%;
    }
    &.special {
      background: url(#{$url}special.png) no-repeat center top;
      background-size: 36% auto;
    }
    &.special.router-link-active {
      background: url(#{$url}special-active.png) no-repeat center top;
      background-size: 36% auto;
    }
    &.center {
      background: url(#{$url}center.png) no-repeat center top;
      background-size: 36% auto;
    }
    &.center.router-link-active {
      background: url(#{$url}center-active.png) no-repeat center top;
      background-size: 36% auto;
    }
  }
}
</style>

