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
  import { formSchema } from './api.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import { getApiList, createApi } from '@/api/demo/system';
  import { useMessage } from '@/hooks/web/useMessage';
  import { createAbstractBuilder } from 'typescript';
  import { ReloadOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  // ...
  const { t } = useI18n();

  defineOptions({ name: 'ApiDrawer' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const record = ref();
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
    record.value = data.record;

    // if (unref(isUpdate)) {
    //   setFieldsValue({
    //     ...data.record,
    //     title: t(data.record.meta?.title || ''), // 关键：meta.title -> title
    //     icon: data.record.meta?.icon || '', // meta.icon -> icon
    //     // orderNo: data.record.orderNo || 0,
    //     // routePath: data.record.path || '',  // pathFinder -> pathFinder
    //   });
    // }
    // const treeData = await getapiList();
    const treeData = addRandomIdToTree(fixTreeLabel(await getApiList()));
    console.log('打印treedate', treeData);
    const treeData2 = await getApiList();
    console.log('打印treedate2', treeData2);
    // const treeData = getApiList();
    updateSchema({
      field: 'pid',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      const { createMessage } = useMessage();
      console.log('record', record.value);
      let apiFunc = createApi;
      let submitValues = values;
      if (unref(isUpdate)) {
        apiFunc = updateApi;
        submitValues = { ...record.value, ...values };
      }
      apiFunc(submitValues)
        .then(() => {
          createMessage.success(`${getTitle.value}成功`);
          closeDrawer();
          emit('success', { isUpdate: unref(isUpdate), values: submitValues });
        })
        .catch(() => {
          createMessage.error(`${getTitle.value}失败`);
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
  //     createapi(values).then(() => {
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
  //     await createapi(values);
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

  // 生成随机数函数
  function generateRandomId() {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }

  // 为树形数据添加随机数ID
  function addRandomIdToTree(tree) {
    return tree.map((item) => ({
      ...item,
      randomId: generateRandomId(), // 添加随机数ID
      children: item.children ? addRandomIdToTree(item.children) : undefined,
    }));
  }

  function fixTreeLabel(tree) {
    return tree.map((item) => ({
      ...item,
      // title: item.meta?.title ? t(item.meta.title) : item.title || item.name || '---',
      children: item.children ? fixTreeLabel(item.children) : undefined,
    }));
  }
</script>
