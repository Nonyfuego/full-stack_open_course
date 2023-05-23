import Contact from "./Contact"

const ContactDisplay = ({contacts}) => {
    return (
        <table>
            <tbody>
                {contacts.map(contact => 
                     <Contact key={contact.id} name={contact.name} />
                )}
            </tbody>
        </table>
    )
}

export default ContactDisplay