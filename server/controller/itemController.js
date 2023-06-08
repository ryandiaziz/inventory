const { item } = require('../models');
const { checkFileDelete, checkUpload } = require('../helper/checkFile')
const { Op } = require("sequelize");

class ItemController {
    static async readItem(req, res) {
        try {
            const result = await item.findAll({
                order: [['id', 'ASC']]
            })
            res.status(200).json(result)
        } catch (error) {
            req.status(500).json({ message: error.message })
        }
    }

    static async createItem(req, res) {
        try {
            const { imageUrl, name, purchasePrice, sellPrice, stock } = req.body
            // name check
            const allItem = await item.findAll()
            if (allItem.filter(item => item.name === name).length > 0) {
                res.status(200).json({ data: false });
            }
            else {
                await item.create({
                    imageUrl: imageUrl,
                    name: name,
                    purchasePrice: purchasePrice,
                    sellPrice: sellPrice,
                    stock: stock,
                })
                res.status(201).json({ data: true })
            }
        } catch (error) {
            res.json({ message: error.message })
        }
    }

    static async deleteItem(req, res) {
        try {
            const id = +req.params.id;
            const temp = await item.findByPk(id);
            checkFileDelete(temp);
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
            const temp = await item.findByPk(id);
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
            checkUpload(temp.imageUrl, imageUrl)
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

    static async detailItem(req, res) {
        try {
            const id = +req.params.id;
            const result = await item.findAll({
                where: { id }
            })
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async searchItem(req, res) {
        try {
            const query = req.query.key;
            const results = await item.findAll({
                order: [['id', 'ASC']],
                where: {
                    name: { [Op.iLike]: `%${query}%` },
                },
            });
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ItemController;