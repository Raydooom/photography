<template>
    <div class="progress">
        <div class="wrap">
            <img src="../../assets/svg/puff.svg" alt="">
            <span>正在上传{{step.currentStep}}/{{step.total}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: "uploadProgress",
  props: ["step"],
  mounted() {
    console.log(this.step);
  }
};
</script>

<style lang="scss" scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0);
  .wrap {
    background: rgba(0, 0, 0, 0.75);
    width: 6rem;
    border-radius: 0.3rem;
    padding: 1rem;
    position: absolute;
    top: 50%;
    margin-top: -7rem;
    left: 50%;
    margin-left: -3rem;
    img {
      display: block;
      margin: 0 auto;
    }
    span {
      font-size: 0.7rem;
      color: #fff;
      display: block;
      margin-top: 1rem;
      text-align: center;
    }
  }
}
</style>
