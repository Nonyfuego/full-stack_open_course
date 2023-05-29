import CountryList from "./CountryList"
import CountryDetail from "./CountryDetail"

const CountryView = ({countries}) => {
    if (countries.length === 0) return null
    //console.log(countries)
    if (countries.length === 1) return <CountryDetail country={countries[0]}/>

    return (
        <CountryList countryArray={countries}/> 
    )
}

export default CountryView