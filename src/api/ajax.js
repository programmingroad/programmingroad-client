import axios from "axios"
import {message} from 'antd'

/* 使用请求拦截器 */
axios.interceptors.request.use(config => {
    return config
})

/* 使用响应拦截器 */
axios.interceptors.response.use(
    response => {
        const data = response.data;
        switch (data.head.code) {
            case 200:
                return Promise.resolve(data);
            case 401:
                window.location.href = "/login";
                // 中断Promise链
                return new Promise(() => {
                });
            case 403:
                message.error(data.head.message);
                return Promise.reject(data);
            default:
                message.error(data.head.message);
                return Promise.reject(data);
        }
    }
)


export default axios