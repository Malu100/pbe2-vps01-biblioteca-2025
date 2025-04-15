import prisma from '../prismaClient.js';
import { differenceInDays } from 'date-fns';

export const createEmprestimo = async (req, res) => {
  try {
    const { alunoId, livroId } = req.body;

    const emprestimo = await prisma.emprestimo.create({
      data: {
        aluno: { connect: { id: alunoId } },
        livro: { connect: { id: livroId } },
        devolucao: null // [RF002.3]
      }
    });

    res.status(201).json(emprestimo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const getEmprestimos = async (req, res) => {
  const emprestimos = await prisma.emprestimo.findMany({
    include: { aluno: true, livro: true }
  });
  res.json(emprestimos);
};

export const updateEmprestimo = async (req, res) => {
  const id = Number(req.params.id);
  const { devolucao } = req.body;

  let multa = null;

  if (devolucao) {
    const emprestimo = await prisma.emprestimo.findUnique({ where: { id } });
    const dias = differenceInDays(new Date(devolucao), new Date(emprestimo.retirada));
    const diasAtraso = dias - 3;
    if (diasAtraso > 0) multa = diasAtraso * 10.0;
  }

  const emprestimoAtualizado = await prisma.emprestimo.update({
    where: { id },
    data: {
      devolucao: devolucao ? new Date(devolucao) : undefined,
      multa
    }
  });

  res.json(emprestimoAtualizado);
};

export const deleteEmprestimo = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.emprestimo.delete({ where: { id } });
  res.status(204).end();
};
