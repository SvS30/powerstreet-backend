const { getCollection } = require('../utils/db'),
    docSchema = require('../models/Doc');

async function isDocExists(dbCollection, titulo) {
    let document = await dbCollection.findOne({ titulo: titulo })
    if (document) throw new Error('This document already exists');
}

async function validation(titulo, documento, autor) {
    const errors = docSchema.validate({ titulo, documento, autor })
    if (errors.length > 0) {
        let errorsValidators = []
        errors.forEach(element => errorsValidators.push(String(element).substring(0,40)));
        throw new Error(errorsValidators);
    }
}

async function store(data) {
    try {
        const { titulo, documento, autor } = data;
        let collection = await getCollection();
        isDocExists(collection, titulo);
        validation(titulo, documento, autor);
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
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { store };