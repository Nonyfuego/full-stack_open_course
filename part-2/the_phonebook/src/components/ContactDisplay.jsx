import Contact from "./Contact"

const ContactDisplay = ({contacts}) => {
    return (
        <table>
            <tbody>
                {contacts.map(contact => 
                     <Contact 
                     key={contact.id} 
                     name={contact.name} 
                     phone={contact.phoneNum} 
                     />
                )}
            </tbody>
        </table>
    )
}

export default ContactDisplay