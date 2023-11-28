import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const allTodos = [{ nome: "aaa", status: false }];
const todosRoutes = express.Router();

//C
todosRoutes.post("/todos", async (request, response) => {
  const { name } = request.body;
  const todo = await prisma.todo.create({
    data: {
      name,
      status: false,
    },
  });
  //   allTodos.push({ name, status: false });
  return response.status(201).json(todo);
});
//R
todosRoutes.get("/todos", (request, response) => {
  return response.status(200).json(allTodos);
});
//U
//D

export default todosRoutes;
