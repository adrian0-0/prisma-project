import React from "react";

function Todos({ todos }) {
  const tarefasParaFazer = todos.filter((todo) => todo.status === false);
  const tarefasConcluidas = todos.filter((todo) => todo.status === true);

  return (
    <Box>
      {tarefasParaFazer.map((todo) => {
        return (
          <HStack
            mb={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
            key={todo.id}
            spacing={"0rem"}
          >
            <Box w={"full"} mr={{ base: "1rem", md: "1rem", lg: "2rem" }}>
              <CustomCheckbox
                todos={todo}
                onClick={() => modifyStatusTodo(todo)}
              />
            </Box>
            <ButtonGroup>
              <Button
                colorScheme="teal"
                onClick={() => {
                  handleWithEditButton(todo);
                }}
              >
                Editar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteTodo(todo);
                }}
              >
                Deletar
              </Button>
            </ButtonGroup>
          </HStack>
        );
      })}
      <Divider></Divider>
      <Heading
        textAlign={"center"}
        my={{ base: "2rem", md: "3rem", lg: "5rem" }}
      >
        Tarefas Concluidas
      </Heading>
      {tarefasConcluidas.map((todo) => {
        // Renomeie a variável para 'todo'
        return (
          <HStack
            mb={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
            key={todo.name}
          >
            <Box w={"full"}>
              <CustomCheckbox
                todos={todo}
                onClick={() => modifyStatusTodo(todo)}
              />
            </Box>
            <ButtonGroup>
              <Button
                colorScheme="teal"
                onClick={() => {
                  handleWithEditButton(todo);
                }}
              >
                Editar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteTodo(todo);
                }}
              >
                Deletar
              </Button>
            </ButtonGroup>
          </HStack>
        );
      })}
    </Box>
  );
}

export default Todos;
