const Router = require ('express'),
    docsRouter = Router();

const { getCollection } = require('../utils/db'),
    SocketSingleton = require('../utils/sockets');

docsRouter.get('/test-socket', () => {
    SocketSingleton.io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`)
        SocketSingleton.io.emit('client:newDoc', `The ${titulo} document was stored successfully`)
    })
    res.status(200).json({ 'status': 'OK', 'message': 'MSJ send' })
})

docsRouter.post('/', async (req, res, next) => {
    const {
        titulo,
        documento,
        autor
    } = req.body
    let collection = await getCollection();
    let isDocAlreadyRegister = await collection.findOne({ titulo: titulo })
    if (isDocAlreadyRegister) return res.status(400).json({ 'status': 'ERROR', 'message': 'A document with this title is already registered' })
    await collection.insertOne({
        titulo,
        documento,
        autor,
        modificado_por: {},
        fecha_creacion: new Date(),
        fecha_modificacion: new Date(),
        historial_cambios: [{
            documento: documento,
            fecha: new Date(),
            fecha_server: new Date(),
            autor_cambio: {
                usuario: autor.usuario,
                nombre: autor.nombre
            }
        }],
    })
    SocketSingleton.io.emit('client:newDoc', `The ${titulo} document was stored successfully`)
    return res.status(201).json({ 'status': 'OK', 'message': `The ${titulo} document was stored successfully` })
})

module.exports = docsRouter;