import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import Home from './pages/Home';
import SobreNosotros from './pages/SobreNosotros';
import Tareas from './pages/Tareas';


function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

