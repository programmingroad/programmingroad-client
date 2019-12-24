import ajax from './ajax'

// const BASE = 'http://localhost:80'
const BASE = '/api'

// ========================================================================== admin =====================================================================================

// 获取所有标签
export const reqAdminAllTag = () => ajax({
    url: BASE + '/admin/tag/all',
    method: 'GET'
})

// 删除标签
export const reqAdminDeleteTag = (id) => ajax({
    url: BASE + '/admin/tag/delete/' + id,
    method: 'DELETE',
})

// 添加标签
export const reqAdminAddTag = (name) => ajax({
    url: BASE + '/admin/tag/add',
    method: 'PUT',
    params: {
        name
    }
})

// 保存文章
export const reqAdminSaveArticle = (article) => ajax({
    url: BASE + '/admin/article/save',
    method: 'PUT',
    data: article
})

// 发布文章
export const reqAdminReleaseArticle = (id) => ajax({
    url: BASE + '/admin/article/release/' + id,
    method: 'PATCH',
})

// 删除文章
export const reqAdminDeleteArticle = (id) => ajax({
    url: BASE + '/admin/article/delete/' + id,
    method: 'DELETE'
})

// 获取文章列表
export const reqAdminArticleList = (page, tagId, released) => ajax({
    url: BASE + '/admin/article/listPage',
    method: 'GET',
    params: {
        page,
        tagId,
        released
    }
})

// 更新文章
export const reqAdminUpdateArticle = (id, article) => ajax({
    url: BASE + '/admin/article/update/' + id,
    method: 'PATCH',
    data: article
})

// 获取指定文章
export const reqAdminArticle = (id) => ajax({
    url: BASE + '/admin/article/article/' + id,
    method: 'GET'
})

// ========================================================================== user =====================================================================================

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

// ========================================================================== home =====================================================================================

// 获取所有标签
export const reqAllTag = () => ajax({
    url: BASE + '/tag/all',
    method: 'GET'
})

// 获取文章列表
export const reqArticleList = (page, tagId) => ajax({
    url: BASE + '/article/listPage',
    method: 'GET',
    params: {
        page,
        tagId
    }
})

// 获取指定文章
export const reqArticle = (id) => ajax({
    url: BASE + '/article/article/' + id,
    method: 'GET'
})

