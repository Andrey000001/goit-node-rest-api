const express = require('express');

const contactsRouter = express.Router();
const { validateBody } = require('../middlewares');
const { schema } = require('../shemas/contactShemas');
const ctrl = require('../controllers/contactsControllers');

contactsRouter.get('/', ctrl.getAllContacts);

// contactsRouter.get('/:id', ctrl.getOneContact);

contactsRouter.post('/', ctrl.createContact);

// contactsRouter.put('/:id', validateBody(schema), ctrl.updateContact);

// contactsRouter.delete('/:id', ctrl.deleteContact);

module.exports = contactsRouter;
