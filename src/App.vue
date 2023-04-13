<template>
  <div name="app" :class="classname">
    <el-row type="flex" v-if="!login">
      <Header />
    </el-row>
    <el-row>
      <router-view />
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "app",
  data() {
    return {
      login: true,
      classname:"",
    };
  },
  components: { Header },
  watch: {
    $route: {
      handler: function (newV, _) {
        if (newV.name == "login") {
          this.login = true;
          this.classname = "login-wrap"
        } else {
          this.login = false;
          this.classname = "app-wrap"
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
html,
body {
  width: 100%;
  margin: 0 auto;
  padding: 0;
}

.app-wrap {
  width: 100%;
  margin: 0 0 30px 0;
}
.login-wrap {
  width: 100%;
}
</style>
