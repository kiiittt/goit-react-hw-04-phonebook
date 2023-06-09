import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [searchName, setSearchName] = useState('');

  const storageKey = 'contacts';

  useEffect(() => {
    const savedContacts = localStorage.getItem(storageKey);
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (name, number) => {
    if (name === '' || number === '') {
      alert('Please enter name and number');
      return;
    }
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${name} already exists!`);
    } else {
      const newContact = { id: nanoid(), name, number };
      setContacts(prevContacts => {
        const updatedContacts = [...prevContacts, newContact];
        localStorage.setItem(storageKey, JSON.stringify(updatedContacts));
        return updatedContacts;
      });
    }
  };

  const handleSearchChange = e => {
    setSearchName(e.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchName.toLowerCase())
    );
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h1 className={css.title}>Contacts</h1>
      <Filter searchName={searchName} onSearchChange={handleSearchChange} />
      <ContactList
        contacts={contacts}
        filteredContacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
