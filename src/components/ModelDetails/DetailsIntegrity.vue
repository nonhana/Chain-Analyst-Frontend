<template>
  <div name="DetailsIntegrity" class="DetailsIntegrity-wrap">
    <el-row>
      <span class="title">完整性评估</span>
    </el-row>
    <el-row>
      <span class="note">综合指数：{{ integrity_score }}</span>
    </el-row>
    <el-row>
      <span class="note">完整性评价：{{ integrity_details }}</span>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DetailsIntegrity",
  props: ["integrity_score", "integrity_details"],
};
</script>

<style scoped>
.DetailsIntegrity-wrap {
  width: 1190px;
  border-radius: 20px;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.DetailsIntegrity-wrap > * {
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