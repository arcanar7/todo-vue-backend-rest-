const Todo = require('../models/todoModel')

exports.todo_create = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      completed: false,
      userId: req.user.userId,
    })
    return res.status(201).json(todo)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Server error' })
  }
}

exports.todo_get = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).populate(
      'userId'
    )
    return res.status(200).json(todos)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Server error' })
  }
}

exports.todo_update = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    todo.title = req.body.title
    todo.completed = req.body.completed
    await todo.save()
    return res.status(200).json({ todo })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Server error' })
  }
}

exports.todo_delete = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id)
    return res.status(200).json({})
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Server error' })
  }
}
