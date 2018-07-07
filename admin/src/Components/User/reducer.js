const User = (state = {}, action) => {
    if(action.type === 'LOG_USER_IN'){
        return {
            token: action.token,
            info: action.info
        }
    }
    return state;
}

export default User;