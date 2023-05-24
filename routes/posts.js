import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  likePost,
  lovePost,
  viewPost,
  sharePost,
  supportPost,
 } from "../controllers/posts.js";

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost)
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);
router.patch('/support/:id', supportPost);
router.patch('/like/:id', likePost);
router.patch('/love/:id', lovePost);
router.patch('/view/:id', viewPost);
router.patch('/share/:id', sharePost);


export default router;
