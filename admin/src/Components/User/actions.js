export const login = (info, token) => ({
    type: 'LOG_USER_IN',
    info,
    token
});

export const logout = () => ({
    type: 'LOG_USER_OUT'
})