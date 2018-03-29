<template>
    <div id="header">
        <header>
            <a class="back-btn"></a>
            <span>热门</span>
        </header>
    </div>
</template>

<script>
export default {
  name: "header"
};
</script>

<style lang="scss" scoped>
    header{
        line-height:2.2rem;
        width: 100%;
        height:2.2rem;
        position:fixed;
        background:$mainColor;
        span{
            font-size: 0.8rem;
            text-align: center;
            display: block;
            line-height: 2.2rem;
            color: #fff;
        }
    }
</style>
