const { getCollection } = require('./db'),
    docSchema = require('../models/Doc');

async function isDocExists(dbCollection, id) {
    let document = await dbCollection.findOne({ _id: new ObjectId(id)})
    if (!document) throw new Error(`The document with ID: ${id} not found`);
}

async function validation({ titulo, documento, modificado_por, fecha_modificacion, historial_cambios }) {
    const errors = docSchema.validate({ titulo, documento, modificado_por, fecha_modificacion, historial_cambios })
    if (errors.length > 0) {
        let errorsValidators = []
        errors.forEach(element => errorsValidators.push(String(element).substring(0,50)));
        throw new Error(errorsValidators);
    }
}

async function update(data, docID) {
    try {
        let collection = await getCollection();
        isDocExists(collection, docID);
        validation(data);
        await collection.findOneAndUpdate({ _id: new ObjectId(docID) }, {
            $set: {
                "titulo": data.titulo,
                "documento": data.documento,
                "modificado_por": data.modificado_por,
                "fecha_modificacion": data.fecha_modificacion,
                "historial_cambios": data.historial_cambios 
            }
        }, { returnDocument: true })
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { update };