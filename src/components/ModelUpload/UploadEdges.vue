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
          <span class="title">2.添加节点所涉及的边</span>
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
        @click="change_upload_status(0)"
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
                v-for="item in start_nodes_list"
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
export default {
  name: "UploadEdges",
  data() {
    return {
      edgedialogVisable: false,
      edge_list: [],

      // 添加边弹窗内容信息
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
    };
  },
  computed: {
    present_num() {
      return this.edge_list.length;
    },
  },
  components: {
    edgeItem,
  },
  methods: {
    change_upload_status(num) {
      this.$emit("change_upload_status", num);
    },
    upload_new_edge() {
      this.edgedialogVisable = true;
    },
    chooseStartType(val) {
      this.start_type = val;
    },
    chooseEndType(val) {
      this.end_type = val;
    },
    submit_edge() {
      let edge_item = {
        id: this.edge_list.length,
        start: this.startnode[0],
        name: this.edge_name,
        end: this.endnode[0],
      };
      this.edge_list.push(edge_item);
      this.edgedialogVisable = false;
      this.$notify({
        title: "添加成功",
        type: "success",
      });
    },
    delete_item(val) {
      this.edge_list.forEach((item, index) => {
        if (item.id == val) {
          this.edge_list.splice(index, 1);
        }
      });
    },
    submit_model() {
      this.$emit("submit_model", true);
    },
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