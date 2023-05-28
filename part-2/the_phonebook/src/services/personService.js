import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAllPerson = () => {
    let request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const updatePerson = (id, data) => {
    let request = axios.put(`${baseUrl}/${id}`, data)
    return request.then(response => response.data)
}

const createPerson = data => {
    let request = axios.post(baseUrl, data)
    return request.then(response => {
        return response.data
    })
}
const deletePerson = id => axios.delete(`${baseUrl}/${id}`)


export default {
    getAllPerson,
    updatePerson,
    createPerson,
    deletePerson
}