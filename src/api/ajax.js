import axios from "axios"
import {message} from 'antd'

/* 使用请求拦截器 */
axios.interceptors.request.use(config => {
    return config
})

/* 使用响应拦截器 */
axios.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        message.error('请求失败: ' + error.message)
        return new Promise(() => {
        });
    }
)

export default axios