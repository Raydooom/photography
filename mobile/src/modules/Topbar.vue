<template>
    <div id="topbar">
        <header>
            <a class="back-btn"></a>
            <span>{{topbarText}}</span>
        </header>
    </div>
</template>

<script>
export default {
  name: "Topbar",
  props: ["topbarText"]
};
</script>

<style lang="scss">
body {
  padding-top: 2.2rem;
}
header {
  line-height: 2.2rem;
  width: 100%;
  height: 2.2rem;
  position: fixed;
  top: 0;
  left: 0;
  background: $mainColor;
  span {
    font-size: 0.8rem;
    text-align: center;
    display: block;
    line-height: 2.2rem;
    color: #fff;
  }
}
</style>
