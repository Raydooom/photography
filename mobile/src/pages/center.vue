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
      <li>
        <span>123</span>作品</li>
      <li>
        <span>123</span>关注</li>
      <li>
        <span>123</span>粉丝</li>
      <li>
        <span>123</span>评论</li>
    </ul>
    <div class="menu-list">
      <router-link class="list-item" to="">积分说明
        <span></span>
      </router-link>
      <router-link class="list-item" to="">设置
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

.info-wrap {
  padding: 2rem 0.75rem 3rem;
  background: linear-gradient(-45deg, #d849b3, #f04c7f);
  overflow: hidden;
  position: relative;
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
    span {
      display: block;
      text-align: center;
      font-size: 0.8rem;
      color: nth($mainColor, 1);
      padding: 0 0 0.3rem;
    }
  }
}
.menu-list {
  padding-top: 0.5rem;
  background: $bgColor;
  .list-item {
    background: #fff;
    display: flex;
    justify-content: space-between;
    height: 2.2rem;
    line-height: 2.2rem;
    font-size: 0.8rem;
    padding: 0 0.75rem;
    margin-bottom: 1px;
  }
}
</style>
