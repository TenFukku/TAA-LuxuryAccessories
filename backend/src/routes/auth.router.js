const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller')
// const middlewares = require("../middlewares")

// router.use('/', middlewares.authorize)
router.post('/api/auth/login', auth.loginUser)
router.post('/api/auth/register', auth.registerUser)
router.post('/api/auth/findUser/phone', auth.findUserByPhone)
router.post('/api/auth/findUser/email', auth.findUserByEmail)
router.post('/api/auth/updatePass', auth.updatePassword)
router.post('/api/auth/changePass/phone', auth.changePasswordByPhone)
router.post('/api/auth/changePass/email', auth.changePasswordByEmail)
router.get('/user', auth.getAllUser)
router.get('/search',auth.searchProduct)



module.exports = router;