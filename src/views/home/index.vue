<template>
  <div class="index">
    <el-row>
      <HomeMain />
    </el-row>
  </div>
</template>

<script>
import HomeMain from '@/components/ModelHome/HomeMain.vue';
export default {
  name: "home-index",
  components: { HomeMain }
}
</script>

<style scoped>
.index {
  width: 100%;
}
</style>