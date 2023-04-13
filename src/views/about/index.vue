<template>
  <div class="index">
    <el-row>
      <AboutMain />
    </el-row>
  </div>
</template>

<script>
import AboutMain from '@/components/ModelAbout/AboutMain.vue';
export default {
  name: "about-index",
  components: { AboutMain }
}
</script>

<style scoped>
.index {
  width: 100%;
}
</style>