# Microservicio: Carga de Documentos
Microservicio encargado de realizar la lectura de los titulos de documentos en prueba tecnica de PowerStreet.

## Función
Este microservicio se encarga de conectarse a **MongoDB** y realizar una busqueda de documentos **a traves de su titulo** con **params query**

## Instalación
1. Instalar dependencias: `npm i`
2. Clonar archivo de variables de entorno: `cp .env.example .env`
3. Establecer variables de entorno
    ```
        URI= <- URI en la que se levantará este servicio, ej: localhost
        PORT= <- Puerto en el que se expondrá el servicio, default: 5053

        MONGO_URL= <- URL de conexión hacía su instancia de MongoDB
        MONGO_DB= <- Nombre de base de datos en su instancia de MongoDB
        MONGO_COLLECTION= <- Nombre de la coleccion a utilizar en este servicio.
    ```

## Scripts

### npm run dev
Este comando levantara el servidor de Express en modo **desarrollo**.