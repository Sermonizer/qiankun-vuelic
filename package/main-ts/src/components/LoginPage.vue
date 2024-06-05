<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item label="Username" name="username">
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="Password" name="password">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
// import { useActions } from '@/hooks/useActions';
import actions from '@/hooks/useActions';

interface IFormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<IFormState>({
  username: '',
  password: '',
  remember: true,
});

// const { actions } = useActions();
const router = useRouter();
const onFinish = (values: IFormState) => {
  window.localStorage.setItem('userInfo', formState.username);
  actions.setGlobalState({
    userInfo: formState,
  });
  router.push('/');
};

const onFinishFailed = (errorInfo: unknown) => {
  console.error('Failed:', errorInfo);
};
</script>
