<template>
  <div name="app" class="app-wrap">
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
    };
  },
  components: { Header },
  watch: {
    $route: {
      handler: function (newV, _) {
        if (newV.name == "login") {
          this.login = true;
        } else {
          this.login = false;
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
}
</style>
