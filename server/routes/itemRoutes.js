const itemRoute = require('express').Router();
const ItemController = require('../controller/itemController');
const { upload } = require('../middleware/uploadConfig');

itemRoute.get('/', ItemController.readItem);
itemRoute.post('/create', upload, ItemController.createItem);
itemRoute.delete('/delete/:id', ItemController.deleteItem);
itemRoute.put('/update/:id', upload, ItemController.updateItem);
itemRoute.get('/detail/:id', ItemController.detailItem);
itemRoute.get('/search', ItemController.searchItem);

module.exports = itemRoute;