import { Router } from 'express';
import { memberCtrl } from '../../controllers/member.ctrl.js';
import { validateCreate, validateNumber } from '../../validators/member.js';

const router = Router();

router.post('/', validateCreate, memberCtrl.create);
router.put('/:number', memberCtrl.update);
router.delete('/:number', validateNumber, memberCtrl.delete);
router.get('/:number', validateNumber, memberCtrl.getByNumber);
router.get('/', memberCtrl.get);

export default router;