import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// const allTodos = [{ nome: "aaa", status: false }];
const todosRoutes = express.Router();
todosRoutes.use(express.json());

//C
todosRoutes.post("/todos", async (request, response) => {
  const { name } = request.body;
  const todos = await prisma.todo.create({
    data: {
      name: name,
      status: false,
      description: "",
    },
  });
  //   allTodos.push({ name, status: false });
  return response.status(201).json(todos);
});

// POST SEM PRISMA
// todosRoutes.post("/todos", async (request, response) => {
//   const { name } = request.body;
//   allTodos.push({ name, status: false });
//   return response.status(201).json(allTodos);
// });

//R

// GET SIMPLES COM O PRISMA
todosRoutes.get("/todos", async (request, response) => {
  const todos = await prisma.todo.findMany();
  return response.status(200).json(todos);
});

//U
todosRoutes.put("/todos", async (request, response) => {
  const { name, status, id, description } = request.body;

  //SE ID NÃO EXISTIR RETORNE
  if (!id) {
    return response.status(400).json("ID é mandatório");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });
  //SE O MODEL TODO NÃO EXISTIR RETORNE
  if (!todoAlreadyExist) {
    return response.status(404).json("[Todo] não existe");
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
      description,
    },
  });
  return response.status(200).json(todo);
});

//D
todosRoutes.delete("/todos/:id", async (request, response) => {
  const { id } = request.params;

  const intID = parseInt(id);

  //SE ID NÃO EXISTIR RETORNE
  if (!intID) {
    return response.status(400).json("ID é mandatório");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: intID },
  });
  //SE O MODEL TODO NÃO EXISTIR RETORNE
  if (!todoAlreadyExist) {
    return response.status(404).json("Tabela [Todo] não existe");
  }

  const todo = await prisma.todo.delete({
    where: {
      id: intID,
    },
  });

  return response.status(200).send(todo);
});

export default todosRoutes;
