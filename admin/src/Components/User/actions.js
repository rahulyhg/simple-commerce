export const login = (user) => ({
    type: 'LOG_USER_IN',
    user
});

export const logout = () => ({
    type: 'LOG_USER_OUT'
})