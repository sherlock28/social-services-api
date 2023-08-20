import { Router } from 'express';
import { memberCtrl } from '../controllers/member.ctrl.js';
import { validateCreate } from '../validators/member.js';

const router = Router();

router.post('/', validateCreate, memberCtrl.create);
router.put('/:number', memberCtrl.update);
router.delete('/:number', memberCtrl.delete);
router.get('/:number', memberCtrl.getByNumber);
router.get('/', memberCtrl.get);

export default router;
