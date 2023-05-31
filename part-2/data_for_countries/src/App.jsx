import { useState, useEffect } from 'react'
import Input from '../components/Input'
import CountryView from '../components/CountryView'
import getAllCountries from '../services/countryService'

function App() {
  ///////////// Reactive States //////////////
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [InputValue, setInputValue] = useState("")
  const [notifciation, setNotification] = useState(null)
  const [country, setCountry] = useState(null)
  //console.log(allCountries)
  
  //////////// Effect Hooks //////////////
  useEffect(() => {
    // Http request to Countries API
    getAllCountries()
      .then((data) => setAllCountries(data))
      .catch((err) => setNotification(err.message))
  },[])

  useEffect(() => {
    // filter countries each time user inputs a value 
    if (!InputValue) {
      setFilteredCountries([])
      setNotification(null)
      return
    }
    
    let filteredResult = filterCountries()

    if (filteredResult.length > 10) {
      setNotification("Too many match, specify another filter")
      setFilteredCountries([])
      return
    }
    setNotification(null)
    setFilteredCountries(filteredResult)
  }, [InputValue, allCountries])

 
  ///////////// Helper Functions ///////////////
  const filterCountries = () => {
    let filtered =  allCountries.filter((c) => {
      let val = InputValue.toLowerCase()
      let countryName = c.name.common.toLowerCase()
      return countryName.includes(val)
    })
    //console.log(filtered)
    return filtered
  }

 
  /////////////// Event Handlers /////////////////
  const updateInputValue = (e) => {
    setInputValue(e.target.value)
    setCountry(null)
  }

  const showCountryDetail = (country) => setCountry(country)

  return (
    <div className='container'>
      <Input 
        value={InputValue} 
        handleChange={updateInputValue}
      />
      <p style={{color: "red"}}>
        {notifciation}
      </p>
      <CountryView 
        countries={filteredCountries}
        country={country}
        handleClick={showCountryDetail}
      />
    </div>
  )
}

export default App
