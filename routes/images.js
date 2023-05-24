import express from "express";
import {
  getImages,
  addImage,
  deleteImage,
  updateImage,
  getImage,
  likeImage,
  supportImage,
  loveImage,
  viewImage,
  shareImage
 } from "../controllers/Image.js";

const router = express.Router();

router.get('/', getImages)
router.post('/', addImage);
router.get('/:id', getImage)
router.delete('/:id', deleteImage);
router.patch('/:id', updateImage);
router.patch('/like/:id', likeImage);
router.patch('/support/:id', supportImage);
router.patch('love/:id', loveImage);
router.patch('/view/:id', viewImage);
router.patch('/share/:id', shareImage);

export default router;
