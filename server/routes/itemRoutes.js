const itemRoute = require('express').Router();
const ItemController = require('../controller/itemController');
const { upload } = require('../middleware/uploadConfig');

itemRoute.get('/', ItemController.readItem);
itemRoute.post('/create', upload, ItemController.createItem);
itemRoute.delete('/delete/:id', ItemController.deleteItem);
itemRoute.post('/update/:id', ItemController.updateItem);

module.exports = itemRoute;