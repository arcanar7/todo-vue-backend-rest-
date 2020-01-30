const { Router } = require('express')
const auth_controller = require('../controllers/authController')
const router = Router()

router.post('/register', auth_controller.auth_register)
router.post('/login', auth_controller.auth_login)
router.post('/token', auth_controller.auth_login)

module.exports = router
