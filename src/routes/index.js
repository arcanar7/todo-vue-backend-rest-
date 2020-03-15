const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const auth_controller = require('../controllers/authController')
const todo_controller = require('../controllers/todoController')

const router = Router()

router.post('/auth/register', auth_controller.auth_register)
router.post('/auth/login', auth_controller.auth_login)
router.post('/auth/token', auth_controller.auth_token)

router.post('/todo/', auth, todo_controller.todo_create)
router.get('/todo/', auth, todo_controller.todo_get)
router.put('/todo/:id', auth, todo_controller.todo_update)
router.delete('/todo/:id', auth, todo_controller.todo_delete)
router.delete('/todo/', auth, todo_controller.todo_deleteComleted)

module.exports = router
