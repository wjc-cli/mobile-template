import { get, post } from './http.js'

const formatUrl = path => {
    return path;
};

/*
 ** login认证
 */
// 获取code认证
export const login = async param => {
    const url = formatUrl("/app-config-extra/login");
    const res = await get(url, param);
    return res.data;
};

export const test = async param => {
    const url = formatUrl("/sss");
    const res = await post(url, param);
    return res.data;
};

