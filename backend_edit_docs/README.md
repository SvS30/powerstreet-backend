# Microservicio: Edicion de Documentos
Microservicio encargado de realizar la edicion de documentos en prueba tecnica de PowerStreet.

## Función
Este microservicio se encarga de conectarse a **MongoDB** y realizar la edicion de un documento con el request enviado.

**Nota**: El documento conserva el formato **markdown**.

### Schema
Para realizar la edicion de documentos se creo el Schema compartido con la libreria [Validate](https://www.npmjs.com/package/validate)

```json
{
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
    }
```

## Instalación
1. Instalar dependencias: `npm i`
2. Clonar archivo de variables de entorno: `cp .env.example .env`
3. Establecer variables de entorno
    ```
        URI= <- URI en la que se levantará este servicio, ej: localhost
        PORT= <- Puerto en el que se expondrá el servicio, default: 5054

        MONGO_URL= <- URL de conexión hacía su instancia de MongoDB
        MONGO_DB= <- Nombre de base de datos en su instancia de MongoDB
        MONGO_COLLECTION= <- Nombre de la coleccion a utilizar en este servicio.
    ```

## Scripts

### npm run dev
Este comando levantara el servidor de Express en modo **desarrollo**.