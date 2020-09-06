const { Router } = require('express')
const pagination = require('../controllers/pagination.controller.js')
const router = Router()
router.get('/pagination/:page/:q/:lang', pagination)
module.exports = router
