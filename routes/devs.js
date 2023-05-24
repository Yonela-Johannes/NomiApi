import express from "express";
import {
  getDevs,
  createDev,
  deleteDev,
  updateDev,
  getDev,
  likeDev,
  supportDev,
  loveDev,
  viewDev,
  shareDev,
 } from "../controllers/dev.js";

const router = express.Router();

router.get('/', getDevs)
router.get('/:id', getDev)
router.post('/', createDev);
router.delete('/:id', deleteDev);
router.patch('/:id', updateDev);
router.patch('/like/:id', likeDev);
router.patch('/support/:id', supportDev);
router.patch('/love/:id', loveDev);
router.patch('/view/:id', viewDev);
router.patch('/share/:id', shareDev);

export default router;
