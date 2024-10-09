import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

export function SitioTuristico() {
  // Estados para agregar Sitio Turístico
  const [nombreSitio, setNombreSitio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [municipioId, setMunicipioId] = useState('');
  const [coordenadas, setCoordenadas] = useState('');
  const [tipo, setTipo] = useState('');

  // Función para agregar Sitio Turístico
  const handleAgregarSitioTuristico = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/sitios-turisticos/', 
        { 
          nombre: nombreSitio,
          descripcion,
          direccion,
          municipio: municipioId,
          coordenadas,
          tipo
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);

      // Limpiar campos del formulario
      setNombreSitio('');
      setDescripcion('');
      setDireccion('');
      setMunicipioId('');
      setCoordenadas('');
      setTipo('');

      // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        title: '¡Éxito!',
        text: 'El sitio turístico ha sido agregado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

    } catch (error) {
      console.error('Error al agregar el sitio turístico', error);

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        title: '¡Error!',
        text: 'Hubo un problema al agregar el sitio turístico. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="container">
      {/* Formulario para agregar Sitio Turístico */}
      <div className="form-section">
        <h2>Agregar Sitio Turístico</h2>
        <input
          type="text"
          value={nombreSitio}
          onChange={(e) => setNombreSitio(e.target.value)}
          placeholder="Nombre del Sitio"
          className="input-field"
        />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="input-field"
        />
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Dirección"
          className="input-field"
        />
        <input
          type="text"
          value={municipioId}
          onChange={(e) => setMunicipioId(e.target.value)}
          placeholder="ID del Municipio"
          className="input-field"
        />
        <input
          type="text"
          value={coordenadas}
          onChange={(e) => setCoordenadas(e.target.value)}
          placeholder="Coordenadas"
          className="input-field"
        />
        <input
          type="text"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          placeholder="Tipo"
          className="input-field"
        />
        <button className="submit-button" onClick={handleAgregarSitioTuristico}>
          Agregar Sitio Turístico
        </button>
      </div>
    </div>
  );
}
