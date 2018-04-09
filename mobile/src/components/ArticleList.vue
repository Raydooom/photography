<template>
    <section id="articleList">
        <ul>
            <li v-for="item in listData" :key="item.index">
                <div class="author">
                    <span class="avatar"><img :src="item.authorInfo.avatarUrl" alt=""></span>
                    <span class="name-wrap">
                        <b>
                            <span>{{item.authorInfo.nickname}}</span>
                            <i>{{item.authorInfo.level}}</i>
                        </b>
                        <i class="time">{{item.content.date}}</i>
                    </span>
                </div>
                <div class="main-wrap">
                    <p>{{item.content.description}}</p>
                    <div class="photo-wrap" v-if="item.content.img.split(',').length > 1">
                        <div class="photos">
                            <span v-for="img in item.content.img.split(',')" :key="img"><img :src="img"></span>
                        </div>
                    </div>
                    <div class="simple-photo" v-if="item.content.img.split(',').length === 1">
                        <span><img :src="item.content.img"></span>
                    </div>
                </div>
                <div class="loc-show" v-if="item.content.location">{{item.content.location}}</div>
                <div class="handle-wrap">
                    <b>浏览{{item.content.views}}次</b>
                    <span class="handle-btn praise">{{item.content.praises}}</span>
                    <span class="handle-btn comment">{{item.content.shares}}</span>
                    <span class="handle-btn share">{{item.comments.length}}</span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import { HOST } from "../api";
export default {
  name: "ArticleList",
  props: ["listData"],
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
ul {
  background: nth($bgColor, 1);
  li {
    background: #fff;
    margin-bottom: 0.6rem;
    .author {
      display: flex;
      padding: 0.6rem 0.65rem;
      .avatar {
        width: 2.2rem;
        height: 2.2rem;
        overflow: hidden;
        border-radius: 50%;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .name-wrap {
        padding-left: 0.5rem;
        b {
          span {
            color: nth($fontColor, 1);
            font-size: 0.9rem;
            display: inline-block;
            max-width: 9rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            vertical-align: text-bottom;
          }
          i {
            display: inline-block;
            padding-left: 0.8rem;
            margin-left: 0.3rem;
            font-size: 0.7rem;
            color: nth($fontColor, 2);
            background: url(#{$comUrl}level.png) no-repeat center left;
            background-size: 0.8rem auto;
            vertical-align: text-bottom;
          }
        }
        .time {
          display: block;
          font-size: 0.6rem;
          color: nth($fontColor, 3);
        }
      }
    }

    .main-wrap {
      p {
        padding: 0.4rem 0.65rem;
        color: nth($fontColor, 1);
        font-size: 0.8rem;
      }
      .photo-wrap,
      .simple-photo {
        margin: 0.65rem;
        overflow: hidden;
        span {
          display: block;
          border-radius: 0.4rem;
          overflow: hidden;
          img {
            display: block;
          }
        }
      }
      .photo-wrap {
        border-radius: 0.4rem;
        overflow: hidden;
        .photos {
          margin: -0.05rem;
          display: flex;
          flex-wrap: wrap;
        }
        span {
          flex: 0 0 5.75rem;
          height: 5.75rem;
          border-radius: 0;
          margin: 0.05rem;
          img {
            display: block;
            min-height: 100%;
          }
        }
      }
    }
    .loc-show {
      padding: 0 1.4rem;
      margin-bottom: 0.65rem;
      font-size: 0.7rem;
      color: nth($fontColor, 3);
      background: url(#{$comUrl}location.png) no-repeat 0.65rem center;
      background-size: 0.7rem auto;
    }
    .handle-wrap {
      display: flex;
      border-top: 1px solid nth($bgColor, 1);
      padding-left: 0.65rem;
      b {
        flex: 3;
        font-size: 0.6rem;
        line-height: 2.2rem;
        color: nth($fontColor, 3);
      }
      .handle-btn {
        flex: 1;
        text-align: left;
        font-size: 0.7rem;
        line-height: 2.2rem;
        padding-left: 1.6rem;
        color: nth($fontColor, 2);
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
</style>
