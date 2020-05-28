const { Router } = require('express')
const { pagination, load } = require('../controllers/pagination.controller.js')
const router = Router()
router.get('/pagination/:id', pagination)
router.get('/load/:id', load)
module.exports = router
