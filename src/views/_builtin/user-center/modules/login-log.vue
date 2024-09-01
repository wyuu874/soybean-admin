<script setup lang="ts">
import { useTable } from '@/hooks/common/table';
import { $t } from '@/locales';
import { fetchGetLoginLogList } from '@/service/api';
import LoginLogSearch from '@/views/_builtin/user-center/modules/login-log-search.vue';

defineOptions({
  name: 'LoginLog'
});

const { columns, data, loading, pagination, searchParams, getDataByPage, resetSearchParams } = useTable({
  showTotal: true,
  apiFn: fetchGetLoginLogList,
  apiParams: {
    current: 1,
    size: 10,
    ip: null,
    dateRange: null
  },
  columns: () => [
    {
      key: 'ip',
      title: $t('page.userCenter.loginLog.ip'),
      align: 'left',
      width: 128
    },
    {
      key: 'platform',
      title: $t('page.userCenter.loginLog.device'),
      align: 'left',
      width: 300,
      render: row => {
        const { platform, os, browser } = row;
        return `${platform} ${os} ${browser}`;
      }
    },
    {
      key: 'createTime',
      title: $t('page.userCenter.loginLog.createTime'),
      align: 'left',
      width: 128
    }
  ]
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <LoginLogSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <NDataTable
        :columns="columns"
        :data="data"
        size="small"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="pagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
