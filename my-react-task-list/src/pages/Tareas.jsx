import { useState } from 'react';
import {Box, Flex, Heading,UnorderedList,ListItem,Input,InputGroup,IconButton,Text,VStack,Button,Collapse,Spacer,useColorMode} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MenuButton from '../components/MenuButton';
import { AddIcon, DeleteIcon, EditIcon, CheckIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'; 

function Tareas() {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const { colorMode, toggleColorMode } = useColorMode(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  
  const handleAddTask = () => {
    if (newTask.trim().length < 3) {
      alert("Necesitas mínimo 3 caracteres para poder agregar una tarea");
      return;
    }

    const newTaskObj = { text: newTask, description, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    setDescription('');
  };

  const handleTaskToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingTask(index);
    setEditedTaskText(tasks[index].text);
  };

  const handleSaveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedTaskText;
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const tasksPending = tasks.filter((task) => !task.completed).length;

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
          <Link to="/">Home</Link>
          <Link to="/tareas">Tareas</Link>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </VStack>
      </Collapse>
      <Heading color={colorMode === 'dark' ? '#fbd38b' : '#f59394'} mt="4" textShadow="2px 2px #406093" fontSize= "30px">
        ToDo App
      </Heading>
      <VStack mt="4" align="center">
        <Flex alignItems="center">
          <InputGroup>
            <Input
              type="text"
              placeholder="Añade una nueva tarea"
              value={newTask}
              onChange={handleInputChange}
            />
            <Text color={colorMode === 'dark' ? 'white' : '#f69195'} ml="2" mr="2" fontSize="lg">
              &bull;&nbsp;&bull;&nbsp;&bull; 
            </Text>
            <Input
              type="text"
              placeholder="Descripción (opcional)"
              value={description}
              onChange={handleDescriptionChange}
            />
            <Button
              size="sm"
              colorScheme="pink"
              aria-label="Add Task"
              onClick={handleAddTask}
              ml="2" 
              bgColor="#ffd680" 
            >
              <AddIcon color="white" />
            </Button>
          </InputGroup>
        </Flex>
        <Text mt="2" fontSize="lg">
          Aun tienes {tasksPending} tareas pendientes
        </Text>
        <UnorderedList w="100%" listStyleType="none" pl="0">
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              fontSize="lg"
              mt="2"
              fontWeight="bold"
              textDecoration={task.completed ? 'line-through' : 'none'}
            >
              <Flex alignItems="center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskToggle(index)}
                />
                {editingTask !== index ? (
                  <>
                    <Text ml="2" fontWeight="bold">
                      {task.text}
                    </Text>
                    <Spacer />
                    <IconButton
                      size="sm"
                      colorScheme="blue"
                      aria-label="Edit Task"
                      onClick={() => handleEditTask(index)}
                      icon={<EditIcon color="white" />}
                      ml="2"
                      bgColor="#385a99" 
                    />
                    <IconButton
                      size="sm"
                      colorScheme="red"
                      aria-label="Delete Task"
                      onClick={() => handleDeleteTask(index)}
                      ml="2"
                      icon={<DeleteIcon color="white" />}
                      bgColor="#f99190" 
                    />
                  </>
                ) : (
                  <Flex alignItems="center">
                    <Input
                      type="text"
                      value={editedTaskText}
                      onChange={(e) => setEditedTaskText(e.target.value)}
                    />
                    <IconButton
                      size="sm"
                      colorScheme="green"
                      aria-label="Save Task"
                      onClick={() => handleSaveTask(index)}
                      icon={<CheckIcon color="white" />}
                      ml="2"
                      bgColor="#5dd55d" 
                    />
                    <IconButton
                      size="sm"
                      colorScheme="red"
                      aria-label="Cancel Edit"
                      onClick={handleCancelEdit}
                      ml="2"
                      icon={<CloseIcon color="white" />}
                      bgColor="#f99190" 
                    />
                  </Flex>
                )}
              </Flex>
              {task.description && (
                <Text ml="2" fontWeight="normal" color={colorMode === 'dark' ? 'white' : '#000000'}>
                  {task.description}
                </Text>
              )}
            </ListItem>
          ))}
        </UnorderedList>
        <Button
          colorScheme="yellow" 
          mt="4"
          onClick={handleClearCompleted}
        >
          Limpiar las tareas completadas
        </Button>
      </VStack>
    </Box>
  );
}

export default Tareas;
