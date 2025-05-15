const setAuthCookie = (res, token) => {
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 
    });
};

const clearAuthCookie = (res) => {
    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
};

const getAuthToken = (req) => {
    return req.cookies.auth_token || null;
};

module.exports = {
    setAuthCookie,
    clearAuthCookie,
    getAuthToken
};