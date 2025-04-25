const { ctrlWrapper } = require('../helpers');
const contactServices = require('../services/contactsServices');
const { HttpError } = require('../helpers');

const getAllContacts = async (req, res) => {
  const contacts = await contactServices.listContacts();
  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactServices.getContactById(id);
  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contacts = await contactServices.removeContact(id);
  if (!contacts) {
    throw HttpError(404, 'Contact not found');
  }
  res.json({ message: 'Contact deleted' });
};

const createContact = async (req, res) => {
  const contact = await contactServices.addContact(req.body);
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactServices.getContactById(id);
  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }
  const updatedContact = await contactServices.addContact(req.body);
  res.status(200).json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
