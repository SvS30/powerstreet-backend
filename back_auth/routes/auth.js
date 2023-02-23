const Router = require('express'),
    { ObjectId } = require('mongodb'),
    authRouter = Router();

const { getCollection } = require('../utils/db'),
    { getHashPassword, verifyPassword, getJWTToken } = require('../utils/auth'),
    { checkToken } = require('../middlewares/authHandler');

authRouter.post('/register', async (req, res, next) => {
    const { usuario, pass, nombre, ultimo_inicio_sesion, tipo, maximo_tiempo_sesion_inactiva } = req.body
    let collection = await getCollection();
    let userAlreadyRegister = await collection.findOne({ usuario: usuario })
    if (userAlreadyRegister) return res.status(400).json({ 'status': 'ERROR', 'message': 'User already register' })
    let passwordHashed = getHashPassword(pass).hashedpassword;
    let last_login = new Date(ultimo_inicio_sesion)
    await collection.insertOne({
        usuario, pass: passwordHashed, nombre, ultimo_inicio_sesion: last_login, tipo, maximo_tiempo_sesion_inactiva
    })
    return res.status(201).json({ 'status': 'OK', 'message': `${usuario} user was stored successfully!` })
})
authRouter.post('/login', async (req, res, next) => {
    const { usuario, password } = req.body;
    let collection = await getCollection();
    let user = await collection.findOne({ usuario: usuario })
    if (!user) return res.status(404).json({ 'status': 'ERROR', 'message': 'User not found' })

    let isVerified = verifyPassword(password, user.pass)
    if (isVerified) return res.status(200).json({ 'status': 'OK', 'token': getJWTToken({id: user._id}, user.maximo_tiempo_sesion_inactiva) })
    else return res.status(400).json({ 'status': 'ERROR', 'message': 'Credentials not valid' })
})

authRouter.get('/me', checkToken, async (req, res, next) => {
    let collection = await getCollection();
    let userFound = await collection.findOne({ _id: new ObjectId(req.user.userId) })
    if (!userFound) return res.status(404).json({ 'status': 'ERROR', 'message': 'User not found' })
    return res.status(200).json({ 'status': 'OK', 'user': userFound, 'expToken': req.user.expirationToken })
})

module.exports = authRouter;