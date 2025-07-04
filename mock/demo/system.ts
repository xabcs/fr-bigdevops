import { Component } from 'vue';
import { isDef } from '@/utils/is';
// import { SubMenuProvider } from './../../src/components/SimpleMenu/src/components/types';
import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultPageSuccess, resultSuccess } from '../_util';
import { RoleEnum } from '@/enums/roleEnum';
import { data } from '@/views/demo/excel/data';
// single
// const dashboardRoute = {
//   path: '/dashboard',
//   name: 'Dashboard',
//   component: 'LAYOUT',
//   redirect: '/dashboard/analysis',
//   meta: {
//     title: 'routes.dashboard.dashboard',
//     hideChildrenInMenu: true,
//     icon: 'bx:bx-home',
//   },
//   children: [
//     {
//       path: 'analysis',
//       name: 'Analysis',
//       component: '/dashboard/analysis/index',
//       meta: {
//         hideMenu: true,
//         hideBreadcrumb: true,
//         title: 'routes.dashboard.analysis',
//         currentActiveMenu: '/dashboard',
//         icon: 'bx:bx-home',
//       },
//     },
//     {
//       path: 'workbench',
//       name: 'Workbench',
//       component: '/dashboard/workbench/index',
//       meta: {
//         hideMenu: true,
//         hideBreadcrumb: true,
//         title: 'routes.dashboard.workbench',
//         currentActiveMenu: '/dashboard',
//         icon: 'bx:bx-home',
//       },
//     },
//   ],
// };

// const backRoute = {
//   path: 'back',
//   name: 'PermissionBackDemo',
//   meta: {
//     title: 'routes.demo.permission.back',
//   },

//   children: [
//     {
//       path: 'page',
//       name: 'BackAuthPage',
//       component: '/demo/permission/back/index',
//       meta: {
//         title: 'routes.demo.permission.backPage',
//       },
//     },
//     {
//       path: 'btn',
//       name: 'BackAuthBtn',
//       component: '/demo/permission/back/Btn',
//       meta: {
//         title: 'routes.demo.permission.backBtn',
//       },
//     },
//   ],
// };

// const authRoute = {
//   path: '/permission',
//   name: 'Permission',
//   component: 'LAYOUT',
//   redirect: '/permission/front/page',
//   meta: {
//     icon: 'carbon:user-role',
//     title: 'routes.demo.permission.permission',
//   },
//   children: [backRoute],
// };

// const levelRoute = {
//   path: '/level',
//   name: 'Level',
//   component: 'LAYOUT',
//   redirect: '/level/menu1/menu1-1',
//   meta: {
//     icon: 'carbon:user-role',
//     title: 'routes.demo.level.level',
//   },

//   children: [
//     {
//       path: 'menu1',
//       name: 'Menu1Demo',
//       meta: {
//         title: 'Menu1',
//       },
//       children: [
//         {
//           path: 'menu1-1',
//           name: 'Menu11Demo',
//           meta: {
//             title: 'Menu1-1',
//           },
//           children: [
//             {
//               path: 'menu1-1-1',
//               name: 'Menu111Demo',
//               component: '/demo/level/Menu111',
//               meta: {
//                 title: 'Menu111',
//               },
//             },
//           ],
//         },
//         {
//           path: 'menu1-2',
//           name: 'Menu12Demo',
//           component: '/demo/level/Menu12',
//           meta: {
//             title: 'Menu1-2',
//           },
//         },
//       ],
//     },
//     {
//       path: 'menu2',
//       name: 'Menu2Demo',
//       component: '/demo/level/Menu2',
//       meta: {
//         title: 'Menu2',
//       },
//     },
//   ],
// };

// const sysRoute = {
//   path: '/system',
//   name: 'System',
//   component: 'LAYOUT',
//   redirect: '/system/account',
//   meta: {
//     icon: 'ion:settings-outline',
//     title: 'routes.demo.system.moduleName',
//   },
//   children: [
//     {
//       path: 'account',
//       name: 'AccountManagement',
//       meta: {
//         title: 'routes.demo.system.account',
//         ignoreKeepAlive: true,
//       },
//       component: '/demo/system/account/index',
//     },
//     {
//       path: 'account_detail/:id',
//       name: 'AccountDetail',
//       meta: {
//         hideMenu: true,
//         title: 'routes.demo.system.account_detail',
//         ignoreKeepAlive: true,
//         showMenu: false,
//         currentActiveMenu: '/system/account',
//       },
//       component: '/demo/system/account/AccountDetail',
//     },
//     {
//       path: 'role',
//       name: 'RoleManagement',
//       meta: {
//         title: 'routes.demo.system.role',
//         ignoreKeepAlive: true,
//       },
//       component: '/demo/system/role/index',
//     },

//     {
//       path: 'menu',
//       name: 'MenuManagement',
//       meta: {
//         title: 'routes.demo.system.menu',
//         ignoreKeepAlive: true,
//       },
//       component: '/demo/system/menu/index',
//     },
//     {
//       path: 'dept',
//       name: 'DeptManagement',
//       meta: {
//         title: 'routes.demo.system.dept',
//         ignoreKeepAlive: true,
//       },
//       component: '/demo/system/dept/index',
//     },
//     {
//       path: 'changePassword',
//       name: 'ChangePassword',
//       meta: {
//         title: 'routes.demo.system.password',
//         ignoreKeepAlive: true,
//       },
//       component: '/demo/system/password/index',
//     },
//   ],
// };

// const linkRoute = {
//   path: '/link',
//   name: 'Link',
//   component: 'LAYOUT',
//   meta: {
//     icon: 'ion:tv-outline',
//     title: 'routes.demo.iframe.frame',
//   },
//   children: [
//     {
//       path: 'doc',
//       name: 'Doc',
//       meta: {
//         title: 'routes.demo.iframe.doc',
//         frameSrc: 'https://doc.vvbin.cn/',
//       },
//     },
//     {
//       path: 'https://doc.vvbin.cn/',
//       name: 'DocExternal',
//       component: 'LAYOUT',
//       meta: {
//         title: 'routes.demo.iframe.docExternal',
//       },
//     },
//   ],
// };
let fakeMenuList = [
  {
    "id": "0",
    "path": "/dashboard",
    "name": "Dashboard",
    "component": "LAYOUT",
    "redirect": "/dashboard/analysis",
    "meta": {
        "title": "routes.dashboard.dashboard",
        "hideChildrenInMenu": true,
        "icon": "bx:bx-home"
    },
    "children": [
        {
            "id": "0-0",
            "path": "analysis",
            "name": "Analysis",
            "component": "/dashboard/analysis/index",
            "meta": {
                "hideMenu": true,
                "hideBreadcrumb": true,
                "title": "routes.dashboard.analysis",
                "currentActiveMenu": "/dashboard",
                "icon": "bx:bx-home"
            }
        },
        {
            "id": "0-1",
            "path": "workbench",
            "name": "Workbench",
            "component": "/dashboard/workbench/index",
            "meta": {
                "hideMenu": true,
                "hideBreadcrumb": true,
                "title": "routes.dashboard.workbench",
                "currentActiveMenu": "/dashboard",
                "icon": "bx:bx-home"
            }
        }
    ]
},
{
    "id": "1",
    "path": "/permission",
    "name": "Permission",
    "component": "LAYOUT",
    "redirect": "/permission/front/page",
    "meta": {
        "icon": "carbon:user-role",
        "title": "routes.demo.permission.permission"
    },
    "children": [
        {
            "id": "1-0",
            "path": "back",
            "name": "PermissionBackDemo",
            "meta": {
                "title": "routes.demo.permission.back"
            },
            "children": [
                {
                    "id": "1-0-0",
                    "path": "page",
                    "name": "BackAuthPage",
                    "component": "/demo/permission/back/index",
                    "meta": {
                        "title": "routes.demo.permission.backPage"
                    }
                },
                {
                    "id": "1-0-1",
                    "path": "btn",
                    "name": "BackAuthBtn",
                    "component": "/demo/permission/back/Btn",
                    "meta": {
                        "title": "routes.demo.permission.backBtn"
                    }
                }
            ]
        }
    ]
},
{
    "id": "2",
    "path": "/level",
    "name": "Level",
    "component": "LAYOUT",
    "redirect": "/level/menu1/menu1-1",
    "meta": {
        "icon": "carbon:user-role",
        "title": "routes.demo.level.level"
    },
    "children": [
        {
            "id": "2-0",
            "path": "menu1",
            "name": "Menu1Demo",
            "meta": {
                "title": "Menu1"
            },
            "children": [
                {
                    "id": "2-0-0",
                    "path": "menu1-1",
                    "name": "Menu11Demo",
                    "meta": {
                        "title": "Menu1-1"
                    },
                    "children": [
                        {
                              "id": "2-0-0-0",
                            "path": "menu1-1-1",
                            "name": "Menu111Demo",
                            "component": "/demo/level/Menu111",
                            "meta": {
                                "title": "Menu111"
                            }
                        }
                    ]
                },
                {
                    "id": "2-0-1",
                    "path": "menu1-2",
                    "name": "Menu12Demo",
                    "component": "/demo/level/Menu12",
                    "meta": {
                        "title": "Menu1-2"
                    }
                }
            ]
        },
        {
            "id": "2-1",
            "path": "menu2",
            "name": "Menu2Demo",
            "component": "/demo/level/Menu2",
            "meta": {
                "title": "Menu2"
            }
        }
    ]
},
{
    "id": "3",
    "path": "/system",
    "name": "System",
    "component": "LAYOUT",
    "redirect": "/system/account",
    "meta": {
        "icon": "ion:settings-outline",
        "title": "routes.demo.system.moduleName"
    },
    "children": [
        {
            "id": "3-0",
            "path": "account",
            "name": "AccountManagement",
            "meta": {
                "title": "routes.demo.system.account",
                "ignoreKeepAlive": true
            },
            "component": "/demo/system/account/index"
        },
        {
            "id": "3-1",
            "path": "account_detail/:id",
            "name": "AccountDetail",
            "meta": {
                "hideMenu": true,
                "title": "routes.demo.system.account_detail",
                "ignoreKeepAlive": true,
                "showMenu": false,
                "currentActiveMenu": "/system/account"
            },
            "component": "/demo/system/account/AccountDetail"
        },
        {
            "id": "3-2",
            "path": "role",
            "name": "RoleManagement",
            "meta": {
                "title": "routes.demo.system.role",
                "ignoreKeepAlive": true
            },
            "component": "/demo/system/role/index"
        },
        {
            "id": "3-3",
            "path": "menu",
            "name": "MenuManagement",
            "meta": {
                "title": "routes.demo.system.menu",
                "ignoreKeepAlive": true
            },
            "component": "/demo/system/menu/index"
        },
        {
            "id": "3-4",
            "path": "dept",
            "name": "DeptManagement",
            "meta": {
                "title": "routes.demo.system.dept",
                "ignoreKeepAlive": true
            },
            "component": "/demo/system/dept/index"
        },
        // {
        //     "path": "changePassword",
        //     "name": "ChangePassword",
        //     "meta": {
        //         "title": "routes.demo.system.password",
        //         "ignoreKeepAlive": true
        //     },
        //     "component": "/demo/system/password/index"
        // }
    ]
},
{
    "id": "4",
    "path": "/link",
    "name": "Link",
    "component": "LAYOUT",
    "meta": {
        "icon": "ion:tv-outline",
        "title": "routes.demo.iframe.frame"
    },
    "children": [
        {
            "id": "4-0",
            "path": "doc",
            "name": "Doc",
            "meta": {
                "title": "routes.demo.iframe.doc",
                "frameSrc": "https://doc.vvbin.cn/"
            }
        },
        {   
            "id": "4-1",
            "path": "https://doc.vvbin.cn/",
            "name": "DocExternal",
            "component": "LAYOUT",
            "meta": {
                "title": "routes.demo.iframe.docExternal"
            }
        }
    ]
},

]
let FakeRoleList = [
  {
    id: 1,
    orderNo: 1,
    roleName: '超级管理员',
    roleValue: RoleEnum.SUPER,
    createTime: '@datetime',
    remark: '超级管理员',
    menu: ['0', '1', '2'],
    status: '1',
  },
  {
    id: 2,
    orderNo: 2,
    roleName: '监控管理员',
    roleValue: RoleEnum.PROM_ADMIN,
    createTime: '@datetime',
    remark: '监控管理员',
    menu: ['0', '1', '2'],
    status: '1',
  },
  {
    id: 3,
    orderNo: 3,
    roleName: 'cicd管理员',
    roleValue: RoleEnum.CICD_ADMIN,
    createTime: '@datetime',
    remark: 'cicd管理员',
    menu: ['0', '1', '2'],
    status: '1',
  },
  {
    id: 4,
    orderNo: 4,
    roleName: '服务树管理员',
    roleValue: RoleEnum.TREE_ADMIN,
    createTime: '@datetime',
    remark: '服务树管理员',
    menu: ['0', '1', '2'],
    status: '1',
  },
  {
    id: 5,
    orderNo: 4,
    roleName: 'k8s管理员',
    roleValue: RoleEnum.TREE_ADMIN,
    createTime: '@datetime',
    remark: 'k8s管理员',
    menu: ['2'],
    status: '1',
  },
];
// export function createFakeRoleList() {
//   return [
//     {
//       id: 1,
//       orderNo: 1,
//       roleName: '超级管理员',
//       roleValue: RoleEnum.SUPER,
//       createTime: '@datetime',
//       remark: '超级管理员',
//       menu: ['0', '1', '2'],
//       status: '1',
//     },
//     {
//       id: 2,
//       orderNo: 2,
//       roleName: '监控管理员',
//       roleValue: RoleEnum.PROM_ADMIN,
//       createTime: '@datetime',
//       remark: '监控管理员',
//       menu: ['0', '1', '2'],
//       status: '1',
//     },
//     {
//       id: 3,
//       orderNo: 3,
//       roleName: 'cicd管理员',
//       roleValue: RoleEnum.CICD_ADMIN,
//       createTime: '@datetime',
//       remark: 'cicd管理员',
//       menu: ['0', '1', '2'],
//       status: '1',
//     },
//     {
//       id: 4,
//       orderNo: 4,
//       roleName: '服务树管理员',
//       roleValue: RoleEnum.TREE_ADMIN,
//       createTime: '@datetime',
//       remark: '服务树管理员',
//       menu: ['0', '1', '2'],
//       status: '1',
//     },
//   ];
// }
const accountList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      account: '@first',
      email: '@email',
      nickname: '@cname()',
      role: '@first',
      createTime: '@datetime',
      remark: '@cword(10,20)',
      'dept|0-2': 1,
      'status|1': ['0', '1'],
    });
  }
  return result;
})();
const roleList = (() => {
  return FakeRoleList;
})();

// const roleList = (() => {
//   const result: any[] = [];
//   for (let index = 0; index < 4; index++) {
//     result.push({
//       id: index + 1,
//       orderNo: `${index + 1}`,
//       roleName: ['超级管理员', '管理员', '文章管理员', '普通用户'][index],
//       roleValue: '@first',
//       createTime: '@datetime',
//       remark: '@cword(10,20)',
//       menu: [['0', '1', '2'], ['0', '1'], ['0', '2'], ['2']][index],
//       'status|1': ['0', '1'],
//     });
//   }
//   return result;
// })();

const deptList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      deptName: ['华东分部', '华南分部', '西北分部'][index],
      orderNo: index + 1,
      createTime: '@datetime',
      remark: '@cword(10,20)',
      'status|1': ['0', '0', '1'],
      children: (() => {
        const children: any[] = [];
        for (let j = 0; j < 4; j++) {
          children.push({
            id: `${index}-${j}`,
            deptName: ['研发部', '市场部', '商务部', '财务部'][j],
            orderNo: j + 1,
            createTime: '@datetime',
            remark: '@cword(10,20)',
            'status|1': ['0', '1'],
            parentDept: `${index}`,
            children: undefined,
          });
        }
        return children;
      })(),
    });
  }
  return result;
})();

const menuList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      icon: ['ion:layers-outline', 'ion:git-compare-outline', 'ion:tv-outline'][index],
      component: 'LAYOUT',
      type: '0',
      menuName: ['Dashboard', '权限管理', '功能'][index],
      permission: '',
      orderNo: index + 1,
      createTime: '@datetime',
      'status|1': ['0', '0', '1'],
      children: (() => {
        const children: any[] = [];
        for (let j = 0; j < 4; j++) {
          children.push({
            id: `${index}-${j}`,
            type: '1',
            menuName: ['菜单1', '菜单2', '菜单3', '菜单4'][j],
            icon: 'ion:document',
            permission: ['menu1:view', 'menu2:add', 'menu3:update', 'menu4:del'][index],
            component: [
              '/dashboard/welcome/index',
              '/dashboard/analysis/index',
              '/dashboard/workbench/index',
              '/dashboard/test/index',
            ][j],
            orderNo: j + 1,
            createTime: '@datetime',
            'status|1': ['0', '1'],
            parentMenu: `${index}`,
            children: (() => {
              const children: any[] = [];
              for (let k = 0; k < 4; k++) {
                children.push({
                  id: `${index}-${j}-${k}`,
                  type: '2',
                  menuName: '按钮' + (j + 1) + '-' + (k + 1),
                  icon: '',
                  permission:
                    ['menu1:view', 'menu2:add', 'menu3:update', 'menu4:del'][index] +
                    ':btn' +
                    (k + 1),
                  component: [
                    '/dashboard/welcome/index',
                    '/dashboard/analysis/index',
                    '/dashboard/workbench/index',
                    '/dashboard/test/index',
                  ][j],
                  orderNo: j + 1,
                  createTime: '@datetime',
                  'status|1': ['0', '1'],
                  parentMenu: `${index}-${j}`,
                  children: undefined,
                });
              }
              return children;
            })(),
          });
        }
        return children;
      })(),
    });
  }
  return result;
})();

// 递归查找父菜单
function findMenuByPath(list, id) {
  for (const item of list) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findMenuByPath(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

export default [
  {
    url: '/basic-api/system/getAccountList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, accountList);
    },
  },
  {
    url: '/basic-api/system/getRoleListByPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20, status, roleName } = query;
      let list = roleList;
      if (status !== undefined) {
        list = list.filter(item => String(item.status) === String(status));
      }
      if (roleName) {
        list = list.filter(item => String(item.roleName).includes(String(roleName)));
      }
      return resultPageSuccess(page, pageSize, list);
    },
  },
  {
    url: '/basic-api/system/setRoleStatus',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { id, status } = body;

      const checkRole = FakeRoleList.find((item) => item.id === id);
      if (!checkRole) {
        return resultError('角色没有找到');
      }
      checkRole.status = status;
      return resultSuccess({ id, status });
    },
  },
  {
    url: '/basic-api/system/getAllRoleList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(roleList);
    },
  },
  {
    url: '/basic-api/system/getDeptList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(deptList);
    },
  },
  {
    url: '/basic-api/system/getMenuList',
    timeout: 100,
    method: 'get',
    response: () => {
      console.log('fakeMenuList列表:', JSON.stringify(fakeMenuList, null, 2));
      return resultSuccess(fakeMenuList);
    },
  },

  {
    url: '/basic-api/system/accountExist',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { account } = body || {};
      if (account && account.indexOf('admin') !== -1) {
        return resultError('该字段不能包含admin');
      } else {
        return resultSuccess(`${account} can use`);
      }
    },
  },
  {
    url: '/basic-api/system/deleteRole',
    timeout: 500,
    method: 'delete',
    response: ({ body }) => {
      const { id } = body;
      const index = FakeRoleList.findIndex((item) => item.id === id);
      if (index === -1) {
        return resultError('角色没有找到');
      }
      FakeRoleList.splice(index, 1);
      console.log('删除角色成功', FakeRoleList);
      return resultSuccess({ id });
    },
  },
  {
    url: '/basic-api/system/createRole',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { id, roleName, ...role } = body;
      if (!roleName) return resultError('角色名称不能为空');
      if (id) {
        // 编辑
        const idx = FakeRoleList.findIndex(item => item.id === Number(id));
        if (idx === -1) return resultError('角色未找到');
        FakeRoleList[idx] = {
          ...FakeRoleList[idx],
          ...role,
          roleName,
          id: Number(id),
          orderNo: Number(role.orderNo) || 0,
          menu: Array.isArray(role.menu) ? role.menu : [],
          status: String(role.status || 1),
        };
        return resultSuccess({ ...FakeRoleList[idx] });
      } else {
        // 新增
        const maxId = Math.max(...FakeRoleList.map(item => Number(item.id))) || 0;
        const newId = maxId + 1;
        const newRole = {
          ...role,
          id: newId,
          orderNo: Number(role.orderNo) || 0,
          roleName,
          roleValue: role.roleValue || '',
          createTime: '@datetime',
          remark: role.remark || '',
          menu: Array.isArray(role.menu) ? role.menu : [],
          status: String(role.status || 1),
        };
        FakeRoleList.push(newRole);
        return resultSuccess({ ...newRole });
      }
    },
  },

  {
    url: '/basic-api/system/createMenu',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { parentMenu, ...menu } = body;
  
      // // 生成 createTime
      // const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
      // 生成 id
      function getNextId(list, parentId) {
        if (!parentId) {
          // 顶级菜单
          const ids = list.map(item => parseInt(item.id, 10)).filter(n => !isNaN(n));
          return ids.length ? String(Math.max(...ids) + 1) : '0';
        } else {
          // 子菜单
          const parent = findMenuByPath(list, parentId);
          if (!parent) return null;
          const children = parent.children || [];
          const childIds = children
            .map(item => item.id)
            .map(id => {
              const parts = id.split('-');
              return parseInt(parts[parts.length - 1], 10);
            })
            .filter(n => !isNaN(n));
          const nextIndex = childIds.length ? Math.max(...childIds) + 1 : 0;
          return `${parentId}-${nextIndex}`;
        }
      }
      const newId = getNextId(fakeMenuList, parentMenu);
      if (!newId) return resultError('父菜单未找到！');
      if (menu.type == '0'){
        menu.component = "LAYOUT";
      }
      const newMenu = {
        ...menu,
        id: newId,
        path: menu.path || '',
        name: menu.name || '',
        component: menu.component || '',
        meta: menu.meta || { title: '', icon: '' },
        createTime: '@datetime',
        children: [],
        parentMenu: parentMenu || undefined,
      };
  
      if (parentMenu) {
        const parent = findMenuByPath(fakeMenuList, parentMenu);
        if (!parent) return resultError('父菜单未找到！');
        parent.children = parent.children || [];
        parent.children.push(newMenu);
      } else {
        fakeMenuList.push(newMenu);
      }
      return resultSuccess(newMenu);
    },
  },
  {
    url: '/basic-api/system/deleteMenu',
    timeout: 500,
    method: 'delete',
    response: ({ body }) => {
      const { id } = body;
      // 递归删除菜单项
      function deleteMenuById(list, id) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === id) {
            list.splice(i, 1);
            return true;
          }
          if (list[i].children && Array.isArray(list[i].children)) {
            const deleted = deleteMenuById(list[i].children, id);
            if (deleted) return true;
          }
        }
        return false;
      }
      const deleted = deleteMenuById(fakeMenuList, id);
      if (!deleted) return resultError('菜单未找到！');
      return resultSuccess({ id });
    },
  },
] as MockMethod[];
