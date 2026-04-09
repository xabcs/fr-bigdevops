import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { useI18n } from '@/hooks/web/useI18n';
// ...

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: '接口名称',
    dataIndex: 'title',
    align: 'left',
    // customRender: ({ record }) => t(record.meta?.title || record.name),
    fixed: 'left',
  },
  {
    title: 'ID',
    dataIndex: 'ID',
    width: 100,
  },

  {
    title: '接口路径',
    dataIndex: 'path',
    width: 200,
    align: 'left',
  },

  {
    title: 'http方法',
    dataIndex: 'method',
    width: 180,
  },
  {
    title: '上级id',
    dataIndex: 'pid',
    width: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'CreatedAt',
    width: 180,
  },
];

const isCApi = (type: string) => type === '0';
const isFApi = (type: string) => type === '1';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '接口名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: 'api类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '父级api', value: '0' },
        { label: '子级api', value: '1' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'pid',
    label: '上级api',
    required: true,
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        // value: 'id',
        value: 'randomId',//这个value是一个唯一标识，用于在树状结构中唯一标识每个节点。当这个value是id时，选中节点后时，会显示节点的id的拼接。当不是id时，会显示节点的lable。
      },
      // labelInValue: false,
      getPopupContainer: () => document.body,
    },
    ifShow: ({ values }) => isFApi(values.type),
    // required: true,
  },
  // {
  //   field: 'pid',
  //   label: '上级api',
  //   component: 'TreeSelect',
  //   componentProps: {
  //     fieldNames: {
  //       label: 'title',
  //       // value: 'id',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  //   ifShow: ({ values }) => isFApi(values.type),
  //   // ifShow: ({ values }) => !isButton(values.type),
  //   required: true,
  // },
  {
    field: 'title',
    label: '接口名称',
    rules: [{ min: 1, max: 100, message: 'Length should be 1 to 10', trigger: 'blur' }],
    component: 'Input',
    required: true,
  },

  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    // ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'method',
    component: 'Select',
    label: 'http方法',
    required: true,
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: 'GET', value: 'GET', key: 'GET' },
        { label: 'POST', value: 'POST', key: 'POST' },
        { label: 'PUT', value: 'PUT', key: 'PUT' },
        { label: 'DELETE', value: 'DELETE', key: 'DELETE' },
      ],
    },
  },
];
