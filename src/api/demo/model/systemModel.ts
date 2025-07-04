import { componentMap } from '@/components/Table/src/componentMap';
import { Icon } from '@/components/Icon/Icon.vue';
import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';
import type { RouteMeta } from 'vue-router';
export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
  [key: string]: any;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};
// id: `${index}`,
// icon: ['ion:layers-outline', 'ion:git-compare-outline', 'ion:tv-outline'][index],
// component: 'LAYOUT',
// type: '0',
// menuName: ['Dashboard', '权限管理', '功能'][index],
// permission: '',
// orderNo: index + 1,
// createTime: '@datetime',
// 'status|1': ['0', '0', '1'],
// children: (() => {
export type MenuForm = {
  id: string;
  dbId: string;
  icon: string;
  component: string;
  type: string;
  name?: string;
  permission: string;
  orderNo: number;
  createTime: string;
  status: string;
  children: MenuForm[];
  path?: string;
  parentMenu?: string;
  meta: RouteMeta;
};
export type RoleForm = {
  id:  number;
  orderNo: string | number;
  roleName: string;
  roleValue: string;
  createTime: string;
  remark: string;
  menu: string[]; // 菜单 id 数组
  status: string | number;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
