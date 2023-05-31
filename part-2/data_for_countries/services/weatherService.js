import axios from 'axios'

const url = 'https://api.openweathermap.org/data/2.5/weather'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeatherReport = (city) => {
     let params = {
        q: city,
        appid: apiKey,
        units: 'metric'
     }
     let request = axios.get(url, {params: params})
     return request.then(response => response.data)
}

export default getWeatherReport
