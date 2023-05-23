
const Input = (props) => {
    return (
        <div>
            <input 
            placeholder={props.placeHolder} 
            type="text"
            value={props.value} 
            onChange={props.handleChanges} 
            />
        </div>
    )
}

export default Input