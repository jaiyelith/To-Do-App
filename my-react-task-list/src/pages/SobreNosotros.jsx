import  { useState } from 'react';
import {Box,Heading,UnorderedList,ListItem,VStack,Button,Collapse,Flex,useColorMode} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import MenuButton from '../components/MenuButton';
import { Link as RouterLink } from 'react-router-dom'; 

function SobreNosotros() {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      bg={colorMode === 'dark' ? 'gray.800' : '#b8e4ff'}
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0"
      margin="0"
    >
      <Flex p="4" width="100%" justifyContent="space-between" alignItems="center">
        <MenuButton onClick={toggleMenu} />
        <Button
          onClick={toggleColorMode}
          aria-label="Toggle Dark Mode"
          variant="ghost"
        >
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon color="yellow.300" />}
        </Button>
      </Flex>
      <Collapse in={isOpen}>
        <VStack
          direction="column"
          align="center"
          spacing="4"
          position="relative"
        >
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/tareas">Tareas</RouterLink>
          <RouterLink to="/sobre-nosotros">Sobre Nosotros</RouterLink>
        </VStack>
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
        <ListItem>✨ Chakra UI: Librería de estilos para diseñar la apariencia única de la aplicación.</ListItem>
      </UnorderedList>
    </Box>
  );
}

export default SobreNosotros;




