const { Schema, model, Types } = require('mongoose')

const todoSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
})

module.exports = model('Todos', todoSchema)
