<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: t('meta.title'), key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTree, TreeItem } from '@/components/Tree';

  import { getMenuListAll ,createRole, updateRole } from '@/api/demo/system';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);
  const record = ref<any>({});

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [
      ...formSchema,
      {
        field: 'id',
        label: '',
        component: 'Input',
        show: false, // 隐藏，不渲染
      },
    ],
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    // console.log("当前权限",treeData.value);
    if (unref(treeData).length === 0) {
      const menuList = await getMenuListAll();
      treeData.value = translateTreeTitle(menuList);
      console.log("treeData数据",treeData.value);
    }
    isUpdate.value = !!data?.isUpdate;
    console.log("当前操作",isUpdate.value);
    console.log("当前数据",data.record.id);
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));
  console.log("操作",getTitle);

  function translateTreeTitle(list) {
    return list.map(item => {
      const newItem = { ...item };
      if (newItem.meta && newItem.meta.title) {
        newItem.meta = { ...newItem.meta, title: t(newItem.meta.title) };
      }
      if (newItem.children) {
        newItem.children = translateTreeTitle(newItem.children);
      }
      return newItem;
    });
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      const { createMessage } = useMessage();
      let apiFunc = createRole;
      let submitValues = values;
      if (unref(isUpdate)) {
        apiFunc = updateRole;
        submitValues = { ...record.value, ...values };
      }
      apiFunc(submitValues)
        .then(() => {
          createMessage.success(unref(isUpdate) ? '编辑角色成功' : '添加角色成功');
          closeDrawer();
          emit('success');
        })
        .catch(() => {
          createMessage.error(unref(isUpdate) ? '编辑角色失败' : '添加角色失败');
        });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
