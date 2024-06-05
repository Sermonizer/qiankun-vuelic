<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @click="handleClick"
      >
        <a-menu-item key="mainApp">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="sub1">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="sub2/tom">Tom</a-menu-item>
          <a-menu-item key="sub2/bill">Bill</a-menu-item>
          <a-menu-item key="sub2/alex">Alex</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-button @click="goLogout">退出登录</a-button>
        <a-button type="primary" @click="goLogin">去登陆</a-button>
        <a-button type="primary" @click="goEdit">配置路由、子应用</a-button>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view v-if="$route.path.startsWith('/mainApp')" />
          <!-- 子应用渲染区，用于挂载子应用节点 -->
          <section v-else id="container"></section>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { useActions } from '@/hooks/useActions';
import actions from '@/hooks/useActions';

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);

const router = useRouter();
const handleClick: MenuProps['onClick'] = (e) => {
  router.push(`/${e.key}`);
};

const goLogin: () => void = () => {
  router.push('/mainApp/login');
};

// const { actions } = useActions();
const goLogout: () => void = () => {
  actions.setGlobalState({
    user: {
      name: 111,
      age: 222,
    },
    userInfo: {
      hh: 11,
    },
  });
  window.localStorage.removeItem('globalState');
};

const goEdit: () => void = () => {
  router.push('/mainApp/edit');
};
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
