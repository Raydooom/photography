<template>
  <div class="center">
    <div class="info-wrap">
      <img class='avatar' :src="userInfo.avatarUrl" />
      <div class="name-info">
        <span class="nickname">{{userInfo.nickname}}</span>
        <span class="gender" wx:if="userInfo.gender" :class="userInfo.gender === 1 ? 'male' : 'female' "></span>
        <div class="level-wrap">
          <span class="level">{{userInfo.level}}</span>
        </div>
      </div>
      <span class="integral">积分
        <b>{{userInfo.integral}}</b>
      </span>
    </div>
    <ul class="social-wrap">
      <li class="works">
        <span>12</span>作品</li>
      <li class="attention">
        <span>123</span>关注</li>
      <li class="fans">
        <span>123</span>粉丝</li>
      <li class="comment">
        <span>123</span>评论</li>
    </ul>
    <div class="menu-list">
      <router-link class="list-item data" to="">个人资料
        <span></span>
      </router-link>
      <router-link class="list-item m-integral" to="">积分说明
        <span></span>
      </router-link>
      <router-link class="list-item setting" to="">设置
        <span></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { HOST } from "../api";
export default {
  data() {
    return {
      userId: localStorage.getItem("isLogin"),
      userInfo: ""
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      console.log(this.userId);
      this.$ajax(HOST + "/mobile/userInfo", {
        params: {
          userId: this.userId
        }
      }).then(res => {
        console.log(this);
        if (res.data.state == 1) {
          this.userInfo = res.data.userInfo;
          console.log(this.userInfo);
        } else {
          alert("登录信息异常");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes hue-animation {
  0% {
    -webkit-filter: hue-rotate(0deg);
    filter: hue-rotate(0deg);
  }

  100% {
    -webkit-filter: hue-rotate(120deg);
    filter: hue-rotate(120deg);
  }
}
.info-wrap {
  padding: 2rem 0.75rem 3rem;
  overflow: hidden;
  position: relative;
  &:after {
    background: linear-gradient(-45deg, nth($mainColor, 1), nth($mainColor, 2));
    animation: hue-animation 10s infinite alternate linear;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    float: left;
  }
  .name-info {
    float: left;
    .nickname {
      margin-top: 0.5rem;
      margin-left: 1rem;
      display: inline-block;
      color: #fff;
      font-size: 1rem;
      vertical-align: top;
      max-width: 7rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .gender {
      display: inline-block;
      width: 0.8rem;
      height: 0.8rem;
      vertical-align: top;
      margin-top: 0.8rem;
      margin-left: 0.2rem;
      &.male {
        background: url(#{$comUrl}male.png) no-repeat center center;
        background-size: 100% 100%;
      }
      &.female {
        background: url(#{$comUrl}female.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .level-wrap {
      margin-left: 1rem;
      line-height: 1rem;
      .level {
        font-size: 0.6rem;
        color: #fff;
      }
    }
  }
  .integral {
    font-size: 0.6rem;
    color: #333;
    position: absolute;
    top: 3rem;
    right: 0;
    height: 1.4rem;
    line-height: 1.4rem;
    background: #fff;
    border-radius: 0.8rem 0 0 0.8rem;
    padding: 0 0.5rem;
    b {
      font-size: 0.8rem;
      color: nth($mainColor, 1);
      font-weight: bold;
    }
  }
}
.social-wrap {
  background: #fff;
  margin-top: -1rem;
  position: relative;
  z-index: 2;
  border-radius: 0.6rem 0.6rem 0 0;
  overflow: hidden;
  li {
    width: 25%;
    float: left;
    text-align: center;
    font-size: 0.6rem;
    color: nth($fontColor, 2);
    margin: 1rem 0;
    border-right: 1px solid $bgColor;
    position: relative;
    padding-top: 1.6rem;
    &.works {
      background: url(#{$comUrl}icon-works.png) no-repeat center 0;
      background-size: 1.4rem auto;
    }
    &.attention {
      background: url(#{$comUrl}icon-attention.png) no-repeat center 0;
      background-size: 1.4rem auto;
    }
    &.fans {
      background: url(#{$comUrl}icon-fans.png) no-repeat center 0;
      background-size: 1.4rem auto;
    }
    &.comment {
      background: url(#{$comUrl}icon-comment.png) no-repeat center 0;
      background-size: 1.4rem auto;
    }
    span {
      display: block;
      position: absolute;
      left: 2.4rem;
      top: -0.1rem;
      text-align: center;
      font-size: 0.5rem;
      border: 0.05rem solid nth($mainColor, 1);
      color: nth($mainColor, 1);
      height: 0.7rem;
      line-height: 0.7rem;
      border-radius: 0.35rem;
      background: #fff;
      padding: 0 0.2rem;
    }
  }
}
.menu-list {
  padding-top: 0.5rem;
  background: $bgColor;
  .list-item {
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 0.8rem;
    padding: 0 0.75rem 0 2rem;
    border-bottom: 1px solid $bgColor;
    &.data {
      background: #fff url(#{$comUrl}icon-data.png) no-repeat 0.75rem center;
      background-size: 1rem auto;
    }
    &.m-integral {
      background: #fff url(#{$comUrl}icon-integral.png) no-repeat 0.75rem center;
      background-size: 1rem auto;
    }
    &.setting {
      background: #fff url(#{$comUrl}icon-setting.png) no-repeat 0.75rem center;
      background-size: 1rem auto;
    }
    span {
      width: 2.2rem;
      line-height: 2.2rem;
      background: url(#{$comUrl}menu-next.png) no-repeat right center;
      background-size: 40% auto;
    }
  }
}
</style>
