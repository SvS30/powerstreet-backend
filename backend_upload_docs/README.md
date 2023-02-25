# Microservicio: Carga de Documentos
Microservicio encargado de realizar la carga de documentos en prueba tecnica de PowerStreet.

## Función
Este microservicio se encarga de conectarse a **MongoDB** y almacenar el request enviado.

**Nota**: El documento conserva el formato **markdown**.

### Schema
Para realizar el almacenaje de documentos se creo el Schema compartido con la libreria [Validate](https://www.npmjs.com/package/validate)

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
}
```

## Instalación
1. Instalar dependencias: `npm i`
2. Clonar archivo de variables de entorno: `cp .env.example .env`
3. Establecer variables de entorno
    ```
        URI= <- URI en la que se levantará este servicio, ej: localhost
        PORT= <- Puerto en el que se expondrá el servicio, default: 5051

        MONGO_URL= <- URL de conexión hacía su instancia de MongoDB
        MONGO_DB= <- Nombre de base de datos en su instancia de MongoDB
        MONGO_COLLECTION= <- Nombre de la coleccion a utilizar en este servicio.
    ```

## Scripts

### npm run dev
Este comando levantara el servidor de Express en modo **desarrollo**.