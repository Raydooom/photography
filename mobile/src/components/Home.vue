<template>
  <div class="hot">
    <Topbar topbarText="热门" />
    <ArticleList listData="" />
  </div>
</template>

<script>
import Topbar from "./../modules/Topbar";
import ArticleList from "./../modules/ArticleList";

export default {
  name: "hot",
  components: {
    Topbar,
    ArticleList
  }
};
</script>

<style lang="scss" scoped>

</style>
