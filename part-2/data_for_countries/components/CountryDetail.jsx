import { useState, useEffect } from "react"
import getWeatherReport from "../services/weatherService"
import CountryWeatherInfo from "./CountryWeatherInfo"

const CountryDetail = ({country}) => {
    ////////// reactive states //////////
    const [weatherReport, setWeatherReport] = useState(null)

    useEffect(() => {
        getWeatherReport(country.capital[0])
            .then((data) => setWeatherReport(data))
            .catch((err) => {
                setWeatherReport(null)
                console.log(err)
            })
    }, [])

    // country languages is an object, the keys are returned
    const languages = Object.keys(country.languages)
    
    return (
        <div className="country-details">
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {languages.map((lang) => 
                    <li key={lang}>{country.languages[lang]}</li>
                )}
            </ul>
            <div>
                <img 
                src={country.flags.svg} 
                alt={country.flags.alt} 
                width={300}
                />
            </div>
            <div className="country-details weather">
                <h1>Weather in {country.capital}</h1>
                <CountryWeatherInfo info={weatherReport}/>
            </div>


        </div>
    )
}

export default CountryDetail