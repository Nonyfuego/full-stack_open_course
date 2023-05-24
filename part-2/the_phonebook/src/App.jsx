import { useState } from 'react'
import ContactDisplay from './components/ContactDisplay'
import Input from './components/Input'
import ContactForm from './components/ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState({
    name: "",
    phoneNum: ""
  })
  const [showfiltered, setShowFiltered] = useState(false)
  const [filtered, setFiltered] = useState([])

  //////////////////////////////////////////////////////////
  const AddContact = (event) => {
    event.preventDefault()
    // prevent adding a contact name that already exist
    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already added to Phonebook`)
      return
    }
    // new contact object to be added to contacts
    let contact = {
      name: newContact.name,
      phoneNum: newContact.phoneNum,
      id: contacts.length + 1
    }
    // add the new contact object to contacts by concantation
    // with spread syntax
    let contactsCopy = [...contacts, contact]
    setContacts(contactsCopy) 
    setNewContact({
      name: "",
      phoneNum: ""
    })
  }

  const updateName = (event) => {
    setNewContact({
      ...newContact,
      name: event.target.value
    })
  }

  const updatePhoneNum = (event) => {
    setNewContact({
      ...newContact,
      phoneNum: event.target.value
    })
  }

  const filterContacts = (event) => {
    let searchValue = event.target.value
    if (searchValue) {
      // filter contacts that match the text in the search field
      setShowFiltered(true)
      let filteredResults = contacts.filter(contact => contact.name.includes(searchValue))
      console.log(filteredResults)
      setFiltered(filteredResults)
        return
      }
      setFiltered([])
      setShowFiltered(false)
    }

  return (
    <div>
      <h1>PhoneBook</h1>
      <div>
        <Input 
        placeHolder="Search"
        handleChanges={filterContacts}
        />
      </div>
      <h1>Add New</h1>
      <ContactForm 
      name={newContact.name}
      phoneNum={newContact.phoneNum}
      handleNameChange={updateName}
      handlePhoneNumChange={updatePhoneNum}
      handleBtnClick={AddContact}
      />
      <h1>Numbers</h1>
      <ContactDisplay contacts={showfiltered? filtered : contacts} />
    </div>
  )
}

export default App
