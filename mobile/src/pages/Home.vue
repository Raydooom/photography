<template>
  <div class="home">
    <div class="tabBar">
      <span :class="active === 'hot' ? 'active':''" @click="getHotData">热门</span>
      <span :class="active === 'newest' ? 'active':''" @click="getNewestData">最新</span>
    </div>
    <div class="home-tab">
      <article-list v-if="loaded" :listData="listData"></article-list>
      <loading v-else></loading>
      <!-- <article-list :listData="newestData"></article-list> -->
    </div>
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList";
import Loading from "../components/Loading";
import { HOST } from "../api";

export default {
  name: "Home",
  data() {
    return {
      // hotData: "",
      // newestData: ""
      listData: "",
      active: "hot",
      loaded: false
    };
  },
  components: {
    ArticleList,
    Loading
  },
  mounted() {
    this.getHotData();
  },
  methods: {
    getHotData() {
      this.active = "hot";
      this.$ajax.post(HOST + "/wechat/hot").then(res => {
        this.listData = res.data.data;
        this.loaded = true;
        this.scrollToTop();
      });
    },
    getNewestData() {
      this.active = "newest";
      this.$ajax.post(HOST + "/wechat/newest").then(res => {
        this.listData = res.data.data;
        this.scrollToTop();
      });
    },
    scrollToTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 2.2rem;
}
.tabBar {
  position: fixed;
  width: 100%;
  background: #fff;
  height: 2.2rem;
  line-height: 2.2rem;
  top: 0;
  left: 0;
  z-index: 4;
  border-bottom: 1px solid nth($bgColor, 1);
  display: flex;
  justify-content: center;
  span {
    color: #333;
    display: inline-block;
    height: 2.2rem;
    line-height: 2.2rem;
    font-size: 0.8rem;
    text-align: center;
    margin: 0 1rem;
    padding: 0 1rem;
    &.active {
      color: nth($mainColor, 1);
      border-bottom: 2px solid nth($mainColor, 1);
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
