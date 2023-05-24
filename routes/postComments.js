import express from 'express';
import { getPostComments, addPostComment, deletePostComment } from '../controllers/postComments.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get('/', getPostComments);
router.post('/', auth, addPostComment);
router.post('/:id', auth, deletePostComment)

export default router
