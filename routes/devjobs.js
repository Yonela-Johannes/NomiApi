import express from "express";
import {
  getDevjobs,
  createDevjob,
  deleteDevjob,
  updateDevjob,
  getDevjob,
  likeDev,
  supportDevjob,
  loveDevjob,
  viewDevjob,
  shareDevjob,
 } from "../controllers/devjobs.js";

const router = express.Router();

router.get('/', getDevjobs)
router.get('/:id', getDevjob)
router.post('/', createDevjob);
router.delete('/:id', deleteDevjob);
router.patch('/:id', updateDevjob);
router.patch('/like/:id', likeDev);
router.patch('/support/:id', supportDevjob);
router.patch('love/:id', loveDevjob);
router.patch('/view/:id', viewDevjob);
router.patch('/share/:id', shareDevjob);

export default router;
