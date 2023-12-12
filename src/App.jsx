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
  Link,
  FormLabel,
  Spacer,
  Divider,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useCheckbox } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Todos from "./components/Todos";
const arrayTodos = [
  { name: "Limpar a casa", status: false },
  { name: "Agendar reunião", status: false },
];

const CustomCheckbox = ({ todos, ...props }) => {
  const [checkBox, setCheckBox] = useState(todos.status);
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
      m={"0rem"}
      cursor="pointer"
      {...htmlProps}
    >
      <Input {...getInputProps()} hidden checked={checkBox} />
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const Modal = () => {
  //   return (
  //     <Box>
  //       <Link mr={{ base: "1rem", md: "1rem", lg: "2rem" }} onClick={onOpen}>
  //         +
  //       </Link>
  //       <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
  //         <ModalOverlay />
  //         <ModalContent>
  //           <ModalHeader>Como criar arquivos ZIP?</ModalHeader>
  //           <ModalCloseButton />
  //           <ModalBody>
  //             <Box mb={"2rem"}>
  //               <Text
  //                 fontSize={"lg"}
  //                 color={"#2D3748"}
  //                 fontWeight={"500"}
  //                 mb={"1rem"}
  //               >
  //                 Passo 1
  //               </Text>
  //               <HStack>
  //                 <Image
  //                   src="/assets/icons/MdOutlineArrowRight.svg"
  //                   alt="Icone de flecha"
  //                   width={"30px"}
  //                 ></Image>
  //                 <Text>
  //                   Organize todos os seus documentos. Você precisará criar uma
  //                   pasta com todos os arquivos que deverão ser enviados.
  //                 </Text>
  //               </HStack>
  //             </Box>
  //             <Box mb={"1rem"}>
  //               <Text
  //                 fontSize={"lg"}
  //                 color={"#2D3748"}
  //                 fontWeight={"500"}
  //                 mb={"1rem"}
  //               >
  //                 Passo 2
  //               </Text>
  //               <HStack>
  //                 <Image
  //                   src="/assets/icons/MdOutlineArrowRight.svg"
  //                   alt="Icone de flecha"
  //                   width={"30px"}
  //                 ></Image>
  //                 <Text>
  //                   Clique na pasta com o botão direito, localize a opção
  //                   “Compactar para arquivo ZIP” e assim o seu arquivo será
  //                   compactado
  //                 </Text>
  //               </HStack>
  //             </Box>
  //             <Flex justifyContent={"center"}>
  //               <Image
  //                 src="/assets/images/zip_instructions.png"
  //                 alt="Instruções para compactar um arquivo para o formato zip"
  //                 borderRadius={"2%"}
  //               />
  //             </Flex>
  //           </ModalBody>
  //           <ModalFooter>
  //             <HStack w={"full"} justifyContent={"flex-end"}>
  //               <Button colorScheme="blue" mr={3} onClick={onClose}>
  //                 Fechar
  //               </Button>
  //             </HStack>
  //           </ModalFooter>
  //         </ModalContent>
  //       </Modal>
  //     </Box>
  //   );
  // };

  const Todos = ({ todos }) => {
    const tarefasParaFazer = todos.filter((todo) => todo.status === false);
    const tarefasConcluidas = todos.filter((todo) => todo.status === true);

    return (
      <Box>
        {/* <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
        {tarefasParaFazer.map((todo) => {
          // Renomeie a variável para 'todo'
          return (
            <HStack
              mb={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
              key={todo.id}
              spacing={"0rem"}
            >
              <Box w={"full"} mr={{ base: "1rem", md: "1rem", lg: "2rem" }}>
                <Button onClick={onOpen}>Open Modal</Button>
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
              <Heading textAlign={"center"} fontSize={"4xl"}>
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
