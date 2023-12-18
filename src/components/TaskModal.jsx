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
import { motion } from "framer-motion";
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
    setEnviarBtnVisibility(false);
  }

  const Motion = () => {
    return (
      <Box
        as={motion.div}
        height="40px"
        width="40px"
        borderRadius={"5px"}
        bg="gray.100"
        onClick={onOpen}
        whileHover={{ scale: 1.05, rotate: 45 }}
        whileTap={{
          scale: 0.8,
          rotate: -45,
          borderRadius: "100%",
        }}

        // not work: transition={{ transition: "0.5", ease: "linear" }}
      >
        <Text
          display={"flex"}
          h={"full"}
          w={"full"}
          alignSelf={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
          alignItems={"center"}
        >
          +
        </Text>
      </Box>
    );
  };

  return (
    <Box>
      <Motion />
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
