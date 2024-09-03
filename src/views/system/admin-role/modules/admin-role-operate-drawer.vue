<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchAddAdminRole, fetchEditAdminRole } from '@/service/api/system';

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

type Model = Pick<Api.System.AdminRole, 'id' | 'name'>;
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
  }
});

function createDefaultModel(): Model {
  return {
    id: 0,
    name: ''
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

async function handleSubmit() {
  await validate();
  if (props.operateType === 'add') {
    const { error } = await fetchAddAdminRole({ name: model.name });
    if (!error) {
      window.$message?.success($t('common.createSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchEditAdminRole(model.id, { name: model.name });
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
        <NFormItem :label="$t('page.system.adminRole.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.system.adminRole.form.name')" />
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
