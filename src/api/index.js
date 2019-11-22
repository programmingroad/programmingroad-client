import ajax from './ajax'

// const BASE = 'http://localhost:80'
const BASE = ''

// user
export const reqLogin = (code) => ajax({
    url: BASE + '/user/login',
    method: 'POST',
    data: code
})

export const reqLogout = () => ajax({
    url: BASE + '/user/logout',
    method: 'GET'
})

export const reqGetUser = () => ajax({
    url: BASE + '/user/user',
    method: 'GET'
})

// tag
export const reqAllTag = () => ajax({
    url: BASE + '/tag/all',
    method: 'GET'
})


