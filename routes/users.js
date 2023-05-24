import express from 'express';
import {  viewUser, getUsers, updateUser, getUser, deleteUser, supportUser, likeUser, loveUser, likeVideo, likePost, lovePost, loveVideoComment, likeVideoComment, rateUser } from '../controllers/users.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// GETTING USERS
router.get('/', getUsers);
// GET A USER
router.get('/:id', getUser)
// UPDATE USER
router.patch('/:id', auth, updateUser)
// DELETE USER
router.delete('/:id', auth, deleteUser)

router.patch('/view/:id', viewUser);
// SUPPORT A USER
router.patch('/support/:id', supportUser)
// LIKE A USER
router.patch('/like/:id', likeUser)
// RATE A USER
router.patch('/rate/:id', rateUser)
// LOVE A USER
router.patch('/love/:id', loveUser)
// LIKE A VIDEO
router.put('/like/video/:videoId', likeVideo)
// LOVE A VIDEO
router.put('/love/video/:videoId', auth, likeVideo)
// LIKE A VIDEO COMMENT
router.put('/like/comment/:commentId', likeVideoComment)
// LOVE A VIDEO COMMENT
router.put('/love/comment/:commentId', auth, loveVideoComment)
// LIKE A POST MESSAGE
router.put('/like/post/:postId', likePost)
// LOVE A POSTMESSAGE
router.put('/love/post/:postId', auth, lovePost)
// LIKE A POST COMMENT
router.put('/like/comment/:commentId', likeVideoComment)
// LOVE A POST COMMENT
router.put('/love/comment/:commentId', auth, loveVideoComment)


export default router
