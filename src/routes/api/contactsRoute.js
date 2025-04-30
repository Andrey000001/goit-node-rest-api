const express = require('express');
const { shemas } = require('../../models/contact');
const contactsRouter = express.Router();
const { validateBody } = require('../../middlewares');
const isValidId = require('../../middlewares/isValidId');
const ctrl = require('../../controllers/contactsControllers');
const { authenticate } = require('../../middlewares');

console.log(authenticate);

contactsRouter.get('/', authenticate, ctrl.getAllContacts);

contactsRouter.get('/:id', authenticate, isValidId, ctrl.getOneContact);

contactsRouter.post('/', authenticate, validateBody(shemas.addSchema), ctrl.createContact);

contactsRouter.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(shemas.addSchema),
  ctrl.updateContact,
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(shemas.updateFavoiriteSchema),
  ctrl.updateFavorite,
);

contactsRouter.delete('/:id', isValidId, ctrl.deleteContact);

module.exports = contactsRouter;
