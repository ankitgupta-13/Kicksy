import {Router} from 'express';
import { acceptRequest, createSeller, getAllRequests, productAddRequest } from '../controllers/seller.controllers.js';

const router = Router();

router.route('/create-seller').post(createSeller);
router.route('/create-request').post(productAddRequest);
router.route('/fetch-requests').post(getAllRequests);
router.route('/accept-request').post(acceptRequest);

export default router;