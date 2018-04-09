<template>
  <div class="special-detial">
    <topbar topbarText="123"></topbar>
    123
  </div>
</template>

<script>
import Topbar from "../components/Topbar";
import { HOST } from "../api";
export default {
  name: "SpecialDetail",
  data() {
    return {};
  },
  components: {
    Topbar
  },
  mounted() {},
  methods: {
    getData() {}
  }
};
</script>

<style lang="scss" scoped>
.special-detial {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11;
  background: #fff;
  padding-top: 2.2rem;
}
</style>
