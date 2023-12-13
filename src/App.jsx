import {
  Box,
  Flex,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import Todos from "./components/Todos";

function App() {
  return (
    <Box
      mx={{ base: "1rem", md: "2rem", lg: "5rem" }}
      my={{ base: "1rem", md: "2rem", lg: "5rem" }}
    >
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Card w={{ base: "100%", md: "500px", lg: "700px" }} py={"2rem"}>
          <CardHeader mb={{ lg: "5rem", md: "3rem", base: "2rem" }} py={"0px"}>
            <Heading textAlign={"center"} fontSize={"4xl"}>
              CRUD PRISMA
            </Heading>
          </CardHeader>
          <CardBody py={"0px"}>
            <Todos />
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}

export default App;
