const express = require("express"),
    dotenv = require("dotenv"),
    bodyParser = require('body-parser'),
    info = require('./package');

const app = express();

dotenv.config({ path: '.env' })

// Body parse from application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).json({
        'app': `${info.name}:${info.version}`,
        'description': info.description,
        'author': info.author
    })
})

const HOST = process.env.URI || 'localhost';
const PORT = process.env.PORT || 5050;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://${HOST}:${PORT}`));