const { MongoClient } = require('mongodb'),
    dotenv = require("dotenv");

dotenv.config({ path: '.env' })
const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;