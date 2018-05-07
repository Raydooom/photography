<template>
  <div class="special-detial">
    <div class="top-bar" :class="{active : tabBarActive}">
      <span class="go-back" @click="goBack"></span>
      <h3>{{detail.title}}</h3>
      <span class="share-btn"></span>
    </div>
    <div class="cover-wrap" ref="cover">
      <img :src="detail.cover">
    </div>
    <div class="detail-wrap">
      <h2>{{detail.title}}</h2>
      <div class="time">{{detail.date}}&nbsp;&nbsp;&nbsp;{{detail.view}}次浏览</div>
      <div class="detail-con" v-html="detail.text"></div>
    </div>
    <footer>
      <span class="praise">
        {{detail.praise}}
      </span>
      <span class="comment">
        {{detail.comment}}
      </span>
      <span class="share">
        {{detail.share}}
      </span>
    </footer>
  </div>
</template>

<script>
import Topbar from "../components/Topbar";
import { HOST } from "../api";
import qs from "qs";
export default {
  name: "SpecialDetail",
  data() {
    return {
      id: this.$route.params.id, // 文章id
      detail: "", // 页面数据
      tabBarActive: false // 导航条状态控制
    };
  },
  components: {
    Topbar
  },
  mounted() {
    // 进入页面重置页面滚动调
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.getData();
    // 监听滚动事件
    window.addEventListener("scroll", this.pageScroll);
  },
  methods: {
    getData() {
      this.$ajax
        .post(HOST + "/wechat/specialDetail", qs.stringify({ id: this.id }))
        .then(res => {
          this.detail = res.data.detail;
        });
    },
    pageScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let coverHeight = this.$refs.cover.offsetHeight;
      // 导航条滚动效果
      if (scrollTop > coverHeight - 44) {
        this.tabBarActive = true;
      } else {
        this.tabBarActive = false;
      }
    },
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.special-detial {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 11;
  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    .go-back {
      position: absolute;
      top: 0.3rem;
      left: 0.65rem;
      display: block;
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5) url(#{$comUrl}icon-back.png) no-repeat
        0.2rem center;
      background-size: 70% 70%;
    }
    h3 {
      font-size: 0.7rem;
      padding: 0 4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: none;
    }
    .share-btn {
      display: block;
      width: 1.6rem;
      height: 1.6rem;
      position: absolute;
      border-radius: 50%;
      top: 0.3rem;
      right: 0.625rem;
      background: rgba(0, 0, 0, 0.5) url(#{$comUrl}share-white.png) no-repeat
        center center;
      background-size: 75% 75%;
    }
    &.active {
      background: #fff;
      box-shadow: 0 2px 6px rgba($color: #000000, $alpha: 0.05);
      .go-back {
        background: url(#{$comUrl}goback-black.png) no-repeat 0.2rem center;
        background-size: 70% 70%;
      }
      h3 {
        display: block;
      }
      .share-btn {
        background: url(#{$comUrl}share.png) no-repeat center center;
        background-size: 75% 75%;
      }
    }
  }

  .cover-wrap {
    height: 12rem;
    overflow: hidden;
    img {
      display: block;
      min-height: 100%;
      width: 100%;
    }
  }
  .detail-wrap {
    padding: 1rem 0.65rem;
    margin-bottom: 2.45rem;
    h2 {
      font-size: 1rem;
      color: nth($fontColor, 1);
      margin-bottom: 0.5rem;
    }
    .time {
      font-size: 0.65rem;
      color: nth($fontColor, 3);
      margin-bottom: 1rem;
    }
    .detail-con {
      font-size: 0.75rem;
      color: nth($fontColor, 2);
      line-height: 1.3rem;
    }
  }
  footer {
    box-shadow: 0 -2px 6px rgba($color: #000000, $alpha: 0.05);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.45rem;
    background: #fff;
    display: flex;
    justify-content: center;
    span {
      flex: 1;
      text-align: center;
      font-size: 0.6rem;
      color: nth($fontColor, 2);
      height: 100%;
      padding-top: 0.8rem;
      &.praise {
        background: url(#{$comUrl}like.png) no-repeat center 0.1rem;
        background-size: auto 60%;
      }
      &.comment {
        background: url(#{$comUrl}comment.png) no-repeat center 0.1rem;
        background-size: auto 60%;
      }
      &.share {
        background: url(#{$comUrl}share.png) no-repeat center 0.1rem;
        background-size: auto 60%;
      }
    }
  }
}
</style>
