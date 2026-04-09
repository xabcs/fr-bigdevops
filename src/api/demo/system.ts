import { mapData } from './../../views/demo/charts/data';
import { createApp } from 'vue';
import {
  AccountParams,
  DeptListItem,
  MenuParams,
  ApiParams,
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
  AccountList = '/api/system/getAccountList',
  // AccountList = '/system/getAccountList',
  IsAccountExist = '/api/system/accountExist',
  // IsAccountExist = '/system/accountExist',
  // DeptList = '/system/getDeptList',
  setRoleStatus = '/api/system/setRoleStatus',
  // setRoleStatus = '/system/setRoleStatus',
  // 获取菜单列表table数据的接口
  MenuList = '/api/system/getMenuList',
  // 获取api列表table数据的接口
  ApiList = '/api/system/getApiList',
  // MenuList = '/system/getMenuList',
  MenuListAll = '/api/system/getMenuListAll',
  // MenuListAll = '/system/getMenuListAll',
  RolePageList = '/system/getRoleListByPage',
  // RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/api/system/getRoleListAll',
  // GetAllRoleList = '/system/getAllRoleList',
  DeleteRole = '/api/system/deleteRole',
  // DeleteRole = '/system/deleteRole',
  createMenu = '/api/system/createMenu',
  createApi = '/api/system/createApi',
  // createMenu = '/system/createMenu',
  deleteMenu = '/api/system/deleteMenu',
  // deleteMenu = '/system/deleteMenu',
  createRole = '/api/system/createRole',
  // createRole = '/system/createRole',
  updateRole = '/api/system/updateRole',
  // updateRole = '/system/updateRole',
  // createAccount = '/system/createAccount',
  createAccount = '/api//system/createAccount',
  // deleteAccount = '/system/deleteAccount',
  deleteAccount = '/api/system/deleteAccount',
  updateAccount = '/api/system/updateAccount',
  // updateAccount = '/system/updateAccount',
  DeptList = '/system/getDeptList',
  updateMenu = '/api/system/updateMenu',
  // updateMenu = '/system/updateMenu',
  changePassword = '/api/system/changePassword',
  // changePassword = '/system/changePassword',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });
export const getApiList = (params?: ApiParams) =>
  defHttp.get({ url: Api.ApiList, params });
export const createApi = (params?: ApiParams) =>
  defHttp.post({ url: Api.createApi, params });
export const getMenuListAll = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuListAll, params });

export const createMenu = (params: MenuForm) => defHttp.post({ url: Api.createMenu, params });
export const updateMenu = (params: MenuForm) => defHttp.post({ url: Api.updateMenu, params });
export const createRole = (params: RoleForm) => defHttp.post({ url: Api.createRole, params });

export const updateRole = (params: RoleForm) => defHttp.post({ url: Api.updateRole, params });
export const createAccount = (params: any) => defHttp.post({ url: Api.createAccount, params });
export const updateAccount = (params: any) => defHttp.post({ url: Api.updateAccount, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.GetAllRoleList, params });
// defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

export const deleteRole = (id: number) => defHttp.delete({ url: Api.DeleteRole, params: { id } });
//路径参数删除角色
// export const deleteRole = (id: number) => defHttp.delete({ url: Api.DeleteRole + '/' + id });
export const deleteMenu = (id: number) => defHttp.delete({ url: Api.deleteMenu, params: { id } });

export const deleteAccount = (id: number) =>
  defHttp.delete({ url: Api.deleteAccount, params: { id } });
export const changePassword = (params: { oldPassword: string; newPassword: string }) =>
  defHttp.post({ url: Api.changePassword, params });
