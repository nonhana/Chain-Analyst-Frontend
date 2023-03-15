<template>
  <div class="index">
    <el-row type="flex" justify="center" style="margin: 60px 0 0 0">
      <div
        style="
          display: flex;
          width: 1250px;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <DetailsImg />
        </div>
        <div>
          <DetailsInfo />
        </div>
      </div>
    </el-row>

    <el-row style="margin: 30px 0 0 0" type="flex" justify="center">
      <DetailsIntegrity />
    </el-row>

    <el-row style="margin: 30px 0 0 0" type="flex" justify="center">
      <DetailsRisk />
    </el-row>
  </div>
</template>

<script>
import DetailsImg from "@/components/ModelDetails/DetailsImg.vue";
import DetailsInfo from "@/components/ModelDetails/DetailsInfo.vue";
import DetailsIntegrity from "@/components/ModelDetails/DetailsIntegrity.vue";
import DetailsRisk from "@/components/ModelDetails/DetailsRisk.vue";
export default {
  name: "details-index",
  components: {
    DetailsImg,
    DetailsInfo,
    DetailsIntegrity,
    DetailsRisk,
  },
};
</script>

<style scoped>
.index {
  width: 100%;
}
</style>