import express from 'express';
import {
  createEmprestimo,
  getEmprestimos,
  updateEmprestimo,
  deleteEmprestimo
} from '../controllers/emprestimoController.js';

const router = express.Router();

router.post('/', createEmprestimo);
router.get('/', getEmprestimos);
router.put('/:id', updateEmprestimo);
router.delete('/:id', deleteEmprestimo);

export default router;
