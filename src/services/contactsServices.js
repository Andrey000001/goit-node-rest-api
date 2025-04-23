const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const contactsPath = path.join(__dirname,'..','db','contacts.json');

async function listContacts() {
    try { 
        const data = await fs.readFile(contactsPath, 'utf-8')
        console.log(data);
        
        return JSON.parse(data)
    } catch(error) { 
        console.error("Error reading contacts file:", error.message);
        return [];
    }    
}

async function getContactById(contactId) {
    const contacts = await listContacts()
    const index = contacts.findIndex((item) => item.id === contactId)
    if(index === -1) {
        return null    }
   
    return contacts[index] = {...contacts[index]}
}

async function removeContact(contactId) {
    const contacts = await listContacts()
    const index = contacts.findIndex((item) => item.id === contactId)
    if(index === -1) {
        return
    }
    contacts.splice(index, 1)
    await fs.writeFile(contactsPath,JSON.stringify(contacts,null,2))    
    return contacts
}

async function addContact(data) {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        ...data
    }
        contacts.push(newContact)
        await fs.writeFile(contactsPath,JSON.stringify(contacts,null,2))

    return contacts
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}