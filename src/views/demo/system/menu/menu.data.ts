import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { useI18n } from '@/hooks/web/useI18n';
// ...

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: '中文名称',
    dataIndex: 'title',
    width: 200,
    align: 'left',
    customRender: ({ record }) => t(record.meta?.title || record.name),
  },
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '英文名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.meta.icon });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 180,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
  },
  {
    title: '路由路径',
    dataIndex: 'path',
  },
  {
    title: '排序序',
    dataIndex: 'orderNo',
    width: 100,
    // sorter: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

const isDir = (type: string) => type === '0';
const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '目录', value: '0' },
        { label: '菜单', value: '1' },
        { label: '按钮', value: '2' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'title',
    label: '中文名称',
    rules: [{ min: 1, max: 100, message: 'Length should be 1 to 10', trigger: 'blur' }],
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '英文名称',
    rules: [{ min: 1, max: 100, message: 'Length should be 1 to 10', trigger: 'blur' }],
    component: 'Input',
    required: true,
  },

  {
    field: 'parentMenu',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    ifShow: ({ values }) => !isDir(values.type),
    required: true,
  },

  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    // ifShow: ({ values }) => !isButton(values.type),
    ifShow: ({ values }) => isDir(values.type),
  },

  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
  },
  {
    field: 'isExt',
    label: '是否外链',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'show',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
];
