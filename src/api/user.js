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

// 上传图片
export function uploadImageAPI(paramsList) {
  return myAxios({
    url: '/user/uploadphoto',
    method: 'post',
    data: paramsList
  })
}

// 删除图片
export function deleteImageAPI(paramsList) {
  return myAxios({
    url: '/user/deletefile',
    method: 'post',
    data: paramsList
  })
}

// 获取用户信息
export function getUserinfoAPI(paramsList) {
  return myAxios({
    url: '/user/getuserinfo',
    method: 'get',
    params: paramsList
  })
}

// 更新用户个人信息
export function updateUserInfoAPI(paramsList) {
  return myAxios({
    url: '/user/updateuserinfo',
    method: 'post',
    data: paramsList
  })
}