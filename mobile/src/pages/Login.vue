<template>
  <div class="login">
    <div class="login-warp" :class="{active:isRegister}">
      <div class="logo">
        <img src="../assets/icons/logo.png">
        <p>摄影学习小社区</p>
      </div>
      <div class="input-wrap">
        <!-- <p>请输入账号</p> -->
        <input type="text" placeholder="请输入账号" maxlength="16" />
        <!-- <p>请输入密码</p> -->
        <input type="password" placeholder="请输入密码" maxlength="16" />
        <span class="login-btn">立即登录</span>
      </div>
      <div class="register register-btn" :class="{active:isRegister}" @click="goRegister">注册账号</div>
    </div>
    <div class="register-wrap" :class="{active:!isRegister}">
      <div class="logo">
        <img src="../assets/icons/logo.png">
        <p>摄影学习小社区</p>
      </div>
      <div class="input-wrap">
        <!-- <p>请输入账号</p> -->
        <input type="text" placeholder="请设置账号" maxlength="16" />
        <!-- <p>请输入密码</p> -->
        <input type="password" placeholder="请设置密码" maxlength="16" />
        <input type="password" placeholder="确认密码" maxlength="16" />
        <span class="login-btn">立即注册</span>
      </div>
      <div class="register login-btn" :class="{active:!isRegister}" @click="goRegister">立即登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegister: true
    };
  },
  methods: {
    goRegister() {
      this.isRegister = !this.isRegister;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  overflow: hidden;
  .login-warp {
    height: 100%;
    padding-bottom: 3rem;
    position: relative;
    left: -100%;
    transition: left 0.4s ease-out;
    &.active {
      left: 0;
    }
  }
  .register-wrap {
    width: 18.75rem;
    position: absolute;
    left: 100%;
    top: 0;
    transition: left 0.4s ease-out;
    &.active {
      left: 0;
    }
  }
}

.logo {
  text-align: center;
  padding: 3rem 0 1.4rem;
  &::before {
    display: block;
    content: "";
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: url(#{$comUrl}login_bg.jpg) no-repeat center center;
    background-size: 100% 100%;
  }
  img {
    display: inline-block;
    width: 3rem;
    height: 3rem;
  }
  p {
    font-size: 0.65rem;
    color: nth($fontColor, 1);
    margin: 0.5rem auto 0;
    width: 8rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid nth($mainColor, 2);
  }
}
.input-wrap {
  padding: 0 1.6rem;
  p {
    font-size: 0.7rem;
    color: nth($fontColor, 2);
    margin: 0.5rem 0 0.3rem;
  }
  input {
    display: block;
    margin-top: 1rem;
    width: 100%;
    padding: 0.5rem;
    height: 2rem;
    line-height: 1rem;
    font-size: 0.8rem;
    border-radius: 0;
    text-align: left;
    border: none;
    border-bottom: 1px solid #bbb;
    background: none;
    transition: all 0.3s;
    &:focus {
      border-bottom: 1px solid nth($mainColor, 1);
    }
  }
  .login-btn {
    display: block;
    height: 2.2rem;
    line-height: 2.2rem;
    text-align: center;
    color: #fff;
    background: linear-gradient(-15deg, nth($mainColor, 1), #8869cb);
    border-radius: 1.1rem;
    font-size: 0.8rem;
    margin-top: 1.6rem;
  }
}
.register {
  position: fixed;
  left: -100%;
  bottom: 0.5rem;
  width: 100%;
  font-size: 0.7rem;
  color: nth($mainColor, 1);
  text-align: center;
  &.register-btn.active {
    left: 0;
  }
  &.login-btn {
    left: -100%;
    &.active {
      left: 0;
    }
  }
}
</style>
