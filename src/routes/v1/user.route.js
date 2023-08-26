import { Router } from 'express';
import { userCtrl } from '../../controllers/user.ctrl.js';
import { validateCreate, validateUpdate, validateId } from '../../validators/user.js';

const router = Router();

router.post('/', validateCreate, userCtrl.create);
router.put('/:id', validateId, validateUpdate, userCtrl.changePassword);
router.delete('/:id', validateId, userCtrl.delete);
router.get('/:id', validateId, userCtrl.getById);
router.get('/', userCtrl.get);

export default router;