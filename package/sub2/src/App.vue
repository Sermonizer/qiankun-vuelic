<template>
  {{ userInfo }}
  <Router-view />
</template>

<script lang="ts" setup>
import actions from './utils/useActions';
import { onMounted, ref } from 'vue';

let userInfo = ref<unknown>({});

onMounted(() => {
  console.log('mounted');

  actions.onGlobalStateChange((state: unknown) => {
    console.log('sub2 App onGlobalStateChange', state);
    // 未登录 - 返回主页
    if (window.localStorage.getItem('globalState')) {
      userInfo.value = window.localStorage.getItem('globalState')!;
    } else {
      userInfo.value = state;
    }
  }, true);
});
</script>

<style></style>
