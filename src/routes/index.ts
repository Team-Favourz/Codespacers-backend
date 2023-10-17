/* eslint-disable @typescript-eslint/no-misused-promises */
import {Router} from 'express';
import {registerUser, userLogIn} from "../controllers/index"
import { verifyToken } from '../services/index';
const router = Router();


router.post('/register', registerUser);
router.post('/login', verifyToken, userLogIn);

export default router;