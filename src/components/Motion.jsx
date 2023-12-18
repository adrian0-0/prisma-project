import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

function Motion() {
  return (
    <Box
      as={motion.div}
      height="40px"
      width="40px"
      borderRadius={"5px"}
      bg="orange.400"
      whileHover={{ scale: 1.2, rotate: 90 }}
      whileTap={{
        scale: 0.8,
        rotate: -90,
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
}

export default Motion;
