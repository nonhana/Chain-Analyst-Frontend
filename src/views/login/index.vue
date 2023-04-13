<template>
  <div class="index">
    <div
      class="title"
      :style="{
        opacity: title_opacity,
      }"
    >
      <img src="../../assets/images/chainAnalyst.png" alt="" />
    </div>
    <transition name="window">
      <div
        v-show="login_status"
        class="window"
        :style="{
          opacity: window_opacity,
        }"
      >
        <LoginWindow @return_register="return_register" />
      </div>
    </transition>

    <transition name="window">
      <div v-show="!login_status" class="window">
        <RegisterWindow @return_login="return_login" />
      </div>
    </transition>
  </div>
</template>

<script>
import LoginWindow from "@/components/ModelLogin/LoginWindow.vue";
import RegisterWindow from "@/components/ModelLogin/RegisterWindow.vue";
export default {
  name: "login-index",
  data() {
    return {
      login_status: true,
      title_opacity: "0%",
      window_opacity: "0%",
    };
  },
  methods: {
    return_register(val) {
      this.login_status = val;
    },
    return_login(val) {
      this.login_status = val;
    },
  },
  mounted() {
    setTimeout(()=>{
      this.title_opacity = "100%"
    },100)
    setTimeout(() => {
      this.window_opacity = "100%";
    }, 600);
  },
  components: { LoginWindow, RegisterWindow },
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 900px;
  background-image: repeating-radial-gradient(
    circle at 20% 40%,
    #eea2a2 60px,
    #57c6e1 60px,
    #b49fda 120px,
    #7ac5d8 120px,
    #b49fda 180px,
    #4f9c9c 180px,
    #57c6e1 240px,
    #99cccc 240px,
    #eea2a2 300px
  );
  margin: 0;
}
.title {
  position: absolute;
  right: 11%;
  top: 10%;
  transition: all 0.5s ease;
}
.window {
  position: absolute;
  right: 10%;
  top: 25%;
  transition: all 0.5s ease;
}

.window-leave,
.window-enter-to {
  opacity: 1;
}
.window-leave-active,
.window-enter-active {
  transition: all 0.5s;
}
.window-leave-to,
.window-enter {
  opacity: 0;
}
</style>