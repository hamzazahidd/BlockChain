const router = require('express').Router();
const controller = require('../controllers/classController');

router.get('/', controller.getAll);
router.get('/department/:deptId', controller.getByDepartment);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
