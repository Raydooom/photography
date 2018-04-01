<template>
  <div class="home">
    <Topbar topbarText="热门"/>
    <ArticleList listData=""/>
  </div>
</template>

<script>
  import Topbar from "../components/Topbar";
  import ArticleList from "../components/ArticleList";

  export default {
    name: "home",
    components: {
      Topbar,
      ArticleList
    }
  };
</script>

<style lang="scss" scoped>

</style>
