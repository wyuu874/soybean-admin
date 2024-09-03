<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchDeleteAdminRole, fetchGetAdminRoleList } from '@/service/api/system';
import { useAppStore } from '@/store/modules/app';
import AdminRoleSearch from '@/views/system/admin-role/modules/admin-role-search.vue';
import AdminRoleOperateDrawer from '@/views/system/admin-role/modules/admin-role-operate-drawer.vue';

const appStore = useAppStore();
const { data, columns, loading, mobilePagination, searchParams, resetSearchParams, getDataByPage, getData } = useTable({
  showTotal: true,
  apiFn: fetchGetAdminRoleList,
  apiParams: {
    current: 1,
    size: 10,
    name: null
  },
  columns: () => [
    {
      key: 'id',
      title: 'ID',
      align: 'left',
      width: 64
    },
    {
      key: 'name',
      title: $t('page.system.adminRole.name'),
      align: 'left',
      width: 200
    },
    {
      key: 'description',
      title: $t('page.system.adminRole.description'),
      align: 'left',
      width: 200,
      render: row => <div class="text-ellipsis-1">{row.description ? row.description : '-'}</div>
    },
    {
      key: 'createTime',
      title: $t('common.createTime'),
      align: 'left',
      width: 200
    },
    {
      key: 'updateTime',
      title: $t('common.updateTime'),
      align: 'left',
      width: 200
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" disabled={row.isDefault} onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small" disabled={row.isDefault}>
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});
const { drawerVisible, operateType, editingData, handleAdd, handleEdit, onDeleted } = useTableOperate(data, getData);

async function edit(id: number) {
  handleEdit(id);
}

async function handleDelete(id: number) {
  const { error } = await fetchDeleteAdminRole(id);
  if (!error) {
    onDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <AdminRoleSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.system.adminRole.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <TableHeaderOperation
          :loading="loading"
          disabled-delete
          :disable-add="false"
          @add="handleAdd"
          @refresh="getData"
        />
      </template>
      <NDataTable
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="702"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <AdminRoleOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
