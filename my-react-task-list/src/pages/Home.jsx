import{ useState } from 'react';
import {Box,Flex,Heading,Text,Image,Collapse,Stack,useColorMode, Button} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MenuButton from '../components/MenuButton';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function Home() {
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
        <Stack direction="column" align="center" spacing="4">
          <Link to="/">Home</Link>
          <Link to="/tareas">Tareas</Link>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </Stack>
      </Collapse>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex="1"
        width="100%"
      >
        <Heading color={colorMode === 'dark' ? '#fed482' : '#f88c99'} textShadow="3px 3px #3b5c92">
          Bienvenido a To Do App
        </Heading> <br />
        <Text color={colorMode === 'dark' ? 'white' : '#3b6190'}>
          ¡Es hora de empezar a ser más productivo! Con esta aplicación podrás mantener todo anotado y en orden.
        </Text>
        <Image src="/src/images/ToDoApp.png" alt="ToDo App" maxW="30%" />
      </Box>
    </Box>
  );
}

export default Home;