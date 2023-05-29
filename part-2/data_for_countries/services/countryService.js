import axios from 'axios'

let baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAllCountries = () => {
    let request = axios.get(baseUrl)
    return request.then((response) => response.data)
}


export default getAllCountries