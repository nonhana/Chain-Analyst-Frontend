<template>
  <div name="InfoMain" class="InfoMain-wrap">
    <el-row>
      <div style="display: flex; margin: 20px 0 20px 100px">
        <div class="titleline"></div>
        <div style="margin: 10px 0 0 10px">
          <font class="title">&nbsp;个人资料信息设置</font>
        </div>
      </div>
    </el-row>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="forms">
        <el-row type="flex" justify="space-between" style="width: 620px">
          <font>用户名：</font>
          <el-form-item prop="name">
            <el-input
              style="width: 400px; height: 50px"
              class="public-uncheck"
              v-model="ruleForm.username"
              placeholder="请设置您的名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-row>

        <el-row type="flex" justify="space-between" style="width: 422px">
          <font>个人头像：</font>
          <el-upload
            class="head-avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="uploadHeadImage"
            :show-file-list="false"
            :before-upload="headbeforeAvatarUpload"
            :on-change="handlehead"
          >
            <img
              v-if="croppedHeadimageUrl"
              :src="croppedHeadimageUrl"
              class="head-avatar"
            />
            <i v-else class="el-icon-plus head-avatar-uploader-icon"></i>
          </el-upload>
        </el-row>

        <el-dialog title="图片切割" :visible.sync="header_dialogFormVisible">
          <div>
            <vue-cropper
              :img="headimageUrl"
              ref="headerCropper"
              centerBox
              class="cropper"
              :outputSize="cropOptions.header.outputSize"
              :info="cropOptions.header.info"
              :canScale="cropOptions.header.canScale"
              :autoCrop="cropOptions.header.autoCrop"
              :autoCropWidth="cropOptions.header.autoCropWidth"
              :autoCropHeight="cropOptions.header.autoCropHeight"
              :fixed="cropOptions.header.fixed"
              :fixedNumber="cropOptions.header.fixedNumber"
              :full="cropOptions.header.full"
              :original="cropOptions.header.original"
              :enlarge="cropOptions.header.enlarge"
              :mode="cropOptions.header.mode"
            />
          </div>
          <el-row type="flex" justify="end" style="margin: 20px 29px 0 0">
            <el-button @click="header_dialogFormVisible = false"
              >取 消</el-button
            >
            <el-button
              type="primary"
              block
              @click="
                header_dialogFormVisible = false;
                getCropData('header');
              "
              :loading="loading"
              >确 定
            </el-button>
          </el-row>
        </el-dialog>

        <el-row
          type="flex"
          justify="space-between"
          style="width: 897px; margin: 40px 0 0 0"
        >
          <font>背景图片：</font>
          <el-upload
            class="back-avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="uploadBackImage"
            :show-file-list="false"
            :before-upload="backbeforeAvatarUpload"
            :on-change="handleback"
          >
            <img
              v-if="croppedBackimageUrl"
              :src="croppedBackimageUrl"
              class="back-avatar"
            />
            <i v-else class="el-icon-plus back-avatar-uploader-icon"></i>
          </el-upload>
        </el-row>

        <el-dialog
          title="图片切割"
          :visible.sync="background_dialogFormVisible"
        >
          <div>
            <vue-cropper
              :img="backimageUrl"
              ref="backgroundCropper"
              centerBox
              class="cropper"
              :outputSize="cropOptions.background.outputSize"
              :info="cropOptions.background.info"
              :canScale="cropOptions.background.canScale"
              :autoCrop="cropOptions.background.autoCrop"
              :autoCropWidth="cropOptions.background.autoCropWidth"
              :autoCropHeight="cropOptions.background.autoCropHeight"
              :full="cropOptions.background.full"
              :fixed="cropOptions.background.fixed"
              :fixedNumber="cropOptions.background.fixedNumber"
              :enlarge="cropOptions.background.enlarge"
              :mode="cropOptions.background.mode"
            />
          </div>
          <el-row type="flex" justify="end" style="margin: 20px 29px 0 0">
            <el-button @click="background_dialogFormVisible = false"
              >取 消</el-button
            >
            <el-button
              type="primary"
              block
              ref="cropper"
              @click="
                background_dialogFormVisible = false;
                getCropData('background');
              "
              >确 定
            </el-button>
          </el-row>
        </el-dialog>

        <el-row type="flex" justify="end" style="margin: 30px 60px 0 0">
          <div class="button" @click="submit()">
            <font>确认提交</font>
          </div>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import { updateUserInfoAPI, uploadImageAPI, deleteImageAPI } from "@/api/user";
import { VueCropper } from "vue-cropper";
export default {
  name: "InfoMain",
  data() {
    return {
      loading: false,
      originUserInfo: { ...JSON.parse(localStorage.getItem("user_info")) },
      headimageUrl: "",
      croppedHeadimageUrl: "",
      headimageFile: {},
      uploadHeadImageTime: 0,
      backimageUrl: "",
      croppedBackimageUrl: "",
      backimageFile: {},
      uploadBackImageTime: 0,
      value: [],
      ruleForm: { ...JSON.parse(localStorage.getItem("user_info")) },
      rules: {
        name: [
          { required: true, message: "用户名是必填项！", trigger: "blur" },
        ],
      },
      // vue-cropper相关的配置
      cropOptions: {
        header: {
          outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
          // outputType: "jpeg", //裁剪生成图片的格式（jpeg || png || webp）
          info: true, //图片大小信息
          canScale: true, //图片是否允许滚轮缩放
          autoCrop: true, //是否默认生成截图框
          autoCropWidth: 200, //默认生成截图框宽度
          autoCropHeight: 200, //默认生成截图框高度
          fixed: true, //是否开启截图框宽高固定比例
          fixedNumber: [1, 1], //截图框的宽高比例
          // full: false, //false按原比例裁切图片，不失真
          // fixedBox: true, //固定截图框大小，不允许改变
          // canMove: false, //上传图片是否可以移动
          // canMoveBox: true, //截图框能否拖动
          original: false, //上传图片按照原始比例渲染
          // centerBox: false, //截图框是否被限制在图片里面
          // height: true, //是否按照设备的dpr 输出等比例图片
          // infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
          // maxImgSize: 3000, //限制图片最大宽度和高度
          enlarge: 1, //图片根据截图框输出比例倍数
          mode: "650px 350px", //图片默认渲染方式
        },
        background: {
          outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
          // outputType: "jpeg", //裁剪生成图片的格式（jpeg || png || webp）
          info: true, //图片大小信息
          canScale: true, //图片是否允许滚轮缩放
          autoCrop: true, //是否默认生成截图框
          autoCropWidth: 675, //默认生成截图框宽度
          autoCropHeight: 142.5, //默认生成截图框高度
          fixed: true, //是否开启截图框宽高固定比例
          fixedNumber: [4.7368, 1], //截图框的宽高比例
          full: false, //false按原比例裁切图片，不失真
          // fixedBox: true, // 固定截图框大小，不允许改变
          // canMove: false, //上传图片是否可以移动
          // canMoveBox: true, //截图框能否拖动
          // original: false, //上传图片按照原始比例渲染
          // centerBox: false, //截图框是否被限制在图片里面
          // height: true, //是否按照设备的dpr 输出等比例图片
          // infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
          // maxImgSize: 3000, //限制图片最大宽度和高度
          enlarge: 1, //图片根据截图框输出比例倍数
          mode: "675px 400px", //图片默认渲染方式
        },
      },
      header_dialogFormVisible: false,
      background_dialogFormVisible: false,
    };
  },
  methods: {
    uploadHeadImage() {},
    headbeforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (isJPG && isLt2M) {
        // 如果检测到是覆盖上传图片时，调用接口将原本的图片删除掉
        if (this.uploadHeadImageTime > 0) {
          deleteImageAPI({ img_url: this.ruleForm.head_photo }).then((res) => {
            console.log(res.data);
          });
        }
        this.headimageFile = file;
        console.log("头像文件！", this.headimageFile);
        this.uploadHeadImageTime++;
      }
    },
    handlehead(file) {
      this.header_dialogFormVisible = true;
      this.headimageUrl = URL.createObjectURL(file.raw);
    },
    uploadBackImage() {},
    backbeforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (isJPG && isLt2M) {
        // 如果检测到是覆盖上传图片时，调用接口将原本的图片删除掉
        if (this.uploadBackImageTime > 0) {
          deleteImageAPI({ img_url: this.ruleForm.background_photo }).then(
            (res) => {
              console.log(res.data);
            }
          );
        }
        this.backimageFile = file;
        console.log("背景文件！", this.backimageFile);
        this.uploadBackImageTime++;
      }
    },
    handleback(file) {
      this.background_dialogFormVisible = true;
      this.backimageUrl = URL.createObjectURL(file.raw);
    },
    //获取裁剪图片的file对象
    getCropData(name) {
      if (name == "header") {
        this.$refs.headerCropper.getCropData((data) => {
          uploadImageAPI({ img_data: data }).then((res) => {
            console.log(res.data);
            this.croppedHeadimageUrl = res.data.img_url;
            this.ruleForm.head_photo = this.croppedHeadimageUrl;
          });
        });
      }
      if (name == "background") {
        this.$refs.backgroundCropper.getCropData((data) => {
          uploadImageAPI({ img_data: data }).then((res) => {
            console.log(res.data);
            this.croppedBackimageUrl = res.data.img_url;
            this.ruleForm.background_photo = this.croppedBackimageUrl;
          });
        });
      }
    },
    submit() {
      console.log(this.ruleForm);
      localStorage.setItem("user_info", JSON.stringify(this.ruleForm));
      if (
        this.uploadHeadImageTime > 0 &&
        this.ruleForm.head_photo != this.originUserInfo.head_photo
      ) {
        // 如果有改动头像，提交成功后把这个用户原本的头像给清除掉
        deleteImageAPI({
          img_url: this.originUserInfo.head_photo,
        }).then((res) => {
          console.log(res.data);
        });
      }
      if (
        this.uploadBackImageTime > 0 &&
        this.ruleForm.background_photo != this.originUserInfo.background_photo
      ) {
        // 如果有改动背景，提交成功后把这个用户原本的背景给清除掉
        deleteImageAPI({
          img_url: this.originUserInfo.background_photo,
        }).then((res) => {
          console.log(res.data);
        });
      }
      updateUserInfoAPI(this.ruleForm).then((res) => {
        console.log(res.data);
        this.$notify({
          title: "更新个人资料成功！",
          message: "2s后刷新页面...",
          type: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
      this.headimageUrl = "";
      this.headimageFile = {};
      this.uploadHeadImageTime = 0;
      this.backimageUrl = "";
      this.backimageFile = {};
      this.uploadBackImageTime = 0;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (JSON.stringify(this.ruleForm) == JSON.stringify(this.originUserInfo)) {
      next(true);
    } else {
      this.$confirm(
        "检测到未保存的内容，离开此页面后修改内容将不会被保存",
        "确认离开此页面？",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          if (
            this.uploadHeadImageTime > 0 &&
            this.ruleForm.head_photo !=
              JSON.parse(localStorage.getItem("user_info")).head_photo
          ) {
            deleteImageAPI({ img_url: this.ruleForm.head_photo }).then(
              (res) => {
                console.log(res.data);
              }
            );
          }
          if (
            this.uploadBackImageTime > 0 &&
            this.ruleForm.background_photo !=
              JSON.parse(localStorage.getItem("user_info")).background_photo
          ) {
            deleteImageAPI({ img_url: this.ruleForm.background_photo }).then(
              (res) => {
                console.log(res.data);
              }
            );
          }
          next(true);
        })
        .catch(() => {
          next(false);
        });
    }
  },
  components: { VueCropper },
};
</script>

<style scoped>
.InfoMain-wrap {
  position: relative;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 20px 30px;
  margin: 0 100px;
}
.titleline {
  width: 10px;
  height: 50px;
  background-color: #ff5900;
}
.title {
  font-family: SourceHanSansCN-Bold;
  font-size: 24px;
  font-weight: bold;
  color: #3d3d3d;
}
.forms {
  margin: 0 0 0 150px;
}
.forms > * {
  margin: 20px 0 20px 0;
}
.forms > * font {
  font-family: SourceHanSansCN-Regular;
  font-size: 18px;
  font-weight: normal;
  color: #3d3d3d;
}
.button {
  width: 150px;
  height: 60px;
  border-radius: 30px;
  background: #76fff5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
}
.button font {
  font-family: SourceHanSansCN-Regular;
  font-size: 18px;
  font-weight: normal;
  line-height: 18px;
  color: #3d3d3d;
  transition: all 0.5s;
}
.button:hover {
  background-color: #00ead8;
}
.button:hover font {
  color: #ffffff;
}
.head-avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
}
.head-avatar-uploader:hover {
  border-color: #409eff;
}
.head-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 198px;
  height: 198px;
  line-height: 198px;
  text-align: center;
}
.head-avatar {
  height: 198px;
  display: block;
}
.back-avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 675px;
  height: 142.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
}
.back-avatar-uploader:hover {
  border-color: #409eff;
}
.back-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 673px;
  height: 140.5px;
  line-height: 140.5px;
  text-align: center;
}
.back-avatar {
  height: 140.5px;
  display: block;
}
.cropper {
  margin: auto;
  width: 800px;
  height: 400px;
}
::v-deep .el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  width: 900px;
  height: 600px;
}
</style>