import { useState, useEffect } from 'react';
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
  const [sitios, setSitios] = useState([]); // Lista de sitios
  const [, setSitioId] = useState(null); // ID del sitio a actualizar

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

      fetchSitios(); // Actualiza la lista de sitios después de agregar

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

  // Función para obtener la lista de sitios turísticos
  const fetchSitios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/sitios-turisticos/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      setSitios(response.data); // Guarda los sitios en el estado
    } catch (error) {
      console.error('Error al obtener los sitios turísticos', error);
    }
  };

  // UseEffect para cargar los sitios al montar el componente
  useEffect(() => {
    fetchSitios();
  }, []);

  // Función para mostrar el modal de selección de sitio turístico
  const mostrarModalSeleccionarSitio = (accion) => {
    const sitioListHtml = sitios.map(sitio => `
      <div>
        <button class="select-sitio-button" style="margin: 5px;" data-id="${sitio.id}">
          ${sitio.nombre}
        </button>
      </div>
    `).join('');

    Swal.fire({
      title: accion === 'Actualizar' ? 'Selecciona un sitio turístico para actualizar' : 'Selecciona un sitio turístico para eliminar',
      html: sitioListHtml,
      focusConfirm: false,
      showCancelButton: true,
    });

    // Añadir el evento de clic a cada botón después de que se muestre el modal
    setTimeout(() => {
      document.querySelectorAll('.select-sitio-button').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          if (accion === 'Actualizar') {
            mostrarModalActualizar(id);
          } else {
            confirmarEliminarSitio(id);
          }
        });
      });
    }, 100);
  };

  // Función para mostrar el modal de actualización
  const mostrarModalActualizar = async (id) => {
    const sitio = sitios.find(s => s.id === parseInt(id));
    setSitioId(sitio.id);
    setNombreSitio(sitio.nombre);
    setDescripcion(sitio.descripcion);
    setDireccion(sitio.direccion);
    setMunicipioId(sitio.municipio);
    setCoordenadas(sitio.coordenadas);
    setTipo(sitio.tipo);

    const { value: formValues } = await Swal.fire({
      title: 'Actualizar Sitio Turístico',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre del Sitio" value="${sitio.nombre}">
        <textarea id="descripcion" class="swal2-input" placeholder="Descripción">${sitio.descripcion}</textarea>
        <input id="direccion" class="swal2-input" placeholder="Dirección" value="${sitio.direccion}">
        <input id="municipio" class="swal2-input" placeholder="ID del Municipio" value="${sitio.municipio}">
        <input id="coordenadas" class="swal2-input" placeholder="Coordenadas" value="${sitio.coordenadas}">
        <input id="tipo" class="swal2-input" placeholder="Tipo" value="${sitio.tipo}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
    });

    if (formValues) {
      const nombre = document.getElementById('nombre').value;
      const descripcion = document.getElementById('descripcion').value;
      const direccion = document.getElementById('direccion').value;
      const municipio = document.getElementById('municipio').value;
      const coordenadas = document.getElementById('coordenadas').value;
      const tipo = document.getElementById('tipo').value;
      handleActualizarSitioTuristico(sitio.id, nombre, descripcion, direccion, municipio, coordenadas, tipo);
    }
  };

  // Función para actualizar un sitio turístico existente
  const handleActualizarSitioTuristico = async (id, nombre, descripcion, direccion, municipio, coordenadas, tipo) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/sitios-turisticos/${id}/`, 
        { 
          nombre,
          descripcion,
          direccion,
          municipio,
          coordenadas,
          tipo
        }, 
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      Swal.fire({
        title: '¡Éxito!',
        text: 'Sitio turístico actualizado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      setNombreSitio(''); // Limpiar el campo
      setDescripcion(''); // Limpiar el campo
      setDireccion(''); // Limpiar el campo
      setMunicipioId(''); // Limpiar el campo
      setCoordenadas(''); // Limpiar el campo
      setTipo(''); // Limpiar el campo
      fetchSitios(); // Actualiza la lista de sitios
    } catch (error) {
      console.error('Error al actualizar el sitio turístico', error);
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo actualizar el sitio turístico. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Función para eliminar un sitio turístico
  const handleEliminarSitioTuristico = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/sitios-turisticos/${id}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: '¡Éxito!',
        text: 'Sitio turístico eliminado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      fetchSitios(); // Actualiza la lista después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el sitio turístico', error);
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo eliminar el sitio turístico. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Confirmar eliminación del sitio turístico
  const confirmarEliminarSitio = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleEliminarSitioTuristico(id);
      }
    });
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

      <div className="action-buttons">
        <button 
          className="update-button"
          onClick={() => mostrarModalSeleccionarSitio('Actualizar')}
        >
          Actualizar Sitio Turístico
        </button>
        <button 
          className="delete-button"
          onClick={() => mostrarModalSeleccionarSitio('Eliminar')}
        >
          Eliminar Sitio Turístico
        </button>
      </div>
    </div>
  );
}
