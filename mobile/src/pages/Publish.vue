<template>
  <div class="publish">
    <div class="text">
      <textarea placeholder="作品描述" rows="5"></textarea>
    </div>
    <upload></upload>
    <div class="publish-btn" @click="publishMsg">立即发布</div>
    {{pos}}
  </div>
</template>

<script>
import upload from "../components/Upload.vue";

export default {
  name: "publish",
  data() {
    return {
      pos: "123"
    };
  },
  mounted() {
    // console.log(this.$store);
  },
  methods: {
    publishMsg() {
      // 发布首先触发子组件图片上传方法
      this.$children[0].upload();
      if (this.upComplate) {
        console.log(this.imgNames);
        console.log(12314123);
      }
    }
  },
  computed: {
    imgNames() {
      return this.$store.state.imgNames;
    },
    total() {
      return this.$store.state.total;
    },
    currentStep() {
      return this.$store.state.currentStep;
    },
    upComplate() {
      return this.$store.state.uploadComplate;
    }
  },
  components: {
    upload
  }
};
</script>

<style lang="scss" scoped>
.publish {
  .text {
    background: #fff;
    textarea {
      resize: none;
      width: 100%;
      padding: 0.4rem 0.5rem;
      line-height: 1.2rem;
      font-size: 0.7rem;
      color: nth($fontColor, 1);
      border: none;
    }
  }
  .publish-btn {
    display: block;
    height: 2.2rem;
    line-height: 2.2rem;
    background: nth($mainColor, 1);
    color: #fff;
    text-align: center;
    border-radius: 0.2rem;
    font-size: 0.8rem;
    margin: 1rem 0.5rem;
  }
}
</style>
