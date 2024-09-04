<script setup lang="ts">
import { ref } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'OerationLogSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();
const { formRef } = useNaiveForm();
const model = defineModel<
  Api.System.AdminOperationLogSearchParams,
  'userName' | 'ip' | 'behavior' | 'object' | 'dateRange'
>('model', {
  required: true
});
const dateRange = ref(null);
const options = [
  {
    label: $t('page.adminBehavior.changePassword'),
    value: '修改密码'
  },
  {
    label: $t('page.adminBehavior.addAdminRole'),
    value: '添加角色'
  },
  {
    label: $t('page.adminBehavior.editAdminRole'),
    value: '编辑角色'
  },
  {
    label: $t('page.adminBehavior.deleteAdminRole'),
    value: '删除角色'
  },
  {
    label: $t('page.adminBehavior.addAdminUser'),
    value: '添加用户'
  },
  {
    label: $t('page.adminBehavior.editAdminUser'),
    value: '编辑用户'
  },
  {
    label: $t('page.adminBehavior.deleteAdminUser'),
    value: '删除用户'
  }
];

function handleFormattedValue(value: [string, string]) {
  model.value.dateRange = `${value[0]}~${value[1]}`;
}

async function reset() {
  emit('reset');
  dateRange.value = null;
  await search();
}

async function search() {
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="login-log-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.system.adminLog.operationLog.userName')" class="pr-24px">
              <NInput
                v-model:value="model.userName"
                :placeholder="$t('page.system.adminLog.operationLog.form.userName')"
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.system.adminLog.operationLog.ip')" class="pr-24px">
              <NInput v-model:value="model.ip" :placeholder="$t('page.system.adminLog.operationLog.form.ip')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.system.adminLog.operationLog.object')" class="pr-24px">
              <NInput v-model:value="model.object" :placeholder="$t('page.system.adminLog.operationLog.form.object')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.system.adminLog.operationLog.behavior')" class="pr-24px">
              <NSelect
                v-model:value="model.behavior"
                :placeholder="$t('page.system.adminLog.operationLog.form.behavior')"
                :options="options"
              ></NSelect>
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.system.adminLog.operationLog.createTime')" class="pr-24px">
              <NDatePicker
                v-model:value="dateRange"
                date-value-on-close
                type="daterange"
                @update:formatted-value="handleFormattedValue"
              />
            </NFormItemGi>
            <NFormItemGi span="24 m:18" class="pr-24px">
              <NSpace class="w-full" justify="start">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
