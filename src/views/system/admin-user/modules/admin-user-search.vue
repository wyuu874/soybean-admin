<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { fetchGetAdminRoleList } from '@/service/api/system';

defineOptions({
  name: 'AdminUserSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();
const { formRef } = useNaiveForm();
const model = defineModel<Api.System.AdminUserSearchParams, 'userName' | 'adminRoleId'>('model', { required: true });
const roleOptions = ref<CommonType.Option<string>[]>([]);

onMounted(() => {
  getRoleOptions();
});

async function getRoleOptions() {
  const { error, data } = await fetchGetAdminRoleList({
    current: 1,
    size: 1000
  });

  if (!error) {
    const { records } = data;
    const options = records.map(item => ({
      label: item.name,
      value: `${item.id}`
    }));
    // // end
    roleOptions.value = [...options];
  }
}

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
            <NFormItemGi span="24 s:12 m:8" :label="$t('page.system.adminUser.userName')" class="pr-24px">
              <NInput v-model:value="model.userName" :placeholder="$t('page.system.adminUser.form.userName')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8" :label="$t('page.system.adminUser.adminRoleName')" class="pr-24px">
              <NSelect
                v-model:value="model.adminRoleId"
                :placeholder="$t('page.system.adminUser.form.adminRoleName')"
                :options="roleOptions"
              />
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
