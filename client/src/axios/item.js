import axios from 'axios'

const URL = 'https://inventory-api-firebase.vercel.app/'

const readItem = async (cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: URL
        })
        cb(result.data);
    } catch (error) {
        console.log(error);
    }
}

const deleteItem = async (id, imageName, cb) => {
    try {
        let result = await axios({
            method: 'DELETE',
            url: URL + `delete/${id}`,
            data: { imageName }
        })
        cb(result.data);
    } catch (error) {
        console.log(error);
    }
}

const createItem = async (items, cb) => {
    try {
        let result = await axios({
            method: 'POST',
            url: URL + "create",
            data: items,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        cb(result.data);
    } catch (error) {
        console.log(error);
    }
}

const detailItem = async (id, cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: URL + `detail/${id}`
        })
        cb(result.data);
    } catch (error) {
        console.log(error);
    }
}

const updateItem = async (id, datas, cb) => {
    try {
        await axios({
            method: 'PUT',
            url: URL + `update/${id}`,
            data: datas,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        cb();
    } catch (error) {
        console.log(error);
    }
}

const searchItem = async (query, cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: URL + `/search?key=${query}`
        })
        cb(result.data)
    } catch (error) {
        console.log(error);
    }
}

export {
    readItem,
    deleteItem,
    createItem,
    detailItem,
    updateItem,
    searchItem,
}