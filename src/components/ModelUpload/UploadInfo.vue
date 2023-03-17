<template>
  <div name="UploadInfo" class="UploadInfo-wrap">
    <el-row type="flex" style="align-items: center">
      <div class="titleline"></div>
      <span class="title" style="margin: 0 0 0 15px">上传产业链数据</span>
    </el-row>

    <el-row type="flex" style="margin: 30px 0">
      <span class="title">1.填写基本信息</span>
    </el-row>

    <el-row class="infoform">
      <el-row
        type="flex"
        justify="space-between"
        style="width: 700px; align-items: center"
      >
        <div>
          <span>* 产业链模型名称：</span>
        </div>
        <div>
          <el-input
            v-model="model_info.model_name"
            placeholder="请输入产业链名称"
          ></el-input>
        </div>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
        style="width: 700px; align-items: center"
      >
        <div>
          <span>* 产业链模型类型：</span>
        </div>
        <div>
          <el-input
            v-model="model_info.model_type"
            placeholder="请输入产业链类型"
          ></el-input>
        </div>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
        style="width: 700px; align-items: center"
      >
        <div>
          <span>产业链概述：</span>
        </div>
        <div>
          <el-input
            v-model="model_info.model_detail"
            placeholder="可选择输入产业链概述，不超过200字"
            max="200"
          ></el-input>
        </div>
      </el-row>
    </el-row>

    <el-row type="flex" justify="center" style="margin: 50px 0 0 0">
      <div class="button" @click="change_upload_status(1)">
        <span>下一步</span>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UploadInfo",
  data() {
    return {
      model_info: {
        model_name: "",
        model_type: "",
        model_detail: "",
      },
    };
  },
  methods: {
    change_upload_status(num) {
      if (this.model_info.model_name && this.model_info.model_type) {
        localStorage.setItem("model_info", JSON.stringify(this.model_info));
        this.$emit("change_upload_status", num);
      } else {
        this.$notify({
          title: "提交失败！",
          message: "还有必填项未填好哦",
          type: "error",
        });
      }
    },
  },
  mounted() {
    if (localStorage.getItem("model_info")) {
      this.model_info = JSON.parse(localStorage.getItem("model_info"));
    }
  },
};
</script>

<style scoped>
.UploadInfo-wrap {
  position: relative;
  width: 1170px;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  padding: 30px 40px 40px;
  transform: scale(0.8);
}
.titleline {
  width: 12px;
  height: 73px;
  background: #00ff7b;
}
.title {
  font-family: Microsoft YaHei;
  font-size: 36px;
  font-weight: bold;
  color: #3d3d3d;
}
.infoform > * {
  margin: 20px auto 0;
}
.infoform span {
  font-family: Source Han Sans CN;
  font-size: 24px;
  font-weight: normal;
  color: #3d3d3d;
}
::v-deep .el-input__inner {
  width: 400px;
  height: 60px;
  background: #ffffff;
  border-radius: 15px;
}
.button {
  width: 180px;
  height: 80px;
  border-radius: 40px;
  background: #00ff7b;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.button:hover {
  box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.button span {
  font-family: Source Han Sans CN;
  font-size: 32px;
  font-weight: normal;
  color: #ffffff;
}
</style>