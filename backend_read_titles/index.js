const app = require('express')(),
    dotenv = require('dotenv'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    info = require('./package');

dotenv.config({ path: '.env' })

app.use(bodyParser.json())
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

const HOST = process.env.URI || 'localhost';
const PORT = process.env.PORT || 5053;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://${HOST}:${PORT}`));