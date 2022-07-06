<template>
  <a-card class="box" title="节点设置">
    <a-form :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
      <template v-for="(config, index) in nodeAttrConfigs" :key="index">
        <a-form-item v-if="config.type === 'input'" :label="config.label">
          <a-input
            v-model:value="config.value"
            @change="onFormItemChange($event, config.type, index)"
          />
        </a-form-item>
        <a-form-item v-if="config.type === 'color'" :label="config.label">
          <input
            type="color"
            class="colorPicker"
            @input="onFormItemChange($event, config.type, index)"
            v-model="config.value"
          />
        </a-form-item>
        <a-form-item v-if="config.type === 'inputNumber'" :label="config.label">
          <a-input-number
            style="width: 100%"
            id="inputNumber"
            v-model:value="config.value"
            :min="1"
            :max="100"
            @change="onFormItemChange($event, config.type, index)"
          />
        </a-form-item>
        <a-form-item v-if="config.type === 'select'" :label="config.label">
          <a-row>
            <a-col :span="20">
              <a-select
                :options="codeOptions"
                v-model:value="config.value"
                @change="
                  (value, option) =>
                    onFormItemChange(option, config.type, index)
                "
            /></a-col>
            <a-col :span="4" style="top: 3px" :code="config.value"
              ><svg-icon :code="config.value"
            /></a-col>
          </a-row>
        </a-form-item>
      </template>
    </a-form>
    <div class="submit">
      <a-button type="danger" @click="reset">取消</a-button>
      <a-button type="primary" @click="setNodeValue">预览</a-button>
      <a-button type="primary" @click="primary">保存</a-button>
    </div>
  </a-card>
</template>

<script>
import FlowGraph from "../../js/index.jsx";
import { cloneDeep, get, isObject } from "lodash-es";
import SvgIcon from "../../../SvgIcon.vue";
export default {
  name: "Index1",
  components: {
    SvgIcon,
  },
  props: {
    id: {
      type: String,
      default: null,
      require: true,
    },
    shapeType: {
      type: String,
      default: null,
      require: true,
    },
  },
  data() {
    return {
      curCel: "",
      addNodeIsShow: true,
      cellNew1: {},
      nodeAttrConfigs: [],
      codeOptions: [],
      oldNodeAttrConfigs: [],
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
      this.nodeAttrConfigs =
        this.shapeType === "html"
          ? [
              {
                type: "color",
                key: "attrsBackgroundColor",
                label: "背景颜色",
                value: null,
              },
              {
                type: "select",
                key: "code",
                label: "图标类型",
                labalIndex: 5,
                value: null,
              },
              {
                type: "color",
                key: "iconColor",
                label: "图标颜色",
                value: null,
              },
              {
                type: "inputNumber",
                key: "fontSize",
                label: "字体大小",
                value: null,
              },
              {
                type: "color",
                key: "fontColor",
                label: "字体颜色",
                value: null,
              },
              {
                type: "input",
                key: "textContent",
                label: "内容",
                value: null,
              },
            ]
          : [
              {
                type: "color",
                key: "attrsBackgroundColor",
                label: "背景颜色",
                path: "body.fill",
                value: null,
              },
              {
                type: "color",
                key: "attrsBorderColor",
                label: "边框颜色",
                path: "body.stroke",
                value: null,
              },
              {
                type: "inputNumber",
                key: "fontSize",
                label: "字体大小",
                path: "text.fontSize",
                value: null,
              },
              {
                type: "color",
                key: "fontColor",
                label: "字体颜色",
                value: null,
                path: "text.fill",
              },
              {
                type: "input",
                key: "textContent",
                path: "text.text",
                label: "内容",
                value: null,
              },
            ];
      this.curCel = this.nodeOpt(nv);
    },
  },
  methods: {
    // 设置
    primary() {
      this.setNodeValue();
      this.$emit("configClick", "node");
    },
    // 处理
    nodeOpt(id) {
      let curCel = null;
      if (id) {
        const { graph } = FlowGraph;
        const cell = graph.getCellById(id);
        if (!cell || !cell.isNode()) {
          return;
        }
        curCel = cell;
        if (this.shapeType === "html") {
          const data = JSON.parse(JSON.stringify(cell.store.data.data));
          this.codeOptions = data.codeOptions;
          this.nodeAttrConfigs.forEach((item, index) => {
            this.nodeAttrConfigs[index].value = data[item.key];
          });
        } else {
          this.cellNew1 = JSON.parse(JSON.stringify(cell.attrs));
          this.nodeAttrConfigs.forEach((item, index) => {
            this.nodeAttrConfigs[index].value = get(this.cellNew1, item.path);
          });
        }
        this.oldNodeAttrConfigs = cloneDeep(this.nodeAttrConfigs);
      }
      return curCel;
    },
    setNodeValue() {
      if (this.shapeType === "html") {
        let newData = cloneDeep(this.curCel.getData());
        this.nodeAttrConfigs.forEach((item) => {
          newData[item.key] = item.value;
        });
        this.curCel.updateData(newData);
      } else {
        this.nodeAttrConfigs.forEach((item) => {
          this.curCel.attr(item.path.replace(".", "/"), item.value);
        });
      }
    },
    // 取消
    reset() {
      if (
        JSON.stringify(this.oldNodeAttrConfigs) !==
        JSON.stringify(this.nodeAttrConfigs)
      ) {
        this.nodeAttrConfigs = cloneDeep(this.oldNodeAttrConfigs);
        this.setNodeValue();
      }
      this.$emit("configClick", "node");
    },
    onFormItemChange($event, type, index) {
      let curItem = this.nodeAttrConfigs[index];
      if (isObject($event)) {
        if (curItem.labalIndex !== undefined) {
          curItem.value = $event.value;
          this.nodeAttrConfigs[curItem.labalIndex].value = $event.label;
        } else {
          curItem.value = $event.target.value;
        }
      } else {
        curItem.value = $event;
      }
      this.$forceUpdate();
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
}
</style>
