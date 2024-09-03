<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';

defineOptions({
  name: 'AdminRoleSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();
const { formRef } = useNaiveForm();
const model = defineModel<Api.System.AdminRoleSearchParams, 'name'>('model', { required: true });

async function reset() {
  emit('reset');
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
            <NFormItemGi span="24 s:12 m:8" :label="$t('page.system.adminRole.name')" class="pr-24px">
              <NInput v-model:value="model.name" :placeholder="$t('page.system.adminRole.form.name')" />
            </NFormItemGi>
            <NFormItemGi span="24 m:8" class="pr-24px">
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
