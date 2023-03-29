<template>
  <div name="DetailsImg" class="DetailsImg-wrap">
    <div class="imgbox">
      <div id="model" style="height: 100%; width: 100%"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsImg",
  methods: {
    createCharts() {
      let myChart = this.$echarts.init(document.getElementById("model"));
      let option = {
        backgroundColor: "#EEF1F3",
        toolbox: {
          feature: {
            saveAsImage: {},
            magicType: { type: ["force", "chord"] },
          },
        },
        color: [
          "#ee6666",
          "#91cc75",
          "#fac858",
          "#5470c6",
          "#73c0de",
          "#3ba272",
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
        ],
        title: {
          show: false,
          text: "产业链可视化",
          textStyle: {
            color: "#000",
            fontWeight: 700,
            fontSize: 20,
            left: "center",
          },
        },
        tooltip: {
          formatter: function (x) {
            return x.data.name;
          },
        },
        legend: [
          {
            //图例
            x: "center",
            show: true,
            data: [
              "所属行业",
              "附属行业",
              "子行业",
              "涉及公司",
              "主营产品",
              "产品小类",
              "涉及材料",
            ],
          },
        ],
        series: [
          {
            type: "graph",
            data: this.model_nodes,
            links: this.model_edges,
            legendHoverLink: true,
            layout: "force",
            categories: [
              { name: "所属行业", symbolSize: 60 },
              { name: "附属行业", symbolSize: 60 },
              { name: "子行业", symbolSize: 60 },
              { name: "涉及公司", symbolSize: 60 },
              { name: "主营产品", symbolSize: 60 },
              { name: "产品小类", symbolSize: 60 },
              { name: "涉及材料", symbolSize: 60 },
            ],
            force: {
              repulsion: [1000, 2000], //节点之间的斥力因子,支持设置成数组表达斥力的范围
              edgeLength: [10, 20],
              layoutAnimation: true,
              friction: 0.1, //节点的移动速度。取值范围 0 到 1。
              edgeLength: [70, 90], //两个节点之间的距离，这个距离也会受 repulsion影响
            },
            symbolSize: 60,
            itemStyle: {
              shadowColor: "#666",
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            draggable: true, //节点是否可拖拽，只在使用力引导布局的时候有用。
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 8],
            cursor: "pointer",
            label: {
              show: true, // 图形上的文本标签， 可用于说明图形的一些数据信息， 比如值， 名称等
              fontStyle: "oblique",
              // position: "top",
              fontSize: 12,
              color: "#000", //如果设置为 'inherit'，则为视觉映射得到的颜色，如系列色。
              width: 100,
              overflow: "break", //文字超出宽度是否截断或者换行。配置width时有效
            },
            labelLayout: {
              moveOverlap: "shiftX", //在标签重叠的时候是否挪动标签位置以防止重叠。
              draggable: true, //标签是否可以允许用户通过拖拽二次调整位置。
            },
            emphasis: {
              scale: true, //是否开启高亮后节点的放大效果。
              focus: "adjacency",
            },
            lineStyle: {
              color: "#3d3d3d",
              width: 2,
              curveness: 0, //关系线的曲度，支持从 0 到 1 的值，值越大曲度越大。
            },
            edgeLabel: {
              // show: true,
              fontWeight: 800,
              fontSize: 12,
              color: "#3d3d3d",
              formatter: function (x) {
                return x.data.name;
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      //窗口大小变化时，图表自适应窗口
      window.onresize = function () {
        myChart.resize();
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.createCharts();
      }, 500);
    });
  },
  props: ["model_nodes", "model_edges"],
};
</script>

<style scoped>
.DetailsImg-wrap {
  width: 800px;
  height: 800px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.imgbox {
  position: relative;
  width: 710px;
  height: 710px;
  padding: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>