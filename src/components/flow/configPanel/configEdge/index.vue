<template>
  <a-card class="box" title="线条设置">
    <a-form :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
      <template v-for="(config, index) in lineAttrConfigs" :key="index">
        <a-form-item v-if="config.type === 'input'" :label="config.label">
          <a-input
            v-model:value="config.value"
            @change="onFormItemChange($event, config.type, index, config.key)"
          />
        </a-form-item>
        <a-form-item v-if="config.type === 'select'" :label="config.label">
          <a-select
            :options="config.options"
            v-model:value="config.value"
            @change="onFormItemChange($event, config.type, index, config.key)"
          />
        </a-form-item>
        <a-form-item v-if="config.type === 'color'" :label="config.label">
          <input
            type="color"
            class="colorPicker"
            @input="onFormItemChange($event, config.type, index, config.key)"
            v-model="config.value"
          />
        </a-form-item>
        <a-form-item v-if="config.type === 'inputNumber'" :label="config.label">
          <a-input-number
            style="width: 100%"
            id="inputNumber"
            v-model:value="config.value"
            :min="config.min"
            :max="config.max"
            @change="onFormItemChange($event, config.type, index, config.key)"
          />
        </a-form-item>
      </template>
    </a-form>
    <div class="submit">
      <a-button type="danger" @click="reset">取消</a-button>
      <a-button type="primary" @click="primary">设置</a-button>
    </div>
  </a-card>
</template>

<script>
import FlowGraph from "../../js/index.jsx";
import { set, get, isObject } from "lodash-es";
export default {
  name: "Index",
  props: {
    id: {
      type: String,
      default: null,
      require: true,
    },
  },
  data() {
    return {
      curEdge: "",
      globalNodeAttr: {
        attrsLineColor: "",
        attrsFontSize: 0,
        lineSelection: "rounded",
        lineText: "",
        lineTextStyle: "0.5",
        lineTextStyleRotate: "0",
        drag: false,
      },
      lineAttrConfigs: [
        {
          type: "color",
          key: "stroke",
          label: "线条颜色",
          path: "line.stroke",
          value: null,
        },
        {
          type: "inputNumber",
          key: "strokeWidth",
          label: "线条宽度",
          path: "line.strokeWidth",
          value: null,
        },
        {
          type: "select",
          key: "lineSelection",
          label: "线条样式",
          options: [
            { label: "直线", value: "normal" },
            { label: "曲线", value: "smooth" },
            { label: "圆弧线", value: "rounded" },
            { label: "跳线", value: "jumpover" },
          ],
          method: "setConnector",
          value: null,
        },
        {
          type: "input",
          key: "labelText",
          label: "标签内容",
          path: "label",
          labelPath: "attrs.label.text",
          value: null,
        },
        {
          type: "inputNumber",
          key: "labelDistance",
          label: "标签位置",
          min: "0",
          max: "1",
          step: "0.1",
          path: "label",
          labelPath: "position.distance",
          value: null,
        },
        {
          type: "inputNumber",
          key: "labelAngle",
          label: "标签角度",
          min: "0",
          max: "360",
          path: "label",
          labelPath: "position.angle",
          value: null,
        },
      ],
      oldLineAttrConfigs: [],
    };
  },
  computed: {
    nodeIdCpt() {
      return {
        id: this.id,
      };
    },
  },
  watch: {
    nodeIdCpt(nv) {
      this.curEdge = this.nodeOpt(nv, this.globalNodeAttr);
    },
  },
  created() {
    this.curEdge = this.nodeOpt(this.id, this.globalNodeAttr);
  },
  methods: {
    // 设置
    primary() {
      this.setNodeValue();
      this.$emit("configclick", "edge");
    },
    setNodeValue() {
      const pathConfig = [
        {
          attrs: {
            label: {
              text: "",
            },
          },
          position: {
            distance: "",
            angle: "",
          },
        },
      ];
      this.lineAttrConfigs.forEach((item) => {
        if (item.path) {
          if (item.path === "label") {
            set(pathConfig[0], item.labelPath, item.value);
          } else {
            this.curEdge.attr(item.path.replace(".", "/"), item.value);
          }
        } else {
          item.method && this.curEdge[item.method](item.value);
        }
      });
      this.curEdge.setLabels(pathConfig); // 标签设置
    },
    // 处理
    nodeOpt(id) {
      let curEdge = null;
      if (id) {
        const { graph } = FlowGraph;
        const edge = graph.getCellById(id);
        if (!edge || !edge.isEdge()) {
          return;
        }
        curEdge = edge;
        let cellNew1 = {};
        cellNew1 = JSON.parse(JSON.stringify(edge.attrs));
        const defaultLabelConfig = {
          labelText: "",
          labelDistance: "0.5",
          labelAngle: "0",
        };
        this.lineAttrConfigs.forEach((item, index) => {
          if (item.path) {
            if (item.path === "label") {
              this.lineAttrConfigs[index].value =
                edge.labels.length === 0
                  ? defaultLabelConfig[item.key]
                  : get(
                      JSON.parse(JSON.stringify(edge.labels))[0],
                      item.labelPath
                    );
            } else {
              this.lineAttrConfigs[index].value = get(cellNew1, item.path);
            }
          } else {
            this.lineAttrConfigs[index].value =
              edge.connector === undefined
                ? "normal"
                : JSON.parse(JSON.stringify(edge.connector)).name;
          }
        });
      }
      return curEdge;
    },
    onFormItemChange($event, type, index, key) {
      if (isObject($event)) {
        this.lineAttrConfigs[index][key] = $event.target.value;
      } else {
        this.lineAttrConfigs[index][key] = $event;
      }
    },
    // 线条样式选择
    handleChange(value) {
      this.globalNodeAttr.lineSelection = value;
    },
    // 标签样式
    handleChangeStyle(value) {
      this.globalNodeAttr.lineTextStyle = value;
    },
    // 标签旋转
    handleChangeRotate(value) {
      this.globalNodeAttr.lineTextStyleRotate = value;
    },
    // 数字加减
    onChange(value) {
      this.globalNodeAttr.attrsFontSize = value;
    },
    // 线条颜色点击
    colorClick(item) {
      this.globalNodeAttr.attrsLineColor = item;
    },
    // 取消
    reset() {
      // this.curEdge.removeTools();
      this.$emit("configclick", "edge");
    },
  },
};
</script>

<style lang="scss">
.ant-form-item {
  margin-bottom: 10px;
}
.m-colorPicker .colorBtn {
  width: 160px !important;
  height: 32px !important;
  border-radius: 4px;
  border: 1px solid #000000;
}

.ant-form-item-children {
  display: flex;
  flex-wrap: wrap;
}
.m-colorPicker .box.open {
  margin-left: -25px;
}
</style>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .ant-form-item {
    margin-bottom: 15px;
  }
  .submit {
    display: flex;
    justify-content: space-around;
  }
  .colorPicker {
    width: 100%;
  }
  .drag {
    color: red;
    text-align: left;
    line-height: 20px;
  }
}
</style>
