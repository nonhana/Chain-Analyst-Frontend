<template>
  <div name="PersonalHeader" class="PersonalHeader-wrap">
    <div class="background">
      <img :src="background_photo" />
    </div>
    <el-row class="partOne">
      <el-row style="margin-top: 20px">
        <el-col :span="0.5">
          <div class="userhead">
            <img :src="header_photo" />
          </div>
        </el-col>
        <el-col :span="0.5">
          <el-row type="flex" style="margin: 0 0 15px 0">
            <font class="username"
              >{{ username }}&emsp;<span>UID:{{ user_id }}</span>
            </font>
          </el-row>
        </el-col>
      </el-row>
    </el-row>

    <el-row class="partThree" type="flex" justify="start">
      <div
        @mouseenter="moveline(1)"
        @mouseleave="moveline(lineCnt)"
        @click="push(1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="none"
          version="1.1"
          width="15.986328125"
          height="12.9921875"
          viewBox="0 0 15.986328125 12.9921875"
        >
          <g>
            <g>
              <path
                d="M14.084,0Q14.95,0,15.4683,0.496Q15.9865,0.992,15.9865,2L15.9865,10.88Q15.9865,11.312,15.8445,11.696Q15.7025,12.08,15.4541,12.368Q15.2056,12.656,14.872,12.824Q14.5383,12.992,14.1692,12.992L1.78889,12.992Q1.41976,12.992,1.09321,12.832Q0.766669,12.672,0.52531,12.408Q0.283951,12.144,0.141976,11.792Q5.28901e-8,11.44,0,11.04L0,1.968Q0,1.104,0.46852,0.552002Q0.93704,0.00000178814,1.78889,0.00000178814L14.084,0ZM3.98952,2.96Q3.71977,2.96,3.47841,3.072Q3.23705,3.184,3.05248,3.384Q2.86791,3.584,2.76143,3.864Q2.65495,4.144,2.65495,4.464Q2.65495,4.784,2.76143,5.056Q2.86791,5.328,3.05248,5.536Q3.23705,5.744,3.47841,5.864Q3.71976,5.984,3.98952,5.984Q4.28767,5.984,4.53613,5.864Q4.78458,5.744,4.96205,5.536Q5.13952,5.328,5.246,5.056Q5.35249,4.784,5.35249,4.464Q5.35249,3.808,4.96915,3.384Q4.58582,2.96,3.98952,2.96ZM6.21854,8.496Q6.21854,8.192,6.11206,7.912Q6.00557,7.632,5.8281,7.432Q5.65063,7.232,5.40218,7.112Q5.15372,6.992,4.88397,6.992L3.10927,6.992Q2.55556,6.992,2.17223,7.432Q1.78889,7.872,1.78889,8.496L1.78889,8.56L1.78889,10L6.21854,10L6.21854,8.56L6.21854,8.496ZM12.8062,10.08Q13.0902,10.08,13.225,9.92Q13.3599,9.76,13.3599,9.536Q13.3599,9.312,13.2037,9.144Q13.0476,8.976,12.7636,8.976L8.53274,8.976Q8.24879,8.976,8.10682,9.144Q7.96484,9.312,7.96484,9.536Q7.96484,9.76,8.10682,9.92Q8.24879,10.08,8.51855,10.08L12.8062,10.08ZM12.8204,8.016Q13.1044,8.016,13.2321,7.856Q13.3599,7.696,13.3599,7.472Q13.3599,7.232,13.2392,7.072Q13.1186,6.912,12.8346,6.912L8.49015,6.912Q8.2062,6.912,8.07842,7.072Q7.95064,7.232,7.95064,7.472Q7.95064,7.696,8.07132,7.856Q8.192,8.016,8.47595,8.016L12.8204,8.016ZM12.8346,5.984Q13.0476,5.984,13.2037,5.824Q13.3599,5.664,13.3599,5.44Q13.3599,5.216,13.2037,5.08Q13.0476,4.944,12.8346,4.944L9.9525,4.944Q9.73954,4.944,9.59046,5.08Q9.44139,5.216,9.44139,5.44Q9.44139,5.664,9.59046,5.824Q9.73954,5.984,9.9525,5.984L12.8346,5.984Z"
                fill="#727272"
                fill-opacity="1"
              />
            </g>
          </g>
        </svg>
        <font :class="className[0]">个人资料</font>
      </div>
      <div class="line" :style="{ left: `${linePosition}px` }"></div>
    </el-row>
  </div>
</template>

<script>
import { getUserinfoAPI } from "@/api/user";
export default {
  name: "PersonalHeader",
  data() {
    return {
      user: {
        background_photo: "",
        header_photo: "",
        user_name: "",
      },
      liked_articles: [],
      user_id: 0,
      linePosition: 0,
      positionArray: [14],
      lineCnt: 1,
      routeMenu: ["MyInfo"],
      className: ["behovered"],
      initClassName: ["behovered"],
    };
  },
  computed: {
    background_photo() {
      return this.user.background_photo;
    },
    header_photo() {
      return this.user.header_photo;
    },
    username() {
      return this.user.user_name;
    },
  },
  watch: {
    $route: {
      handler: function (newV, _) {
        this.className = this.initClassName.slice(0);
        const cnt = this.routeMenu.indexOf(newV.name);
        this.className[cnt] = "behovered beclicked";
        this.linePosition = this.positionArray[cnt];
        this.lineCnt = cnt + 1;
        this.user_id = this.$route.params.id;
        getUserinfoAPI({ user_id: this.user_id }).then((res) => {
          this.user.user_name = res.data.userinfo.username;
          this.user.header_photo = res.data.userinfo.head_photo;
          this.user.background_photo = res.data.userinfo.background_photo;
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    push(num) {
      this.$router.push({ name: this.routeMenu[num - 1] });
    },
    moveline(num) {
      this.linePosition = this.positionArray[num - 1];
    },
  },
};
</script>

<style scoped>
.PersonalHeader-wrap {
  position: relative;
  width: 100%;
  background: #ffffff;
  border-radius: 50px;
  overflow: hidden;
  transition: all 0.3s;
}

.PersonalHeader-wrap:hover {
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}

.background {
  width: 100%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background img {
  width: 100%;
}

.partOne {
  position: relative;
  display: flex;
}

.userhead {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 30px 17px 56px;
}

.userhead img {
  width: 120px;
}

.username {
  font-family: SourceHanSansCN-Bold;
  font-size: 24px;
  font-weight: bold;
  line-height: 17px;
  letter-spacing: 0em;
  color: #3d3d3d;
  margin-right: 5px;
}

.username span {
  font-family: SourceHanSansCN-Bold;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  color: #9e9e9e;
}

.selfintroduce {
  height: 17px;
  font-family: SourceHanSansCN-Regular;
  font-size: 17px;
  font-weight: normal;
  line-height: 17px;
  letter-spacing: 0em;
  color: #3d3d3d;
}

.partTwo {
  height: 40px;
  display: flex;
  justify-content: start;
  margin-top: 15px;
}

.partTwo > * {
  height: 40px;
  cursor: pointer;
  margin-right: 50px;
}

.title {
  font-family: SourceHanSansCN-Medium;
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  /* 橙红色 */
  color: #ff5900;
}

.num {
  height: 17px;
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  color: #3d3d3d;
}

.partThree {
  position: relative;
  width: 100%;
  height: 66px;
  border-radius: 0px 0px 10px 10px;
  background: #ffffff;
  border-top: 1px solid #76fff5;
}

.partThree > * {
  margin: 27px 0 0 55px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.partThree > * font {
  margin: 0 0 0 5px;
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0em;
  color: #3d3d3d;
}

.line {
  position: absolute;
  top: 34px;
  width: 53px;
  height: 4px;
  background-color: #ffc180;
  transition: all 0.3s;
}
</style>