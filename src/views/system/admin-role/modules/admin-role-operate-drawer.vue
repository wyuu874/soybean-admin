<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import type { TreeInst } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchAddAdminRole, fetchEditAdminRole, fetchGetAdminMenuList } from '@/service/api/system';

defineOptions({
  name: 'AdminRoleOperateDrawer'
});

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.System.AdminRole | null;
}
interface Emits {
  (e: 'submitted'): void;
}

type Model = Pick<Api.System.AdminRole, 'id' | 'name' | 'description' | 'menus'>;
type RuleKey = Extract<keyof Model, 'name'>;

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const visible = defineModel<boolean>('visible', { default: false });
const model: Model = reactive(createDefaultModel());
const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule
};
const menus = ref<Api.System.AdminMenu[]>([]);
const treeRef = ref<TreeInst | null>(null);
const checkedMenus = ref<number[]>([]);
const indeterminateMenus = ref<number[]>([]);

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.system.adminRole.addAdminRole'),
    edit: $t('page.system.adminRole.editAdminRole')
  };
  return titles[props.operateType];
});

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    getMenuOptions();
    // 根据model.menus设置checkedMenus和indeterminateMenus
    checkedMenus.value = model.menus.filter(item => item.checked === 1).map(item => item.id);
    indeterminateMenus.value = model.menus.filter(item => item.checked === 2).map(item => item.id);
  }
});

function createDefaultModel(): Model {
  return {
    id: 0,
    name: '',
    description: '',
    menus: []
  };
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

// 获取选中的节点ID
function getCheckedIds() {
  if (!treeRef.value) return [];

  // 获取选中的节点ID
  const checked: Api.System.AdminRoleMenu[] = treeRef.value.getCheckedData().keys.map(item => ({
    id: Number(item),
    checked: 1
  }));
  // 获取半选中的节点ID
  const indeterminate: Api.System.AdminRoleMenu[] = treeRef.value.getIndeterminateData().keys.map(item => ({
    id: Number(item),
    checked: 2
  }));

  return [...checked, ...indeterminate];
}

function handleUpdateCheckedKeys(keys: number[]) {
  checkedMenus.value = keys;
}

function handleUpdateIndeterminateKeys(keys: number[]) {
  indeterminateMenus.value = keys;
}

async function getMenuOptions() {
  menus.value = [];
  const { error, data } = await fetchGetAdminMenuList({
    current: 1,
    size: 999,
    menuType: 2
  });
  if (!error) {
    const { records } = data;
    menus.value = records;
  }
}

async function handleSubmit() {
  model.menus = getCheckedIds();
  await validate();
  if (props.operateType === 'add') {
    const { error } = await fetchAddAdminRole({
      name: model.name,
      description: model.description,
      menus: model.menus
    });
    if (!error) {
      window.$message?.success($t('common.createSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchEditAdminRole(model.id, {
      name: model.name,
      description: model.description,
      menus: model.menus
    });
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      emit('submitted');
    }
  }
}
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="720">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.system.adminRole.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.system.adminRole.form.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.adminRole.description')">
          <NInput
            v-model:value="model.description"
            type="textarea"
            maxlength="100"
            show-count
            :placeholder="$t('page.system.adminRole.form.description')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.system.adminRole.permission')">
          <NTree
            ref="treeRef"
            block-lines
            checkable
            show-line
            check-on-click
            cascade
            default-expand-all
            key-field="id"
            label-field="menuName"
            :data="menus"
            :checked-keys="checkedMenus"
            :indeterminate-keys="indeterminateMenus"
            @update-checked-keys="handleUpdateCheckedKeys"
            @update-indeterminate-keys="handleUpdateIndeterminateKeys"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
