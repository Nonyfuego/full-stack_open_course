import Input from "./Input"

const ContactForm = (props) => {
    return (
        <form>
            <Input 
            value={props.name} 
            placeHolder='Name' 
            handleChanges={props.handleNameChange} 
            />
            <Input 
            value={props.phoneNum} 
            placeHolder='Phone Number' 
            handleChanges={props.handlePhoneNumChange} 
            />
            <button type='submit' onClick={props.handleBtnClick}>Add</button>
        </form>
    )
}

export default ContactForm