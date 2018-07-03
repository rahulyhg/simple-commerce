export const logIn = (user) => ({
    type: 'LOG_USER_IN',
    user
});

export const logOut = () => ({
    type: 'LOG_USER_OUT'
});

export  const updateUserInfo = (user) => ({
    type: 'UPDATE_USER_INFO',
    user
});