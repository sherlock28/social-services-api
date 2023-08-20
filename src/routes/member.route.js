import { Router } from 'express';
import { memberCtrl } from '../controllers/member.ctrl.js';
import { validateCreate } from '../validators/member.js';

const router = Router();

router.post('/', validateCreate, memberCtrl.create);

export default router;
