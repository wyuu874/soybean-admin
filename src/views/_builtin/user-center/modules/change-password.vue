<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'ChangePassword'
});

interface FormModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const authStore = useAuthStore();
const { formRef, validate, restoreValidation } = useNaiveForm();

const model: FormModel = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules, createConfirmPwdRule } = useFormRules();

  return {
    oldPassword: formRules.pwd,
    newPassword: formRules.pwd,
    confirmPassword: createConfirmPwdRule(model.newPassword)
  };
});

async function handleSubmit() {
  await validate();
  await authStore.changePassword(model.oldPassword, model.newPassword, model.confirmPassword);
}

async function handleReset() {
  await restoreValidation();
  model.oldPassword = '';
  model.newPassword = '';
  model.confirmPassword = '';
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NGrid responsive="screen" item-responsive>
      <NGridItem span="6 m:12 l:8">
        <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="180px">
          <NFormItem path="oldPassword" :label="$t('page.userCenter.changePassword.form.oldPassword.title')">
            <NInput
              v-model:value="model.oldPassword"
              type="password"
              show-password-on="click"
              :placeholder="$t('page.userCenter.changePassword.form.oldPassword.placeholder')"
            />
          </NFormItem>
          <NFormItem path="newPassword" :label="$t('page.userCenter.changePassword.form.newPassword.title')">
            <NInput
              v-model:value="model.newPassword"
              type="password"
              show-password-on="click"
              :placeholder="$t('page.userCenter.changePassword.form.newPassword.placeholder')"
            />
          </NFormItem>
          <NFormItem path="confirmPassword" :label="$t('page.userCenter.changePassword.form.confirmPassword.title')">
            <NInput
              v-model:value="model.confirmPassword"
              type="password"
              show-password-on="click"
              :placeholder="$t('page.userCenter.changePassword.form.confirmPassword.placeholder')"
            />
          </NFormItem>
          <NSpace :size="18" class="w-full" justify="end">
            <NButton size="medium" round block @click="handleReset">
              {{ $t('common.reset') }}
            </NButton>
            <NButton type="primary" size="medium" round block :loading="authStore.loginLoading" @click="handleSubmit">
              {{ $t('common.confirm') }}
            </NButton>
          </NSpace>
        </NForm>
      </NGridItem>
    </NGrid>
  </NCard>
</template>

<style scoped></style>
