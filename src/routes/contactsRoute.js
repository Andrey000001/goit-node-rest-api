const express = require('express');
const { shemas } = require('../models/contact');
const contactsRouter = express.Router();
const { validateBody } = require('../middlewares');
const isValidId = require('../middlewares/isValidId');
const ctrl = require('../controllers/contactsControllers');

contactsRouter.get('/', ctrl.getAllContacts);

contactsRouter.get('/:id', isValidId, ctrl.getOneContact);

contactsRouter.post('/', validateBody(shemas.addSchema), ctrl.createContact);

contactsRouter.put('/:id', isValidId, validateBody(shemas.addSchema), ctrl.updateContact);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(shemas.updateFavoiriteSchema),
  ctrl.updateFavorite,
);

contactsRouter.delete('/:id', isValidId, ctrl.deleteContact);

module.exports = contactsRouter;
