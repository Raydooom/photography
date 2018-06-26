<template>
    <div class="model">
        <div class="model-wrap">
            <p>提示信息</p>
            <span>确定</span>
        </div>
    </div>
</template>

<script>
export default {
  name: "model"
};
</script>

<style lang="scss" scoped>
.model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
  .model-wrap {
    width: 12rem;
    background: $bgColor;
    border-radius: 0.3rem;
  }
}
</style>
