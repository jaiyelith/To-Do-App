import { useState, useEffect } from 'react';
import {Box,Flex,Heading,UnorderedList,ListItem,Input,InputGroup,IconButton,Text,VStack,Button,Collapse,} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MenuButton from '../components/MenuButton';
import {AddIcon,DeleteIcon,EditIcon,CheckIcon,CloseIcon} from '@chakra-ui/icons';

function Tareas() {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return savedTasks;
  });
  
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []); 

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); 
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
    if (newTask.trim() !== '') {
      const newTaskObj = { text: newTask, description, completed: false };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setDescription('');
    }
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
      <Heading color="#fad682" mt="4" textShadow="2px 2px #406093">
        To Do App
      </Heading>
      <VStack mt="4" align="center">
        <Text color="#f69195" mt="2" fontSize="lg">
          &bull; &bull; &bull;
        </Text>
        <Flex alignItems="center">
          <InputGroup>
            <Input
              type="text"
              placeholder="Añade una nueva tarea"
              value={newTask}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              placeholder="Descripción (opcional)"
              value={description}
              onChange={handleDescriptionChange}
            />
          </InputGroup>
          <Button
            size="sm"
            colorScheme="pink"
            aria-label="Add Task"
            onClick={handleAddTask}
            ml="2"
            mt="0"
            bg="#ffd680"
            color="white"
          >
            <AddIcon w={4} h={4} />
          </Button>
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
                <Text ml="2" fontWeight="bold">
                  &bull; &bull; &bull;
                  {task.text}
                  &bull; &bull; &bull;
                </Text>
              </Flex>
              {task.description && (
                <Text ml="2" fontWeight="normal" color="#000000">
                  {task.description}
                </Text>
              )}
              <Flex mt="2">
                <IconButton
                  size="sm"
                  colorScheme="blue"
                  aria-label="Edit Task"
                  onClick={() => handleEditTask(index)}
                  icon={<EditIcon color="white" />}
                  bg="#385a99"
                  color="white"
                />
                <IconButton
                  size="sm"
                  colorScheme="red"
                  aria-label="Delete Task"
                  onClick={() => handleDeleteTask(index)}
                  icon={<DeleteIcon color="white" />}
                  ml="2"
                  bg="#f99190"
                  color="white"
                />
              </Flex>
              {editingTask === index && (
                <Flex mt="2" alignItems="center">
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
                    bg="#bdecb6"
                    color="white"
                  />
                  <IconButton
                    size="sm"
                    colorScheme="red"
                    aria-label="Cancel Edit"
                    onClick={handleCancelEdit}
                    icon={<CloseIcon color="white" />}
                    ml="2"
                    bg="#eb9890"
                    color="white"
                  />
                </Flex>
              )}
            </ListItem>
          ))}
        </UnorderedList>
        <Button
          colorScheme="red"
          mt="4"
          onClick={handleClearCompleted}
          bg="#ffd58f"
          color="white"
        >
          Limpiar las tareas completadas
        </Button>
      </VStack>
    </Box>
  );
}

export default Tareas;