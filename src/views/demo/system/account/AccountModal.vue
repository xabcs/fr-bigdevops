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
  const record = ref();
  const rowId = ref('');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate,getFieldsValue }] = useForm({
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
          // componentProps: { disabled: true },
          componentProps: { readonly: true },
        },
      ]);
      //     // 关键：将 Proxy 数组转换为普通数组
      // const rolesValueArray = Array.from(data.record.rolesValue || []);
      // rowId.value = data.record.id;
      console.log("打印role",record.value.roles)
        // 关键：从 Roles 数组中提取 roleValue，组成新数组
      const rolesValueArray = (record.value.roles || []).map(role => role.roleValue);
      console.log('提取后的角色值数组：', rolesValueArray); // 应输出 ['super']
      setFieldsValue({
        ...data.record,
        isUpdate: true,
        rolesValue: rolesValueArray, // 赋值给表单的 rolesValue 字段
        password:"",
        confirmPassword:"",
      });
    } else {
      updateSchema([
        {
          field: 'username',
          componentProps: { readonly: false },
        },
      ]);
      setFieldsValue({
        isUpdate: false,
      });
    }

    // const treeData = await getDeptList();

  });
  // const record = ref();
  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      console.log("表单有效值：", values); // 正确打印表单值
      let apiFunc = createAccount;
      let submitValues = values;
      // var reqData = getFieldsValue()
      if (unref(isUpdate)) {
        // delete reqData["username"]
        // delete reqData["password"]
        apiFunc = updateAccount;
        // submitValues = { ...values, userId: rowId.value };
        submitValues = { ...record.value, ...values };
      }
      // var reqData = getFieldValue()
      // // var roles = reqData['roles']
      // console.log("原始的getFieldValue()",getFieldValue())
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