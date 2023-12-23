import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Input,
  Divider,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import api from "./Api";
import TaskModal from "./TaskModal";
import CustomCheckBox from "./CustomCheckBox";
import { motion } from "framer-motion";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectTodo, setSelectTodo] = useState();
  const tarefasParaFazer = todos.filter((todo) => todo.status === false);
  const tarefasConcluidas = todos.filter((todo) => todo.status === true);
  const [todosLength, setTodosLength] = useState();
  async function handleButton() {
    setInputVisibility(!inputVisibility);
  }

  async function handleWithEditButton(todo) {
    handleButton();
    setSelectTodo(todo);
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

  async function editTodo() {
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectTodo.id,
      name: inputValue,
    });
    setInputVisibility(false);
    setInputValue("");
    getTodos();
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
      {/* {console.log(tarefasParaFazer)} */}
      {tarefasParaFazer.map((todo) => {
        return (
          <HStack
            mb={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
            key={todo.id}
            spacing={"0rem"}
          >
            <Box mr={{ base: "1rem", md: "1rem", lg: "2rem" }}>
              <TaskModal todos={todo} />
            </Box>
            <Box
              w={"full"}
              mr={{ base: "1rem", md: "1rem", lg: "2rem" }}
              p={"5px"}
              overflow={"hidden"}
            >
              <CustomCheckBox
                todos={todo}
                onClick={() => modifyStatusTodo(todo)}
              />
            </Box>
            <Box
              mr={{ base: "1rem", md: "1rem", lg: "2rem" }}
              as={motion.div}
              whileTap={{ scale: 0.2 }}
              transition={{ duration: 0.1 }}
              style={{ display: "inline-block" }}
              whileHover={{
                rotate: 20,
                scale: 1.3,
                transition: { yoyo: Infinity, duration: 0.1 },
              }}
              onClick={() => {
                handleWithEditButton(todo);
              }}
            >
              <Image
                src="assets/svg/pencil.svg"
                alt="editar texto"
                boxSize="30px"
              />
            </Box>
            <Box
              as={motion.div}
              whileTap={{ scale: 0.2 }}
              transition={{ duration: 0.1 }}
              style={{ display: "inline-block" }}
              whileHover={{
                rotate: 20,
                scale: 1.3,
                transition: { yoyo: Infinity, duration: 0.1 },
              }}
              onClick={() => {
                deleteTodo(todo);
              }}
            >
              <Image
                src="assets/svg/trashcan.svg"
                alt="editar texto"
                boxSize="30px"
              />
            </Box>
          </HStack>
        );
      })}
      {tarefasConcluidas.length > 0 && (
        <>
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
                key={todo.id}
                spacing={"0rem"}
              >
                <Box mr={{ base: "1rem", md: "1rem", lg: "2rem" }}>
                  <TaskModal todos={todo} />
                </Box>
                <Box
                  w={"full"}
                  mr={{ base: "1rem", md: "1rem", lg: "2rem" }}
                  overflow={"hidden"}
                  p={"5px"}
                >
                  <CustomCheckBox
                    todos={todo}
                    onClick={() => modifyStatusTodo(todo)}
                  />
                </Box>
                <Box
                  mr={{ base: "1rem", md: "1rem", lg: "2rem" }}
                  as={motion.div}
                  whileTap={{ scale: 0.2 }}
                  transition={{ duration: 0.1 }}
                  style={{ display: "inline-block" }}
                  whileHover={{
                    rotate: 20,
                    scale: 1.3,
                    transition: { yoyo: Infinity, duration: 0.1 },
                  }}
                  onClick={() => {
                    handleWithEditButton(todo);
                  }}
                >
                  <Image
                    src="assets/svg/pencil.svg"
                    alt="editar texto"
                    boxSize="30px"
                  />
                </Box>
                <Box
                  as={motion.div}
                  whileTap={{ scale: 0.2 }}
                  transition={{ duration: 0.1 }}
                  style={{ display: "inline-block" }}
                  whileHover={{
                    rotate: 20,
                    scale: 1.3,
                    transition: { yoyo: Infinity, duration: 0.1 },
                  }}
                  onClick={() => {
                    deleteTodo(todo);
                  }}
                >
                  <Image
                    src="assets/svg/trashcan.svg"
                    alt="editar texto"
                    boxSize="30px"
                  />
                </Box>
              </HStack>
            );
          })}{" "}
        </>
      )}

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
