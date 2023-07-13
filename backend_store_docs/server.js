// Configuración personalizada de CORS
const corsOptions = {
  origin: 'http://localhost:8080', // Cambia esto por tu origen permitido
  methods: ['GET', 'POST'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true
};

const express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http, { cors: corsOptions }),
  dotenv = require('dotenv'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  // logger = require('morgan'),
  info = require('./package');

const clientMongoDB = require('./conf/mongodb'),
  { store } = require('./utils/store');

dotenv.config({ path: '.env' })

// app.use(logger('dev'));
app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.status(200).json({
    'app': `${info.name}:${info.version}`,
    'description': info.description,
    'author': info.author
  })
});

app.post('/api/docs', async(req, res, next) => {
  await store(req.body);
  io.emit('mensaje', `The ${req.body.titulo} document was stored successfully`);
  res.status(201).json({'status': 'OK', 'message': `The ${req.body.titulo} document was stored successfully`})
});

// Configuración del servidor
const HOST = process.env.URI || 'localhost';
const PORT = process.env.PORT || 5051;

// Configurar eventos de Socket.io
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado #',socket.id);

  // Ejemplo de evento personalizado
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
  });

  // Evento cuando se desconecta un cliente
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});

// Conexión a MongoDB
clientMongoDB.connect()
  .then((res) => {
    console.log(`MongoDB connection successfully on ${res.options.srvHost}`);
    // Iniciar el servidor HTTP con Socket.io
    http.listen(PORT, HOST, console.log(`Server running in ${process.env.NODE_ENV} mode on http://${HOST}:${PORT}`));
  })
  .catch((err) => {
    console.error(err);
    clientMongoDB.close();
    process.exit(1);
  })