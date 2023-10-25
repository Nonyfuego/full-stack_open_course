import { useState, useEffect } from 'react'
import ContactDisplay from './components/ContactDisplay'
import Input from './components/Input'
import ContactForm from './components/ContactForm'
import personService from './services/personService'
import Notification from './components/Notification'

function App() {
  //////////////////// react state hooks //////////////////
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState({
    name: "",
    number: ""
  })
  const [showfiltered, setShowFiltered] = useState(false)
  const [filtered, setFiltered] = useState([])
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  

  //////////////////// Callback functions //////////////////////
  // Event handler
  const submitContactForm = (event) => {
    event.preventDefault()
    // prevent user from submitting empty form
    /*if (!newContact.name || !newContact.number) {
      return
    }*/
    // check if new contact name already exist in contacts
    if (contacts.some(_contact => _contact.name === newContact.name)) {
      let promptMsg = `${newContact.name} is already added to Phonebook, replace old number with new one?`
      // prompt user if existing contact should be updated
      // with the new one
      if (window.confirm(promptMsg)) {
        // replace existing contact with new one
        replaceContact(newContact)
        
      } else return // if user doesn't want to update contact
      
    } else {
      // add contact if new contact name does not already exist
      addContact(newContact)
    }
 }


  // (submitContactForm) helper function
  const addContact = (data) => {
    // send a POST request to server
    personService
      .createPerson(data)
      .then(_newContact => {
        let _updatedContacts = [...contacts, _newContact]
        // update reactive states
        setContacts(_updatedContacts)
        setNewContact({
          name: "",
          number: ""
        })
        setSuccessMsg(`${_newContact.name} has successfully been added`)

      })
      .catch(err => {
        if (err.response) {
          setErrorMsg(err.response.data.error)
          return
        }
        setErrorMsg(err.message)
      })
      .finally(() => {
        setTimeout(() => {
          setSuccessMsg(null)
          setErrorMsg(null)
        },5000)
      })
  }


  // (submitContactForm) helper function
  const replaceContact = (updatedData) => {
    let existingContact = contacts.find(_contact => _contact.name === updatedData.name)
    // send a PUT request to update contact on server
    personService
      .updatePerson(existingContact.id, updatedData)
      .then(_updatedContact => {
        let updatedContacts = contacts.map(_contact => 
          _contact.id !== _updatedContact.id? _contact : _updatedContact
        )
        // update reactive states
        setContacts(updatedContacts)
        setNewContact({
          name: "",
          number: ""
        })
        setSuccessMsg(`${_updatedContact.name}'s number has been updated`)
      })
      .catch(err => {
        if (err.response) {
          setErrorMsg(err.response.data.error)
          return
        }
        // notify user in case of 404 error
        if (err.code === "ERR_BAD_REQUEST") {
          setErrorMsg(`info of ${existingContact.name} has already been deleted from the server`)
          return
        }
        // notify user in case of Network error
        setErrorMsg(err.message)
      })
      .finally(() => {
        setTimeout(() => {
          setSuccessMsg(null)
          setErrorMsg(null)
        },5000)
      })

  }


 // (Event handler) delete button
 const deleteContact = (id) => {
  // ask for confirmation before deleting contact
  let contact = contacts.find(_contact => _contact.id === id)
  // prompt user if contact should be deleted
  if (window.confirm(`Delete ${contact.name}?`)) {
    personService
      .deletePerson(id)
      .then(res => {
        console.log(res)
        let updatedContacts = contacts.filter(contact => contact.id !== id)
        // update reactive states
        setContacts(updatedContacts)
        setSuccessMsg(`${contact.name}'has successfully been deleted from the server`)
      })
      .catch(err => {
        // notify user in case of 404 error
        if (err.code === "ERR_BAD_REQUEST") {
          setErrorMsg(`info of ${contact.name} has already been deleted from the server`)
          return
        }
        console.log("network error: ",err)
        // notify user in case of Network error
        setErrorMsg(err.message)
      })
      .finally(() => {
        setTimeout(() => {
          setSuccessMsg(null)
          setErrorMsg(null)
        },5000)
      })

  }
 }
  

  // (Event Handler) update name input field
  const updateNameInput = (event) => {
    setNewContact({
      ...newContact,
      name: event.target.value
    })
  }


  // (Event Handler) update number input field
  const updateNumberInput = (event) => {
    setNewContact({
      ...newContact,
      number: event.target.value
    })
  }

  
  // (Event Handler) filter contacts with search input field
  const searchFilter = (event) => {
    let searchValue = event.target.value
    if (searchValue) {
      setShowFiltered(true)
      let filteredResults = contacts.filter(contact => {
        let contactName = contact.name.toLowerCase()
        let searchString = searchValue.toLowerCase()
        return contactName.includes(searchString)
      })
      //console.log(filteredResults)
      setFiltered(filteredResults)
      return
    }else {
      setFiltered([])
      setShowFiltered(false)
    }

  }


  //////////////////// react effect hooks ///////////////////
   useEffect(() => {
    personService
      .getAllPerson()
      .then(persons => setContacts(persons))
      .catch(err => setErrorMsg(err.message))
      .finally(() => {
        setTimeout(() => {
          setErrorMsg(null)
        },5000)
      })
   },[]) 

  return (
    <div>
      <h1>PhoneBook</h1>
      <Notification
        successMsg={successMsg}
        errorMsg={errorMsg}
      />
      <div className='search-field'>
        <Input 
          placeHolder="Search"
          handleChanges={searchFilter}
        />
      </div>
      <h1>Add New</h1>
      <ContactForm 
        name={newContact.name}
        phoneNum={newContact.number}
        handleNameChange={updateNameInput}
        handlePhoneNumChange={updateNumberInput}
        handleBtnClick={submitContactForm}
      />
      <h1>Numbers</h1>
      <ContactDisplay 
        contacts={showfiltered? filtered : contacts}
        handleDelete={deleteContact}
      />
    </div>
  )
}

export default App
