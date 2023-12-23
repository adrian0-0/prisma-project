import { useState } from "react";

import {
  Box,
  Flex,
  Text,
  Input,
  FormLabel,
  useCheckbox,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

function CustomCheckBox({ todos, ...props }) {
  const [checkBox, setCheckBox] = useState(todos.status);
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <FormLabel
      as={motion.div}
      whileHover={{ scale: 1.02 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition="0.5s ease-out"
      viewport={{ once: true }}
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
      <Text
        color="gray.700"
        {...getLabelProps()}
        display="inline-block"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        maxWidth="100%"
      >
        {todos.name}
      </Text>
    </FormLabel>
  );
}

export default CustomCheckBox;
