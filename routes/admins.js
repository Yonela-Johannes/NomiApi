import express from 'express';
import { getAdmins, getAdmin, updateAdmin, deleteAdmin, createAdmin } from '../controllers/admin.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// GETTING ARTIST
router.get('/', getAdmins);
// CREATE A ARTIST
router.post('/', createAdmin)
// CREATE ARTIST
router.get('/:id', getAdmin);
// UPDATE ARTIST
router.patch('/:id', updateAdmin);
// DELETE ARTIST
router.delete('/:id', deleteAdmin);

export default router
