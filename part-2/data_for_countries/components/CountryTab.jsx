const CountryTab = ({country, handleClick}) => {
    //console.log(countryName)
    const imageStyle = {
        borderRadius: "50%",
        objectFit: "cover"
    }
    return (
        <tr>
            <td>
                <img 
                src={country.flags.svg} 
                alt={country.flags.alt} 
                style={imageStyle}
                width="30"
                height="30"
                />
            </td>
            <td>
                {country.name.common}
            </td>
            <td>
                <button onClick={() => handleClick(country)}>show</button>
            </td>
        </tr>
    )
}

export default CountryTab