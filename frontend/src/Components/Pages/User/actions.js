export const logIn = (user, token) => ({
    type: 'LOG_USER_IN',
    user,
    token
});

export const logOut = () => ({
    type: 'LOG_USER_OUT'
});

export  const updateUserInfo = (user) => ({
    type: 'UPDATE_USER_INFO',
    user
});