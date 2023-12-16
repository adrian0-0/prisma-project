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
  ButtonGroup,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import api from "./Api";

function TaskModal({ todos }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [descriptionValue, setDescriptionValue] = useState("");
  const [inputVisibilty, setInputVisibility] = useState(false);
  const [textVisibility, setTextVisibility] = useState(false);
  const [enviarBtnVisibility, setEnviarBtnVisibility] = useState(false);

  async function editarModalDesc(todos) {
    console.log(descriptionValue);
    console.log(todos.id);
    console.log(todos.description);
    const response = await api.put("", {
      id: todos.id,
      description: descriptionValue,
    });
    setInputVisibility(false);
    // setTextVisibility(false);
    setEnviarBtnVisibility(false);
  }

  // async function handleButton() {
  //   setInputVisibility(true);
  // }

  return (
    <Box>
      <Button onClick={onOpen}>+</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{todos.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={"2rem"}>
              Nome da descrição:{" "}
              {textVisibility ? `${descriptionValue}` : `${todos.description}`}
            </Text>

            <Input
              mb={"2rem"}
              value={descriptionValue}
              display={inputVisibilty ? "block" : "none"}
              onChange={(e) => {
                setDescriptionValue(e.target.value);
                setEnviarBtnVisibility(true);
                setTextVisibility(true);
              }}
            ></Input>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                mr={{ md: "1rem", lg: "1.5rem" }}
                colorScheme="teal"
                onClick={() => {
                  setInputVisibility(true);
                  enviarBtnVisibility ? editarModalDesc(todos) : null;
                }}
              >
                {enviarBtnVisibility ? "Enviar" : "Editar"}
              </Button>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={onClose}
                variant={"outline"}
              >
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TaskModal;
