import { IconButton, Flex, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function MenuButton({ onClick }) {
  return (
    <Flex align="center" onClick={onClick} cursor="pointer">
      <IconButton
        icon={<HamburgerIcon />}
        colorScheme="teal"
        variant="outline"
        aria-label="Menu"
      />
      <Text fontSize="sm" ml="2">
        Menú
      </Text>
    </Flex>
  );
}

export default MenuButton;
