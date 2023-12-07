import {
  Box,
  Flex,
  Card,
  CardBody,
  Text,
  CardHeader,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Input,
  FormLabel,
  Spacer,
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useCheckbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
const arrayTodos = [
  { name: "Limpar a casa", status: false },
  { name: "Agendar reunião", status: false },
];

const CustomCheckbox = ({ todos, ...props }) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <FormLabel
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      bg="blue.50"
      mb={"0rem"}
      border="1px solid"
      borderColor="blue.500"
      rounded="lg"
      px={3}
      py={1}
      cursor="pointer"
      {...htmlProps}
    >
      <Input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="blue.500"
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && <Box w={2} h={2} bg="blue.500" />}
      </Flex>
      <Text color="gray.700" {...getLabelProps()}>
        {todos.name}
      </Text>
    </FormLabel>
  );
};

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectTodo, setSelectTodo] = useState();

  const Todos = ({ todos }) => {
    return (
      <Box>
        {todos.map((todo) => {
          // Renomeie a variável para 'todo'
          return (
            <HStack
              mb={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
              key={todo.name}
            >
              <Box w={"full"}>
                <CustomCheckbox
                  todos={todo}
                  // onClick={() => modifyStatusTodo(todo)}
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
  };

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

  async function modifyStatusTodo(todo) {
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
    });
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
    <>
      <Box
        mx={{ base: "1rem", md: "2rem", lg: "5rem" }}
        my={{ base: "1rem", md: "2rem", lg: "5rem" }}
      >
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Card w={{ base: "100%", md: "500px", lg: "700px" }} py={"2rem"}>
            <CardHeader
              mb={{ lg: "5rem", md: "3rem", base: "2rem" }}
              py={"0px"}
            >
              <Heading textAlign={"center"} fontSize={"4xl"} p>
                CRUD PRISMA
              </Heading>
            </CardHeader>
            <CardBody py={"0px"}>
              <Todos todos={todos} />
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
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </>
  );
}

export default App;
