import express from 'express';
import { getBlogComments, addBlogComment, deleteBlogComment } from '../controllers/blogComments.js';


import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();



router.get('/', getBlogComments);
router.post('/', auth, addBlogComment);
router.post('/:id', auth, deleteBlogComment)

export default router
