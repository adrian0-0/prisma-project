import { Box, Flex, Card, CardBody, Text, CardHeader } from "@chakra-ui/react";

const arrayTodos = [
  { name: "Limpar a casa", status: false },
  { name: "Agendar reunião", status: false },
];

const Todos = ({ todos }) => {
  return (
    <Box>
      {todos.map((todos) => {
        return (
          <Box>
            <Text>{todos.name}</Text>
          </Box>
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
  return (
    <>
      <Box mx={{ base: "1rem", md: "2rem", lg: "5rem" }}>
        <Flex
          w={"100%"}
          h="100svh"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card>
            <CardBody>
              <CardHeader>
                <Todos todos={arrayTodos} />
              </CardHeader>
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
