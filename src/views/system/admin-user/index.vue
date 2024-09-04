<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchDeleteAdminUser, fetchGetAdminUserList } from '@/service/api/system';
import { useAppStore } from '@/store/modules/app';
import AdminUserSearch from '@/views/system/admin-user/modules/admin-user-search.vue';
import AdminUserOperateDrawer from '@/views/system/admin-user/modules/admin-user-operate-drawer.vue';

const appStore = useAppStore();
const { data, columns, loading, mobilePagination, searchParams, resetSearchParams, getDataByPage, getData } = useTable({
  showTotal: true,
  apiFn: fetchGetAdminUserList,
  apiParams: {
    current: 1,
    size: 10,
    userName: null,
    adminRoleId: null
  },
  columns: () => [
    {
      key: 'id',
      title: 'ID',
      align: 'left',
      width: 64
    },
    {
      key: 'userName',
      title: $t('page.system.adminUser.userName'),
      align: 'left',
      width: 128
    },
    {
      key: 'adminRoleName',
      title: $t('page.system.adminUser.adminRoleName'),
      align: 'left',
      width: 128
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
  const { error } = await fetchDeleteAdminUser(id);
  if (!error) {
    onDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <AdminUserSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.system.adminUser.title')"
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
      <AdminUserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
