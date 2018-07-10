const User = (state = {}, action) => {
    if (action.type === 'LOG_USER_IN'){
        return {
            user: action.user,
            token: action.token
        }
    }

    return state;
}

export default User;