import Contact from "./Contact"

const ContactDisplay = ({contacts, handleDelete}) => {
    return (
        <table>
            <tbody>
                {contacts.map(contact => 
                    <Contact
                    key={contact.id}
                    id={contact.id} 
                    name={contact.name}
                    number={contact.number}
                    clickHandler={handleDelete}
                    />
                )}
            </tbody>
        </table>
    )
}

export default ContactDisplay