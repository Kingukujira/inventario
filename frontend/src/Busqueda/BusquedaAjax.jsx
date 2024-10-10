import { useState } from 'react';
import axios from 'axios';

export function BuscarRegistros() {
  // Estados para manejar la consulta y los resultados
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  // Función para manejar la búsqueda
  const handleSearch = async (event) => {
    const query = event.target.value; // Obtiene el valor del input
    setQuery(query); // Actualiza el estado con la consulta actual

    if (query.length > 2) { // Solo busca si la consulta tiene más de 2 caracteres
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/${query}`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });
        setResultados(response.data); // Actualiza el estado con los resultados
      } catch (error) {
        console.error('Error al buscar registros', error);
        setResultados([]); // Limpia resultados si hay un error
      }
    } else {
      setResultados([]); // Limpia resultados si la consulta tiene 2 caracteres o menos
    }
  };

  return (
    <div className="container">
      {/* Campo de entrada para buscar */}
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleSearch} // Llama a handleSearch al cambiar el input
        className="input-field"
      />
      
      {/* Mostrar resultados de búsqueda */}
      <div>
        {resultados.length > 0 ? (
          resultados.map((resultado) => (
            <div key={resultado.id} className="resultado-item">
              {resultado.nombre} {/* Cambia esto según el campo que desees mostrar */}
            </div>
          ))
        ) : (
          <div className="no-resultados">No se encontraron resultados.</div>
        )}
      </div>
    </div>
  );
}
