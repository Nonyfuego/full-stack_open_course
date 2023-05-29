const CountryDetail = ({country}) => {
    // country languages are is an object, the keys are returned
    const languages = Object.keys(country.languages)
    return (
        <div>
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
        </div>
    )
}

export default CountryDetail