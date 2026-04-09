<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增api </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ApiDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  // import { useI18n } from 'vue-i18n';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteMenu, getApiList } from '@/api/demo/system';

  import { useDrawer } from '@/components/Drawer';
  import ApiDrawer from './ApiDrawer.vue';

  import { columns, searchFormSchema } from './api.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useI18n } from '@/hooks/web/useI18n';
  import { usePermissionStore } from '@/store/modules/permission';

  defineOptions({ name: 'MenuManagement' });

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, expandAll }] = useTable({
    title: 'api列表',
    api: getApiList,

    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  // function handleDelete(record: Recordable) {
  //   console.log(record);
  // }
  function handleDelete(record: Recordable) {
    const { createMessage } = useMessage();
    deleteMenu(record.ID)
      .then(() => {
        createMessage.success('删除api成功');
        reload();
        usePermissionStore().buildRoutesAction(); // 关键：刷新左侧api
      })
      .catch(() => {
        createMessage.error('删除失败');
      })
      .finally(() => {
        record.pendingStatus = false;
      });
  }
  function handleSuccess() {
    reload();
    usePermissionStore().buildRoutesAction();
  }

  function onFetchSuccess() {
    // 默认不展开所有表项
    // nextTick(expandAll);
  }
</script>
