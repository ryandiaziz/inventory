const { item } = require('../models');

class ItemController {
    static async readItem(req, res) {
        try {
            const result = await item.findAll()
            res.status(200).json(result)
        } catch (error) {
            req.status(500).json({ message: error.message })
        }
    }

    static async createItem(req, res) {
        try {
            const { imageUrl, name, purchasePrice, sellPrice, stock } = req.body
            const result = await item.create({
                imageUrl: imageUrl,
                name: name,
                purchasePrice: purchasePrice,
                sellPrice: sellPrice,
                stock: stock,
            })
            res.status(201).json(result)
        } catch (error) {
            req.status(500).json({ message: error.message })
        }
    }

    static async deleteItem(req, res) {
        try {
            const id = +req.params.id;
            const result = await item.destroy({
                where: { id }
            })
            result === 1
                ? res.status(200).json(result)
                : res.status(404).json({
                    message: 'Item not found'
                })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async updateItem(req, res) {
        try {
            const id = +req.params.id;
            const { imageUrl, name, purchasePrice, sellPrice, stock } = req.body;
            const result = await item.update(
                {
                    imageUrl: imageUrl,
                    name: name,
                    purchasePrice: +purchasePrice,
                    sellPrice: +sellPrice,
                    stock: +stock,
                },
                {
                    where: { id },
                }
            );
            res.json(result);
            result[0] === 1
                ? res.status(200).json({
                    message: `Item Updated!`,
                })
                : res.status(404).json({
                    message: `Item not found`,
                });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = ItemController;