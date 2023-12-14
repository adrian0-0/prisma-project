import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";
import api from "./Api";

function TaskModal({ todos }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [descriptionValue, setDescriptionValue] = useState("");
  const [inputVisibilty, setInputVisibility] = useState(true);

  const getTodos = () => {
    const fetchData = async () => {
      try {
        const response = await api.get("/");
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

  async function editarModalDesc(todos) {
    const response = await api.put(`/`, {
      id: todos.id,
      description: descriptionValue,
    });
  }

  async function handleButton() {
    setInputVisibility(true);
  }

  return (
    <Box>
      <Button onClick={onOpen}>+</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {todos.description}
            <Input
              value={descriptionValue}
              display={inputVisibilty ? "block" : "none"}
              onChange={(e) => {
                setDescriptionValue(e.target.value);
              }}
            ></Input>
            <Button
              colorScheme="teal"
              onClick={() => {
                inputVisibilty ? handleButton() : editarModalDesc(todos);
              }}
            >
              Editar
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost"></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TaskModal;
