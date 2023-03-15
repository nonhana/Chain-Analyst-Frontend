<template>
  <div class="index">
    <transition
      enter-active-class="animate__animated animate__backInUp"
      leave-active-class="animate__animated animate__backOutDown"
    >
      <el-row
        v-if="upload_status == 0"
        type="flex"
        justify="center"
        style="margin: 60px 0 0 50px; position: absolute"
      >
        <UploadNodes @change_upload_status="change_upload_status" />
      </el-row>
    </transition>

    <transition
      enter-active-class="animate__animated animate__backInDown"
      leave-active-class="animate__animated animate__backOutUp"
    >
      <el-row
        v-if="upload_status == 1"
        type="flex"
        justify="center"
        style="margin: 60px 0 0 50px; position: absolute"
      >
        <UploadEdges
          @change_upload_status="change_upload_status"
          @submit_model="submit_model"
        />
      </el-row>
    </transition>

    <el-row
      v-if="upload_status == 2"
      type="flex"
      justify="center"
      style="margin: 60px 0 0 0"
    >
      <UploadFiles @submit_model="submit_model" />
    </el-row>

    <el-dialog
      title="产业链数据分析："
      class="uploadDialog"
      :visible.sync="dialogVisable"
    >
      <el-divider> <span class="dialogtitle">拓扑结构图</span></el-divider>

      <el-row type="flex" justify="center" style="margin: 30px 0 0 0">
        <div class="picturebox">
          <el-image
            style="height: 350px"
            :src="model_picture[0]"
            :preview-src-list="model_picture"
          >
          </el-image>
        </div>
      </el-row>

      <el-row type="flex" justify="center" style="margin: 30px">
        <div class="button">
          <span>完整性分析+风险评估</span>
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import UploadNodes from "@/components/ModelUpload/UploadNodes.vue";
import UploadEdges from "@/components/ModelUpload/UploadEdges.vue";
import UploadFiles from "@/components/ModelUpload/UploadFiles.vue";
export default {
  name: "upload-index",
  data() {
    return {
      upload_status: 0,
      dialogVisable: false,
      model_picture: ["https://dummyimage.com/400X400"],
    };
  },
  components: {
    UploadNodes,
    UploadEdges,
    UploadFiles,
  },
  methods: {
    change_upload_status(val) {
      this.upload_status = val;
    },
    submit_model(val) {
      this.dialogVisable = val;
    },
  },
  watch: {
    $route: {
      handler: function (newV, _) {
        this.upload_status = newV.query.upload_status;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.index {
  width: 100%;
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
  margin: 0 auto;
  background: #ffffff;
  border-radius: 30px;
  box-sizing: border-box;
  width: 800px;
  height: 600px;
  overflow: hidden;
}
.dialogtitle {
  font-family: Source Han Sans CN;
  font-size: 18px;
  font-weight: normal;
  color: #9e9e9e;
}
.picturebox {
  width: 700px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  width: max-content;
  height: max-content;
  padding: 10px 20px;
  border-radius: 30px;
  background: #00ff7b;
  transition: all 0.3s ease;
  cursor: pointer;
}
.button:hover {
  box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.button span {
  font-family: Source Han Sans CN;
  font-size: 18px;
  font-weight: normal;
  color: #ffffff;
}
</style>