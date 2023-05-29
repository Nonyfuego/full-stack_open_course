const CountryTab = ({country}) => {
    //console.log(countryName)
    const imageStyle = {
        borderRadius: "50%",
        objectFit: "cover"
    }
    return (
        <tr>
            <td style={{paddingRight: 10}}>
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
        </tr>
    )
}

export default CountryTab