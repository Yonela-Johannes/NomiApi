import express from "express";
import {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  likeBlog,
  supportBlog,
  loveBlog,
  viewBlog,
  shareBlog
 } from "../controllers/blogs.js";

const router = express.Router();

router.get('/', getBlogs)
router.get('/:id', getBlog)
router.post('/', createBlog);
router.delete('/:id', deleteBlog);
router.patch('/:id', updateBlog);
router.patch('/like/:id', likeBlog);
router.patch('/support/:id', supportBlog);
router.patch('love/:id', loveBlog);
router.patch('/view/:id', viewBlog);
router.patch('/share/:id', shareBlog);


export default router;
