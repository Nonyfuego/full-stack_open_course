import CountryTab from "./CountryTab"

const CountryList = ({countryArray}) => {
    return  (
        <table>
            <tbody>
                {countryArray.map((c) => 
                    <CountryTab 
                    key={c.cca3} 
                    country={c}
                    />
                )}
            </tbody>
        </table>
    )
}

export default CountryList 