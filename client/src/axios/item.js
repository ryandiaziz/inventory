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

export {
    readItem,
    deleteItem,
}