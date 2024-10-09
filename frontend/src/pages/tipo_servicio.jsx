import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

export function TipoServicio() {
  // Estado para agregar Tipo de Servicio
  const [nombreTipoServicio, setNombreTipoServicio] = useState('');

  // Función para agregar Tipo de Servicio
  const handleAgregarTipoServicio = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/tipos-servicios/', 
        { 
          nombre: nombreTipoServicio
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);

      // Limpiar campo del formulario
      setNombreTipoServicio('');

      // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        title: '¡Éxito!',
        text: 'El tipo de servicio ha sido agregado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

    } catch (error) {
      console.error('Error al agregar el tipo de servicio', error);

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        title: '¡Error!',
        text: 'Hubo un problema al agregar el tipo de servicio. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="container">
      {/* Formulario para agregar Tipo de Servicio */}
      <div className="form-section">
        <h2>Agregar Tipo de Servicio</h2>
        <input
          type="text"
          value={nombreTipoServicio}
          onChange={(e) => setNombreTipoServicio(e.target.value)}
          placeholder="Nombre del Tipo de Servicio"
          className="input-field"
        />
        <button className="submit-button" onClick={handleAgregarTipoServicio}>
          Agregar Tipo de Servicio
        </button>
      </div>
    </div>
  );
}
