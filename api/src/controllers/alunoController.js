import prisma from '../prismaClient.js';

export const createAluno = async (req, res) => {
  try {
    const { nome, ra, telefone } = req.body;
    const aluno = await prisma.aluno.create({
      data: { nome, ra, telefone }
    });
    res.status(201).json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const getAlunos = async (req, res) => {
  const alunos = await prisma.aluno.findMany();
  res.json(alunos);
};

export const getAlunoById = async (req, res) => {
  const id = Number(req.params.id);
  const aluno = await prisma.aluno.findUnique({
    where: { id },
    include: {
      emprestimos: {
        include: {
          livro: true
        }
      }
    }
  });
  res.json(aluno);
};

export const updateAluno = async (req, res) => {
  const id = Number(req.params.id);
  const { nome, ra, telefone } = req.body;
  const aluno = await prisma.aluno.update({
    where: { id },
    data: { nome, ra, telefone }
  });
  res.json(aluno);
};

export const deleteAluno = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.aluno.delete({ where: { id } });
  res.status(204).end();
};
