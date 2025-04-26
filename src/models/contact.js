const { model, Schema } = require('mongoose');
const { HttpError } = require('../helpers');
const Joi = require('joi');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[0-9\s\-()]{7,}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      match: [emailRegex, 'Please enter a valid email (e.g., user@example.com)'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      match: [phoneRegex, 'Phone number must contain digits and may include +, -, ()'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string()
//     .pattern(/^[0-9]+$/)
//     .required(),
//   favorite: Joi.boolean(),
// });

contactSchema.post('save', (error, data, next) => {
  HttpError(400, error.message);
  next(error);
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
