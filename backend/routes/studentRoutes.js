const router = require('express').Router();
const controller = require('../controllers/studentController');

router.get('/', controller.getAll);
router.get('/class/:classId', controller.getByClass);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
