import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

export function Servicio() {
  // Estados para agregar Servicio
  const [nombreServicio, setNombreServicio] = useState('');
  const [descripcionServicio, setDescripcionServicio] = useState('');
  const [tipoServicioId, setTipoServicioId] = useState('');
  const [costo, setCosto] = useState('');
  const [sitioTuristicoId, setSitioTuristicoId] = useState('');

  // Función para agregar Servicio
  const handleAgregarServicio = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/servicios/', 
        { 
          nombre: nombreServicio,
          descripcion: descripcionServicio,
          tipo_servicio: tipoServicioId,
          costo: parseFloat(costo),
          sitio_turistico: sitioTuristicoId
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);

      // Limpia los campos del formulario
      setNombreServicio('');
      setDescripcionServicio('');
      setTipoServicioId('');
      setCosto('');
      setSitioTuristicoId('');

      // Muestra el mensaje de éxito utilizando SweetAlert2
      Swal.fire({
        title: '¡Éxito!',
        text: 'Servicio agregado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

    } catch (error) {
      console.error('Error al agregar el servicio', error);

      // Muestra un mensaje de error utilizando SweetAlert2
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo agregar el servicio. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="container">
      {/* Formulario para agregar Servicio */}
      <div className="form-section">
        <h2>Agregar Servicio</h2>
        <input
          type="text"
          value={nombreServicio}
          onChange={(e) => setNombreServicio(e.target.value)}
          placeholder="Nombre del Servicio"
          className="input-field"
        />
        <textarea
          value={descripcionServicio}
          onChange={(e) => setDescripcionServicio(e.target.value)}
          placeholder="Descripción del Servicio"
          className="input-field"
        />
        <input
          type="text"
          value={tipoServicioId}
          onChange={(e) => setTipoServicioId(e.target.value)}
          placeholder="ID del Tipo de Servicio"
          className="input-field"
        />
        <input
          type="number"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
          placeholder="Costo"
          className="input-field"
        />
        <input
          type="text"
          value={sitioTuristicoId}
          onChange={(e) => setSitioTuristicoId(e.target.value)}
          placeholder="ID del Sitio Turístico"
          className="input-field"
        />
        <button className="submit-button" onClick={handleAgregarServicio}>
          Agregar Servicio
        </button>
      </div>
    </div>
  );
}
