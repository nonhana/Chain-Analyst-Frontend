<template>
  <div name="DetailsIntegrity" class="DetailsIntegrity-wrap">
    <el-row type="flex" justify="space-between" style="width: 95%">
      <div>
        <span class="title">完整性评估</span>
      </div>
      <div>
        <el-button @click="edit_model(model_id)">重新编辑 / 上传模型</el-button>
      </div>
    </el-row>
    <el-row>
      <span class="note">综合指数：{{ integrity_score }}</span>
    </el-row>
    <el-row type="flex" justify="space-between" style="width: 95%">
      <div>
        <span class="note">完整性评价：{{ integrity_details }}</span>
      </div>
      <div>
        <el-button @click="show_details()">查看分析详情</el-button>
      </div>
    </el-row>

    <el-dialog
      title="完整性评估详情"
      class="detailDialog"
      :visible.sync="dialogVisable"
    >
      <el-row>
        <div>
          <span>该模型的各类型节点个数：</span>
          <span></span>
        </div>
      </el-row>

      <el-row>
        <span>该模型的边个数：</span>
      </el-row>

      <el-row>
        <span>存在问题：</span>
      </el-row>

      <el-row>
        <span>调整建议：</span>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DetailsIntegrity",
  data() {
    return {
      dialogVisable: false,
    };
  },
  methods: {
    edit_model(id) {
      this.$router.push({
        path: "/upload",
        query: {
          upload_status: 3,
          model_id: id,
        },
      });
    },
    show_details() {
      this.dialogVisable = true;
    },
  },
  props: ["integrity_score", "integrity_details", "model_id"],
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
.detailDialog >>> .el-dialog__header {
  padding: 10px 20px;
  height: 40px;
  line-height: 30px;
  text-align: left;
  background: #00ff7b;
  display: flex;
  align-items: center;
}
.detailDialog >>> .el-dialog__title {
  margin: 0 0 0 20px;
  font-family: Source Han Sans CN;
  font-size: 18px;
  font-weight: normal;
  color: #ffffff;
}
::v-deep.detailDialog .el-dialog {
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
</style>