import axios from 'axios'

const URL = 'http://localhost:3000/api'

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

const deleteItem = async (id, cb) => {
    try {
        let result = await axios({
            method: 'DELETE',
            url: URL + `/delete/${id}`
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
            url: URL + "/create",
            data: items,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        cb();
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

export {
    readItem,
    deleteItem,
    createItem,
}