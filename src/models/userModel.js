const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExp: Date,
  todos: [
    {
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Todos',
        required: true,
      },
    },
  ],
})

module.exports = model('Users', userSchema)
