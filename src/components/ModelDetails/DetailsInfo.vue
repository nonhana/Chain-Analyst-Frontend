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
        <span>创建时间：{{ create_time }}</span>
      </div>
      <div
        style="
          border: 2px solid #9e9e9e;
          border-radius: 20px;
          width: max-content;
          padding: 10px;
        "
      >
        <div style="margin: 0 0 30px 0">
          <span
            >完整性评估指数：<span style="color: #00ff7b">{{
              integrity_score
            }}</span></span
          >
        </div>
        <div>
          <span
            >综合风险评估指数：<span style="color: #00ff7b">
              {{ risk_score }}
            </span></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsInfo",
  props: [
    "model_name",
    "model_type",
    "create_time",
    "integrity_score",
    "risk_score",
  ],
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
  margin: 30px;
}
.infobox > * span {
  font-family: Source Han Sans CN;
  font-size: 24px;
  font-weight: normal;
  color: #3d3d3d;
}
</style>