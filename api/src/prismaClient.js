// src/prismaClient.js
import { PrismaClient } from '@prisma/client';

// Cria uma instância do PrismaClient
const prisma = new PrismaClient();

// Exporta a instância do PrismaClient para ser usada em outros arquivos
export default prisma;
