<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { fetchEditBaseSetting, fetchGetBaseSetting } from '@/service/api/system';
import { $t } from '@/locales';

const { formRef } = useNaiveForm();
const setting: Api.System.BaseSetting = {
  enabledRemoteLogin: '0'
};
const model = ref<Api.System.BaseSetting>({
  enabledRemoteLogin: '0'
});

onMounted(() => {
  getSettingList();
});

async function getSettingList() {
  const { data } = await fetchGetBaseSetting();
  Object.assign(setting, data);
  Object.assign(model.value, data);
}

function handleReset() {
  Object.assign(model.value, setting);
}

async function handleSubmit() {
  const { error } = await fetchEditBaseSetting(model.value);
  if (!error) {
    window.$message?.success($t('common.updateSuccess'));
    await getSettingList();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <NForm ref="formRef" label-placement="left" show-feedback>
        <NFormItem :label="$t('page.system.setting.enabledRemoteLogin')">
          <NCheckbox v-model:checked="model.enabledRemoteLogin" checked-value="1" unchecked-value="0" />
          <span class="ml-12 text-coolgray">{{ $t('page.system.setting.form.enabledRemoteLogin') }}</span>
        </NFormItem>
      </NForm>
      <NFlex justify="center">
        <NButton @click="handleReset">{{ $t('common.reset') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.modify') }}</NButton>
      </NFlex>
    </NCard>
  </div>
</template>

<style scoped></style>
