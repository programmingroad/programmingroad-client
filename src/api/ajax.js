import axios from "axios"
import qs from 'qs'
import {message} from 'antd'

/* 使用请求拦截器 */
axios.interceptors.request.use(config => {
    // 1). 将post请求的data对象数据转换为urlencode格式的字符串数据
    if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.data = qs.stringify(config.data)
    }
    return config
})

/* 使用响应拦截器 */
axios.interceptors.response.use(
    response => {
        return response.data
    },
    error => { // ajax请求异常
        message.error('请求失败: ' + error.message)
        return {};
    }
)
export default axios