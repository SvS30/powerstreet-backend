const jwt = require('jsonwebtoken');

const { passSalt } = require('../utils/auth');

const checkToken = (req, res, next) => {
    const authHeader = req.headers?.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) res.status(401).json({ 'status': 'ERROR', 'message': 'Token not found' })

    jwt.verify(token, passSalt, (err, user) => {
        if (err) return res.status(403).json({ 'status': 'ERROR', 'message': 'Token invalid' })
        req.user = { 'userId': user.id, 'expirationToken': user.exp }
        next()
    })
}

module.exports = { checkToken }