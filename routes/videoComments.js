import express from 'express';
import { getComments, addComment, deleteComment } from '../controllers/videoComments.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get('/:videoId', getComments);
router.post('/', auth, addComment);
router.delete('/:id', auth, deleteComment);


export default router
