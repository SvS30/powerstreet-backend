const clientMongoDB = require('../conf/mongodb');

const getCollection = async () => {
    let collection = await clientMongoDB.db(process.env.MONGO_DB).collection(process.env.MONGO_COLLECTION);
    return collection;
}

module.exports = {
    getCollection
}