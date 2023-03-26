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
        <span class="note">完整性评价：{{ integrity_evaluation }}</span>
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
      <div class="infobox">
        <el-row>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span>该模型的各类型节点个数：</span>
            <div>
              <el-button @click="edit_model(model_id)"
                >重新编辑 / 上传模型</el-button
              >
            </div>
          </div>
          <table>
            <tr v-for="(item, index) in nodes_list" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.num }}</td>
            </tr>
          </table>
        </el-row>

        <el-row>
          <div>
            <span>该模型的边个数：{{ integrity_info.edges_num }}</span>
          </div>
        </el-row>

        <el-row>
          <div>
            <span>存在问题：</span>
          </div>
          <table>
            <tr
              v-for="(item, index) in integrity_info.existed_questions"
              :key="index"
            >
              <td>{{ item }}</td>
            </tr>
          </table>
        </el-row>

        <el-row>
          <div>
            <span>调整建议：</span>
          </div>
          <table>
            <tr v-for="(item, index) in integrity_info.solutions" :key="index">
              <td>{{ item }}</td>
            </tr>
          </table>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DetailsIntegrity",
  data() {
    return {
      dialogVisable: false,
      label_list: ["n", "m1", "m2", "m3", "m4", "m5", "m6"],
      name_list: [
        "所属行业",
        "附属行业",
        "子行业",
        "涉及公司",
        "主营产品",
        "产品小类",
        "涉及材料",
      ],
      nodes_list: [],
    };
  },
  methods: {
    edit_model(id) {
      this.$router.push({
        path: "/upload",
        query: {
          upload_status: this.update_method,
          model_id: id,
        },
      });
    },
    show_details() {
      this.dialogVisable = true;
    },
  },
  props: [
    "integrity_score",
    "integrity_evaluation",
    "integrity_info",
    "model_id",
    "update_method",
  ],
  mounted() {
    setTimeout(() => {
      this.label_list.forEach((item, index) => {
        this.nodes_list.push({
          name: this.name_list[index],
          num: this.integrity_info.nodes_num[item],
        });
      });
      this.nodes_list.push({
        name: "总节点个数",
        num: this.integrity_info.nodes_num["total"],
      });
    }, 200);
  },
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
.infobox > * {
  margin: 0 0 30px;
}
table {
  border-collapse: collapse;
  margin: 10px 0 0 30px;
  text-align: center;
}
table td,
table th {
  border: 1px solid #cad9ea;
  padding: 0 10px;
  color: #666;
  height: 30px;
}
table thead th {
  background-color: #cce8eb;
  width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}
</style>