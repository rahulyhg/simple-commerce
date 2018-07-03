const User = (state = {}, action) => {
    if (action.type === 'LOG_USER_IN'){
        return action.user
    }

    return state;
}

export default User;