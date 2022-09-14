import axios from "axios";
import { Toast } from "vant";
const addHeader = () => {
    const authorization = sessionStorage["token"];
    return {
        authorization,
    };
};
export const post = (url, param = {}, opt = {}) => {
    return axios.post(url, param, { headers: addHeader(), ...opt });
};
export const get = (url, params = {}, opt = {}) => {
    let headers = addHeader();
    return axios.get(url, { params, headers, ...opt });
};
// 响应拦截器
axios.interceptors.request.use(
    data => {
        return data;
    },
    () => {
        Toast.loading({
            duration: 2000,
            forbidClick: true,
            message: `服务调用失败或接口错误`,
        });
    }
);
// 响应拦截器
axios.interceptors.response.use(
    data => data,
    err => {
        console.dir(err);
        Toast.loading({
            duration: 2000,
            forbidClick: true,
            message: `服务响应失败，状态码${err.response.status}`,
        });
    }
);
