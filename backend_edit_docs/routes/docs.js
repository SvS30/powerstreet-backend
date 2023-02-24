const Router = require('express'),
    { ObjectId } = require('mongodb'),
    docsRouter = Router();

const { getCollection } = require('../utils/db');

docsRouter.patch('/:id/edit', async(req, res) => {
    let collection = await getCollection();
    let docFound = await collection.findOne({ _id: new ObjectId(req.params['id'])})
    if (!docFound) return res.status(404).json({ 'status': 'ERROR', 'message': `The document with ID: ${req.params['id']} not found` })
    const {
        titulo,
        documento,
        modificado_por,
        fecha_modificacion,
        historial_cambios
    } = req.body
    await collection.findOneAndUpdate({ _id: new ObjectId(req.params['id']) }, {
        $set: {
            "titulo": titulo,
            "documento": documento,
            "modificado_por": modificado_por,
            "fecha_modificacion": fecha_modificacion,
            "historial_cambios": historial_cambios 
        }
    })
    return res.status(200).json({ 'status': 'OK', 'message': `The ${docFound.titulo} document was updated successfully` })
})

module.exports = docsRouter;