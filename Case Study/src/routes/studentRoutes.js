const { Router } = require('express');
const ctrl = require('../controllers/studentController');

const router = Router();

router.get('/stats/department', ctrl.stats);
router.route('/').get(ctrl.list).post(ctrl.create);
router.route('/:id').get(ctrl.getOne).put(ctrl.update).patch(ctrl.update).delete(ctrl.remove);

module.exports = router;
