const { UnauthenticatedError } = require('../errors/errors');
const jwt = require('jsonwebtoken'); 

const verifyUserTokenMiddleware = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new UnauthenticatedError('Provide a header like [Bearer token]');

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'Encrypt-Key');  // { id: '64d928c6bb1a2fc9f3f8e4d1', name: 'xyz', iat: 1691953350, exp: 1692039750 }
        req.account = { accountID: decoded.id };
        next();
    }
    catch (e) {
        throw new UnauthenticatedError('invalid token');
    }
}

module.exports = verifyUserTokenMiddleware;