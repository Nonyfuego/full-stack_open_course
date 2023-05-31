
const CountryWeatherInfo = ({info}) => {
    if (!info) return <h4>No Data Available</h4>

    let iconUrl = `https://openweathermap.org/img/wn/${info.weather[0].icon}@4x.png`

    return (
        <>
            <p>Temperature {info.main.temp} celcius</p>
            <div>
                <img 
                src={iconUrl}
                alt="weather status icon" 
                />
            </div>
            <p>{info.weather[0].description}</p>
            <p>Wind {info.wind.speed} m/s</p>
        </>
    )

}

export default CountryWeatherInfo