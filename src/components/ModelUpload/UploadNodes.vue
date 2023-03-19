<template>
  <div name="UploadNodes" class="UploadNodes-wrap">
    <el-row type="flex" style="align-items: center">
      <div class="titleline"></div>
      <span class="title" style="margin: 0 0 0 15px">上传产业链数据</span>
    </el-row>

    <el-row type="flex" style="margin: 30px 0">
      <span class="title">2.添加涉及节点</span>
    </el-row>

    <div class="uploaddata" style="margin: 50px 0 0 0">
      <el-row
        type="flex"
        justify="space-between"
        style="width: 600px; align-items: center"
      >
        <span>所属行业</span>
        <el-select
          popper-class="selectbox"
          v-model="n"
          ref="labelSelect"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入所属行业"
          style="width: 400px"
        >
          <el-option
            v-for="item in nodes_list1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
        style="width: 600px; align-items: center"
      >
        <span>附属行业</span>
        <el-select
          popper-class="selectbox"
          v-model="m1"
          ref="labelSelect"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入所属行业"
          style="width: 400px"
        >
          <el-option
            v-for="item in nodes_list2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
        style="width: 600px; align-items: center"
      >
        <span>子行业</span>
        <el-select
          popper-class="selectbox"
          v-model="m2"
          ref="labelSelect"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入所属行业"
          style="width: 400px"
        >
          <el-option
            v-for="item in nodes_list3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
        style="width: 600px; align-items: center"
      >
        <span>涉及公司</span>
        <el-select
          popper-class="selectbox"
          v-model="m3"
          ref="labelSelect"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入所属行业"
          style="width: 400px"
        >
          <el-option
            v-for="item in nodes_list4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
        style="width: 600px; align-items: center"
      >
        <span>主营产品</span>
        <el-select
          popper-class="selectbox"
          v-model="m4"
          ref="labelSelect"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入所属行业"
          style="width: 400px"
        >
          <el-option
            v-for="item in nodes_list5"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
        style="width: 600px; align-items: center"
      >
        <span>产品小类</span>
        <el-select
          popper-class="selectbox"
          v-model="m5"
          ref="labelSelect"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入所属行业"
          style="width: 400px"
        >
          <el-option
            v-for="item in nodes_list6"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>

      <el-row
        type="flex"
        justify="space-between"
        style="width: 600px; align-items: center"
      >
        <span>涉及材料</span>
        <el-select
          popper-class="selectbox"
          v-model="m6"
          ref="labelSelect"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入所属行业"
          style="width: 400px"
        >
          <el-option
            v-for="item in nodes_list7"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>
    </div>

    <el-row type="flex" justify="center" style="margin: 50px 0 0 0">
      <div
        class="button"
        @click="change_upload_status(0)"
        style="margin: 0 50px 0 0"
      >
        <span>上一步</span>
      </div>
      <div class="button" @click="change_upload_status(2)">
        <span>下一步</span>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UploadNodes",
  data() {
    return {
      model_nodes_type: ["n", "m1", "m2", "m3", "m4", "m5", "m6"],
      n: [],
      m1: [],
      m2: [],
      m3: [],
      m4: [],
      m5: [],
      m6: [],

      nodes_list1: [],
      nodes_list2: [],
      nodes_list3: [],
      nodes_list4: [],
      nodes_list5: [],
      nodes_list6: [],
      nodes_list7: [],
    };
  },
  methods: {
    change_upload_status(num) {
      this.$emit("change_upload_status", num);
      const model_nodes = {
        n: [],
        m1: [],
        m2: [],
        m3: [],
        m4: [],
        m5: [],
        m6: [],
      };
      this.n.forEach((item) => {
        model_nodes.n.push({
          label: item,
          value: item,
        });
      });
      this.m1.forEach((item) => {
        model_nodes.m1.push({
          label: item,
          value: item,
        });
      });
      this.m2.forEach((item) => {
        model_nodes.m2.push({
          label: item,
          value: item,
        });
      });
      this.m3.forEach((item) => {
        model_nodes.m3.push({
          label: item,
          value: item,
        });
      });
      this.m4.forEach((item) => {
        model_nodes.m4.push({
          label: item,
          value: item,
        });
      });
      this.m5.forEach((item) => {
        model_nodes.m5.push({
          label: item,
          value: item,
        });
      });
      this.m6.forEach((item) => {
        model_nodes.m6.push({
          label: item,
          value: item,
        });
      });
      localStorage.setItem("model_nodes", JSON.stringify(model_nodes));
    },
  },
  mounted() {
    if (localStorage.getItem("model_nodes")) {
      this.model_nodes_type.forEach((item) => {
        JSON.parse(localStorage.getItem("model_nodes"))[item].forEach(
          (label) => {
            this[item].push(label.label);
          }
        );
      });
    }
  },
};
</script>

<style scoped>
.UploadNodes-wrap {
  position: relative;
  width: 1170px;
  height: 920px;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  padding: 30px 40px;
  transform: scale(0.8);
  margin: -50px 0 0 0;
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
.uploaddata > * {
  margin: 40px auto 0;
}
.uploaddata span {
  font-family: Source Han Sans CN;
  font-size: 24px;
  font-weight: normal;
  color: #3d3d3d;
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