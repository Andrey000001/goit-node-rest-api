const { ctrlWrapper } = require('../helpers');
const { HttpError } = require('../helpers');
const Contact = require('../models/contact');

console.log('Contact:', Contact);

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  console.log('RAW ID:', JSON.stringify(id));
  const cleanId = id.trim();
  console.log('CLEAN ID:', cleanId);

  const contact = await Contact.findById(cleanId);

  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }

  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contacts = await Contact.findByIdAndDelete(id);
  if (!contacts) {
    throw HttpError(404, 'Contact not found');
  }
  res.json({ message: 'Contact deleted' });
};

const createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

// const updateContact = async (req, res) => {
//   const { id } = req.params;
//   const contact = await contactServices.getContactById(id);
//   if (!contact) {
//     throw HttpError(404, 'Contact not found');
//   }
//   const updatedContact = await contactServices.addContact(req.body);
//   res.status(200).json(updatedContact);
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  // updateContact: ctrlWrapper(updateContact),
};
