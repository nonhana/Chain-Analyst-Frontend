<template>
  <div name="DetailsImg" class="DetailsImg-wrap">
    <div class="imgbox">
      <img :src="model_picture" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsImg",
  data() {
    return {
      model_picture: "https://dummyimage.com/400X400",
    };
  },
};
</script>

<style scoped>
.DetailsImg-wrap {
  width: 800px;
  height: 800px;
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.imgbox {
  width: 750px;
  height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgbox img {
  height: 750px;
}
</style>