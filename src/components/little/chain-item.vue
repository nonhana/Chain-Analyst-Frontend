<template>
  <div name="chain-item" class="chain-item-wrap">
    <el-row type="flex" justify="space-between">
      <el-col :span="0.5">
        <el-row>
          <div class="title">
            <span>{{ chain_name }}</span>
          </div>
        </el-row>
        <el-row style="margin: 15px 0 0 0">
          <div class="introduction">
            <span>{{ chain_introduction }}</span>
          </div>
        </el-row>
      </el-col>
      <el-col :span="0.5" class="imgbox">
        <img :src="chain_picture" alt="" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "chainItem",
  // data() {
  //   return {
  //     chain_name: "产业链名称",
  //     chain_introduction: "产业链简介产业链简介产业链简介产业链简介产业链简介",
  //     chain_picture: "https://dummyimage.com/400X400",
  //   };
  // },
  props: ["chain_id","chain_name", "chain_introduction", "chain_picture"],
};
</script>

<style scoped>
.chain-item-wrap {
  width: 230px;
  border-radius: 20px;
  background: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 15px;
}
.chain-item-wrap:hover {
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.title {
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: normal;
  color: #3d3d3d;
}
.introduction {
  width: 104px;
  height: 81px;
  font-family: Microsoft YaHei;
  font-size: 12px;
  font-weight: normal;
  color: rgba(61, 61, 61, 0.5);
  word-break: break-all;
}
.imgbox {
  width: 100px;
  height: 120px;
  border-radius: 20px;
  background: #d8d8d8;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgbox img {
  height: 120px;
  border-radius: 20px;
}
</style>