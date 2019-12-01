import ajax from './ajax'

// const BASE = 'http://localhost:80'
const BASE = ''

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

// 获取所有标签
export const reqAllTag = () => ajax({
    url: BASE + '/admin/tag/all',
    method: 'GET'
})

// 删除标签
export const reqDeleteTag = (id) => ajax({
    url: BASE + '/admin/tag/delete/' + id,
    method: 'DELETE',
})

// 添加标签
export const reqAddTag = (name) => ajax({
    url: BASE + '/admin/tag/add',
    method: 'PUT',
    params: {
        name
    }
})

// 添加文章
export const reqAddArticle = (article) => ajax({
    url: BASE + '/admin/article/add',
    method: 'PUT',
    data: article
})

// 删除文章
export const reqDeleteArticle = (id) => ajax({
    url: BASE + '/admin/article/delete/' + id,
    method: 'DELETE'
})

// 获取文章列表
export const reqArticleList = (page) => ajax({
    url: BASE + '/admin/article/listPage',
    method: 'GET',
    params: {
        page
    }
})

// 更新文章
export const reqUpdateArticle = (id, article) => ajax({
    url: BASE + '/admin/article/update/' + id,
    method: 'PATCH',
    data: article
})


