const itemRoute = require('express').Router();
const ItemController = require('../controller/itemController');

itemRoute.get('/', ItemController.readItem);
itemRoute.post('/create', ItemController.createItem);
itemRoute.delete('/delete/:id', ItemController.deleteItem);
itemRoute.post('/update/:id', ItemController.updateItem);

module.exports = itemRoute;