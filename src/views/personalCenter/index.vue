<template>
  <div class="index">
    <el-row type="flex" justify="center">
      <PersonalHeaderVue style="margin: 30px 100px" />
    </el-row>
    <el-row type="flex" justify="center" style="margin: 40px 0 30px 0">
      <router-view></router-view>
    </el-row>
  </div>
</template>

<script>
import PersonalHeaderVue from "@/components/ModelPersonalCenter/PersonalHeader.vue";
export default {
  name: "index-personalCenter",
  components: { PersonalHeaderVue },
};
</script>

<style scoped>
.index {
  width: 100%;
}
</style>