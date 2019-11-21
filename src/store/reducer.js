import * as constant from './constant'

const defaultState = {
    admin: undefined
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case constant.SET_USER:
            return {
                ...state,
                admin: action.admin
            }
        default:
            return state;
    }
}