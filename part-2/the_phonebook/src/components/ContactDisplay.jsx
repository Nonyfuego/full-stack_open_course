import Contact from "./Contact"

const ContactDisplay = ({contacts}) => {
    return (
        <table>
            <tbody>
                {contacts.map(contact => 
                     <Contact 
                     key={contact.id} 
                     name={contact.name} 
                     number={contact.number} 
                     />
                )}
            </tbody>
        </table>
    )
}

export default ContactDisplay