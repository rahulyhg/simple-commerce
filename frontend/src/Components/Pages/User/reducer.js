const User = (state = {}, action) => {
    if (action.type === 'LOG_USER_IN'){
        return {
            info: action.user,
            token: action.token
        }
    }

    if (action.type === 'UPDATE_USER_INFO'){
        return {
            ...state,
            info: action.user
        }
    }

    return state;
}

export default User;