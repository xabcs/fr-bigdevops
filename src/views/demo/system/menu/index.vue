<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  // import { useI18n } from 'vue-i18n';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteMenu, getMenuList } from '@/api/demo/system';

  import { useDrawer } from '@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { columns, searchFormSchema } from './menu.data';
  import { useMessage } from '@/hooks/web/useMessage';
  defineOptions({ name: 'MenuManagement' });
  import { useI18n } from '@/hooks/web/useI18n';
  const { t } = useI18n();

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, expandAll }] = useTable({
    title: '菜单列表',
    api: getMenuList,
  
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
    console.log(record);
    const { createMessage } = useMessage();
    deleteMenu(record.id)
      .then(() => {
        createMessage.success('删除菜单成功');
        reload();
      })
      .catch(() => {
        // 你的其它逻辑
        createMessage.error('删除失败');

      })
      .finally(() => {
        // 你的其它逻辑
        record.pendingStatus = false;
      });
  }
  function handleSuccess() {
    reload();
  }

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
