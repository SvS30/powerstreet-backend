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
    modificado_por: {
        usuario: {
            type: String,
            required: true,
            message: 'The Editor username is required'
        },
        nombre: {
            type: String,
            required: true,
            message: 'The Editor username is required'
        }
    },
    fecha_modificacion: {
        type: String,
        required: true,
        message: 'The date it was updated is required'
    },
    historial_cambios: [{
        documento: {
            type: String,
            required: true,
            message: 'The previous version of the document is required'
        },
        fecha: {
            type: String,
            required: true,
            message: 'Previously updated date is required'
        },
        fecha_server: {
            type: String,
            required: true,
            message: 'Previously updated date is required'
        },
        autor_cambio: {
            usuario: {
                type: String,
                required: true,
                message: 'Previously Editor username is required'
            },
            nombre: {
                type: String,
                required: true,
                message: 'Previously Editor name is required'
            }
        }
    }]
});

module.exports = docSchema;