<template>
  <div id="topbar">
    <a class="back-btn"></a>
    <span>{{topbarText}}</span>
  </div>
</template>

<script>
  export default {
    name: "Topbar",
    props: ["topbarText"]
  };
</script>

<style lang="scss">
  #topbar {
    line-height: 2.2rem;
    width: 100%;
    height: 2.2rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: nth($mainColor, 1);
    span {
      font-size: 0.8rem;
      text-align: center;
      display: block;
      line-height: 2.2rem;
      color: #fff;
    }
  }
</style>
