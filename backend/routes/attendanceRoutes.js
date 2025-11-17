const router = require('express').Router();
const controller = require('../controllers/attendanceController');

router.post('/', controller.mark);
router.get('/ledger/:studentId', controller.ledger);

module.exports = router;
