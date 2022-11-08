const { Schema, model} = require('mongoose');

const message = new Schema({
  author: {
    id: { type: String, required: true, max: 100 },
    name: { type: String, required: true, max: 100 },
    lastname: { type: String, required: true, max: 50 },
    age: { type: Number, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true, max: 100 },    
  },
  text: { type: String, required: true, max: 400 },
  timestamp: { type: Date, default: Date.now }
});

const messageModel = model('mensajes', message);

module.exports = messageModel;