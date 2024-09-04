<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchGetOperationBehaviorList } from '@/service/api/auth';

defineOptions({
  name: 'OerationLogSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();
const { formRef } = useNaiveForm();
const model = defineModel<Api.Auth.OperationLogSearchParams, 'ip' | 'behavior' | 'object' | 'dateRange'>('model', {
  required: true
});
const dateRange = ref(null);
const behaviorOptions = ref<CommonType.Option<string>[]>([]);

onMounted(() => {
  getOperationBehaviorList();
});

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

async function getOperationBehaviorList() {
  const { data } = await fetchGetOperationBehaviorList();
  if (data) {
    behaviorOptions.value = data;
  }
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="login-log-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="140">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:8" :label="$t('page.userCenter.operationLog.ip')" class="pr-24px">
              <NInput v-model:value="model.ip" :placeholder="$t('page.userCenter.operationLog.form.ip')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8" :label="$t('page.userCenter.operationLog.object')" class="pr-24px">
              <NInput v-model:value="model.object" :placeholder="$t('page.userCenter.operationLog.form.object')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8" :label="$t('page.userCenter.operationLog.behavior')" class="pr-24px">
              <NSelect
                v-model:value="model.behavior"
                :placeholder="$t('page.userCenter.operationLog.form.behavior')"
                :options="behaviorOptions"
              ></NSelect>
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8" :label="$t('page.userCenter.operationLog.createTime')" class="pr-24px">
              <NDatePicker
                v-model:value="dateRange"
                date-value-on-close
                type="daterange"
                @update:formatted-value="handleFormattedValue"
              />
            </NFormItemGi>
            <NFormItemGi span="24 m:16" class="pr-24px">
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
