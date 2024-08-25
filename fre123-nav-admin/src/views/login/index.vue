<template>
  <div class="overall">
    <header>
      <!-- 头部 -->
      <div class="header-icon">
        <img
          :class="imgCss"
          @mouseenter="imgCss = 'header-icon-rotate-right'"
          @mouseleave="imgCss = 'header-icon-rotate-left'"
          src="https://img.fre123.com/i/2023/11/25/65619e8022505.png"
        />
        <div>FRE123</div>
      </div>
    </header>

    <main>
      <div class="login-big-box">
        <div class="loginTab">FRE123导航管理后台</div>
        <form @submit.prevent="finishLogin()" ref="opForm">
          <div ref="ipt" class="login-input-img-box">
            <input
              id="user"
              placeholder="用户名"
              v-model="userParams.username"
              @input="usersWrong = false"
              :class="{ inputWrong: usersWrong }"
            />
            <img
              v-if="userParams.username && usersFocus"
              @click="userParams.username = ''"
              class="form-img"
              src="/public/img/clean_ipt.svg"
            />
            <text v-if="usersWrong">{{ userWrongText }}</text>
          </div>
          <div class="login-input-img-box">
            <input
              id="password"
              :type="password_type"
              placeholder="密码"
              v-model="userParams.password"
              @input="passwordWrong = false"
              :class="{ inputWrong: passwordWrong }"
            />
            <img
              :src="password_img"
              class="form-img"
              @click="togglePasswordVisibility()"
            />
            <text v-if="passwordWrong">{{ passwordWrongText }}</text>
            <text id="passwordText"></text>
          </div>
          <button type="submit">登录</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import loginApi from "@/api/modules/login/index";
import router from "@/routers";
import { GlobalStore } from "@/store";
import { onMounted, onUnmounted, ref } from "vue";

const globalStore = GlobalStore();

const ifUserExit = () => {
  try {
    const data = globalStore.token;
    if (data) {
      router.push("/home/index");
    }
  } catch {
    console.log("JSON解析错误");
  }
};
// 已经登录了，那用户再次访问login页面得跳到首页
ifUserExit();

const userParams = ref({
  username: "",
  password: "",
});

// 点击登录按钮
const finishLogin = async () => {
  if (ruleCheck()) {
    // 调用接口
    try {
      const { data }: any = await loginApi.getLoginList(userParams.value);
      console.log("data", data);
      if (data.jwt_token) {
        router.push("/home/index");
        globalStore.setToken(data.jwt_token);
        return;
      }
    } catch {
      usersWrong.value = true;
      userWrongText.value = "账号或密码错误";
      passwordWrongText.value = "";
      passwordWrong.value = true;
    }
  }
};
const imgCss = ref("");
// 密码input变化
const usersFocus = ref(false);
const password_type = ref("password");
const password_img = ref("/img/open_eye.svg");
// 错误提示判断
const usersWrong = ref(false);
const passwordWrong = ref(false);
const userWrongText = ref("");
const passwordWrongText = ref("");
const ipt = ref();
// 清空input的聚焦判断
// 判断input里面的清空按钮
onMounted(() => {
  document.addEventListener("click", clickTarget);
});
onUnmounted(() => {
  document.removeEventListener("click", clickTarget);
});

const clickTarget = (event: { target: any }) => {
  // 使用 event 而不是 item
  if (ipt.value && ipt.value.contains(event.target)) {
    // 使用 contains 方法检查 ipt 是否包含被点击的元素
    usersFocus.value = true;
  } else {
    usersFocus.value = false;
  }
};
// 眼睛显示密码
const togglePasswordVisibility = () => {
  if (password_type.value === "password") {
    password_type.value = "text";
    password_img.value = "/img/close_eye.svg";
  } else {
    password_type.value = "password";
    password_img.value = "/img/open_eye.svg";
  }
};
/**
 * @name 表单校验函数
 */
const ruleCheck = () => {
  if (
    userParams.value.username.trim() === "" &&
    userParams.value.password.trim() === ""
  ) {
    usersWrong.value = true;
    userWrongText.value = "请输入账号和密码";
    passwordWrongText.value = "";
    passwordWrong.value = true;
    return false;
  }
  if (userParams.value.username.trim() === "") {
    usersWrong.value = true;
    userWrongText.value = "请输入账号";
    return false;
  }
  if (userParams.value.password.trim() === "") {
    passwordWrong.value = true;
    passwordWrongText.value = "请输入密码";
    return false;
  }

  return true;
};
</script>

<style scoped>
.overall {
  display: flex;
  flex-direction: column;
  /* 设置为列方向，这样main会在header下面 */
  height: 100vh;
}

/* 头部左侧图标样式 */
header {
  background-color: #ffffff;
  display: fixed;
  width: 100%;
  border-bottom: 1px solid #e9ebec;
  box-shadow: 1px 0px 10px 3px rgba(228, 220, 220, 0.12);
}

.header-icon {
  display: flex;
  align-items: center;
  text-align: left;
  margin-left: 32px;
}
.header-icon img {
  width: 36px;
  height: 34px;
  margin: 15px 14px 15px 0;
}
.header-icon div {
  width: 44px;
  height: 28px;
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
}

.header-icon-rotate-right {
  cursor: pointer;
  transition: transform 0.3s;
  transform: rotate(360deg);
}

.header-icon-rotate-left {
  cursor: pointer;
  transition: transform 0.3s;
  transform: rotate(0);
}

main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginTab {
  height: 28px;
  font-family: PingFang SC;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #ff6689;
  margin-bottom: 42px;
  margin-top: 48px;
}

.login-big-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff1f5;
  width: 396px;
  height: 424px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0px 0px 24px 2px #ffb9d71f;
}

.login-big-box input {
  border: 1px solid transparent;
  outline: none;
  width: 284px;
  height: 50px;
  border-radius: 8px;
  padding: 0 34px 0 16px;
  background: #f9f9fc;
  font-size: 15px;
  line-height: 22px;
}
.login-big-box input::placeholder {
  font-size: 15px !important;
}
#user:focus {
  border: 1px solid #d0d6e3;
  background: #ffffff;
}

#password:focus {
  border: 1px solid #d0d6e3;
  background: #ffffff;
}

/* 错误输入框样式 */
.inputWrong {
  background: #ff628708;
  border: 1px solid #ffc5d3 !important;
  background-color: #fffafb !important;
}

.login-input-img-box {
  position: relative;
  margin-bottom: 28px;
}

.login-input-img-box text {
  color: #ff5d84;
  bottom: -20px;
  font-weight: 400;
  left: 0;
  font-size: 13px;
  width: 130px;
  height: 18px;
  line-height: 18.2px;
  position: absolute;
}

.form-img {
  position: absolute;
  cursor: pointer;
  width: 18px;
  height: 18px;
  top: 32%;
  right: 16px;
}

.login-big-box button {
  cursor: pointer;
  font-family: PingFang SC;
  width: 338px;
  height: 54px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(271.75deg, #fe5762 -9.57%, #ff6ba1 118.33%);
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 24px;
  box-shadow: 0px 3px 12px 0px #ff2d461a;
  /* margin-bottom: 30px; */
}
</style>
