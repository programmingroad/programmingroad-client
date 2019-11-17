import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''

/*
1. 登陆
*/
/* export function reqLogin({username, password}) {
  return ajax.post('/login', {username, password})
} */
export const reqLogin = ({ username, password }) => ajax.post(BASE + '/login', { username, password })