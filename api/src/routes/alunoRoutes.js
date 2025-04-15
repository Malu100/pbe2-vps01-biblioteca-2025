import express from 'express';
import {
  createAluno, getAlunos, getAlunoById, updateAluno, deleteAluno
} from '../controllers/alunoController.js';

const router = express.Router();

router.post('/', createAluno);
router.get('/', getAlunos);
router.get('/:id', getAlunoById);
router.put('/:id', updateAluno);
router.delete('/:id', deleteAluno);

export default router;
