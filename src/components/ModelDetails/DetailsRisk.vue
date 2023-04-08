<template>
  <div name="DetailsRisk" class="DetailsRisk-wrap">
    <div style="width: 65%">
      <el-row>
        <span class="title">风险评估</span>
      </el-row>
      <el-row>
        <span class="note">综合指数：{{ risk_score }}</span>
      </el-row>
      <el-row>
        <span class="note">当前存在的主要风险：{{ risk_main }}</span>
      </el-row>
      <el-row>
        <div>
          <span class="note">规避当前风险的主要措施：</span>
        </div>
        <div v-for="(item, index) in risk_method" :key="index">
          <span class="methods">○ {{ item }}</span>
        </div>
      </el-row>
    </div>
    <div style="height: 300px; width: 35%" id="radar"></div>
  </div>
</template>

<script>
export default {
  name: "DetailsRisk",
  props: ["risk_score", "risk_main", "risk_method", "risk_scorelist"],
  methods: {
    createCharts() {
      const chartInstance = this.$echarts.init(
        document.getElementById("radar")
      );
      const option = {
        title: {
          text: "主要风险概率分布图",
        },
        radar: {
          indicator: [
            { name: "上游风险", max: 1 },
            { name: "下游风险", max: 1 },
            { name: "市场风险", max: 1 },
            { name: "外部风险", max: 1 },
            { name: "内部管理风险", max: 1 },
          ],
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: this.risk_scorelist,
              },
            ],
          },
        ],
      };

      option && chartInstance.setOption(option);
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.createCharts();
      }, 500);
    });
  },
};
</script>

<style scoped>
.DetailsRisk-wrap {
  width: 1190px;
  border-radius: 20px;
  padding: 30px;
  opacity: 1;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.DetailsRisk-wrap > * {
  margin: 0 0 30px 0;
}
.title {
  font-family: Source Han Sans CN;
  font-size: 24px;
  font-weight: bold;
  color: #3d3d3d;
}
.note {
  font-family: Source Han Sans CN;
  font-size: 24px;
  font-weight: normal;
  color: #3d3d3d;
}
.methods {
  font-family: Source Han Sans CN;
  font-size: 20px;
  font-weight: normal;
  color: #9e9e9e;
}
</style>