const express = require("express"),
    dotenv = require("dotenv"),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    info = require('./package');

const clientMongoDB = require('./conf/mongodb'),
    authRouter = require('./routes/auth');

const app = express();

dotenv.config({ path: '.env' })

// Body parse from application/json
app.use(bodyParser.json())
// Set CORS config
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/', (req, res) => {
    res.status(200).json({
        'app': `${info.name}:${info.version}`,
        'description': info.description,
        'author': info.author
    })
})

app.use('/api/auth', authRouter)

const HOST = process.env.URI || 'localhost';
const PORT = process.env.PORT || 5050;

clientMongoDB.connect()
    .then((res) => {
        console.log(`MongoDB connection successfully on ${res.options.srvHost}`)
        app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://${HOST}:${PORT}`));
    })
    .catch((err) => {
        console.log(err);
        clientMongoDB.close()
        process.exit(1)
    })