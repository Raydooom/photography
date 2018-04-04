<template>
  <div class="hot">
    <div class="tabBar">
      <router-link :to="{path:'/home/hot'}">热门</router-link><router-link :to="{path:'/home/newest'}">最新</router-link>
    </div>
    <transition :name="slide">
      <router-view class="home-view"></router-view>
    </transition>
  </div>
</template>

<script>
import Topbar from "../components/Topbar";
import Loading from "../components/Loading";
import { HOST } from "../api";

export default {
  name: "Home",
  data() {
    return {
      listData: "",
      slide: ""
    };
  },
  components: {
    Topbar,
    Loading
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.slide = "slide-right";
      } else {
        this.slide = "slide-left";
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.tabBar {
  position: fixed;
  width: 100%;
  background: nth($mainColor, 1);
  height: 2.2rem;
  line-height: 2.2rem;
  top: 0;
  left: 0;
  z-index: 4;
  text-align: center;
  a {
    color: #fff;
    display: inline-block;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: 0.7rem;
    padding: 0 2rem;
    text-align: center;
    border: 1px solid #fff;
    &:first-child {
      border-radius: 0.7rem 0 0 0.7rem;
    }
    &:last-child {
      margin-left:-1px;
      border-radius: 0 0.7rem 0.7rem 0;
    }
  }
}

.home-view {
  transition: 0.8s all;
  position: absolute;
  left: 0;
  &.slide-left-enter,
  &.slide-left-leave {
    transform: translateX(-100%);
  }
  &.slide-right-enter,
  &.slide-right-leave {
    transform: translateX(100%);
  }
}
</style>
