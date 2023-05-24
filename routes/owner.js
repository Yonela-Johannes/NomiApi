import express from 'express';
import { getOwner } from '../controllers/owner.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// GETTING OWNER
router.get('/', getOwner);

export default router
