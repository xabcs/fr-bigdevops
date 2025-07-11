import { mapData } from './../../views/demo/charts/data';
import { createApp } from 'vue';
import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  MenuForm,
  RoleForm,
} from './model/systemModel';
import { defHttp } from '@/utils/http/axios';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  // DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/getMenuList',
  MenuListAll = '/system/getMenuListAll',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList',
  DeleteRole = '/system/deleteRole',
  createMenu = '/system/createMenu',
  deleteMenu = '/system/deleteMenu',
  createRole = '/system/createRole',
  updateRole = '/system/updateRole',
  createAccount = '/system/createAccount',
  deleteAccount = '/system/deleteAccount',
  updateAccount = '/system/updateAccount',
  DeptList = '/system/getDeptList',
  updateMenu = '/system/updateMenu',
  changePassword='/system/changePassword'


}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });
export const getMenuListAll = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuListAll, params });

export const createMenu = (params: MenuForm) => defHttp.post({ url: Api.createMenu, params });
export const updateMenu = (params: MenuForm) => defHttp.post({ url: Api.updateMenu, params });
export const createRole = (params: RoleForm) => defHttp.post({ url: Api.createRole, params });

export const updateRole = (params: RoleForm) => defHttp.post({ url: Api.updateRole, params });
export const  createAccount = (params: any) => defHttp.post({ url: Api.createAccount, params });
export const  updateAccount = (params: any) => defHttp.post({ url: Api.updateAccount, params });


export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

export const deleteRole = (id: number) => defHttp.delete({ url: Api.DeleteRole, params: { id } });
export const deleteMenu = (id: number) => defHttp.delete({ url: Api.deleteMenu, params: { id } });

export const deleteAccount = (id: number) => defHttp.delete({ url: Api.deleteAccount, params: { id } });
export const changePassword = (params: { oldPassword: string; newPassword: string }) =>
  defHttp.post({ url: Api.changePassword, params });