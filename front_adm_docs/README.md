# Frontend Adm Docs: Vue 3 + Vite
Frontend para la administracion de documentos en la prueba técnica de PowerStreet.

## Instalación
1. Instalar dependencias: `npm i`
2. Clonar archivo de variables de entorno: `cp .env.example .env.local`
3. Establecer variables de entorno
    ```
    VITE_URL_UPLOAD_DOCS= <- URL= URI + PORT donde se esta ejecutando el servicio de carga de documentos
    VITE_URL_READ_DOCS= <- URL= URI + PORT donde se esta ejecutando el servicio de lectura de documentos
    VITE_URL_READ_TITLES= <- URL= URI + PORT donde se esta ejecutando el servicio de lectura de titulos de documentos
    VITE_URL_EDIT_DOCS= <- URL= URI + PORT donde se esta ejecutando el servicio de edicion de documentos
    ```

### Issue
[Vue Sidebar Menu Akahon](https://github.com/akahon/vue-sidebar-menu-akahon): Si tuviese algun problema al levantar el servidor, deberá: 
- Modificar el archivo `./node_modules/vue-sidebar-menu-akahon/src/components/Sidebar-menu-akahon.vue`
    ```
    210 profileImg: {
    211     type: String,
    212     default: require('...') <- Esta linea deberá eliminar
    213 },
    ```


## Scripts

### npm run dev
Este comando levantara el servidor de Vite en modo **desarrollo**.