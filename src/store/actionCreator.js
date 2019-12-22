import * as constant from './constant'

export const setAdmin = (admin) => ({
    type: constant.SET_USER,
    admin
})

export const addAnchor = (anchor) => ({
    type: constant.ADD_ANCHOR,
    anchor
})