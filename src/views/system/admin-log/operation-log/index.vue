<script setup lang="ts">
import { useTable } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetAdminOperationLog } from '@/service/api/system';
import { useAppStore } from '@/store/modules/app';
import OperationLogSearch from '@/views/system/admin-log/operation-log/modules/operation-log-search.vue';

defineOptions({
  name: 'OperationLog'
});

const appStore = useAppStore();
const { columns, data, loading, mobilePagination, searchParams, getDataByPage, resetSearchParams, getData } = useTable({
  showTotal: true,
  apiFn: fetchGetAdminOperationLog,
  apiParams: {
    current: 1,
    size: 10,
    userName: null,
    ip: null,
    behavior: null,
    object: null,
    dateRange: null
  },
  columns: () => [
    {
      key: 'userName',
      title: $t('page.system.adminLog.operationLog.userName'),
      align: 'left',
      width: 128
    },
    {
      key: 'ip',
      title: $t('page.system.adminLog.operationLog.ip'),
      align: 'left',
      width: 128
    },
    {
      key: 'platform',
      title: $t('page.system.adminLog.operationLog.device'),
      align: 'left',
      width: 300,
      render: row => {
        const { platform, os, browser } = row;
        return `${platform} ${os} ${browser}`;
      }
    },
    {
      key: 'behavior',
      title: $t('page.system.adminLog.operationLog.behavior'),
      align: 'left',
      width: 128
    },
    {
      key: 'object',
      title: $t('page.system.adminLog.operationLog.object'),
      align: 'left',
      width: 128,
      render: row => {
        return row.object || '-';
      }
    },
    {
      key: 'createTime',
      title: $t('page.system.adminLog.operationLog.createTime'),
      align: 'left',
      width: 128
    }
  ]
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <OperationLogSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.system.adminLog.operationLog.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <TableHeaderOperation :loading="loading" disabled-delete disable-add @refresh="getData" />
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
    </NCard>
  </div>
</template>

<style scoped></style>
