const { Router } = require('express');
const CategoryController = require('./app/controllers/CategoryController');
const ContactController = require('./app/controllers/ContactController');



const router = Router();

router.get('/contacts', ContactController.index)


router.get('/contacts/:id', ContactController.show)

router.delete('/contacts/:id', ContactController.delete)

router.post('/contacts', ContactController.store)

router.put('/contacts/:id', ContactController.update)






router.get('/category', CategoryController.index)


router.get('/category/:id', CategoryController.show)

router.delete('/category/:id', CategoryController.delete)

router.post('/category', CategoryController.store)

router.put('/category/:id', CategoryController.update)






module.exports = router;