<template>
  {{ userInfo }}
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue';
import actions from './utils/useActions';
import { onMounted, ref } from 'vue';

let userInfo = ref('');

onMounted(() => {
  // if (window.localStorage.getItem('globalState')) {
  //   userInfo.value = window.localStorage.getItem('globalState')!;
  // }
  actions.onGlobalStateChange((state: any) => {
    // console.log('sub1 App onGlobalStateChange', state);
    // // 未登录 - 返回主页
    // userInfo.value = { ...state };
    if (window.localStorage.getItem('globalState')) {
      userInfo.value = window.localStorage.getItem('globalState')!;
    } else {
      userInfo.value = state;
    }
  }, true);
});
</script>

<style></style>
