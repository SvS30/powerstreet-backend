const app = require('express')()
    dotenv = require('dotenv'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    info = require('./package');

const clientMongoDB = require('./conf/mongodb'),
    docsRouter = require('./routes/docs');

dotenv.config({ path: '.env' })

// Body parse from application/json
app.use(bodyParser.json())
// Set CORS config to VueJS
app.use(cors({
    origin: 'http://localhost:8080'
}))

app.get('/', (req, res) => {
    res.status(200).json({
        'app': `${info.name}:${info.version}`,
        'description': info.description,
        'author': info.author
    })
})

app.use('/api/docs', docsRouter)

const HOST = process.env.URI || 'localhost';
const PORT = process.env.PORT || 5052;

clientMongoDB.connect()
    .then((res) => {
        console.log(`MongoDB connection successfully on ${res.options.srvHost}`);
        app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://${HOST}:${PORT}`));
    }).catch((err) => {
        console.error(err);
        clientMongoDB.close();
        process.exit(1);
    })