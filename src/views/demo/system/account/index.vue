<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <!-- <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" /> -->
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
        <a-button type="primary" @click="handleExport">导出账号</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'roles'">
          <!-- <span>
            {{ (record.roles || []).map(r => r.roleName || r.value).join(', ') }}
          </span> -->
          <!-- <div v-for="item in record.roles" :key="item.value">
            <a-tag :color="GetTagColor(item.value)">{{ item.value }}</a-tag>
          </div> -->
          <!-- <div style="display: flex; gap: 4px">
            <a-tag
              v-for="item in record.roles"
              :bordered="false"
              :key="item.value"
              :color="GetTagColor(item.value)"
            >
              {{ item.value }}
            </a-tag>
          </div> -->
          <div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: flex-start;">
            <a-tag
              v-for="item in record.roles"
              :key="item.value"
              :color="GetTagColor(item.value)"
              :bordered="false"
              style="margin-bottom: 4px;"
            >
              {{ item.value }}
            </a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看用户详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑用户资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此账号',
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
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteAccount, getAccountList } from '@/api/demo/system';
  import { PageWrapper } from '@/components/Page';
  import DeptTree from './DeptTree.vue';

  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  defineOptions({ name: 'AccountManagement' });

  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});

  function GetTagColor(role) {
    switch (role) {
      case 'super':
        return 'error';
      case 'guest':
        return 'warning';
      default:
        return 'success';
    }
  }

  const [registerTable, { reload, updateTableDataRecord, getSearchInfo }] = useTable({
    title: '账号列表',
    api: getAccountList,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    console.log("编辑用户",record);
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    console.log("用户id",record.userId);
    const { createMessage } = useMessage();
    deleteAccount(record.userId)
      .then(() => {
        createMessage.success('删除用户成功')
        reload();
      })
      .catch(() => {
        // 你的其它逻辑
        createMessage.error('删除用户失败')

      })
      .finally(() => {
        // 你的其它逻辑
        record.pendingStatus = false;
      });
  }

  function handleExport() {
    console.log(getSearchInfo());
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      const result = updateTableDataRecord(values.id, values);
      console.log(result);
      reload();
    } else {
      reload();
    }
  }

  function handleSelect(deptId = '') {
    searchInfo.deptId = deptId;
    reload();
  }

  function handleView(record: Recordable) {
    go('/system/account_detail/' + record.id);
  }
</script>
