const crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    dotenv = require('dotenv');

dotenv.config({ path: '.env' })

const passSalt = process.env.JWT_SALT

let hasher = (password, passSalt) => {
    let hash = crypto.createHmac('sha512', passSalt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: passSalt,
        hashedpassword: value
    };
};

const getHashPassword = (password) => {
    return hasher(password, passSalt)
}

const verifyPassword = (password, hashedPassword) => {
    return hasher(password, passSalt).hashedpassword === hashedPassword;
}

const getJWTToken = (payload, expires) => {
    return jwt.sign(payload, passSalt, { expiresIn: expires })
}

module.exports = {
    passSalt,
    getHashPassword,
    verifyPassword,
    getJWTToken
}