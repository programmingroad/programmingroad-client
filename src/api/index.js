import ajax from './ajax'

const BASE = '/api'

// ========================================================================== AdminArticleApi =====================================================================================

/**
 * 添加文章
 *
 * @param article
 * @returns {AxiosPromise}
 */
export const reqAdminAddArticle = (article) => ajax({
    url: BASE + '/admin/article/add',
    method: 'PUT',
    data: article
})

/**
 * 删除文章
 *
 * @param id
 * @returns {AxiosPromise}
 */
export const reqAdminDeleteArticle = (id) => ajax({
    url: BASE + '/admin/article/delete/' + id,
    method: 'DELETE'
})

/**
 * 获取文章列表
 *
 * @param page
 * @param tagId
 * @param released
 * @returns {AxiosPromise}
 */
export const reqAdminArticleList = (page, tagId, released) => ajax({
    url: BASE + '/admin/article/listPage',
    method: 'GET',
    params: {
        page,
        tagId,
        released
    }
})

/**
 * 更新文章
 *
 * @param id
 * @param article
 * @returns {AxiosPromise}
 */
export const reqAdminUpdateArticle = (id, article) => ajax({
    url: BASE + '/admin/article/update/' + id,
    method: 'PATCH',
    data: article
})

/**
 * 获取指定文章
 *
 * @param id
 * @returns {AxiosPromise}
 */
export const reqAdminArticle = (id) => ajax({
    url: BASE + '/admin/article/article/' + id,
    method: 'GET'
})

// ========================================================================== AdminImageApi =====================================================================================

/**
 * 删除封面图片
 *
 * @param id
 * @returns {AxiosPromise}
 */
export const reqAdminCoverDelete = (id) => ajax({
    url: BASE + '/admin/image/cover/' + id,
    method: 'DELETE'
})

/**
 * 获取封面图片
 *
 * @returns {AxiosPromise}
 */
export const reqAdminCoverList = () => ajax({
    url: BASE + '/admin/image/cover/list',
    method: 'GET'
})

// ========================================================================== AdminTagApi =====================================================================================

/**
 * 获取所有标签
 *
 * @returns {AxiosPromise}
 */
export const reqAdminAllTag = () => ajax({
    url: BASE + '/admin/tag/all',
    method: 'GET'
})

/**
 * 删除标签
 *
 * @param id
 * @returns {AxiosPromise}
 */
export const reqAdminDeleteTag = (id) => ajax({
    url: BASE + '/admin/tag/delete/' + id,
    method: 'DELETE',
})

/**
 * 添加标签
 *
 * @param name
 * @returns {AxiosPromise}
 */
export const reqAdminAddTag = (name) => ajax({
    url: BASE + '/admin/tag/add',
    method: 'PUT',
    params: {
        name
    }
})

// ========================================================================== ArticleApi =====================================================================================

/**
 * 获取文章列表
 *
 * @param page
 * @param tagId
 * @returns {AxiosPromise}
 */
export const reqArticleList = (page, tagId) => ajax({
    url: BASE + '/article/listPage',
    method: 'GET',
    params: {
        page,
        tagId
    }
})

/**
 * 获取指定文章
 *
 * @param id
 * @returns {AxiosPromise}
 */
export const reqArticle = (id) => ajax({
    url: BASE + '/article/article/' + id,
    method: 'GET'
})

// ========================================================================== TagApi =====================================================================================

/**
 * 获取所有标签
 *
 * @returns {AxiosPromise}
 */
export const reqAllTag = () => ajax({
    url: BASE + '/tag/all',
    method: 'GET'
})

// ========================================================================== UserApi =====================================================================================

/**
 * 登录
 *
 * @param code
 * @returns {AxiosPromise}
 */
export const reqLogin = (code) => ajax({
    url: BASE + '/user/login',
    method: 'POST',
    data: code
})

/**
 * 注销
 *
 * @returns {AxiosPromise}
 */
export const reqLogout = () => ajax({
    url: BASE + '/user/logout',
    method: 'GET'
})

/**
 * 获取用户信息
 *
 * @returns {AxiosPromise}
 */
export const reqGetUser = () => ajax({
    url: BASE + '/user/user',
    method: 'GET'
})