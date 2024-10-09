import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 

export const Departamento = () => {
  // Estados para agregar Departamento
  const [nombreDepartamento, setNombreDepartamento] = useState('');

  // Función para agregar Departamento
  const handleAgregarDepartamento = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/departamentos/', 
        { 
          nombre: nombreDepartamento 
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);
      
      // Muestra el mensaje de éxito utilizando SweetAlert2
      Swal.fire({
        title: 'Éxito!',
        text: 'Departamento agregado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      setNombreDepartamento(''); // Limpiar el campo

    } catch (error) {
      console.error('Error al agregar el departamento', error);
      
      // Muestra un mensaje de error utilizando SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: 'No se pudo agregar el departamento. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="container">
      {/* Formulario para agregar Departamento */}
      <div className="form-section">
        <h2>Agregar Departamento</h2>
        <input
          type="text"
          value={nombreDepartamento}
          onChange={(e) => setNombreDepartamento(e.target.value)}
          placeholder="Nombre del Departamento"
          className="input-field"
        />
        <button className="submit-button" onClick={handleAgregarDepartamento}>
          Agregar Departamento
        </button>
      </div>
    </div>
  );
};
