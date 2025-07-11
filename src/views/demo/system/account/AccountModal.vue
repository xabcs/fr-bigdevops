<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from './account.data';
  import { getDeptList, createAccount, updateAccount } from '@/api/demo/system';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    record.value = data.record;
    
    if (unref(isUpdate)) {
      updateSchema([
        {
          field: 'username',
          componentProps: { disabled: true },
        },
      ]);
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
        isUpdate: true,
      });
    } else {
      updateSchema([
        {
          field: 'username',
          componentProps: { disabled: false },
        },
      ]);
      setFieldsValue({
        isUpdate: false,
      });
    }

    // const treeData = await getDeptList();

  });
  const record = ref();
  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      let apiFunc = createAccount;
      let submitValues = values;
      if (unref(isUpdate)) {
        apiFunc = updateAccount;
        // submitValues = { ...values, userId: rowId.value };
        submitValues = { ...record.value, ...values };
      }
      await apiFunc(submitValues);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: submitValues });
      // emit('success');
    } catch (e) {
      // 错误处理
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
