import myAxios from './axios';

// 用户登录
export function userLoginAPI(paramsList) {
  return myAxios({
    url: '/user/login',
    method: 'get',
    params: paramsList
  })
}

// 用户注册
export function userRegisterAPI(paramsList) {
  return myAxios({
    url: '/user/register',
    method: 'post',
    data: paramsList
  })
}

// 获取用户列表
export function getUserListAPI(paramsList) {
  return myAxios({
    url: '/user/getuserlist',
    method: 'get',
    params: paramsList
  })
}