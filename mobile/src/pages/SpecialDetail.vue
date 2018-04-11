<template>
  <div class="special-detial">
    <div class="top-bar">
      <span class="go-back"></span>
      <span class="share"></span>
    </div>
    <div class="cover-wrap">
      <img :src="detail.cover">
    </div>
    <div class="detail-wrap">
      <h2>{{detail.title}}</h2>
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
      id: this.$route.params.id,
      detail: ""
    };
  },
  components: {
    Topbar
  },
  mounted() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.id);
      this.$ajax
        .post(HOST + "/wechat/specialDetail", qs.stringify({ id: this.id }))
        .then(res => {
          this.detail = res.data.detail;
        });
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
      padding-top:0.8rem;
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
