<template>
  <div class="home">
    <div class="home-tab">
      <article-list v-if="loaded" :listData="listData" @refreshList="onRefresList"></article-list>
      <loading v-else></loading>
      <div class="load-more" v-if="!noMore"><img src="../assets/svg/oval.svg">
        <span>正在加载</span>
      </div>
      <div class="load-more" v-else>
        <span>我可是有底线的</span>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList";
import { loading } from "../modules";
import { HOST } from "../api";

export default {
  name: "Home",
  data() {
    return {
      listData: [],
      loaded: false,
      page: 0,
      pageSize: 5,
      noMore: false
    };
  },
  components: {
    ArticleList,
    loading
  },
  mounted() {
    this.getHotData();
    var that = this;
    window.onscroll = function() {
      if (
        that.getScrollTop() + that.getWindowHeight() ==
        that.getScrollHeight()
      ) {
        that.page = that.page + 1;
        that.getHotData();
      }
    };
  },
  methods: {
    getHotData() {
      console.log(this.page);
      this.$ajax(HOST + "/mobile/list", {
        params: {
          type: 1,
          page: this.page,
          pageSize: this.pageSize,
          userId: localStorage.getItem("isLogin")
        }
      }).then(res => {
        let pageData = res.data.data;
        if (pageData.length == 0) {
          this.noMore = true;
          this.loaded = true;
        } else {
          this.listData = this.listData.concat(res.data.data);
          this.loaded = true;
        }
      });
    },
    onRefresList() {
      this.getHotData();
    },
    getScrollTop: function() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    //文档的总高度
    getScrollHeight: function() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    getWindowHeight: function() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
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

.load-more {
  margin: 0 0 0.8rem;
  text-align: center;
  line-height: 0.7rem;
  img {
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.2rem;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    font-size: 0.6rem;
    color: nth($fontColor, 3);
    line-height: 0.7rem;
    height: 0.7rem;
  }
}
</style>
