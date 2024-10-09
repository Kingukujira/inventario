import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

export const Municipio = () => {
  const [nombreMunicipio, setNombreMunicipio] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');

  // Función para agregar Municipio
  const handleAgregarMunicipio = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/municipios/', 
        { 
          nombre: nombreMunicipio,
          departamento: departamentoId 
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);
      setNombreMunicipio('');
      setDepartamentoId('');

      // Muestra el mensaje de éxito utilizando SweetAlert2
      Swal.fire({
        title: '¡Éxito!',
        text: 'Municipio agregado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

    } catch (error) {
      console.error('Error al agregar el municipio', error);

      // Muestra un mensaje de error utilizando SweetAlert2
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo agregar el municipio. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="container">
      {/* Formulario para agregar Municipio */}
      <div className="form-section">
        <h2>Agregar Municipio</h2>
        <input
          type="text"
          value={nombreMunicipio}
          onChange={(e) => setNombreMunicipio(e.target.value)}
          placeholder="Nombre del Municipio"
          className="input-field"
        />
        <input
          type="text"
          value={departamentoId}
          onChange={(e) => setDepartamentoId(e.target.value)}
          placeholder="ID del Departamento"
          className="input-field"
        />
        <button className="submit-button" onClick={handleAgregarMunicipio}>
          Agregar Municipio
        </button>
      </div>
    </div>
  );
}
