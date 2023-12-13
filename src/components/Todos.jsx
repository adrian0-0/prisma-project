import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Input,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import TaskModal from "./TaskModal";
import CustomCheckBox from "./CustomCheckBox";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectTodo, setSelectTodo] = useState();
  const tarefasParaFazer = todos.filter((todo) => todo.status === false);
  const tarefasConcluidas = todos.filter((todo) => todo.status === true);
  async function handleButton() {
    setInputVisibility(!inputVisibility);
    console.log("handleButton");
  }

  async function handleWithEditButton(todo) {
    handleButton();
    setSelectTodo(todo);
    selectTodo(true);
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos();
    setInputVisibility(!inputVisibility);
    setInputValue("");
  }

  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`
    );
    getTodos();
  }

  async function editTodo(todo) {
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectTodo.id,
      name: inputValue,
    });
    setSelectTodo();
    setInputVisibility(false);
    getTodos();
    setInputValue("");
  }

  async function modifyStatusTodo(todo) {
    try {
      const response = await axios.put(`http://localhost:3333/todos`, {
        id: todo.id,
        status: todo.status === true ? false : true,
      });

      const updatedTodo = response.data;
      getTodos();
    } catch (err) {
      console.log("Erro no estado do Status", err);
    }
  }

  const getTodos = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3333/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  };

  useEffect(() => {
    getTodos();
  }, []);

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
              <TaskModal todos={todo} />
              <CustomCheckBox
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
              <CustomCheckBox
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
      <Input
        value={inputValue}
        display={inputVisibility ? "block" : "none"}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></Input>
      <Button
        width={"100%"}
        mt={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        colorScheme="teal"
        variant={"outline"}
        onClick={() => {
          inputVisibility
            ? selectTodo
              ? editTodo()
              : createTodo()
            : handleButton();
        }}
      >
        {inputVisibility ? "Enviar" : "Nova tarefa"}
      </Button>
    </Box>
  );
}

export default Todos;
