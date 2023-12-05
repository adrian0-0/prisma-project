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
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useCheckbox } from "@chakra-ui/react";
const arrayTodos = [
  { name: "Limpar a casa", status: false },
  { name: "Agendar reunião", status: false },
];

const Todos = ({ todos }) => {
  return (
    <Box>
      {todos.map((todos) => {
        return (
          <HStack mb={{ base: "1.5rem", md: "2rem", lg: "3rem" }}>
            <Box w={"full"}>
              {/* <Checkbox
                size="md"
                colorScheme="blue"
                defaultIsChecked
                borderStyle={"groove"}
                css={`
                  > span:first-of-type {
                    box-shadow: unset;
                  }
                `}
              >
                {todos.name}
              </Checkbox> */}
              {/* <CustomCheckbox /> */}
            </Box>
            <ButtonGroup>
              <Button colorScheme="teal">Editar</Button>
              <Button colorScheme="red">Deletar</Button>
            </ButtonGroup>
          </HStack>
        );
      })}
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque porro,
        voluptatibus voluptates temporibus deleniti laborum natus ratione quam,
        quibusdam esse ab quae. Nemo optio harum molestiae voluptatum ducimus
        qui suscipit.
      </Text>
    </Box>
  );
};

function App() {
  const CustomCheckbox = (props) => {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
      useCheckbox(props);

    return (
      <FormLabel
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridColumnGap={2}
        maxW="36"
        bg="green.50"
        border="1px solid"
        borderColor="green.500"
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
          borderColor="green.500"
          w={4}
          h={4}
          {...getCheckboxProps()}
        >
          {state.isChecked && <Box w={2} h={2} bg="green.500" />}
        </Flex>
        <Text color="gray.700" {...getLabelProps()}>
          Click me
        </Text>
      </FormLabel>
    );
  };

  return (
    <>
      <Box mx={{ base: "1rem", md: "2rem", lg: "5rem" }}>
        <CustomCheckbox />
        <Flex
          w={"100%"}
          h="100svh"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card>
            <CardHeader mb={{ lg: "5rem", md: "3rem", base: "2rem" }}>
              <Heading textAlign={"center"} fontSize={"4xl"}>
                CRUD PRISMA
              </Heading>
            </CardHeader>
            <CardBody>
              <Todos todos={arrayTodos} />
              <Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                porro, voluptatibus voluptates temporibus deleniti laborum natus
                ratione quam, quibusdam esse ab quae. Nemo optio harum molestiae
                voluptatum ducimus qui suscipit.
              </Text>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </>
  );
}

export default App;
