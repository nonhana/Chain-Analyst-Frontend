<template>
  <div name="DetailsRisk" class="DetailsRisk-wrap">
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
      <span class="note">规避当前风险的主要措施：{{ risk_method }}</span>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DetailsRisk",
  props: ["risk_score", "risk_main", "risk_method"],
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
</style>