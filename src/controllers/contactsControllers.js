const { ctrlWrapper } = require('../helpers');
const { HttpError } = require('../helpers');
const { Contact } = require('../models/contact');

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;
  const contacts = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email');
  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contacts = await Contact.findByIdAndDelete(id);
  if (!contacts) {
    throw HttpError(404, 'Contact not found');
  }
  res.json({ message: 'Contact deleted' });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json(contact);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json(contact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
