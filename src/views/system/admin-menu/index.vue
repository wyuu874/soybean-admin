<script setup lang="tsx">
import type { Ref } from 'vue';
import { ref } from 'vue';
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchDeleteAdminMenu, fetchGetAdminMenuList } from '@/service/api/system';
import { useAppStore } from '@/store/modules/app';
import { adminMenuTypeRecord } from '@/constants/system';
import { $t } from '@/locales';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { enableStatusRecord, yesOrNoRecord } from '@/constants/common';
import { useBoolean } from '~/packages/hooks/src';
import AdminMenuOperateModal, { type OperateType } from './modules/admin-menu-operate-modal.vue';

const appStore = useAppStore();

const { bool: visible, setTrue: openModal } = useBoolean();

const wrapperRef = ref<HTMLElement | null>(null);

const { data, columns, loading, pagination, getData, getDataByPage } = useTable({
  apiFn: fetchGetAdminMenuList,
  columns: () => [
    {
      key: 'id',
      title: 'ID',
      align: 'center',
      width: 120
    },
    {
      key: 'menuType',
      title: $t('page.system.adminMenu.menuType'),
      align: 'center',
      width: 120,
      render: row => {
        const tagMap: Record<Api.System.AdminMenuType, NaiveUI.ThemeColor> = {
          '0': 'default',
          '1': 'primary',
          '2': 'success'
        };

        const label = $t(adminMenuTypeRecord[row.menuType]);

        return <NTag type={tagMap[row.menuType]}>{label}</NTag>;
      }
    },
    {
      key: 'menuName',
      title: $t('page.system.adminMenu.menuName'),
      align: 'center',
      minWidth: 128,
      render: row => {
        const { menuName, i18nKey } = row;

        const label = i18nKey ? $t(i18nKey) : menuName;

        return <span>{label}</span>;
      }
    },
    {
      key: 'icon',
      title: $t('page.system.adminMenu.icon'),
      align: 'center',
      width: 60,
      render: row => {
        return (
          <div class="flex-center">
            <SvgIcon icon={row.icon} class="text-icon" />
          </div>
        );
      }
    },
    {
      key: 'routeName',
      title: $t('page.system.adminMenu.routeName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'routePath',
      title: $t('page.system.adminMenu.routePath'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'status',
      title: $t('page.system.adminMenu.status'),
      align: 'center',
      width: 80,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          2: 'warning'
        };

        const label = $t(enableStatusRecord[row.status]);

        return <NTag type={tagMap[row.status]}>{label}</NTag>;
      }
    },
    {
      key: 'hideInMenu',
      title: $t('page.system.adminMenu.hideInMenu'),
      align: 'center',
      width: 80,
      render: row => {
        const hide: CommonType.YesOrNo = row.hideInMenu ? 'Y' : 'N';

        const tagMap: Record<CommonType.YesOrNo, NaiveUI.ThemeColor> = {
          Y: 'error',
          N: 'default'
        };

        const label = $t(yesOrNoRecord[hide]);

        return <NTag type={tagMap[hide]}>{label}</NTag>;
      }
    },
    {
      key: 'pid',
      title: $t('page.system.adminMenu.pid'),
      align: 'center',
      width: 90
    },
    {
      key: 'order',
      title: $t('page.system.adminMenu.order'),
      align: 'center',
      width: 60
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 230,
      render: row => (
        <div class="flex-center justify-end gap-8px">
          {
            <NButton type="primary" ghost size="small" onClick={() => handleAddChildMenu(row)}>
              {$t('page.system.adminMenu.addChildAdminMenu')}
            </NButton>
          }
          <NButton type="primary" ghost size="small" onClick={() => handleEdit(row)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
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

const { onDeleted } = useTableOperate(data, getData);

const operateType = ref<OperateType>('add');

function handleAdd() {
  operateType.value = 'add';

  openModal();
}

const editingData: Ref<Api.System.AdminMenu | null> = ref(null);

function handleAddChildMenu(item: Api.System.AdminMenu) {
  operateType.value = 'addChild';

  editingData.value = { ...item };

  openModal();
}

function handleEdit(item: Api.System.AdminMenu) {
  operateType.value = 'edit';

  editingData.value = { ...item };
}

async function handleDelete(id: number) {
  const { error } = await fetchDeleteAdminMenu(id);
  if (!error) {
    onDeleted();
  }
}
</script>

<template>
  <div ref="wrapperRef" class="flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.system.adminMenu.title')"
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
        :scroll-x="1088"
        :loading="loading"
        :row-key="row => row.id"
        remote
        :pagination="pagination"
        class="sm:h-full"
      />
      <AdminMenuOperateModal
        v-model:visible="visible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
