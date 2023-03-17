import myAxios from './axios';

// 提交产业链模型
export function uploadModelAPI(paramsList) {
  return myAxios({
    url: '/model/uploadmodel',
    method: 'post',
    data: paramsList
  })
}

// 获取所有提交过的产业链模型
export function getModelListAPI(paramsList) {
  return myAxios({
    url: '/model/getmodellist',
    method: 'get',
    params: paramsList
  })
}