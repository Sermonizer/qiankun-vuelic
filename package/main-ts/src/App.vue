<template>
  <!-- {{ $route }} -->
  <LoginPage v-if="$route.path === '/login'" />
  <LayoutPage v-else />
</template>

<script lang="ts" setup>
import LayoutPage from './components/LayoutPage.vue';
import LoginPage from './components/LoginPage.vue';
</script>
