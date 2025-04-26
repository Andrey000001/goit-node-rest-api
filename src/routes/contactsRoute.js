const express = require('express');
const addSchema = require('../models/contact');
const contactsRouter = express.Router();
const { validateBody } = require('../middlewares');

const ctrl = require('../controllers/contactsControllers');

// contactsRouter.get('/', ctrl.getAllContacts);

contactsRouter.get('/:id', ctrl.getOneContact);

contactsRouter.post('/', ctrl.createContact);

// contactsRouter.put('/:id', validateBody(schema), ctrl.updateContact);

// contactsRouter.delete('/:id', ctrl.deleteContact);

module.exports = contactsRouter;
