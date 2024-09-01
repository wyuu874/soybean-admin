<script setup lang="ts">
import ChangePassword from '@/views/_builtin/user-center/modules/change-password.vue';
import LoginLog from '@/views/_builtin/user-center/modules/login-log.vue';
import OperationLog from '@/views/_builtin/user-center/modules/operation-log.vue';

defineOptions({
  name: 'UserCenter'
});
</script>

<template>
  <NTabs type="line" animated>
    <NTabPane name="changePassword" :tab="$t('page.userCenter.changePassword.title')">
      <ChangePassword />
    </NTabPane>
    <NTabPane name="loginLog" :tab="$t('page.userCenter.loginLog.title')">
      <LoginLog />
    </NTabPane>
    <NTabPane name="operationLog" :tab="$t('page.userCenter.operationLog.title')">
      <OperationLog />
    </NTabPane>
  </NTabs>
</template>

<style scoped></style>
