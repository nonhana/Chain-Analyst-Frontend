import axios from 'axios'

function myAxios(axiosConfig) {
  const service = axios.create({
    baseURL: "http://127.0.0.1:80", //本地服务器环境(api-server)
    timeout: 10000, //10秒内无响应则报错
    // 配置请求头token
    // headers: {
    //   Authorization: localStorage.getItem('token') ? localStorage.getItem('token') : ''
    // }
  });
  return service(axiosConfig);
}

export default myAxios;