const express = require('express');
const authRouter = express.Router();

const validateBody = require('../../middlewares/validateBody');
const ctrl = require('../../controllers/authController');
const { schemas } = require('../../models/user');
const { authenticate } = require('../../middlewares');

authRouter.post('/register', validateBody(schemas.registerSchema), ctrl.register);

authRouter.post('/login', validateBody(schemas.loginSchema), ctrl.login);

authRouter.get('/current', authenticate, ctrl.getCurrent);

authRouter.post('/logout', authenticate, ctrl.logout);

module.exports = authRouter;
