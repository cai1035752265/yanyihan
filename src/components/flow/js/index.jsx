import { Addon, Graph, Shape } from "@antv/x6";
import { group3Items, renderSvg } from "../../../assets/svg/iconCodeMap";

export default class FlowGraph {
  // editIsSHow//是否只读,false只读,true操作
  static init(width, height, editIsSHow) {
    this.graph = new Graph({
      container: document.getElementById("flowContainer"),
      width: width,
      height: height,
      // 背景
      grid: {
        size: 10,
        visible: true,
        type: "mesh",
        args: [
          {
            color: "#cccccc",
            thickness: 1,
          },
          {
            color: "#5F95FF",
            thickness: 1,
            factor: 4,
          },
        ],
      },
      // 节点是否移动
      interacting: {
        nodeMovable: editIsSHow,
      },
      // 滚动画布
      scroller: {
        enabled: true,
      },
      // ctrl+滚轮缩放
      mousewheel: {
        enabled: true,
        modifiers: ["ctrl", "meta"],
        minScale: 0.5,
        maxScale: 2,
      },
      // 点选/框选。
      selecting: {
        enabled: editIsSHow,
        multiple: true,
        rubberband: editIsSHow, //框选
        movable: true,
        showNodeSelectionBox: false, //节点选择框
      },
      // 连接线
      connecting: {
        anchor: "center",
        connectionPoint: "anchor",
        allowBlank: false,
        highlight: true,
        snap: true, //自动吸附
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: "#A2B1C3",
                strokeWidth: 2,
                targetMarker: {
                  name: "block",
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          });
          // //新的连接线
          // return new Shape.Edge({
          //   attrs: {
          //     line: {
          //       stroke: "#5F95FF",
          //       strokeWidth: 2, //线条宽度
          //       targetMarker: {
          //         //箭头
          //         name: "classic",
          //         size: 8,
          //       },
          //     },
          //   },
          //   router: {
          //     name: "manhattan",
          //   },
          //   zIndex: 10,
          // });
        },
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          if (sourceView === targetView) {
            return false;
          }
          if (!sourceMagnet) {
            return false;
          }
          if (!targetMagnet) {
            return false;
          }
          return true;
        },
      },
      // 连接桩可连接样式设置
      highlighting: {
        magnetAvailable: {
          name: "stroke",
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: "rgba(223,234,255)",
            },
          },
        },
      },
      // 可旋转
      rotating: {
        enabled: true,
        grid: 5,
      },
      // 对齐线
      snapline: {
        enabled: true,
        resizing: true,
      },
      //撤销
      history: true,
      //剪切板
      clipboard: {
        enabled: true,
      },
      //键盘快捷键
      keyboard: {
        enabled: true,
      },
      // 是否允许调整大小
      resizing: {
        enabled: editIsSHow,
      },
      shouldUpdateHTMLComponent(node) {
        console.log("dataChange");
        // const data = node.getData();
        return node.hasChanged("data");
      },
    });

    if (editIsSHow) {
      this.initStencil(); // 左侧选择标题拖拽
      this.initShape(); //左侧选择节点导入
      this.initEvent(); //初始事件
    }
    return this.graph;
  }
  // 左侧选择标题拖拽
  static initStencil() {
    const { graph } = this;
    this.stencil = new Addon.Stencil({
      title: "节点选择",
      stencilGraphWidth: 180,
      stencilGraphHeight: 180,
      collapsable: false,
      target: graph,
      groups: [
        {
          title: "基础流程图",
          name: "group1",
        },
        {
          title: "系统设计图",
          name: "group2",
          graphHeight: 250,
          layoutOptions: {
            rowHeight: 70,
          },
        },
        {
          title: "自定义设计图",
          name: "group3",
          graphHeight: 65 * (Math.ceil(group3Items.length / 2) + 1),
          layoutOptions: {
            rowHeight: 70,
          },
        },
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55,
      },
    });
    console.log(document.getElementById("flowStencil"));
    const stencilContainer = document.querySelector("#flowStencil");
    stencilContainer.appendChild(this.stencil.container);
  }
  // 左侧选择节点导入
  static initShape() {
    // #region 初始化图形
    const ports = {
      groups: {
        top: {
          position: "top",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#5F95FF",
              strokeWidth: 1,
              fill: "#fff",
              style: {
                visibility: "hidden",
              },
            },
          },
        },
        right: {
          position: "right",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#5F95FF",
              strokeWidth: 1,
              fill: "#fff",
              style: {
                visibility: "hidden",
              },
            },
          },
        },
        bottom: {
          position: "bottom",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#5F95FF",
              strokeWidth: 1,
              fill: "#fff",
              style: {
                visibility: "hidden",
              },
            },
          },
        },
        left: {
          position: "left",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#5F95FF",
              strokeWidth: 1,
              fill: "#fff",
              style: {
                visibility: "hidden",
              },
            },
          },
        },
      },
      items: [
        {
          group: "top",
        },
        {
          group: "right",
        },
        {
          group: "bottom",
        },
        {
          group: "left",
        },
      ],
    };
    const { graph } = this;
    Graph.registerNode(
      "custom-rect",
      {
        inherit: "rect",
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: "#5F95FF",
            fill: "#EFF4FF",
          },
          text: {
            fontSize: 12,
            fill: "#262626",
          },
        },
        ports: { ...ports },
      },
      true
    );

    Graph.registerNode(
      "custom-polygon",
      {
        inherit: "polygon",
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: "#5F95FF",
            fill: "#EFF4FF",
          },
          text: {
            fontSize: 12,
            fill: "#262626",
          },
        },
        ports: {
          ...ports,
          items: [
            {
              group: "top",
            },
            {
              group: "bottom",
            },
          ],
        },
      },
      true
    );

    Graph.registerNode(
      "custom-circle",
      {
        inherit: "circle",
        width: 45,
        height: 45,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: "#5F95FF",
            fill: "#EFF4FF",
          },
          text: {
            fontSize: 12,
            fill: "#262626",
          },
        },
        ports: { ...ports },
      },
      true
    );

    Graph.registerNode(
      "custom-image",
      {
        inherit: "rect",
        width: 52,
        height: 52,
        markup: [
          {
            tagName: "rect",
            selector: "body",
          },
          {
            tagName: "image",
          },
          {
            tagName: "text",
            selector: "label",
          },
        ],
        attrs: {
          body: {
            stroke: "#5F95FF",
            fill: "#5F95FF",
          },
          image: {
            width: 26,
            height: 26,
            refX: 13,
            refY: 16,
          },
          label: {
            refX: 3,
            refY: 2,
            textAnchor: "left",
            textVerticalAnchor: "top",
            fontSize: 12,
            fill: "#fff",
          },
        },
        ports: { ...ports },
      },
      true
    );

    const r1 = graph.createNode({
      shape: "custom-rect",
      label: "开始",
      attrs: {
        body: {
          rx: 20,
          ry: 26,
        },
      },
    });
    const r2 = graph.createNode({
      shape: "custom-rect",
      label: "过程",
    });
    const r3 = graph.createNode({
      shape: "custom-rect",
      attrs: {
        body: {
          rx: 6,
          ry: 6,
        },
      },
      label: "可选过程",
    });
    const r4 = graph.createNode({
      shape: "custom-polygon",
      attrs: {
        body: {
          refPoints: "0,10 10,0 20,10 10,20",
        },
      },
      label: "决策",
    });
    const r5 = graph.createNode({
      shape: "custom-polygon",
      attrs: {
        body: {
          refPoints: "10,0 40,0 30,20 0,20",
        },
      },
      label: "数据",
    });
    const r6 = graph.createNode({
      shape: "custom-circle",
      label: "连接",
    });

    this.stencil.load([r1, r2, r3, r4, r5, r6], "group1");
    const wrap = document.createElement("div");
    wrap.style.width = "100%";
    wrap.style.height = "100%";
    wrap.style.background = "#f0f0f0";
    wrap.style.display = "flex";
    wrap.style.justifyContent = "center";
    wrap.style.alignItems = "center";
    wrap.innerText = "World";
    const imageShapes = [
      {
        label: "Client",
        image:
          "https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg",
      },
      {
        label: "Http",
        image:
          "https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg",
      },
      {
        label: "Api",
        image:
          "https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg",
      },
      {
        label: "Sql",
        image:
          "https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg",
      },
      {
        label: "Clound",
        image:
          "https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg",
      },
      {
        label: "Mq",
        image:
          "https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg",
      },
    ];
    const imageNodes = imageShapes.map((item) =>
      graph.createNode({
        shape: "custom-image",
        label: item.label,
        attrs: {
          image: {
            "xlink:href": item.image,
          },
        },
      })
    );
    this.stencil.load([...imageNodes], "group2");
    const itemOptions = group3Items.map((item) => {
      return {
        value: item.code,
        label: item.title,
      };
    });

    Graph.registerHTMLComponent("custom-html", (node) => {
      const data = node.getData();
      return `<div style="
                  background-color: ${data.attrsBackgroundColor};
                  height: 100%;
                  width: 100%">
                <div style="
                  color: ${data.fontColor};
                  font-size: ${data.fontSize};
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow:ellipsis;"
                title="${data.textContent}">${data.textContent}</div>
                <div style="text-align: center">${renderSvg(
                  data.code,
                  data.iconColor
                )}</div>
            </div>`;
    });
    const svgNodes = graph.addNode({
      x: 80,
      y: 80,
      width: 52,
      height: 52,
      data: {
        codeOptions: itemOptions,
        textContent: "已收到新业务委托",
        attrsBackgroundColor: "#5f95ff",
        code: "001",
        fontColor: "#ffffff",
        iconColor: "#ffffff",
        fontSize: 14,
      },
      shape: "html",
      html: "custom-html",
      ports: { ...ports },
    });
    this.stencil.load([svgNodes], "group3");
  }
  // 节点操作
  static initEvent() {
    const { graph } = this;
    graph.bindKey("backspace", () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });
  }
  // 连接桩隐藏处理
  static showPorts(ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  }
  // 载入数据
  static initGraphShape(item) {
    console.log("initGraphShape", item);
    this.graph.fromJSON(item);
  }
  // 销毁
  static destroy() {
    this.graph.dispose();
  }
}
