<template>
  <div name="UploadEdges" class="UploadEdges-wrap">
    <el-row type="flex" style="align-items: center">
      <div class="titleline"></div>
      <span class="title" style="margin: 0 0 0 15px">上传产业链数据</span>
    </el-row>

    <el-row type="flex" justify="center">
      <el-row
        type="flex"
        justify="space-between"
        style="margin: 30px 0 0 0; width: 1041px"
      >
        <div>
          <span class="title">3.添加节点所涉及的边</span>
        </div>
        <div>
          <div class="littlebutton" @click="upload_new_edge()">
            <span>新增关系</span>
          </div>
        </div>
      </el-row>
    </el-row>

    <el-row style="margin: 30px 0 0 70px">
      <span class="note">当前边个数：{{ present_num }}</span>
    </el-row>

    <el-row
      type="flex"
      justify="center"
      style="margin: 30px 0 0 0; flex-wrap: wrap"
      class="edgeItem-list"
    >
      <edgeItem
        v-for="(item, index) in edge_list"
        :key="index"
        :id="item.id"
        :startnode="item.start"
        :edgename="item.name"
        :endnode="item.end"
        @edit_item="edit_item"
        @delete_item="delete_item"
      />
    </el-row>

    <el-row
      type="flex"
      justify="center"
      style="position: absolute; bottom: 40px; left: 390px"
    >
      <div
        style="margin: 0 30px 0 0"
        class="button"
        @click="change_upload_status(1)"
      >
        <span>上一步</span>
      </div>
      <div class="button" @click="submit_model()">
        <span>提交产业链模型</span>
      </div>
    </el-row>

    <el-dialog
      title="请填写新增关系信息："
      class="uploadDialog"
      :visible.sync="edgedialogVisable"
    >
      <el-row type="flex" justify="center" style="flex-wrap: wrap">
        <el-row
          type="flex"
          justify="space-between"
          style="width: 90%; align-items: center"
        >
          <div>
            <span>起始节点</span>
          </div>
          <div>
            <span>类型：</span>
            <el-dropdown @command="chooseStartType">
              <span class="el-dropdown-link">
                {{ start_type
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in node_type"
                  :key="index"
                  :command="item"
                  >{{ item }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-select
              v-model="startnode"
              ref="labelSelect"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="选择具体节点"
              style="width: 150px"
            >
              <el-option
                v-for="item in start_nodes_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-row>

        <el-row
          type="flex"
          justify="space-between"
          style="width: 90%; align-items: center; margin: 30px 0 0 0"
        >
          <div>
            <span>关系名</span>
          </div>
          <div>
            <el-input
              v-model="edge_name"
              placeholder="请输入关系名称"
              style="width: 358px"
            ></el-input>
          </div>
        </el-row>

        <el-row
          type="flex"
          justify="space-between"
          style="width: 90%; align-items: center; margin: 30px 0 0 0"
        >
          <div>
            <span>终止节点</span>
          </div>
          <div>
            <span>类型：</span>
            <el-dropdown @command="chooseEndType">
              <span class="el-dropdown-link">
                {{ end_type }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in node_type"
                  :key="index"
                  :command="item"
                  >{{ item }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-select
              v-model="endnode"
              ref="labelSelect"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="选择具体节点"
              style="width: 150px"
            >
              <el-option
                v-for="item in end_nodes_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-row>

        <el-row type="flex" style="margin: 40px 0 0 0">
          <div class="littlebutton" @click="submit_edge()">
            <span>确定</span>
          </div>
        </el-row>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// 导入animate.css动画样式库
import "animate.css";
import edgeItem from "../little/edge-item.vue";
import { uploadModelAPI, updateModalAPI } from "@/api/model";
export default {
  name: "UploadEdges",
  data() {
    return {
      user_id: 0,
      model_id: 0,
      edgedialogVisable: false,
      edge_list: [],

      // 添加边弹窗内容信息
      model_nodes: {},
      startnode: [],
      endnode: [],
      start_type: "请选择",
      end_type: "请选择",
      node_type: [
        "所属行业",
        "附属行业",
        "子行业",
        "公司",
        "主营产品",
        "产品小类",
        "涉及材料",
      ],
      start_nodes_list: [],
      end_nodes_list: [],
      edge_name: "",
      model_nodes_type: ["n", "m1", "m2", "m3", "m4", "m5", "m6"],
    };
  },
  computed: {
    present_num() {
      return this.edge_list ? this.edge_list.length : 0;
    },
  },
  components: {
    edgeItem,
  },
  methods: {
    addZero(s) {
      return s < 10 ? "0" + s : s;
    },
    getNowTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let time = year + "-" + this.addZero(month) + "-" + this.addZero(day);
      return time;
    },
    change_upload_status(num) {
      this.$emit("change_upload_status", num);
    },
    upload_new_edge() {
      this.edgedialogVisable = true;
    },
    chooseStartType(val) {
      this.start_type = val;
      const index = this.node_type.indexOf(this.start_type);
      this.start_nodes_list = this.model_nodes[this.model_nodes_type[index]];
    },
    chooseEndType(val) {
      this.end_type = val;
      const index = this.node_type.indexOf(this.end_type);
      this.end_nodes_list = this.model_nodes[this.model_nodes_type[index]];
    },
    submit_edge() {
      let edge_item = {
        id: this.edge_list ? this.edge_list.length : 0,
        start: this.startnode[0],
        name: this.edge_name,
        end: this.endnode[0],
      };
      this.edge_list.push(edge_item);
      this.edgedialogVisable = false;
      localStorage.setItem("edge_list", JSON.stringify(this.edge_list));
      this.$notify({
        title: "添加成功",
        type: "success",
      });
    },
    edit_item(val) {
      this.edgedialogVisable = true;
    },
    delete_item(val) {
      this.edge_list.forEach((item, index) => {
        if (item.id == val) {
          this.edge_list.splice(index, 1);
        }
      });
    },
    submit_model() {
      if (
        localStorage.getItem("model_nodes") &&
        localStorage.getItem("model_info")
      ) {
        if (!this.$route.query.model_id) {
          const model_info = JSON.parse(localStorage.getItem("model_info"));
          const paramslist = {
            model_name: model_info.model_name,
            model_type: model_info.model_type,
            model_detail: model_info.model_detail,
            model_nodes: localStorage.getItem("model_nodes"),
            model_edges: localStorage.getItem("edge_list"),
            create_time: this.getNowTime(),
            update_time: this.getNowTime(),
            user_id: this.user_id,
            update_method: 0,
          };
          uploadModelAPI(paramslist).then((res) => {
            if (res.data) {
              if (res.data.result_code == 1) {
                this.$notify({
                  title: "提交模型失败",
                  message: `${res.data.result_msg}`,
                  type: "error",
                });
              } else {
                this.$notify({
                  title: "提交模型成功",
                  type: "success",
                });
                this.$emit("submit_model", true, "", this.model_id);
              }
            }
          });
        } else {
          const model_info = JSON.parse(localStorage.getItem("model_info"));
          const paramslist = {
            model_id: this.model_id,
            model_name: model_info.model_name,
            model_type: model_info.model_type,
            model_detail: model_info.model_detail,
            model_nodes: localStorage.getItem("model_nodes"),
            model_edges: localStorage.getItem("edge_list"),
            update_time: this.getNowTime(),
            user_id: this.user_id,
            update_method: 0,
          };
          updateModalAPI(paramslist).then((res) => {
            if (res.data) {
              if (res.data.result_code == 1) {
                this.$notify({
                  title: "更新模型失败",
                  message: `${res.data.result_msg}`,
                  type: "error",
                });
              } else {
                this.$notify({
                  title: "更新模型成功",
                  type: "success",
                });
                localStorage.removeItem('model_nodes')
                localStorage.removeItem('edge_list')
                localStorage.removeItem('model_info')
                this.$emit("submit_model", true, "", this.model_id);
              }
            }
          });
        }
      }
    },
  },
  watch: {
    $route: {
      handler: function (newV, _) {
        this.model_id = newV.query.model_id ? Number(newV.query.model_id) : 0;
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.model_nodes = localStorage.getItem("model_nodes")
      ? JSON.parse(localStorage.getItem("model_nodes"))
      : {};
    this.edge_list = localStorage.getItem("edge_list")
      ? JSON.parse(localStorage.getItem("edge_list"))
      : [];
    this.user_id = JSON.parse(localStorage.getItem("user_info")).id;
  },
};
</script>

<style scoped>
.UploadEdges-wrap {
  position: relative;
  width: 1170px;
  height: 920px;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  padding: 30px 40px;
  margin: -50px 0 0 0;
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
.littlebutton {
  width: max-content;
  padding: 0 30px;
  height: 48px;
  border-radius: 24px;
  background: #00ff7b;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.littlebutton span {
  font-family: Source Han Sans CN;
  font-size: 24px;
  font-weight: normal;
  color: #ffffff;
}
.note {
  font-family: Source Han Sans CN;
  font-size: 24px;
  font-weight: normal;
  color: rgba(61, 61, 61, 0.5);
}
.edgeItem-list {
  height: 520px;
  overflow-y: scroll;
}
.edgeItem-list > * {
  margin: 0 0 30px 0;
}
.button {
  width: max-content;
  padding: 0 30px;
  height: 80px;
  border-radius: 40px;
  background: #00ff7b;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
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
  top: 50px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 30px;
  box-sizing: border-box;
  width: 600px;
  height: 400px;
  overflow: hidden;
}
</style>