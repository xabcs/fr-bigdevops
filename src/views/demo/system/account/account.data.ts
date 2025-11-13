import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';

/**
 * transform mock data
 * {
 *  0: '华东分部',
 * '0-0': '华东分部-研发部'
 * '0-1': '华东分部-市场部',
 *  ...
 * }
 */
export const deptMap = (() => {
  const pDept = ['华东分部', '华南分部', '西北分部'];
  const cDept = ['研发部', '市场部', '商务部', '财务部'];

  return pDept.reduce((map, p, pIdx) => {
    map[pIdx] = p;

    cDept.forEach((c, cIndex) => (map[`${pIdx}-${cIndex}`] = `${p}-${c}`));

    return map;
  }, {});
})();

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '用户ID',
    dataIndex: 'ID',
    width: 100,
  },
  {
    title: '昵称',
    dataIndex: 'realName',
    width: 120,
  },
  // {
  //   title: '邮箱',
  //   dataIndex: 'email',
  //   width: 120,
  // },
  {
    title: '创建时间',
    dataIndex: 'CreatedAt',
    width: 150,
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'desc',
    width: 200,
  },
  {
    title: '家目录',
    dataIndex: 'homePath',
    width: 200,
  },
  // {
  //   title: '所属部门',
  //   dataIndex: 'dept',
  //   customRender: ({ value }) => {
  //     return deptMap[value];
  //   },
  // },
  // {
  //   title: '备注',
  //   dataIndex: 'remark',
  // },
];

export const searchFormSchema: FormSchema[] = [
  // {
  //   field: 'username',
  //   label: '用户名',
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
  {
    field: 'modal_form_item_realName',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
  field: 'isUpdate',
  component: 'Input',
  ifShow: false,
  defaultValue: true
},
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    // componentProps: ({ formModel }) => ({
    //   readonly: formModel.isUpdate === true, // 编辑状态时只读
    // }),
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    //动态设置禁用状态：编辑时禁用，新增时可编辑
    // componentProps: ({ values }) => ({
    //   disabled: values.isUpdate === true, // 关键：编辑状态（isUpdate为true）时禁用
    // }),
    dynamicRules: ({ values }) => {
      // 修复条件判断逻辑：应该只有在明确是编辑状态(isUpdate为true)时才跳过验证
      // console.log("values打印",values);
      if (values.isUpdate === true) return [];
      // if (values.isUpdate !== false) return [];
      return [
          {
            required: true,
            min: 3,
            max: 20,
            message: '用户名长度应在3-20个字符之间',
            trigger: ['change','blur']
          },
          {
            trigger: 'blur',
            validator(_, value) {
              return new Promise<void>((resolve, reject) => {
                if (!value) return resolve();
                isAccountExist(value)
                  .then(resolve)
                  .catch((err) => {
                    reject(err.message || '验证失败');
                  });
              });
            }
          }
        ];
    },
  },
  {
    field: 'realName',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  // {
  //   label: '角色',
  //   field: 'roles',
  //   component: 'ApiSelect',
  //   componentProps: {
  //     api: getAllRoleList,
  //     labelField: 'roleName',
  //     valueField: 'value',
  //     mode: 'multiple', // 关键：多选

  //   },
  //   required: true,
  // },
  {
    label: '角色',
    field: 'rolesValue',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
      mode: 'multiple', // 关键：多选
    },
    required: true,
  },
  // {
  //   field: 'dept',
  //   label: '所属部门',
  //   component: 'TreeSelect',
  //   componentProps: {
  //     fieldNames: {
  //       label: 'deptName',
  //       value: 'id',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  //   required: true,
  // },

  {
    label: '家目录',
    field: 'homePath',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    // required: true,
    // ifShow: false,
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',
    dynamicRules: ({ values }) => {
      // if (values.isUpdate) return [];
      return [
        {
          // required: true,
          validator: (_, value) => {
            // if (!value) {
            //   return Promise.reject('密码不能为空');
            // }
            // 若确认密码为空，不进行验证
            if (!value) return Promise.resolve();
            if (value !== values.password) {
              return Promise.reject('两次输入的密码不一致!');
            }
            //新密码不能与旧密码相同
            // if (value === values.passwordOld) {
            //   return Promise.reject('新密码不能与旧密码相同');
            // }
            return Promise.resolve();
          },
        },
      ];
    },
    // required: true,
    // ifShow: false,
  },
  {
    label: '备注',
    field: 'desc',
    component: 'InputTextArea',
  },
];
