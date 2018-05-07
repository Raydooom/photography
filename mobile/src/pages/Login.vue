<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/icons/logo.png">
            <p>摄影学习小社区</p>
        </div>
        <div class="input-wrap">
            <p>请输入账号</p>
            <input type="text" />
            <p>请输入密码</p>
            <input type="text" />
            <span class="login-btn">立即登录</span>
        </div>
        <div class="register">注册账号</div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  padding: 3rem 0 1.4rem;
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
    color: nth($fontColor, 3);
    margin: 0.5rem 0 0.3rem;
  }
  input {
    display: block;
    width: 100%;
    padding: 0.5rem;
    height: 2rem;
    line-height: 1rem;
    border-radius: 0.2rem;
    border: 1px solid nth($fontColor, 3);
  }
  .login-btn {
    display: block;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    color: #fff;
    background: nth($mainColor, 1);
    border-radius: 0.2rem;
    font-size: 0.7rem;
    margin-top: 1rem;
  }
}
.register {
  position: fixed;
  bottom: 0.5rem;
  width: 4rem;
  margin-left: -2rem;
  left: 50%;
  font-size: 0.7rem;
  color: nth($mainColor, 1);
}
</style>
