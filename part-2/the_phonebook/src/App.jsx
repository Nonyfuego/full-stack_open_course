import { useState } from 'react'
import ContactDisplay from './components/ContactDisplay'
import Input from './components/Input'

function App() {
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState("")

  const AddContact = (event) => {
    event.preventDefault()
    if (contacts.some(contact => contact.name === newContact)) {
      alert(`${newContact} is already added to Phonebook`)
      return
    }
    let contact = {
      name: newContact,
      id: contacts.length + 1
    }
    let contactsCopy = [...contacts, contact]
    setContacts(contactsCopy) 
    setNewContact("")
  }

  const updateValue = (event) => {
    setNewContact(event.target.value)
  }

  return (
    <div>
      <h1>PhoneBook</h1>
      <form>
        <Input value={newContact} placeHolder='Name' handleChanges={updateValue} />
        <button type='submit' onClick={AddContact}>Add</button>
      </form>
      <h1>Numbers</h1>
      <ContactDisplay contacts={contacts} />
    </div>
  )
}

export default App
