import CountryTab from "./CountryTab"

const CountryList = ({countryArray, clickEvent}) => {
    return  (
        <table>
            <tbody>
                {countryArray.map((c) => 
                    <CountryTab 
                    key={c.cca3} 
                    country={c}
                    handleClick={clickEvent}
                    />
                )}
            </tbody>
        </table>
    )
}

export default CountryList 