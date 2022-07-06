<template>
  <div class="wrap" :style="{ width: width, height: height }">
    <!-- 左侧工具栏 -->
    <div class="leftDrag" id="flowStencil" v-if="editIsSHow"></div>
    <!-- 中间画布 -->
    <div class="middleCanvas" ref="flowContainer" id="flowContainer"></div>
    <!--右侧工具栏-->
    <config-panel :editIsSHow="editIsSHow" />
  </div>
</template>
<script>
import FlowGraph from "./js/index.jsx";
import ConfigPanel from "./configPanel/index.vue";
import insertCss from "insert-css";

export default {
  name: "Index",
  components: {
    ConfigPanel,
  },
  props: {
    editIsSHow: {
      typeof: Boolean,
    },
  },
  data() {
    return {
      width: 0,
      height: 0,
      visible: false,
      isReady: false,
    };
  },
  mounted() {
    let FlowData = JSON.parse(localStorage.getItem("FlowData"));
    if (FlowData == null) {
      FlowData = [];
    }
    FlowGraph.init(this.width, this.height, this.editIsSHow); // 渲染画布
    FlowGraph.initGraphShape(FlowData); // 数据回填

    // 监听页面跨高变化
    // let that = this
    // 监控宽高
    // window.onresize = () => {
    //   return (() => {
    //     FlowGraph.destroy()//卸载画布
    //     that.getContainerSize();
    //     FlowGraph.init(that.width, that.height, this.editIsSHow)
    //     FlowGraph.initGraphShape(FlowData) // 数据回填
    //   })();
    // };
  },
  created() {
    this.getContainerSize();
    insertCss(`
    #container {
      display: flex;
      border: 1px solid #dfe3e8;
    }
    #stencil {
      width: 180px;
      height: 100%;
      position: relative;
      border-right: 1px solid #dfe3e8;
    }
    #graph-container {
      width: calc(100% - 180px);
      height: 100%;
    }
    .x6-widget-stencil  {
      background-color: #fff;
    }
    .x6-widget-stencil-title {
      background-color: #fff;
    }
    .x6-widget-stencil-group-title {
      background-color: #fff !important;
    }
    .x6-widget-transform {
      margin: -1px 0 0 -1px;
      padding: 0px;
      border: 1px solid #239edd;
    }
    .x6-widget-transform > div {
      border: 1px solid #239edd;
    }
    .x6-widget-transform > div:hover {
      background-color: #3dafe4;
    }
    .x6-widget-transform-active-handle {
      background-color: #3dafe4;
    }
    .x6-widget-transform-resize {
      border-radius: 0;
    }
    .x6-widget-selection-inner {
      border: 1px solid #239edd;
    }
    .x6-widget-selection-box {
      opacity: 0;
    }
  `);
  },
  methods: {
    // 页面宽高
    getContainerSize() {
      this.width = document.body.offsetWidth + "px";
      this.height = document.body.offsetHeight + "px";
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  display: flex;
  height: calc(100vh - 60px);

  .leftDrag {
    position: relative;
    width: 210px;
  }

  .middleCanvas {
    width: calc(100% - 270px);
    height: 100%;
  }

  .button {
    position: fixed;
  }
}

// 调整边界
.ant-drawer-body {
  padding: 0;
}

//解决左侧遮罩的问题
.x6-widget-dnd {
  z-index: 1000;
}

.x6-widget-stencil-content {
  background-color: #ffffff;
}
</style>
