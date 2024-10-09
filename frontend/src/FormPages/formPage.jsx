import { useState, useEffect } from "react";
import axios from "axios";
import "./FormPage.css"; // Asegúrate de que este archivo exista

export function FormPage() {
  const [data, setData] = useState([]); // Inicializa 'data' como un array
  const [activeModel, setActiveModel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = {
          departamentos: await axios.get('http://localhost:8000/api/v1/departamentos/'),
          municipios: await axios.get('http://localhost:8000/api/v1/municipios/'),
          sitiosTuristicos: await axios.get('http://localhost:8000/api/v1/sitios-turisticos/'),
          servicios: await axios.get('http://localhost:8000/api/v1/servicios/'),
          tiposServicios: await axios.get('http://localhost:8000/api/v1/tipos-servicios/'),
          comentarios: await axios.get('http://localhost:8000/api/v1/comentarios/'),
          usuarios: await axios.get('http://localhost:8000/api/v1/usuarios/')
        };

        // Accede a los datos y establece el estado
        console.log(responses.departamentos.data, responses.municipios.data, responses.sitiosTuristicos.data, responses.servicios.data, responses.tiposServicios.data, responses.comentarios.data, responses.usuarios.data);
        
        // Guardar los datos de todos los modelos en el estado
        setData({
          departamentos: responses.departamentos.data,
          municipios: responses.municipios.data,
          sitiosTuristicos: responses.sitiosTuristicos.data,
          servicios: responses.servicios.data,
          tiposServicios: responses.tiposServicios.data,
          comentarios: responses.comentarios.data,
          usuarios: responses.usuarios.data,
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Llama a la función para obtener datos al cargar el componente
  }, []);

  const handleLoadData = (model) => {
    setActiveModel(model);
    // No es necesario agregar lógica para cargar datos aquí
  };

  return (
    <div className="container">
      <h1>Modelos</h1>

      {/* Botones para cada modelo */}
      <div className="button-group">
        <button onClick={() => handleLoadData('usuarios')}>Usuario</button>
        <button onClick={() => handleLoadData('departamentos')}>Departamento</button>
        <button onClick={() => handleLoadData('municipios')}>Municipio</button>
        <button onClick={() => handleLoadData('sitiosTuristicos')}>Sitio Turístico</button>
        <button onClick={() => handleLoadData('servicios')}>Servicio</button>
        <button onClick={() => handleLoadData('tiposServicios')}>Tipo de Servicio</button>
      </div>

      {/* Mostrar los datos */}
      {activeModel && data[activeModel] && (
        <div className="data-section">
          <h2>Datos de {activeModel.charAt(0).toUpperCase() + activeModel.slice(1)}</h2>
          <ul>
            {data[activeModel].map((item, index) => (
              <li key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
