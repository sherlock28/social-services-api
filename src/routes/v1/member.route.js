import { Router } from 'express';
import { memberCtrl } from '../../controllers/member.ctrl.js';
import { validateCreate } from '../../validators/member.js';

const router = Router();

router.post('/', validateCreate, memberCtrl.create);
router.put('/:number', memberCtrl.update);
router.delete('/:number', memberCtrl.delete);
/**
 * @openapi
 * paths:
 *  /api/v1/member:
 *    get:
 *      summary: Get a member by number
 *      parameters:
 *        - in: path
 *          name: number
 *          schema:
 *            type: integer
 *          required: true
 *          description: Number of member to get
 *      tags:
 *        - Members
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      number:
 *                        type: integer
 *                        example: 1
 *                      name:
 *                        type: string
 *                        example: "John Wick"
 *                      status:
 *                        type: boolean
 *                        example: true
 *                      phone_one:
 *                        type: integer
 *                        example: 1234567890
 *                      phone_two:
 *                        type: integer
 *                        example: 9876543210
 *                      address:
 *                        type: string
 *                        example: "Direccion 1"
 *                      district:
 *                        type: string
 *                        example: "Barrio 1"
 *                      payday:
 *                        type: integer
 *                        example: 10
 *                      last_pay_amount:
 *                        type: integer
 *                        example: 2500
 *                      plan_id:
 *                        type: integer
 *                        example: 1
 *                      created_at:
 *                        type: string
 *                        example: "2023-08-20T11:00:00"
 *                  success: 
 *                    type: boolean
 *                    example: true
 *                  message: 
 *                    type: string
 *                    example: "Successfully obtained members"
 *                  error:
 *                    type: object
 *                    default: null
 */
router.get('/:number', memberCtrl.getByNumber);
router.get('/', memberCtrl.get);

export default router;