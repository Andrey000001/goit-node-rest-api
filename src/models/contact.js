const { model, Schema } = require('mongoose');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Введите корректный email (например, user@example.com)',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
    match: [/^\+?[0-9\s\-()]{7,}$/, 'Please enter a valid phone number'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
