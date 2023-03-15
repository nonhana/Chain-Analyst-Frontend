<template>
  <div name="LoginWindow" class="LoginWindow-wrap">
    <el-row type="flex" justify="center" style="width: 100%">
      <span class="title">登录</span>
    </el-row>
    <el-divider></el-divider>
    <div style="margin: 0 0 0 5px">
      <el-row
        type="flex"
        justify="space-between"
        style="width: 350px; align-items: center; margin: 40px 0 0 0"
      >
        <div>
          <span class="choices">账号：</span>
        </div>
        <div>
          <el-input v-model="account" placeholder="请输入账号"></el-input>
        </div>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
        style="width: 350px; align-items: center; margin: 40px 0 0 0"
      >
        <div>
          <span class="choices">密码：</span>
        </div>
        <div>
          <el-input v-model="password" placeholder="请输入密码"></el-input>
        </div>
      </el-row>
    </div>
    <el-row type="flex" justify="center" style="margin: 40px 0 0 0">
      <div class="registnote">
        还没有账号？<span @click="register()">点击此处进行注册！</span>
      </div>
    </el-row>

    <el-row
      type="flex"
      justify="center"
      style="position: absolute; bottom: 50px; left: 140px"
    >
      <div class="button">
        <span>登录</span>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LoginWindow",
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$emit("return_register", false);
    },
  },
};
</script>

<style scoped>
.LoginWindow-wrap {
  position: relative;
  width: 360px;
  height: 460px;
  border-radius: 20px;
  background: #ffffff;
  transition: all 0.3s ease;
  padding: 20px;
}
.LoginWindow-wrap:hover {
  box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);
}
.title {
  font-family: Microsoft YaHei;
  font-size: 32px;
  font-weight: normal;
  color: #3d3d3d;
}
.choices {
  font-family: Source Han Sans CN;
  font-size: 18px;
  font-weight: normal;
  color: #3d3d3d;
}
::v-deep .el-input__inner {
  width: 270px;
  height: 60px;
  background: #ffffff;
  border-radius: 15px;
}
.registnote {
  font-family: Source Han Sans CN;
  font-size: 14px;
  font-weight: normal;
  color: #3d3d3d;
}
.registnote span {
  cursor: pointer;
}
.registnote span:hover {
  color: #00ff7b;
}
.button {
  width: 120px;
  height: 50px;
  border-radius: 25px;
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
  width: 40px;
  height: 29px;
  font-family: Source Han Sans CN;
  font-size: 20px;
  font-weight: normal;
  color: #ffffff;
}
</style>