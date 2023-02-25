const Router = require('express'),
    { ObjectId } = require('mongodb'),
    docsRouter = Router();

const { getCollection } = require('../utils/db');

docsRouter.get('/', async (req, res) => {
    let collection = await getCollection();
    let docsRegistereds = await collection.find({}).toArray()
    return res.status(200).json({ 'status': 'OK', 'data': docsRegistereds })
})

docsRouter.get('/:id', async (req, res) => {
    let collection = await getCollection();
    let docRegistered = await collection.findOne({ _id: new ObjectId(req.params['id']) })
    return res.status(200).json({ 'status': 'OK', 'data': docRegistered })
})

module.exports = docsRouter;