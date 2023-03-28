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

// 根据id获取产业链信息
export function getModelInfoAPI(paramsList) {
  return myAxios({
    url: '/model/modelinfo',
    method: 'get',
    params: paramsList
  })
}

// 产业链完整性评估
export function integrityAPI(paramsList) {
  return myAxios({
    url: '/model/integrity',
    method: 'get',
    params: paramsList
  })
}

// 产业链风险评估
export function riskAnalyseAPI(paramsList) {
  return myAxios({
    url: '/model/risk',
    method: 'get',
    params: paramsList
  })
}

// 更新模型
export function updateModalAPI(paramsList) {
  return myAxios({
    url: '/model/update',
    method: 'post',
    data: paramsList
  })
}
