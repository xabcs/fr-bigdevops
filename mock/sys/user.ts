import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';
import { RoleEnum } from '@/enums/roleEnum';
import { userList } from '../demo/system'; 
export function createFakeUserList() {
  return [
    {
      userId: 1,
      username: 'admin',
      realName:   '超管',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',//用户的默认首页
      roles: [
        {
          roleName: '超級管理員',
          value: 'super',
        },
      ],
    },
        {
      userId: 2,
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: '',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: '访客',
          value: RoleEnum.GUEST,
        },
        {
          roleName: RoleEnum.PROM_ADMIN,
          value: RoleEnum.PROM_ADMIN,
        },
      ],
    },
    // {
    //   userId: 2,
    //   username: 'test',
    //   password: '123456',
    //   realName: 'test user',
    //   avatar: '',
    //   desc: 'tester',
    //   token: 'fakeToken2',
    //   homePath: '/dashboard/workbench',
    //   roles: [
    //     {
    //       roleName: 'Tester',
    //       value: 'test',
    //     },
    //     {
    //       roleName: RoleEnum.PROM_ADMIN,
    //       value: RoleEnum.PROM_ADMIN,
    //     },
    //   ],
    // },
    // {
    //   userId: 3,
    //   username: 'guest',
    //   password: 'guest',
    //   realName: 'guest',
    //   avatar: '',
    //   desc: 'guest',
    //   token: 'fakeToken3',
    //   homePath: '/dashboard/workbench',
    //   roles: [
    //     {
    //       roleName: 'guest',
    //       value: 'guest',
    //     },
    //   ],
    // },
  ];
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
};
export default [
  // mock user login
  // {
  //   url: '/basic-api/login',
  //   timeout: 200,
  //   method: 'post',
  //   response: ({ body }) => {
  //     const { username, password } = body;
  //     const checkUser = createFakeUserList().find(
  //       (item) => item.username === username && password === item.password,
  //     );
  //     if (!checkUser) {
  //       return resultError('Incorrect account or password！');
  //     }
  //     const { userId, username: _username, token, realName, desc, roles } = checkUser;
  //     return resultSuccess({
  //       roles,
  //       userId,
  //       username: _username,
  //       token,
  //       realName,
  //       desc,
  //     });
  //   },
  // },
  // mock/sys/user.ts
// 注意路径和导出方式

{
  url: '/basic-api/login',
  timeout: 200,
  method: 'post',
  response: ({ body }) => {
    const { username, password } = body;
    // 用全局 userList
    console.log('登录时打印用户列表:', userList)
    const checkUser = userList.find(
      (item) => item.username === username && password === item.password,
    );
    if (!checkUser) {
      return resultError('Incorrect account or password！');
    }
    const { userId, username: _username, token, realName, desc, roles } = checkUser;
    return resultSuccess({
      roles,
      userId,
      username: _username,
      token,
      realName,
      desc,
    });
  },
},
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = userList.find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = userList.find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      const codeList = fakeCodeList[checkUser.userId];

      return resultSuccess(codeList);
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = userList.find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' });
    },
  },
  {
    url: '/basic-api/testRetry',
    statusCode: 405,
    method: 'get',
    response: () => {
      return resultError('Error!');
    },
  },
] as MockMethod[];
