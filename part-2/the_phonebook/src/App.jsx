import { useState, useEffect } from 'react'
import ContactDisplay from './components/ContactDisplay'
import Input from './components/Input'
import ContactForm from './components/ContactForm'
import axios from 'axios'

function App() {
  //////////////////// All defined states //////////////////
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState({
    name: "",
    number: ""
  })
  const [showfiltered, setShowFiltered] = useState(false)
  const [filtered, setFiltered] = useState([])

  //////////////////// Callback functions //////////////////////
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
      number: newContact.number,
      id: contacts.length + 1
    }
    // add the new contact object to contacts by concantation
    // with spread syntax
    let contactsCopy = [...contacts, contact]
    setContacts(contactsCopy) 
    setNewContact({
      name: "",
      number: ""
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
      number: event.target.value
    })
  }

  const filterContacts = (event) => {
    let searchValue = event.target.value
    if (searchValue) {
      // filter contacts that match the text in the search field
      setShowFiltered(true)
      let filteredResults = contacts.filter(contact => {
        let contactName = contact.name.toLowerCase()
        let searchString = searchValue.toLowerCase()
        return contactName.includes(searchString)
      }
      )
      //console.log(filteredResults)
      setFiltered(filteredResults)
      return
    }
    setFiltered([])
    setShowFiltered(false)
  }

  //////////////////// Effect Hooks ///////////////////
   useEffect(() => {
      axios
        .get("http://localhost:3001/persons")
        .then((response) => {
          console.log(response.data)
          setContacts(response.data)
        })
        .catch((err) => {
          console.log(err.message)
        })
   }, []) 

  return (
    <div>
      <h1>PhoneBook</h1>
      <div className='search-field'>
        <Input 
        placeHolder="Search"
        handleChanges={filterContacts}
        />
      </div>
      <h1>Add New</h1>
      <ContactForm 
      name={newContact.name}
      phoneNum={newContact.number}
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
