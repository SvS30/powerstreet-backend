const Router = require('express'),
    docsRouter = Router();

const { getCollection } = require('../utils/db');

docsRouter.post('/filter', async(req, res) => {
    let collection = await getCollection();
    const projection = {
      _id: 0,
      titulo: 1,
    };
    let docsFiltered = await collection.find({"titulo" : {$regex : req.query.title}}).project(projection).toArray();
    return res.status(200).json({ 'status': 'OK', 'data': docsFiltered })
})

module.exports = docsRouter;