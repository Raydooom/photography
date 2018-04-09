<template>
  <div class="special">
    <topbar topbarText="专题"></topbar>
    <ul>
      <li v-for="item in specialList" :key="item.id">
        <router-link :to="{path:'/special/specialDetail',params:{id:item.id}}">
          <span class="cover">
            <img :src="item.cover">
          </span>
          <div class="text-info">
            <h2>{{item.title}}</h2>
            <div class="view-info">
              <b class="view">浏览{{item.view}}次</b>
              <span class="praise">{{item.praise}}</span>
              <span class="comment">{{item.comment}}</span>
              <span class="share">{{item.share}}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import Topbar from "../components/Topbar";
import { HOST } from "../api";

export default {
  data() {
    return {
      specialList: ""
    };
  },
  mounted() {
    this.getList();
  },
  components: {
    Topbar
  },
  methods: {
    getList() {
      this.$ajax.post(HOST + "/wechat/special").then(res => {
        this.specialList = res.data.data;
        console.log(this.specialList);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  background: nth($bgColor, 1);
  padding-top: 2.2rem;
  padding-bottom: 1rem;
  li {
    padding: 0.65rem 0.65rem 0;
    .cover {
      display: block;
      overflow: hidden;
      border-radius: 0.4rem 0.4rem 0 0;
      height: 11.5rem;
      img {
        min-height: 100%;
        display: block;
      }
    }
    .text-info {
      background: #fff;
      border-radius: 0 0 0.4rem 0.4rem;
      padding: 0.65rem;
      h2 {
        font-size: 0.8rem;
        color: nth($fontColor, 1);
      }
      .view-info {
        display: flex;
        padding-top: 0.3rem;
        .view {
          flex: 4;
          font-size: 0.6rem;
          line-height: 1.5rem;
          color: nth($fontColor, 3);
        }
        span {
          flex: 1;
          line-height: 1.5rem;
          font-size: 0.6rem;
          color: nth($fontColor, 2);
          padding-left: 1.5rem;
          &.praise {
            background: url(#{$comUrl}like.png) no-repeat 0.3rem center;
            background-size: 1rem auto;
          }
          &.comment {
            background: url(#{$comUrl}comment.png) no-repeat 0.3rem center;
            background-size: 1rem auto;
          }
          &.share {
            background: url(#{$comUrl}share.png) no-repeat 0.3rem center;
            background-size: 1rem auto;
          }
        }
      }
    }
  }
}
</style>
