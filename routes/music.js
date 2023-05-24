import express from "express";
import {
  getSongs,
  addSong,
  deleteSong,
  updateSong,
  getSong,
  likeSong,
  supportSong,
  loveSong,
  viewSong,
  shareSong,
  playCountSong
 } from "../controllers/Music.js";

const router = express.Router();

router.get('/', getSongs)
router.post('/', addSong);
router.get('/:id', getSong)
router.delete('/:id', deleteSong);
router.patch('/:id', updateSong);
router.patch('/like/:id', likeSong);
router.patch('/support/:id', supportSong);
router.patch('love/:id', loveSong);
router.patch('/view/:id', viewSong);
router.patch('/play/:id', playCountSong);
router.patch('/share/:id', shareSong);


export default router;
