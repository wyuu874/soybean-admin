<script setup lang="tsx">
import { computed, reactive, watch } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { adminMenuTypeOptions } from '@/constants/system';
import { enableStatusOptions } from '@/constants/common';
import { fetchAddAdminMenu, fetchEditAdminMenu } from '@/service/api/system';

defineOptions({
  name: 'AdminMenuOperateModal'
});

export type OperateType = NaiveUI.TableOperateType | 'addChild';

interface Props {
  operateType: OperateType;
  rowData?: Api.System.AdminMenu | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', { required: false });

const { formRef, validate } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<OperateType, string> = {
    add: $t('page.system.adminMenu.addAdminMenu'),
    edit: $t('page.system.adminMenu.editAdminMenu'),
    addChild: $t('page.system.adminMenu.addChildAdminMenu')
  };

  return titles[props.operateType];
});

type Model = Pick<
  Api.System.AdminMenu,
  | 'id'
  | 'pid'
  | 'menuType'
  | 'menuName'
  | 'component'
  | 'routeName'
  | 'routePath'
  | 'i18nKey'
  | 'icon'
  | 'order'
  | 'status'
  | 'hideInMenu'
  | 'keepAlive'
  | 'isProps'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    pid: 0,
    menuType: 0,
    menuName: '',
    component: '',
    routeName: '',
    routePath: '',
    i18nKey: null,
    icon: '',
    order: 0,
    status: '1',
    hideInMenu: false,
    keepAlive: false,
    isProps: false
  };
}

type RuleKey = Extract<
  keyof Model,
  'menuType' | 'menuName' | 'routeName' | 'routePath' | 'i18nKey' | 'order' | 'status'
>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  menuType: defaultRequiredRule,
  menuName: defaultRequiredRule,
  routeName: defaultRequiredRule,
  routePath: defaultRequiredRule,
  i18nKey: defaultRequiredRule,
  order: defaultRequiredRule,
  status: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (!props.rowData) return;

  if (props.operateType === 'addChild') {
    const { id } = props.rowData;

    Object.assign(model, { pid: id });
  }

  if (props.operateType === 'edit') {
    Object.assign(model, props.rowData);

    model.menuType = props.rowData.menuType;
    model.status = props.rowData.status;
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  if (props.operateType === 'add' || props.operateType === 'addChild') {
    const { error } = await fetchAddAdminMenu(model);
    if (!error) {
      window.$message?.success($t('common.createSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchEditAdminMenu(model.id, model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      emit('submitted');
    }
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-800px">
    <NScrollbar class="h-480px pr-20px">
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="100">
        <NGrid responsive="screen" item-responsive>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.menuType')" path="menuType">
            <NRadioGroup v-model:value="model.menuType">
              <NRadio
                v-for="item in adminMenuTypeOptions"
                :key="item.value"
                :value="item.value"
                :label="$t(item.label)"
              ></NRadio>
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.status')" path="status">
            <NRadioGroup v-model:value="model.status">
              <NRadio
                v-for="item in enableStatusOptions"
                :key="item.value"
                :value="item.value"
                :label="$t(item.label)"
              />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.menuName')" path="menuName">
            <NInput v-model:value="model.menuName" :placeholder="$t('page.system.adminMenu.form.menuName')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.component')">
            <NInput v-model:value="model.component" :placeholder="$t('page.system.adminMenu.form.component')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.routeName')" path="routeName">
            <NInput v-model:value="model.routeName" :placeholder="$t('page.system.adminMenu.form.routeName')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.routePath')" path="routePath">
            <NInput v-model:value="model.routePath" :placeholder="$t('page.system.adminMenu.form.routePath')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.i18nKey')" path="i18nKey">
            <NInput v-model:value="model.i18nKey" :placeholder="$t('page.system.adminMenu.form.i18nKey')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.icon')">
            <NInput v-model:value="model.icon" :placeholder="$t('page.system.adminMenu.form.icon')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.order')" path="order">
            <NInputNumber
              v-model:value="model.order"
              class="w-full"
              :placeholder="$t('page.system.adminMenu.form.order')"
            />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.hideInMenu')">
            <NRadioGroup v-model:value="model.hideInMenu">
              <NRadio :value="true" :label="$t('common.yesOrNo.yes')" />
              <NRadio :value="false" :label="$t('common.yesOrNo.no')" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.keepAlive')">
            <NRadioGroup v-model:value="model.keepAlive">
              <NRadio :value="true" :label="$t('common.yesOrNo.yes')" />
              <NRadio :value="false" :label="$t('common.yesOrNo.no')" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.adminMenu.isProps')">
            <NRadioGroup v-model:value="model.keepAlive">
              <NRadio :value="true" :label="$t('common.yesOrNo.yes')" />
              <NRadio :value="false" :label="$t('common.yesOrNo.no')" />
            </NRadioGroup>
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NScrollbar>
    <template #footer>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
