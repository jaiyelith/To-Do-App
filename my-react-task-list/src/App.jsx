import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import SobreNosotros from "./pages/SobreNosotros";
import Tareas from "./pages/Tareas";

function App() {
  return (
    <ChakraProvider>
      <ColorModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          </Routes>
        </BrowserRouter>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;




