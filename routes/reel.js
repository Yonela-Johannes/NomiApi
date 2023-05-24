import express from "express";
import {
  getReels,
  addReel,
  deleteReel,
  updateReel,
  getReel,
  likeReel,
  supportReel,
  loveReel,
  viewReel,
  shareReel
 } from "../controllers/Reels.js";

const router = express.Router();

router.get('/', getReels)
router.post('/', addReel);
router.get('/:id', getReel)
router.delete('/:id', deleteReel);
router.patch('/:id', updateReel);
router.patch('/like/:id', likeReel);
router.patch('/support/:id', supportReel);
router.patch('love/:id', loveReel);
router.patch('/view/:id', viewReel);
router.patch('/share/:id', shareReel);

export default router;
