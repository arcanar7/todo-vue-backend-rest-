const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const todo_controller = require('../controllers/todoController')
const router = Router()


router.post('/', auth, todo_controller.todo_create)
router.get('/', auth, todo_controller.todo_get)
router.put('/:id', auth, todo_controller.todo_update)
router.delete('/:id', auth, todo_controller.todo_delete)
router.delete('/', auth, todo_controller.todo_deleteComleted)

module.exports = router
