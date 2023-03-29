<template>
  <div class="index">
    <transition
      enter-active-class="animate__animated animate__backInUp"
      leave-active-class="animate__animated animate__backOutDown"
    >
      <el-row
        v-if="upload_status == 0"
        type="flex"
        justify="center"
        style="margin: 0 0 0 50px; position: absolute"
      >
        <UploadInfo @change_upload_status="change_upload_status" />
      </el-row>
    </transition>

    <transition
      enter-active-class="animate__animated animate__backInUp"
      leave-active-class="animate__animated animate__backOutDown"
    >
      <el-row
        v-if="upload_status == 1"
        type="flex"
        justify="center"
        style="margin: 0 0 0 50px; position: absolute"
      >
        <UploadNodes @change_upload_status="change_upload_status" />
      </el-row>
    </transition>

    <transition
      enter-active-class="animate__animated animate__backInDown"
      leave-active-class="animate__animated animate__backOutUp"
    >
      <el-row
        v-if="upload_status == 2"
        type="flex"
        justify="center"
        style="margin: 0 0 0 50px; position: absolute"
      >
        <UploadEdges
          @change_upload_status="change_upload_status"
          @submit_model="submit_model"
        />
      </el-row>
    </transition>

    <el-row
      v-if="upload_status == 3"
      type="flex"
      justify="center"
      style="margin: 0 0 0 0"
    >
      <UploadFiles
        @submit_model="submit_model"
        @accept_file_data="accept_file_data"
      />
    </el-row>

    <el-dialog
      title="产业链数据分析："
      class="uploadDialog"
      :visible.sync="dialogVisable"
    >
      <el-divider> <span class="dialogtitle">拓扑结构图</span></el-divider>

      <el-row type="flex" justify="center" style="margin: 30px 0 0 0">
        <div class="picturebox">
          <div id="model" style="height: 500px; width: 100%"></div>
        </div>
      </el-row>

      <el-row type="flex" justify="center" style="margin: 30px">
        <div class="button" @click="chaindetails(model_id)">
          <span>完整性分析+风险评估</span>
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import UploadInfo from "@/components/ModelUpload/UploadInfo.vue";
import UploadNodes from "@/components/ModelUpload/UploadNodes.vue";
import UploadEdges from "@/components/ModelUpload/UploadEdges.vue";
import UploadFiles from "@/components/ModelUpload/UploadFiles.vue";
import { savePictureAPI, updateModelCoverAPI } from "@/api/model";
export default {
  name: "upload-index",
  data() {
    return {
      model_id: 0,
      upload_status: 0,
      dialogVisable: false,
      model_picture: ["https://dummyimage.com/400X400"],
      imgData: "",

      model_nodes: [],
      model_edges: [],
      model_nodes_type: ["n", "m1", "m2", "m3", "m4", "m5", "m6"],
      nodes_type: [
        "所属行业",
        "附属行业",
        "子行业",
        "涉及公司",
        "主营产品",
        "产品小类",
        "涉及材料",
      ],
    };
  },
  components: {
    UploadInfo,
    UploadNodes,
    UploadEdges,
    UploadFiles,
  },
  methods: {
    change_upload_status(val) {
      this.upload_status = val;
    },
    accept_file_data(model_nodes, model_edges) {
      const nodes_source = model_nodes;
      this.model_nodes_type.forEach((item, index) => {
        nodes_source[item].forEach((node) => {
          const node_item = {
            name: node.label,
            category: this.nodes_type[index],
          };
          this.model_nodes.push(node_item);
        });
      });
      // 对节点进行去重
      this.model_nodes = this.model_nodes.filter((item, index) => {
        return (
          this.model_nodes.findIndex((obj) => obj.name === item.name) === index
        );
      });
      const edges_source = model_edges;
      edges_source.forEach((item) => {
        const edge_item = {
          source: item.start,
          target: item.end,
          name: item.name,
        };
        this.model_edges.push(edge_item);
      });
    },
    submit_model(val, note, model_id) {
      this.dialogVisable = val;
      if (!note) {
        if (localStorage.getItem("model_nodes")) {
          const nodes_source = JSON.parse(localStorage.getItem("model_nodes"));
          this.model_nodes_type.forEach((item, index) => {
            nodes_source[item].forEach((node) => {
              const node_item = {
                name: node.label,
                category: this.nodes_type[index],
              };
              this.model_nodes.push(node_item);
            });
          });
        }
        if (localStorage.getItem("edge_list")) {
          const edges_source = JSON.parse(localStorage.getItem("edge_list"));
          edges_source.forEach((item) => {
            const edge_item = {
              source: item.start,
              target: item.end,
              name: item.name,
            };
            this.model_edges.push(edge_item);
          });
        }
      }
      this.model_id = model_id;
      this.$nextTick(() => {
        setTimeout(() => {
          this.createCharts();
          savePictureAPI({
            model_id: model_id,
            img_data: this.imgData,
          }).then((res) => {
            if (res.data) {
              // console.log(res.data);
              const img_url = res.data.img_url;
              updateModelCoverAPI({
                img_url: img_url,
                model_id: model_id,
              }).then((res) => {
                console.log(res.data);
              });
            }
          });
        }, 500);
      });
    },
    createCharts() {
      let myChart = this.$echarts.init(document.getElementById("model"));
      let option = {
        backgroundColor: "#EEF1F3",
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
      this.imgData = myChart.getConnectedDataURL({
        type: "png",
        backgroundColor: "#fff",
        pixelRatio: 1,
        excludeComponents: ["toolbox"], // 不包含工具栏
      });
    },
    chaindetails(model_id) {
      this.$router.push({
        path: "/details/" + model_id,
      });
    },
  },
  watch: {
    $route: {
      handler: function (newV, _) {
        this.upload_status = newV.query.upload_status;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.index {
  width: 100%;
}
.uploadDialog >>> .el-dialog__header {
  padding: 10px 20px;
  height: 40px;
  line-height: 30px;
  text-align: left;
  background: #00ff7b;
  display: flex;
  align-items: center;
}
.uploadDialog >>> .el-dialog__title {
  margin: 0 0 0 20px;
  font-family: Source Han Sans CN;
  font-size: 18px;
  font-weight: normal;
  color: #ffffff;
}
::v-deep.uploadDialog .el-dialog {
  position: relative;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 30px;
  box-sizing: border-box;
  width: 800px;
  overflow: hidden;
}
.dialogtitle {
  font-family: Source Han Sans CN;
  font-size: 18px;
  font-weight: normal;
  color: #9e9e9e;
}
.picturebox {
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  width: max-content;
  height: max-content;
  padding: 10px 20px;
  border-radius: 30px;
  background: #00ff7b;
  transition: all 0.3s ease;
  cursor: pointer;
}
.button:hover {
  box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.button span {
  font-family: Source Han Sans CN;
  font-size: 18px;
  font-weight: normal;
  color: #ffffff;
}
</style>