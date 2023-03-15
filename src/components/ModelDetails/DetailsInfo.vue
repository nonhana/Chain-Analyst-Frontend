<template>
  <div name="DetailsInfo" class="DetailsInfo-wrap">
    <div class="infobox">
      <div>
        <span>产业链名称：{{ model_name }}</span>
      </div>
      <div>
        <span>产业链类型：{{ model_type }}</span>
      </div>
      <div>
        <span>创建时间：{{ model_create_time }}</span>
      </div>
      <div>
        <span style="color: #00ff7b"
          >完整性评估指数：{{ integrity_score }}</span
        >
      </div>
      <div>
        <span style="color: #00ff7b">综合风险评估指数：{{ risk_score }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsInfo",
  data() {
    return {
      model_name: "名称",
      model_type: "基础化工",
      model_create_time: "2023-03-14",
      integrity_score: "100.0",
      risk_score: "100.0",
    };
  },
};
</script>

<style scoped>
.DetailsInfo-wrap {
  width: 360px;
  height: 360px;
  border-radius: 20px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.infobox > * {
  margin: 30px 30px;
}
.infobox > * span {
  font-family: Source Han Sans CN;
  font-size: 24px;
  font-weight: normal;
  color: #3d3d3d;
}
</style>