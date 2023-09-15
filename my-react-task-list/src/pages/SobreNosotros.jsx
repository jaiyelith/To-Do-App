import { useState } from "react";
import { Box, Heading, UnorderedList, ListItem, Link as ChakraLink, Stack, Collapse, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MenuButton from "../components/MenuButton";

function SobreNosotros() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      bg="#b8e4ff"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0"
      margin="0"
    >
      <Flex p="4" width="100%" justifyContent="center" alignItems="center">
        <MenuButton onClick={toggleMenu} />
      </Flex>
      <Collapse in={isOpen}>
        <Stack
          direction="column"
          align="center"
          spacing="4"
          position="relative"
        >
          <Link to="/">Home</Link>
          <Link to="/tareas">Tareas</Link>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </Stack>
      </Collapse>
      <Heading color="#fad682" mt="4">
        ¡Es hora de empezar a ser más productivo!
      </Heading>
      <UnorderedList mt="4" textAlign="center" listStyleType="none">
        <ListItem>✨ Crear nuevas tareas y añadir descripciones</ListItem>
        <ListItem>✨ Editar tareas</ListItem>
        <ListItem>✨ Marcar tareas como completadas</ListItem>
        <ListItem>✨ Eliminar tareas individualmente</ListItem>
        <ListItem>✨ Eliminar todas las tareas con un solo clic</ListItem>
        <ListItem>✨ Indicador de tareas pendientes</ListItem>
      </UnorderedList>
      <Heading color="#f69294" mt="4">
        Tecnologías Utilizadas
      </Heading>
      <UnorderedList mt="4" textAlign="center" listStyleType="none">
        <ListItem>✨ React: Biblioteca de JavaScript para construir interfaces de usuario.</ListItem>
        <ListItem>✨ React Router: Biblioteca para el enrutamiento en aplicaciones de React.</ListItem>
        <ListItem>✨ React Hook Form: Biblioteca para el manejo de formularios en React.</ListItem>
        <ListItem>✨ HTML: Lenguaje de marcado para estructurar el contenido de la aplicación.</ListItem>
        <ListItem>✨ Chakra UI: Librera de estilos para diseñar la apariencia única de la aplicación.</ListItem>
      </UnorderedList>
    </Box>
  );
}

export default SobreNosotros;



