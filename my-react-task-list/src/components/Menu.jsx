import { Link } from 'react-router-dom';
import { Box, Button, HamburgerIcon } from "@chakra-ui/react";

function Menu() {
  return (
    <Box textAlign="center" p="4">
      <Button colorScheme="teal" variant="outline" leftIcon={<HamburgerIcon />}>
        Menú
      </Button>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tareas">Tareas</Link>
          </li>
          <li>
            <Link to="/sobre-nosotros">Sobre Nosotros</Link>
          </li>
        </ul>
      </nav>
    </Box>
  );
}

export default Menu;


