import ajax from './ajax'

// const BASE = 'http://localhost:80'
const BASE = ''

/**
 * user
 *
 * @param code
 * @returns {AxiosPromise}
 */

// 登录
export const reqLogin = (code) => ajax({
    url: BASE + '/user/login',
    method: 'POST',
    data: code
})

// 注销
export const reqLogout = () => ajax({
    url: BASE + '/user/logout',
    method: 'GET'
})

// 获取用户信息
export const reqGetUser = () => ajax({
    url: BASE + '/user/user',
    method: 'GET'
})

/**
 * tag
 *
 * @returns {AxiosPromise}
 */

// 获取所有标签
export const reqAllTag = () => ajax({
    url: BASE + '/tag/all',
    method: 'GET'
})

// 删除标签
export const reqDeleteTag = (id) => ajax({
    url: BASE + '/tag/delete/' + id,
    method: 'DELETE',
})

// 添加标签
export const reqAddTag = (name) => ajax({
    url: BASE + '/tag/add',
    method: 'PUT',
    params: {
        name
    }
})


