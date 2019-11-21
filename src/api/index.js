import ajax from './ajax'

// const BASE = 'http://localhost:80'
const BASE = ''

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
    url: BASE + '/user/get',
    method: 'GET'
})

