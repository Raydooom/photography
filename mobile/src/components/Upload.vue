<template>
  <div class="upload">
    <div class="img-list">
      <div v-for="item in previewList" :key="item.index" class="img-show" :style="{background:'url('+ item +') no-repeat',backgroundPosition:'center', backgroundSize:'cover'}"></div>
      <div class="add-img"><input ref="input" @change="selectImg" type="file" enctype="multipart/form-data" multiple /></div>
    </div>
  </div>
</template>

<script>
import { HOST } from "../api";
export default {
  name: "upload",
  data() {
    return {
      previewList: [],
      imgList: "",
      filesLength: 0,
      filesType: ["image/jpeg", "image/png", "image/gif", "image/jpg"],
      filesList: [],
      imgNames: [],
      step: 0
    };
  },
  mounted() {},
  watch: {},
  methods: {
    selectImg() {
      let inputDom = this.$refs.input;
      let files = inputDom.files;
      this.filesLength += files.length;
      // 文件数量控制
      if (this.filesLength > 9) {
        this.filesLength -= files.length;
        inputDom.value = "";
        alert("最多只能传9张！");
        return false;
      } else {
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          // 文件格式判断
          if (this.filesType.includes(file.type)) {
            // 将图片储存到用于上传列表
            this.filesList.push(file);
            // 预览图片
            this.preview(file);
          } else {
            alert("含有不支持的图片格式");
            inputDom.value = "";
          }
        }
      }
    },
    // 图片预览
    preview(file) {
      let that = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        that.previewList.push(reader.result);
      };
    },
    upload(resolve, reject) {
      console.log(this.filesList);
      let upLoadFiles = this.filesList;
      for (let i = 0; i < upLoadFiles.length; i++) {
        let formdata = new FormData();
        formdata.append("img", upLoadFiles[i]);
        let config = { headers: { "Content-Type": "multipart/form-data" } };
        this.$ajax.post(HOST + "/uploadImg", formdata, config).then(res => {
          this.step++;
          this.imgNames.push(res.data);
          // 上传进度获取
          this.$store.commit("uploadStep", {
            total: this.filesLength,
            currentStep: this.step
          });
          // 判断是否上传完成
          if (this.step == this.filesLength) {
            // console.log(this.imgNames);
            this.$store.commit("getUploadImgUrl", this.imgNames);
            resolve("上传成功");
            // 上传完成重置data
            this.previewList = this.filesList = this.imgNames = [];
            this.filesLength = this.step = 0;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  background: #fff;
  margin-top: 1px;
  padding: 0.4rem 0.5rem;
  .img-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .img-show {
      width: 4.2rem;
      height: 4.2rem;
      margin-right: 0.23rem;
      margin-bottom: 0.23rem;
      border-radius: 0.3rem;
      border: 1px solid #efefef;
      overflow: hidden;
      img {
        display: block;
        min-width: 100%;
        min-height: 100%;
      }
    }
    .add-img {
      width: 4.2rem;
      height: 4.2rem;
      margin-right: 0.23rem;
      margin-bottom: 0.23rem;
      border-radius: 0.3rem;
      border: 1px dashed #efefef;
      overflow: hidden;
      background: url(#{$comUrl}add-img.png) no-repeat center center;
      background-size: 50% 50%;
      input {
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
}
</style>
