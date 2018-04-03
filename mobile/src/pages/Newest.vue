<template>
  <div class="hot">
    <Topbar topbarText="最新" />
    <ArticleList listData="" />
  </div>
</template>

<script>
import Topbar from "../components/Topbar";
import ArticleList from "../components/ArticleList";

export default {
  name: "Newest",
  components: {
    Topbar,
    ArticleList
  }
};
</script>

<style lang="scss" scoped>

</style>
