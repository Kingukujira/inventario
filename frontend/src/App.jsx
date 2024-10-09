import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Departamento } from './pages/departamento';
import { Municipio } from './pages/municipio';
import { SitioTuristico } from './pages/sitio_turistico';
import { TipoServicio } from './pages/tipo_servicio';
import { Servicio } from './pages/servicio';
import { Usuario } from './pages/usuario';
import { Comentario } from './pages/comentario';
import { FormPage } from './FormPages/formPage';
import { Navigation } from './components/Navigation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* Agrupa Departamento y Municipio dentro de un Fragment */}
        <Route
          path="/Crear formulario" 
          element={
            <>
              <Departamento />
              <Municipio />
              <SitioTuristico />
              <TipoServicio />
              <Servicio />
              <Usuario />
              <Comentario />
            </>
          }
        />
        <Route path="/inventario" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
