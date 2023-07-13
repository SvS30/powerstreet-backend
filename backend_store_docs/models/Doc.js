const Schema = require('validate');

const docSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        length: { min: 3, max: 20 },
        message: 'Titulo is required'
    },
    documento: {
        type: String,
        required: true,
        message: 'Cannt save a blank document'
    },
    autor: {
        usuario: {
            type: String,
            required: true,
            message: 'The Autor username is required'
        },
        nombre: {
            type: String,
            required: true,
            message: 'The Autor username is required'
        }
    },
});

module.exports = docSchema;