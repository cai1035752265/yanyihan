<template>
  <span ref="svgSpan"></span>
</template>

<script>
import { svgIconCodeMap } from "../assets/svg/iconCodeMap.ts";
export default {
  name: "SvgIcon",
  props: {
    code: {
      type: String,
      default: null,
      require: true,
    },
    color: {
      type: String,
      default: null,
      require: true,
    },
  },
  watch: {
    code: {
      handler() {
        this.renderIcon();
      },
      deep: true,
    },
  },
  mounted() {
    this.renderIcon();
  },
  methods: {
    renderIcon() {
      this.$refs.svgSpan.innerHTML = svgIconCodeMap[this.code];
      this.$refs.svgSpan.childNodes[0].childNodes[0].style.fill = this.color;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* .svg-icon > .icon>path{
  fill: red
} */
</style>
