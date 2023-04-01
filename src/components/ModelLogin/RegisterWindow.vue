<template>
  <div name="RegisterWindow" class="RegisterWindow-wrap">
    <el-row
      type="flex"
      justify="start"
      style="width: 100%; align-items: center"
    >
      <div @click="login()" class="return_button" style="margin: 0 50px 0 0">
        <span>返回</span>
      </div>
      <div>
        <span class="title">注册</span>
      </div>
    </el-row>
    <el-divider></el-divider>
    <div style="margin: 0 0 0 5px">
      <el-row
        type="flex"
        justify="space-between"
        style="width: 350px; align-items: center; margin: 28px 0 0 0"
      >
        <div>
          <span class="choices">用户名：</span>
        </div>
        <div>
          <el-input v-model="username" placeholder="设置你的用户名"></el-input>
        </div>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
        style="width: 350px; align-items: center; margin: 28px 0 0 0"
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
        style="width: 350px; align-items: center; margin: 28px 0 0 0"
      >
        <div>
          <span class="choices">密码：</span>
        </div>
        <div>
          <el-input
            v-model="password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </div>
      </el-row>
    </div>
    <el-row
      type="flex"
      justify="center"
      style="position: absolute; bottom: 50px; left: 140px"
    >
      <div @click="register()" class="button">
        <span>注册</span>
      </div>
    </el-row>
  </div>
</template>

<script>
import { userRegisterAPI } from "@/api/user";
export default {
  name: "RegisterWindow",
  data() {
    return {
      username: "",
      account: "",
      password: "",
    };
  },
  methods: {
    register() {
      if (this.username == "" || this.account == "" || this.password == "") {
        this.$notify({
          title: "注册失败！",
          message: "必填项未填好",
          type: "error",
        });
        return;
      } else {
        const paramslist = {
          username: this.username,
          account: this.account,
          password: this.password,
        };
        userRegisterAPI(paramslist).then((res) => {
          if (res.data) {
            // console.log(res.data)
            if (res.data.result_code == 0) {
              this.username = "";
              this.account = "";
              this.password = "";
              this.$emit("return_login", true);
              this.$notify({
                title: "注册成功！",
                type: "success",
              });
            } else {
              this.$notify({
                title: "注册失败",
                message: `${res.data.result_msg}`,
                type: "error",
              });
            }
          }
        });
      }
    },
    login() {
      this.$emit("return_login", true);
    },
  },
};
</script>

<style scoped>
.RegisterWindow-wrap {
  position: relative;
  width: 360px;
  height: 460px;
  border-radius: 20px;
  background: #ffffff;
  transition: all 0.3s ease;
  padding: 20px;
}
.RegisterWindow-wrap:hover {
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
.return_button {
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background: #00ff7b;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.return_button:hover {
  box-shadow: inset 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.return_button span {
  width: 40px;
  height: 29px;
  font-family: Source Han Sans CN;
  font-size: 20px;
  font-weight: normal;
  color: #ffffff;
}
</style>