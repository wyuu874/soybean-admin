<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchAddAdminUser, fetchEditAdminUser, fetchGetAdminRoleList } from '@/service/api/system';

defineOptions({
  name: 'AdminUserOperateDrawer'
});

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.System.AdminUser | null;
}
interface Emits {
  (e: 'submitted'): void;
}

type Model = Pick<Api.System.AdminUser, 'id' | 'userName' | 'password' | 'adminRoleId'>;
type RuleKey = Extract<keyof Model, 'userName' | 'password' | 'adminRoleId'>;

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule, formRules } = useFormRules();

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const visible = defineModel<boolean>('visible', { default: false });
const model: Model = reactive(createDefaultModel());
const rules: Record<RuleKey, App.Global.FormRule[]> = reactive(createDefaultRules());
const roleOptions = ref<CommonType.Option<string>[]>([]);

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.system.adminUser.addAdminUser'),
    edit: $t('page.system.adminUser.editAdminUser')
  };
  return titles[props.operateType];
});

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    handleInitRules();
    restoreValidation();
    getRoleOptions();
  }
});

function createDefaultModel(): Model {
  return {
    id: 0,
    userName: '',
    password: '',
    adminRoleId: null
  };
}

function createDefaultRules(): Record<RuleKey, App.Global.FormRule[]> {
  return {
    userName: formRules.userName,
    password: formRules.pwd,
    adminRoleId: [defaultRequiredRule]
  };
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function handleInitRules() {
  Object.assign(rules, createDefaultRules());

  if (props.operateType === 'edit') {
    Reflect.deleteProperty(rules, 'userName');
    Reflect.deleteProperty(rules, 'password');
  }
}

function closeDrawer() {
  visible.value = false;
}

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

async function handleSubmit() {
  await validate();
  if (props.operateType === 'add') {
    const { error } = await fetchAddAdminUser({
      userName: model.userName,
      password: model.password,
      adminRoleId: model.adminRoleId
    });
    if (!error) {
      window.$message?.success($t('common.createSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchEditAdminUser(model.id, {
      password: model.password,
      adminRoleId: model.adminRoleId
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
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.system.adminUser.adminRoleName')" path="adminRoleId">
          <NSelect
            v-model:value="model.adminRoleId"
            :placeholder="$t('page.system.adminUser.form.adminRoleName')"
            :options="roleOptions"
          ></NSelect>
        </NFormItem>
        <NFormItem :label="$t('page.system.adminUser.userName')" path="userName">
          <NInput
            v-model:value="model.userName"
            :placeholder="$t('page.system.adminUser.form.userName')"
            :disabled="props.operateType === 'edit'"
          />
        </NFormItem>
        <NFormItem :label="$t('page.system.adminUser.password')" path="password">
          <NInput
            v-model:value="model.password"
            type="password"
            :placeholder="$t('page.system.adminUser.form.password')"
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
