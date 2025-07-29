import { Component } from 'vue';
import { isDef } from '@/utils/is';
// import { SubMenuProvider } from './../../src/components/SimpleMenu/src/components/types';
import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultPageSuccess, resultSuccess } from '../_util';
import { RoleEnum } from '@/enums/roleEnum';
import { data } from '@/views/demo/excel/data';
import { createFakeUserList } from '../sys/user';
import { useRouter } from 'vue-router';
// const router = useRouter();

if (!global.userList) {
  global.userList = createFakeUserList();
}
export let userList = global.userList;
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
// 扁平化：所有菜单项都在一个数组里，便于数据库存储和查询。
// parentMenu/dbId：可以清晰表达父子关系，支持无限级嵌套。
// type 字段：区分目录、菜单、按钮等类型，扩展性强。
// 无 children 字段：前端/后端可根据 parentMenu 字段动态组装树结构，灵活高效。
let dbMenuList = [
  {
    "id": "1",
    "dbId": "1",
    "path": "/dashboard",
    "name": "Dashboard", //如果有meta.title会使用name渲染左侧菜单栏
    "component": "LAYOUT",
    "redirect": "/dashboard/analysis",
    // "orderNo": 1,
    "title": "routes.dashboard.dashboard",
    "icon": "bx:bx-home",
    "type": "0",
    // "hideMenu": false,
    "orderNo": 1, // 新增
    // "show": false,
    "hideMenu": false,
},
{
    "id": "1-1",
    "dbId": "2",
    "path": "analysis",
    "name": "Analysis",
    "component": "/dashboard/analysis/index",
    "orderNo": 1,
    "type": "1",
    "parentMenu": "1",
    "title": "routes.dashboard.analysis",
    "icon": "bx:bx-home",
    "hideMenu": false,
},
{
    "id": "2",
    "dbId": "3",
    "path": "/permission",
    "name": "Permission",
    "component": "LAYOUT",
    "redirect": "/permission/front/page",
    "orderNo": 2,
    "icon": "carbon:user-role",
    "title": "routes.demo.permission.permission",
    "type": "0",
    "hideMenu": false,
},
{
    "id": "2-1",
    "dbId": "4",
    "path": "back",
    "name": "PermissionBackDemo",
    "title": "routes.demo.permission.back",
    "type": "1",
    "orderNo": 1,
    "parentMenu": "3",
    "hideMenu": false,
},
{
  "id": "2-2",
  "dbId": "11",
  "path": 'front',
  "name": 'PermissionFrontDemo',
  "title": "routes.demo.permission.front",
  "type": "1",
  "orderNo": 2,
  "hideMenu": false,
  "parentMenu": "3",
},
{
  "id": "2-2-1",
  "dbId": "12",
  "path": 'page',
  "name": 'FrontPageAuth',
  "title": "routes.demo.permission.front",
  "component": "/demo/permission/front/index",
  "type": "1",
  "orderNo": 2,
  "hideMenu": false,
  "parentMenu": "11",
},
//   children: [
//     {
//       path: 'page',
//       name: 'FrontPageAuth',
//       component: () => import('@/views/demo/permission/front/index.vue'),
//       meta: {
//         title: t('routes.demo.permission.frontPage'),
//       },
//     },
//     {
//       path: 'btn',
//       name: 'FrontBtnAuth',
//       component: () => import('@/views/demo/permission/front/Btn.vue'),
//       meta: {
//         title: t('routes.demo.permission.frontBtn'),
//       },
//     },
//     {
//       path: 'auth-pageA',
//       name: 'FrontAuthPageA',
//       component: () => import('@/views/demo/permission/front/AuthPageA.vue'),
//       meta: {
//         title: t('routes.demo.permission.frontTestA'),
//         roles: [RoleEnum.SUPER],
//       },
//     },
//     {
//       path: 'auth-pageB',
//       name: 'FrontAuthPageB',
//       component: () => import('@/views/demo/permission/front/AuthPageB.vue'),
//       meta: {
//         title: t('routes.demo.permission.frontTestB'),
//         roles: [RoleEnum.SUPER],
//       },
//     },
//   ],
// },
{
  "id": "2-1-1",
  "dbId": "8",
  "path": "page",
  "name": "BackAuthPage",
  "title": "routes.demo.permission.backPage",
  "orderNo": 1,
  "component": "/demo/permission/back/index",
  "parentMenu": "4",
  "type": "1",
  "hideMenu": false,
  // "meta": {
  //     "title": "routes.demo.permission.back",
  //     "roles": ["guest", "super", "admin"] // 允许 guest 访问

  // },
},
{
    "id": "3",
    "dbId": "5",
    "path": "/system",
    "name": "System",
    "component": "LAYOUT",
    "redirect": "/system/account",
    "icon": "ion:settings-outline",
    // "orderNo": 5,
    "title": "系统管理",
    "hideMenu": false,
    "orderNo": 4, // 新增
    "type": "0",
},
{
      "id": "3-1",
      "dbId": "6",
      "path": "menu",
      "name": "MenuManagement",
      "title": "菜单管理",
      "orderNo": 3, // 新增
      "component": "/demo/system/menu/index",
      "type": "1",
      "parentMenu": "5",
      "hideMenu": false,
  },
  {
      "id": "3-2",
      "dbId": "7",
      "path": "account",
      "name": "AccountManagement",
      "title": "routes.demo.system.account",
      "orderNo": 2,
      "parentMenu": "5",
      "component": "/demo/system/account/index",
      "type": "1",
      "hideMenu": false,
  },
  {
  "id": "3-3",
  "dbId": "9",
  "path": "role",
  "name": "RoleManagement",
  "title": "routes.demo.system.role",
  // "meta": {
  //     "title": "routes.demo.system.role",
  //     "ignoreKeepAlive": true
  // },
  "component": "/demo/system/role/index",
  "orderNo": 1, // 新增
  "parentMenu": "5",
  "type": "1",
  "hideMenu": false,
},
    {
      "id": "3-4",
      "dbId": "10",
      "path": 'changePassword',
      "name": 'ChangePassword',
      "title": 'routes.demo.system.password',
      // meta: {
      //   ignoreKeepAlive: true,
      // },
      "component": '/demo/system/password/index',
      "orderNo": 4,
      "hideMenu": false,
      "parentMenu": "5",
      "type": "1",
    },
    
    // "children": [
    //     {
    //         "id": "3-0",
    //         "path": "account",
    //         "name": "AccountManagement",
    //         "meta": {
    //             "title": "routes.demo.system.account",
    //             "ignoreKeepAlive": true,
    //             "roles": ["guest", "super", "admin"] 
    //         },
    //         "component": "/demo/system/account/index"
    //     },
    //     {
    //         "id": "3-1",
    //         "path": "account_detail/:id",
    //         "name": "AccountDetail",
    //         "meta": {
    //             "hideMenu": true,
    //             "title": "routes.demo.system.account_detail",
    //             "ignoreKeepAlive": true,
    //             "showMenu": false,
    //             "currentActiveMenu": "/system/account"
    //         },
    //         "component": "/demo/system/account/AccountDetail"
    //     },
    //     {
    //         "id": "3-2",
    //         "path": "role",
    //         "name": "RoleManagement",
    //         "meta": {
    //             "title": "routes.demo.system.role",
    //             "ignoreKeepAlive": true
    //         },
    //         "component": "/demo/system/role/index"
    //     },
    //     {
    //         "id": "3-3",
    //         "path": "menu",
    //         "name": "MenuManagement",
    //         "meta": {
    //             "title": "routes.demo.system.menu",
    //             "ignoreKeepAlive": true
    //         },
    //         "component": "/demo/system/menu/index"
    //     },
    //     // {
    //     //     "id": "3-4",
    //     //     "path": "dept",
    //     //     "name": "DeptManagement",
    //     //     "meta": {
    //     //         "title": "routes.demo.system.dept",
    //     //         "ignoreKeepAlive": true
    //     //     },
    //     //     "component": "/demo/system/dept/index"
    //     // },
    //     {
    //         "path": "changePassword",
    //         "name": "ChangePassword",
    //         "meta": {
    //             "title": "routes.demo.system.password",
    //             "ignoreKeepAlive": true
    //         },
    //         "component": "/demo/system/password/index"
    //     }
    // ]
// {
//     "id": "4",
//     "path": "/link",
//     "name": "Link",
//     "component": "LAYOUT",
//     "orderNo": 4,
//     "meta": {
//         "icon": "ion:tv-outline",
//         "title": "routes.demo.iframe.frame",
//         "roles": ["guest", "super", "admin"] // 允许 guest 访问
//     },
//     "children": [
//         {
//             "id": "4-0",
//             "path": "doc",
//             "name": "Doc",
//             "meta": {
//                 "title": "routes.demo.iframe.doc",
//                 "frameSrc": "https://doc.vvbin.cn/",
//                 "roles": ["guest", "super", "admin"] // 允许 guest 访问
//             }
//         },
//         {   
//             "id": "4-1",
//             "path": "https://doc.vvbin.cn/",
//             "name": "DocExternal",
//             "component": "LAYOUT",
//             "meta": {
//                 "title": "routes.demo.iframe.docExternal",
//                 "roles": ["guest", "super", "admin"] // 允许 guest 访问
//             }
//         }
//     ]
// },

]
// let fakeMenuList = [
//   {
//     "id": "0",
//     "path": "/dashboard",
//     "name": "Dashboard",
//     "component": "LAYOUT",
//     "redirect": "/dashboard/analysis",
//     "orderNo": 1,
//     "meta": {
//         "title": "routes.dashboard.dashboard",
//         "hideChildrenInMenu": true,
//         "icon": "bx:bx-home",
//         "roles": ["guest", "super", "admin"] // 允许 guest 访问b

//     },
//     "children": [
//         {
//             "id": "0-0",
//             "path": "analysis",
//             "name": "Analysis",
//             "component": "/dashboard/analysis/index",
//             "meta": {
//                 "hideMenu": true,
//                 "hideBreadcrumb": true,
//                 "title": "routes.dashboard.analysis",
//                 "currentActiveMenu": "/dashboard",
//                 "icon": "bx:bx-home",
//                 "roles": ["guest", "super", "admin"] // 允许 guest 访问
//             }
//         },
//         {
//             "id": "0-1",
//             "path": "workbench",
//             "name": "Workbench",
//             "component": "/dashboard/workbench/index",
//             "meta": {
//                 "hideMenu": true,
//                 "hideBreadcrumb": true,
//                 "title": "routes.dashboard.workbench",
//                 "currentActiveMenu": "/dashboard",
//                 "icon": "bx:bx-home",
//                 "roles": ["guest", "super", "admin"] // 允许 guest 访问
//             }
//         }
//     ]
// },
// {
//     "id": "1",
//     "path": "/permission",
//     "name": "Permission",
//     "component": "LAYOUT",
//     "redirect": "/permission/front/page",
//     "orderNo": 2,
//     "meta": {
//         "icon": "carbon:user-role",
//         "title": "routes.demo.permission.permission",
//         "roles": ["guest", "super", "admin"] // 允许 guest 访问
//     },
//     "children": [
//         {
//             "id": "1-0",
//             "path": "back",
//             "name": "PermissionBackDemo",
//             "meta": {
//                 "title": "routes.demo.permission.back",
//                 "roles": ["guest", "super", "admin"] // 允许 guest 访问

//             },
//             "children": [
//                 {
//                     "id": "1-0-0",
//                     "path": "page",
//                     "name": "BackAuthPage",
//                     "component": "/demo/permission/back/index",
//                     "meta": {
//                         "title": "routes.demo.permission.backPage",
//                         "roles": ["guest", "super", "admin"] // 允许 guest 访问
//                     }
//                 },
//                 {
//                     "id": "1-0-1",
//                     "path": "btn",
//                     "name": "BackAuthBtn",
//                     "component": "/demo/permission/back/Btn",
//                     "meta": {
//                         "title": "routes.demo.permission.backBtn",
//                         "roles": ["guest", "super", "admin"] // 允许 guest 访问
//                     }
//                 }
//             ]
//         }
//     ]
// },
// {
//     "id": "2",
//     "path": "/level",
//     "name": "Level",
//     "component": "LAYOUT",
//     "redirect": "/level/menu1/menu1-1",
//     "orderNo": 3,
//     "meta": {
//         "icon": "carbon:user-role",
//         "title": "routes.demo.level.level",
//         "roles": ["guest", "super", "admin"] // 允许 guest 访问
//     },
//     "children": [
//         {
//             "id": "2-0",
//             "path": "menu1",
//             "name": "Menu1Demo",
//             "meta": {
//                 "title": "Menu1"
//             },
//             "children": [
//                 {
//                     "id": "2-0-0",
//                     "path": "menu1-1",
//                     "name": "Menu11Demo",
//                     "meta": {
//                         "title": "Menu1-1"
//                     },
//                     "children": [
//                         {
//                               "id": "2-0-0-0",
//                             "path": "menu1-1-1",
//                             "name": "Menu111Demo",
//                             "component": "/demo/level/Menu111",
//                             "meta": {
//                                 "title": "Menu111"
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     "id": "2-0-1",
//                     "path": "menu1-2",
//                     "name": "Menu12Demo",
//                     "component": "/demo/level/Menu12",
//                     "meta": {
//                         "title": "Menu1-2"
//                     }
//                 }
//             ]
//         },
//         {
//             "id": "2-1",
//             "path": "menu2",
//             "name": "Menu2Demo",
//             "component": "/demo/level/Menu2",
//             "meta": {
//                 "title": "Menu2"
//             }
//         }
//     ]
// },
// {
//     "id": "3",
//     "path": "/system",
//     "name": "System",
//     "component": "LAYOUT",
//     // "redirect": "/system/account",
//     "orderNo": 5,
//     "meta": {
//         "icon": "ion:settings-outline",
//         "title": "routes.demo.system.moduleName",
//         "roles": ["guest", "super", "admin"] // 允许 guest 访问
//     },
//     "children": [
//         {
//             "id": "3-0",
//             "path": "account",
//             "name": "AccountManagement",
//             "meta": {
//                 "title": "routes.demo.system.account",
//                 "ignoreKeepAlive": true,
//                 "roles": ["guest", "super", "admin"] 
//             },
//             "component": "/demo/system/account/index"
//         },
//         {
//             "id": "3-1",
//             "path": "account_detail/:id",
//             "name": "AccountDetail",
//             "meta": {
//                 "hideMenu": true,
//                 "title": "routes.demo.system.account_detail",
//                 "ignoreKeepAlive": true,
//                 "showMenu": false,
//                 "currentActiveMenu": "/system/account"
//             },
//             "component": "/demo/system/account/AccountDetail"
//         },
//         {
//             "id": "3-2",
//             "path": "role",
//             "name": "RoleManagement",
//             "meta": {
//                 "title": "routes.demo.system.role",
//                 "ignoreKeepAlive": true
//             },
//             "component": "/demo/system/role/index"
//         },
//         {
//             "id": "3-3",
//             "path": "menu",
//             "name": "MenuManagement",
//             "meta": {
//                 "title": "routes.demo.system.menu",
//                 "ignoreKeepAlive": true
//             },
//             "component": "/demo/system/menu/index"
//         },
//         // {
//         //     "id": "3-4",
//         //     "path": "dept",
//         //     "name": "DeptManagement",
//         //     "meta": {
//         //         "title": "routes.demo.system.dept",
//         //         "ignoreKeepAlive": true
//         //     },
//         //     "component": "/demo/system/dept/index"
//         // },
//         {
//             "path": "changePassword",
//             "name": "ChangePassword",
//             "meta": {
//                 "title": "routes.demo.system.password",
//                 "ignoreKeepAlive": true
//             },
//             "component": "/demo/system/password/index"
//         }
//     ]
// },
// {
//     "id": "4",
//     "path": "/link",
//     "name": "Link",
//     "component": "LAYOUT",
//     "orderNo": 4,
//     "meta": {
//         "icon": "ion:tv-outline",
//         "title": "routes.demo.iframe.frame",
//         "roles": ["guest", "super", "admin"] // 允许 guest 访问
//     },
//     "children": [
//         {
//             "id": "4-0",
//             "path": "doc",
//             "name": "Doc",
//             "meta": {
//                 "title": "routes.demo.iframe.doc",
//                 "frameSrc": "https://doc.vvbin.cn/",
//                 "roles": ["guest", "super", "admin"] // 允许 guest 访问
//             }
//         },
//         {   
//             "id": "4-1",
//             "path": "https://doc.vvbin.cn/",
//             "name": "DocExternal",
//             "component": "LAYOUT",
//             "meta": {
//                 "title": "routes.demo.iframe.docExternal",
//                 "roles": ["guest", "super", "admin"] // 允许 guest 访问
//             }
//         }
//     ]
// },

// ]
let FakeRoleList = [
  {
    id: 1,
    orderNo: 1,
    roleName: '超级管理员',
    email: 'super@vvbin.cn',
    roleValue: RoleEnum.SUPER,
    createTime: '@datetime',
    remark: '超级管理员',
    // menu: ['1', '3','3-1','3-2'],
    menu: ['1','1-1','2', '2-1','2-1-1','2-2','2-2-1','3','3-1','3-2','3-3','3-4'],
    // menu: ['1','1-1','2-2-1','3','3-1','3-2','3-3','3-4'],
    //menu: ['3','3-1','3-2','3-3','3-4'],
    status: '1',
  },
  {
    id: 2,
    orderNo: 2,
    roleName: '监控管理员',
    roleValue: RoleEnum.PROM_ADMIN,
    email: 'prom@vvbin.cn',
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
    email: 'cicd@vvbin.cn',
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
    email: 'tree@vvbin.cn',
    createTime: '@datetime',
    remark: '服务树管理员',
    menu: ['0', '1', '2'],
    status: '1',
  },
  {
    id: 5,
    orderNo: 5,
    roleName: 'k8s管理员',
    roleValue: RoleEnum.TREE_ADMIN,
    createTime: '@datetime',
    remark: 'k8s管理员',
    menu: ['2'],
    status: '1',
  },
  {
    id: 6,
    orderNo: 6,
    roleName: '访客',
    roleValue: RoleEnum.GUEST,
    createTime: '@datetime',
    remark: '访客',
    menu: ['1','1-1','2','2-1','2-1-1','2-2','2-2-1'],
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
// const accountList = (() => {
//   const result: any[] = [];
//   for (let index = 0; index < 5; index++) {
//     result.push({
//       id: `${index}`,
//       account: '@first',
//       email: '@email',
//       nickname: '@cname()',
//       role: '@first',
//       createTime: '@datetime',
//       remark: '@cword(10,20)',
//       'dept|0-2': 1,
//       'status|1': ['0', '1'],
//     });
//   }
//   return result;
// })();
let accountList = [
  {
    userId: '4',
    username: 'vben',
    realName: 'Vben Admin',
    email: 'test@outlook.com',
    avatar: '',
    desc: 'manager',
    password: '123456',
    token: 'fakeToken1',
    homePath: '/dashboard/analysis',
    roles: [
      {
        roleName: 'Super Admin',
        value: 'super',
      },
      {
        roleName: 'guest',
        value: 'guest',
      },
    ],
  },
  // {
  //   id: '1',
  //   account: 'admin',
  //   email: 'admin@example.com',
  //   nickname: '超级管理员',
  //   role: 'super',
  //   createTime: '2022-01-01 10:00:00',
  //   remark: '系统最高权限',
  //   dept: 0,
  //   status: '1',
  // },
  // {
  //   id: '2',
  //   account: 'monitor',
  //   email: 'monitor@example.com',
  //   nickname: '监控员',
  //   role: 'prom_admin',
  //   createTime: '2022-01-02 11:00:00',
  //   remark: '负责监控',
  //   dept: 1,
  //   status: '1',
  // },
  // {
  //   id: '3',
  //   account: 'guest',
  //   email: 'user1@example.com',
  //   nickname: '访客',
  //   role: 'guest',
  //   createTime: '2022-01-03 12:00:00',
  //   remark: '访客账号',
  //   dept: 2,
  //   status: '0',
  // },
];
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

// 扁平转树
// function buildMenuTree(list, parentId = null) {
//   return list
//     .filter(item => (item.parentMenu || null) === parentId)
//     .sort((a, b) => (a.orderNo || 0) - (b.orderNo || 0))
//     .map(item => {
//       const { title, icon, hideMenu, orderNo, ...rest } = item;
//       const children = buildMenuTree(list, item.dbId); // 递归生成子菜单
//       const menu = {
//         ...rest,
//         meta: {
//           ...(item.meta || {}),
//           title,
//           icon,
//           hideMenu,
//           orderNo,
//         },
//       };
//       if (children.length) menu.children = children;
//       return menu;
//     });
// }
function buildMenuTree(list, parentId = null) {
  return list
    .filter(item => (item.parentMenu || null) === parentId)
    .sort((a, b) => (a.orderNo || 0) - (b.orderNo || 0))
    .map(item => {
      const { title, icon, hideMenu, orderNo, ...rest } = item;
      const children = buildMenuTree(list, item.dbId);
      const menu = {
        ...rest,
        meta: {
          ...(item.meta || {}),
          title,
          icon,
          hideMenu,
          orderNo,
        },
      };
      if (children.length) {
        menu.children = children;
      }
      return menu;
    })
    // 只保留有children的目录，或者本身不是目录（type !== '0'）
    // .filter(item => item.type !== '0' || (item.children && item.children.length));
}

function getNextId(list, parentMenu) {
  if (!parentMenu) {
    const ids = list
      .filter(item => !item.parentMenu)
      .map(item => parseInt(item.id, 10))
      .filter(n => !isNaN(n));
    return ids.length ? String(Math.max(...ids) + 1) : '1';
  } else {
    const children = list.filter(item => item.parentMenu === parentMenu);
    const childIds = children
      .map(item => item.id)
      .map(id => {
        const parts = id.split('-');
        return parseInt(parts[parts.length - 1], 10);
      })
      .filter(n => !isNaN(n));
    const nextIndex = childIds.length ? Math.max(...childIds) + 1 : 1;
    return `${parentMenu}-${nextIndex}`;
  }
}
function getAllParentIds(menuId: string, menuList: any[]): string[] {
  const result: string[] = [];
  let current = menuList.find(item => item.id === menuId);
  while (current && current.parentMenu) {
    // 这里parentMenu存的是dbId
    const parent = menuList.find(item => item.dbId === current.parentMenu);
    if (parent) {
      result.push(parent.id);
      current = parent;
    } else {
      break;
    }
  }
  return result;
}

function getFullMenuIds(selectedIds, menuList) {
  const set = new Set(selectedIds);
  selectedIds.forEach(id => {
    getAllParentIds(id, menuList).forEach(pid => set.add(pid));
  });
  return Array.from(set);
}
export default [
  // {
  //   url: '/basic-api/system/getAccountList',
  //   timeout: 100,
  //   method: 'get',
  //   response: ({ query }) => {
  //     const { page = 1, pageSize = 20 } = query;
  //     return resultPageSuccess(page, pageSize, accountList);
  //   },
  // },
  {
    url: '/basic-api/system/getAccountList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, userList);
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
  // {
  //   url: '/basic-api/system/getMenuList',
  //   timeout: 100,
  //   method: 'get',
  //   response: () => {
  //     console.log('fakeMenuList列表:', JSON.stringify(fakeMenuList, null, 2));
  //     return resultSuccess(fakeMenuList);
  //   },
  // },

  {
    url: '/basic-api/system/accountExist',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { account } = body || {};
      // 检查 accountList 里是否有同名用户
      const exists = userList.some(item => item.username === account);
      if (exists) {
        return resultError('用户名已存在');
      } else {
        return resultSuccess(`${account} 可以使用`);
      }
      // if (account && account.indexOf('admin') !== -1) {
      //   return resultError('该字段不能包含admin');
      // } else {
      //   return resultSuccess(`${account} can use`);
      // }
    }
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
      url: '/basic-api/system/deleteAccount',
      timeout: 500,
      method: 'delete',
      response: ({ body }) => {
        const { id } = body;
        const index = userList.findIndex((item) => item.userId === id);
        // const index = userList.findIndex((item) => String(item.userId) === String(userId));
        console.log('删除用户', id, index);
        if (index === -1) {
          return resultError('用户没有找到');
        }
        userList.splice(index, 1);
        console.log('删除用户成功', userList);
        return resultSuccess({ id });
      },
    },
  // {
  //   url: '/basic-api/system/saveOrUpdateAccount',
  //   timeout: 500,
  //   method: 'post',
  //   response: ({ body }) => {
  //     // body 就是前端传来的表单数据
  //     // 你可以根据 body.id 是否存在判断是新增还是编辑
  //     if (body.id) {
  //       // 编辑逻辑
  //       // 假设你有个 accountList 数组存所有账号
  //       const idx = accountList.findIndex(acc => acc.id === body.id);
  //       if (idx > -1) {
  //         accountList[idx] = { ...accountList[idx], ...body };
  //         return {
  //           code: 0,
  //           message: '编辑成功',
  //           result: accountList[idx],
  //         };
  //       } else {
  //         return {
  //           code: 1,
  //           message: '未找到该账号',
  //         };
  //       }
  //     } else {
  //       // 新增逻辑
  //       const newId = String(Date.now());
  //       const now = new Date().toLocaleString();
  //       const newAccount = {
  //         userId: newId,
  //         username: body.username || '',
  //         realName: body.realName || '',
  //         avatar: '', // 可选
  //         desc: '',   // 可选
  //         password: body.pwd || '', // 注意字段名
  //         token: '',
  //         homePath: '',
  //         email: body.email || '',
  //         remark: body.remark || '',
  //         createTime: now,
  //         roles: Array.isArray(body.roles)
  //           ? body.roles.map(val => {
  //               const roleObj = FakeRoleList.find(r => r.roleValue === val);
  //               return {
  //                 roleName: roleObj ? roleObj.roleName : val,
  //                 value: val,
  //               };
  //             })
  //           : [],
  //       };
  //       accountList.push(newAccount);
  //       return {
  //         code: 0,
  //         message: '新增成功',
  //         result: newAccount,
  //       };
  //     }
  //   },
  // },
  {
    url: '/basic-api/system/createAccount',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      // if (body.userId) {
      //   // 编辑
      //   const idx = userList.findIndex(acc => acc.userId === body.userId);
      //   if (idx > -1) {
      //     userList[idx] = { ...userList[idx], ...body };
      //     return {
      //       code: 0,
      //       message: '编辑成功',
      //       result: userList[idx],
      //     };
      //   } else {
      //     return {
      //       code: 1,
      //       message: '未找到该账号',
      //     };
      //   }
      // } else {
        // 新增
        const newId = String(Date.now());
        const now = new Date().toLocaleString();
        const newUser = {
          userId: newId,
          username: body.username || '',
          realName: body.realName || '',
          avatar: '',
          desc: '',
          password: body.pwd || '',
          token: 'fakeToken_' + newId, // 关键：生成唯一 token
          homePath: '',
          email: body.email || '',
          remark: body.remark || '',
          createTime: now,
          roles: Array.isArray(body.roles)
            ? body.roles.map(val => {
                const roleObj = FakeRoleList.find(r => r.roleValue === val);
                return {
                  roleName: roleObj ? roleObj.roleName : val,
                  value: val,
                };
              })
            : [],
        };
        userList.push(newUser);
        console.log('新增后userList:', userList)
        return {
          code: 0,
          message: '新增成功',
          result: newUser,
        };
      }
    // },
  },
  // {
  //   userId: '4',
  //   username: 'vben',
  //   realName: 'Vben Admin',
  //   avatar: '',
  //   desc: 'manager',
  //   password: '123456',
  //   token: 'fakeToken1',
  //   homePath: '/dashboard/analysis',
  //   roles: [
  //     {
  //       roleName: 'Super Admin',
  //       value: 'super',
  //     },
  //     {
  //       roleName: 'guest',
  //       value: 'guest',
  //     },
  //   ],
  // },
  {
    url: '/basic-api/system/createRole',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { id, roleName, ...role } = body;
      if (!roleName) return resultError('角色名称不能为空');
      // if (id) {
      //   // 编辑
      //   const idx = FakeRoleList.findIndex(item => item.id === Number(id));
      //   if (idx === -1) return resultError('角色未找到');
      //   FakeRoleList[idx] = {
      //     ...FakeRoleList[idx],
      //     ...role,
      //     roleName,
      //     id: Number(id),
      //     orderNo: Number(role.orderNo) || 0,
      //     menu: Array.isArray(role.menu) ? role.menu : [],
      //     status: String(role.status || 1),
      //   };
      //   return resultSuccess({ ...FakeRoleList[idx] });
      // } else {
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
      // }
    },
  },

  // {
  //   url: '/basic-api/system/createMenu',
  //   timeout: 500,
  //   method: 'post',
  //   response: ({ body }) => {
  //     const { parentMenu, ...menu } = body;
  
  //     // // 生成 createTime
  //     // const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  //     // 生成 id
  //     function getNextId(list, parentId) {
  //       if (!parentId) {
  //         // 顶级菜单
  //         const ids = list.map(item => parseInt(item.id, 10)).filter(n => !isNaN(n));
  //         return ids.length ? String(Math.max(...ids) + 1) : '0';
  //       } else {
  //         // 子菜单
  //         const parent = findMenuByPath(list, parentId);
  //         if (!parent) return null;
  //         const children = parent.children || [];
  //         const childIds = children
  //           .map(item => item.id)
  //           .map(id => {
  //             const parts = id.split('-');
  //             return parseInt(parts[parts.length - 1], 10);
  //           })
  //           .filter(n => !isNaN(n));
  //         const nextIndex = childIds.length ? Math.max(...childIds) + 1 : 0;
  //         return `${parentId}-${nextIndex}`;
  //       }
  //     }
  //     const newId = getNextId(fakeMenuList, parentMenu);
  //     if (!newId) return resultError('父菜单未找到！');
  //     if (menu.type == '0'){
  //       menu.component = "LAYOUT";
  //     }
  //     const newMenu = {
  //       ...menu,
  //       id: newId,
  //       path: menu.path || '',
  //       name: menu.name || '',
  //       component: menu.component || '',
  //       meta: menu.meta || { title: '', icon: '' },
  //       createTime: '@datetime',
  //       children: [],
  //       parentMenu: parentMenu || undefined,
  //     };
  
  //     if (parentMenu) {
  //       const parent = findMenuByPath(fakeMenuList, parentMenu);
  //       if (!parent) return resultError('父菜单未找到！');
  //       parent.children = parent.children || [];
  //       parent.children.push(newMenu);
  //     } else {
  //       fakeMenuList.push(newMenu);
  //     }
  //     return resultSuccess(newMenu);
  //   },
  // },
  {
    url: '/basic-api/system/createMenu',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      // 自动生成 dbId
      const maxDbId = dbMenuList.reduce((max, item) => {
        const n = Number(item.dbId);
        return isNaN(n) ? max : Math.max(max, n);
      }, 0);
      const newDbId = String(maxDbId + 1);
  
      // 生成 id
      const newId = getNextId(dbMenuList, body.parentMenu || null);

      // 关键：在这里做转换
      const hideMenu = body.show === '1';

      // 组装新菜单
      const newMenu = {
        ...body,
        path: body.routePath || '',
        name: body.name || '',
        title: body.title || '',
        orderNo: body.orderNo || 0,
        component: body.component || '',
        type: body.type || '1',
        hideMenu, // 用转换后的 hideMenu
        icon: body.icon || '',
        redirect: body.redirect || '',
        // 以上是常用字段，按你 dbMenuList 结构补全
        id: newId,
        dbId: newDbId,
        parentMenu: body.parentMenu || null,
      };
      console.log('新菜单', newMenu);
      dbMenuList.push(newMenu);
      return resultSuccess(newMenu);
    },
  },
  {
    url: '/basic-api/system/deleteMenu',
    timeout: 500,
    method: 'delete',
    response: ({ body }) => {
      const { id } = body;
      // 递归删除菜单及其所有子菜单
      function deleteMenuAndChildren(list, id) {
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i].id === id) {
            list.splice(i, 1);
          } else if (list[i].parentMenu === id) {
            deleteMenuAndChildren(list, list[i].id);
          }
        }
      }
      const exists = dbMenuList.some(item => item.id === id);
      if (!exists) return resultError('菜单未找到！');
      deleteMenuAndChildren(dbMenuList, id);
      return resultSuccess({ id });
    },
  },


  //根据当前用户的信息角色获取菜单
  //  {
  //   url: '/basic-api/system/getMenuListAll',
  //   timeout: 100,
  //   method: 'get',
  //   response: () => {
  //     // console.log('dbmenulist列表:', JSON.stringify(fakeMenuList, null, 2));
  //     const menuTree = buildMenuTree(dbMenuList);
  //     // console.log('menuTree列表:', JSON.stringify(menuTree, null, 2));
  //     return resultSuccess(menuTree);
  //   },
  // },
  // {
  //   url: '/basic-api/system/getMenuList',
  //   timeout: 100,
  //   method: 'get',
  //   response: ({ headers }) => {
  //     // 1. 解析 token
  //     let token = '';
  //     if (headers && headers.authorization) {
  //       // 支持 Bearer token 格式
  //       token = headers.authorization.replace(/^Bearer\s+/i, '');
  //     }
  //     // 2. 查找当前用户
  //     const user = userList.find(u => u.token === token);
  //     if (!user) {
  //       return resultError('未登录或token无效');
  //     }
  //     // 3. 获取用户所有角色的 menu 权限
  //     let menuIds: string[] = [];
  //     user.roles.forEach(role => {
  //       const roleObj = FakeRoleList.find(r => r.roleValue === role.value);
  //       if (roleObj && Array.isArray(roleObj.menu)) {
  //         menuIds = menuIds.concat(roleObj.menu.filter((id): id is string => typeof id === 'string'));
  //       }
  //     });
  //     menuIds = Array.from(new Set(menuIds));
  //     // 4. 自动补齐所有父级目录
  //     function collectWithParents(ids: string[], allMenus: typeof dbMenuList) {
  //       const set = new Set(ids);
  //       let changed = true;
  //       while (changed) {
  //         changed = false;
  //         for (const item of allMenus) {
  //           if (set.has(item.id) && item.parentMenu && !set.has(item.parentMenu)) {
  //             set.add(item.parentMenu);
  //             changed = true;
  //           }
  //         }
  //       }
  //       return Array.from(set);
  //     }
  //     const allMenuIds = collectWithParents(menuIds, dbMenuList);
  //     // 5. 过滤菜单
  //     const filteredMenu = dbMenuList.filter(item => allMenuIds.includes(item.id));
  //     // 6. 转树
  //     const menuTree = buildMenuTree(filteredMenu);
  //     return resultSuccess(menuTree);
  //   },
  // },
  {
    url: '/basic-api/system/updateRole',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { id, ...role } = body;
      if (!id) return resultError('缺少角色id');
      const idx = FakeRoleList.findIndex(item => item.id === Number(id));
      if (idx === -1) return resultError('角色未找到');
  
      // 自动补全所有父级 id
      const fullMenuIds = getFullMenuIds(role.menu || [], dbMenuList) as string[];
      console.log('菜单id树', fullMenuIds);
  
      FakeRoleList[idx] = { ...FakeRoleList[idx], ...role, id: Number(id), menu: fullMenuIds };
      return resultSuccess({ ...FakeRoleList[idx] });
    },
  },
  //使用后端接口
  // {
  //   url: '/basic-api/system/updateMenu',
  //   timeout: 500,
  //   method: 'post',
  //   response: ({ body }) => {
  //     const { id, ...update } = body;
  //     if (!id) return resultError('缺少菜单id');
  //     const idx = dbMenuList.findIndex(item => item.id === id);
  //     if (idx === -1) return resultError('菜单未找到！');
  //     // 自动转换 show -> hideMenu
  //     const hideMenu = update.show === '1';
  //     dbMenuList[idx] = {
  //       ...dbMenuList[idx],
  //       ...update,
  //       hideMenu,
  //       id: dbMenuList[idx].id,
  //       dbId: dbMenuList[idx].dbId,
  //     };
  //     return resultSuccess(dbMenuList[idx]);
  //   },
  // },
  {
    url: '/basic-api/system/updateAccount',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      console.log('更新用户', body);
      const { userId, ...user } = body;
      if (!userId) return resultError('缺少用户id');
      const idx = userList.findIndex(item => String(item.userId) === String(userId));
      if (idx === -1) return resultError('用户未找到');
      userList[idx] = {
        ...userList[idx],
        ...user,
        userId: userId,
        roles: Array.isArray(user.roles)
          ? user.roles.map(val => {
              if (typeof val === 'object') return val;
              const roleObj = FakeRoleList.find(r => r.roleValue === val);
              return {
                roleName: roleObj ? roleObj.roleName : val,
                value: val,
              };
            })
          : [],
      };
      return resultSuccess({ ...userList[idx] });
    },
  },
  {
    url: '/basic-api/system/changePassword',
    timeout: 500,
    method: 'post',
    response: ({ body, headers }) => {
      const { oldPassword, newPassword } = body;
      // 1. 解析 token
      let token = '';
      if (headers && headers.authorization) {
        token = headers.authorization.replace(/^Bearer\s+/i, '');
      }
      // 2. 查找当前用户
      const user = userList.find(u => u.token === token);
      if (!user) {
        return resultError('未登录或token无效');
      }
      if (!oldPassword || !newPassword) {
        return resultError('参数不完整');
      }
      if (String(user.password) !== String(oldPassword)) {
        return resultError('原密码错误');
      }
      user.password = newPassword;
      console.log('修改后的密码:', newPassword);
      return resultSuccess('密码修改成功');
    },
  },
] as MockMethod[];
