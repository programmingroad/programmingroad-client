import * as constant from './constant'

const defaultState = {
    admin: undefined,
    anchors: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case constant.SET_USER:
            return {
                ...state,
                admin: action.admin
            }
        case constant.ADD_ANCHOR:
            return {
                ...state,
                anchors: [...state.anchors, action.anchor]
            }
        default:
            return state;
    }
}