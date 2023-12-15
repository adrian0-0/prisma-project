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

  async function editarModalDesc(todos) {
    console.log(descriptionValue);
    console.log(todos.id);
    console.log(todos.description);
    const response = await api.put("", {
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
            {todos.name}
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
                inputVisibilty ? editarModalDesc(todos) : handleButton();
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
