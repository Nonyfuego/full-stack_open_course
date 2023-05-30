import CountryList from "./CountryList"
import CountryDetail from "./CountryDetail"

const CountryView = ({countries, country, handleClick}) => { 

    if (countries.length === 0) return null

    if (countries.length === 1) 
        return <CountryDetail country={countries[0]}/>

    if (country) return <CountryDetail country={country}/>
    
    return <CountryList countryArray={countries} clickEvent={handleClick}/> 
     
}

export default CountryView