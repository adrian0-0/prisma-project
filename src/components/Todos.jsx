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
import { create, set } from "lodash";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [createInputValue, setCreateInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [editInputVisibility, setEditInputVisibility] = useState(false);
  const [createInputVisibility, setCreateInputVisibility] = useState(false);
  const [selectTodo, setSelectTodo] = useState();
  const tarefasParaFazer = todos.filter((todo) => todo.status === false);
  const tarefasConcluidas = todos.filter((todo) => todo.status === true);
  const [buttonText, setButtonText] = useState(false);
  const [todosLength, setTodosLength] = useState();

  async function handleEdit(todos) {
    setButtonText(true);
    setEditInputVisibility(true);
    setSelectTodo(todos);
  }

  async function handleButton() {
    setButtonText(true);

    if (createInputValue != "") {
      createTodo();
    }
    if (editInputValue != "") {
      editTodo();
    }
  }

  async function handleCreate() {
    setButtonText(true);
    setCreateInputVisibility(true);
    if (createInputVisibility === true && editInputVisibility === false) {
    }
  }

  async function createTodo() {
    if (createInputValue != "") {
      const response = await axios.post("http://localhost:3333/todos", {
        name: createInputValue,
      });
    }
    setButtonText(false);
    setEditInputVisibility(false);
    setCreateInputValue("");
    getTodos();
  }

  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`
    );
    getTodos();
  }

  async function editTodo() {
    console.log(selectTodo);
    if (editInputValue != "") {
      const response = await axios.put("http://localhost:3333/todos", {
        id: selectTodo.id,
        name: editInputValue,
      });
    }
    setEditInputVisibility(false);
    setCreateInputVisibility(false);
    setButtonText(false);
    setEditInputValue("");
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

            <Box onClick={() => handleEdit(todo)}>
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
              >
                <Image
                  src="assets/svg/pencil.svg"
                  alt="editar texto"
                  boxSize="40px"
                />
              </Box>
            </Box>
            <Box
              onClick={() => {
                deleteTodo(todo);
              }}
            >
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
              >
                <Image
                  src="assets/svg/trashcan.svg"
                  alt="apagar tarefa"
                  boxSize="30px"
                />
              </Box>
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
                <Box onClick={() => handleEdit(todo)}>
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
                  >
                    <Image
                      src="assets/svg/pencil.svg"
                      alt="editar texto"
                      boxSize="40px"
                    />
                  </Box>
                </Box>
                <Box
                  onClick={() => {
                    deleteTodo(todo);
                  }}
                >
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
                  >
                    <Image
                      src="assets/svg/trashcan.svg"
                      alt="apagar tarefa"
                      boxSize="30px"
                    />
                  </Box>
                </Box>
              </HStack>
            );
          })}{" "}
        </>
      )}

      <Input
        value={createInputValue}
        display={createInputVisibility ? "block" : "none"}
        onChange={(e) => {
          setCreateInputValue(e.target.value);
          setCreateInputVisibility(true);
        }}
      ></Input>
      <Input
        value={editInputValue}
        display={editInputVisibility ? "block" : "none"}
        onChange={(e) => {
          setEditInputValue(e.target.value);
          setEditInputVisibility(true);
        }}
      ></Input>
      <Button
        width={"100%"}
        mt={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        colorScheme="teal"
        variant={"outline"}
        onClick={() => {
          // inputVisibility
          //   ? selectTodo
          //     ? editTodo()
          //     : createTodo()
          //   : handleButton();
          handleButton();
        }}
      >
        {buttonText ? "Enviar" : "Nova tarefa"}
      </Button>
    </Box>
  );
}

export default Todos;
