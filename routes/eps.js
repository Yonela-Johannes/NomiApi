import express from "express";
import {
  getEps,
  createEp,
  deleteEp,
  updateEp,
  getEp,
  likeEp,
  supportEp,
  loveEp,
  viewEp,
  shareEp,
 } from "../controllers/Eps.js";

const router = express.Router();

router.get('/', getEps)
router.get('/:id', getEp)
router.post('/', createEp);
router.delete('/:id', deleteEp);
router.patch('/:id', updateEp);
router.patch('/like/:id', likeEp);
router.patch('/support/:id', supportEp);
router.patch('love/:id', loveEp);
router.patch('/view/:id', viewEp);
router.patch('/share/:id', shareEp);


export default router;
