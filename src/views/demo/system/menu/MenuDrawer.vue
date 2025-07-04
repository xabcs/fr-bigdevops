<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import { getMenuList, createMenu } from '@/api/demo/system';
  import { useMessage } from '@/hooks/web/useMessage';
import { createAbstractBuilder } from 'typescript';
import { ReloadOutlined } from '@ant-design/icons-vue';

  defineOptions({ name: 'MenuDrawer' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getMenuList();
    updateSchema({
      field: 'parentMenu',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
  async function handleSubmit() {
  try {
    const values = await validate();
    setDrawerProps({ confirmLoading: true });
    const { createMessage } = useMessage();
    createMenu(values)
      .then(() => {
        createMessage.success('添加菜单成功');
        closeDrawer();
        emit('success'); // 必须放到这里，确保数据已更新
      })
      .catch(() => {
        createMessage.error('添加菜单失败');
      });
  } finally {
    setDrawerProps({ confirmLoading: false });
  }
}
  // async function handleSubmit() {
  //   try {
  //     const values = await validate();
  //     setDrawerProps({ confirmLoading: true });
  //     const { createMessage } = useMessage();
  //     console.log('菜单提交值',values);
  //     createMenu(values).then(() => {
  //       createMessage.success('添加菜单成功');
  //     })
  //       .catch(() => {
  //         // 你的其它逻辑
  //         createMessage.error('添加菜单失败');
  //       });
  //     closeDrawer();
  //     emit('success');
  //   } finally {
  //     setDrawerProps({ confirmLoading: false });
  //   }
  // }
  // async function handleSubmit() {
  //   try {
  //     const values = await validate();
  //     setDrawerProps({ confirmLoading: true });
  //     const { createMessage } = useMessage();
  //     console.log(values);
  //     await createMenu(values);
  //     createMessage.success('添加菜单成功');
  //     closeDrawer();
  //     emit('success');
  //   } catch (e) {
  //     const { createMessage } = useMessage();
  //     createMessage.error('添加菜单失败');
  //   } finally {
  //     setDrawerProps({ confirmLoading: false });
  //   }
  // }
</script>
