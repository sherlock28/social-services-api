import { Router } from 'express';
import { userCtrl } from '../../controllers/user.ctrl.js';

const router = Router();

router.post('/', userCtrl.create);
router.put('/:number', userCtrl.update);
router.delete('/:number', userCtrl.delete);
router.get('/:number', userCtrl.getById);
router.get('/', userCtrl.get);

export default router;