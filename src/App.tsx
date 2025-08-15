import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Invitacion from "./pages/Invitacion";
import ItinerarioPage from "./components/Itinerario";
import LocationPage from "./components/Ubicacion"
import GiftRegistry from "./pages/Regalo"
import Confirmation from "./pages/Confirmation"
import DressCode from "./pages/Vestimenta"
import OurStory from "./pages/Galeria";


function App() {
  return (
      <Routes>    
        <Route path="/" element={<Home/>} />
        <Route path="/sobre" element={<Sobre/>} />
        <Route path="/invitacion" element={<Invitacion/>} />
        <Route path="/itinerario" element={<ItinerarioPage/>} />
        <Route path="/ubicacion" element={<LocationPage/>} />
        <Route path="/regalo" element={<GiftRegistry/>} />
        <Route path="/registro" element={<Confirmation/>} />
        <Route path="/vestimenta" element={<DressCode/>} />
        <Route path="/galeria" element={<OurStory/>} />


      </Routes>
  );
}
export default App;