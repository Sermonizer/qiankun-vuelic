<template>
  <div>
    <h1>Edit Micro Apps Config</h1>
    <form @submit.prevent="updateConfig">
      <div v-for="(app, index) in microApps" :key="index">
        <label>Name: <input v-model="app.name" /></label>
        <label>Entry: <input v-model="app.entry" /></label>
        <label>Active Rule: <input v-model="app.activeRule" /></label>
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { microApps, setMicroApps } from '@/hooks/useConfig';

export default {
  data() {
    return {
      microApps: JSON.parse(JSON.stringify(microApps.value)),
    };
  },
  methods: {
    async updateConfig() {
      await axios.post('http://localhost:3000/api/microapps', this.microApps);
      setMicroApps(this.microApps);
      alert('Configuration updated successfully');
      // window.location.reload(); // 重新加载页面
    },
  },
};
</script>

<style>
/* 样式省略 */
</style>
