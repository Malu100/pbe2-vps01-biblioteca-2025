import express from 'express';
import cors from 'cors';

import alunoRoutes from './src/routes/alunoRoutes.js';
import emprestimoRoutes from './src/routes/emprestimoRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/alunos', alunoRoutes);
app.use('/emprestimos', emprestimoRoutes);

app.listen(3001, () => {
  console.log('API executando em http://localhost:3001');
});
