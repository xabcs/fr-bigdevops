<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'users'">
          <div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: flex-start;">
            <a-tag
              v-for="item in record.users"
              :key="item.username"
              :color="GetTagColor()"
              :bordered="false"
              style="margin-bottom: 4px;"
            >
              {{ item.username }}
            </a-tag>
          </div>
        </template>
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
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getRoleListByPage, deleteRole } from '@/api/demo/system';

  import { useDrawer } from '@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';

  import { columns, searchFormSchema } from './role.data';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'RoleManagement' });
  import { useI18n } from '@/hooks/web/useI18n';
// ...
  const { t } = useI18n();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    api: getRoleListByPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });
  function GetTagColor() {
        return 'success';
  }
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    console.log('编辑传入的record', record.ID); // 这里必须能看到 id
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    console.log('删除操作传入的 record:', record);
    const { createMessage } = useMessage();
    deleteRole(record.ID)
      .then(() => {
        createMessage.success('删除角色成功');
        reload();
      })
      .catch(() => {
        // 你的其它逻辑
        createMessage.error('删除角色失败');

      })
      .finally(() => {
        // 你的其它逻辑
        record.pendingStatus = false;
      });
  }

  function handleSuccess() {
    reload();
  }
</script>
