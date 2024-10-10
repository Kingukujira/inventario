import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

export const Servicio = () => {
  const [nombreServicio, setNombreServicio] = useState(''); // Inicializa como cadena vacía
  const [descripcionServicio, setDescripcionServicio] = useState(''); // Inicializa como cadena vacía
  const [tipoServicioId, setTipoServicioId] = useState(''); // Inicializa como cadena vacía
  const [costo, setCosto] = useState(''); // Inicializa como cadena vacía
  const [sitioTuristicoId, setSitioTuristicoId] = useState(''); // Inicializa como cadena vacía
  const [servicios, setServicios] = useState([]); // Lista de servicios
  const [, setServicioId] = useState(null); // ID del servicio a actualizar

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
      setNombreServicio(''); // Reinicia el campo
      setDescripcionServicio(''); // Reinicia el campo
      setTipoServicioId(''); // Reinicia el campo
      setCosto(''); // Reinicia el campo
      setSitioTuristicoId(''); // Reinicia el campo

      // Muestra el mensaje de éxito utilizando SweetAlert2
      Swal.fire({
        title: '¡Éxito!',
        text: 'Servicio agregado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      fetchServicios(); // Actualiza la lista de servicios después de agregar

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

  // Función para obtener la lista de servicios
  const fetchServicios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/servicios/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      setServicios(response.data); // Guarda los servicios en el estado
    } catch (error) {
      console.error('Error al obtener los servicios', error);
    }
  };

  // UseEffect para cargar los servicios al montar el componente
  useEffect(() => {
    fetchServicios();
  }, []);

  // Función para mostrar el modal de selección de servicio
  const mostrarModalSeleccionarServicio = (accion) => {
    const servicioListHtml = servicios.map(servicio => `
      <div>
        <button class="select-servicio-button" style="margin: 5px;" data-id="${servicio.id}">
          ${servicio.nombre}
        </button>
      </div>
    `).join('');

    Swal.fire({
      title: accion === 'Actualizar' ? 'Selecciona un servicio para actualizar' : 'Selecciona un servicio para eliminar',
      html: servicioListHtml,
      focusConfirm: false,
      showCancelButton: true,
    });

    // Añadir el evento de clic a cada botón después de que se muestre el modal
    setTimeout(() => {
      document.querySelectorAll('.select-servicio-button').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          if (accion === 'Actualizar') {
            mostrarModalActualizar(id);
          } else {
            confirmarEliminarServicio(id);
          }
        });
      });
    }, 100);
  };

  // Función para mostrar el modal de actualización
  const mostrarModalActualizar = async (id) => {
    const servicio = servicios.find(serv => serv.id === parseInt(id));
    setServicioId(servicio.id);
    setNombreServicio(servicio.nombre);
    setDescripcionServicio(servicio.descripcion);
    setTipoServicioId(servicio.tipo_servicio);
    setCosto(servicio.costo);
    setSitioTuristicoId(servicio.sitio_turistico);

    const { value: formValues } = await Swal.fire({
      title: 'Actualizar Servicio',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre del Servicio" value="${servicio.nombre}">
        <input id="descripcion" class="swal2-input" placeholder="Descripción del Servicio" value="${servicio.descripcion}">
        <input id="tipoServicio" class="swal2-input" placeholder="ID del Tipo de Servicio" value="${servicio.tipo_servicio}">
        <input id="costo" class="swal2-input" placeholder="Costo" value="${servicio.costo}">
        <input id="sitioTuristico" class="swal2-input" placeholder="ID del Sitio Turístico" value="${servicio.sitio_turistico}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
    });

    if (formValues) {
      const nombre = document.getElementById('nombre').value;
      const descripcion = document.getElementById('descripcion').value;
      const tipoServicio = document.getElementById('tipoServicio').value;
      const costo = document.getElementById('costo').value;
      const sitioTuristico = document.getElementById('sitioTuristico').value;
      handleActualizarServicio(servicio.id, nombre, descripcion, tipoServicio, costo, sitioTuristico);
    }
  };

  // Función para actualizar un servicio existente
  const handleActualizarServicio = async (id, nombre, descripcion, tipoServicio, costo, sitioTuristico) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/servicios/${id}/`, 
        { 
          nombre: nombre,
          descripcion: descripcion,
          tipo_servicio: tipoServicio,
          costo: parseFloat(costo),
          sitio_turistico: sitioTuristico
        }, 
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      Swal.fire({
        title: '¡Éxito!',
        text: 'Servicio actualizado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      setNombreServicio(''); // Limpiar el campo
      setDescripcionServicio(''); // Limpiar el campo
      setTipoServicioId(''); // Limpiar el campo
      setCosto(''); // Limpiar el campo
      setSitioTuristicoId(''); // Limpiar el campo
      fetchServicios(); // Actualiza la lista de servicios
    } catch (error) {
      console.error('Error al actualizar el servicio', error);
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo actualizar el servicio. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Función para eliminar un servicio
  const handleEliminarServicio = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/servicios/${id}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: '¡Éxito!',
        text: 'Servicio eliminado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      fetchServicios(); // Actualiza la lista después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el servicio', error);
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo eliminar el servicio. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Confirmar eliminación del servicio
  const confirmarEliminarServicio = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleEliminarServicio(id);
      }
    });
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
        <input
          type="text"
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

      <div className="action-buttons">
        <button 
          className="update-button"
          onClick={() => mostrarModalSeleccionarServicio('Actualizar')}
        >
          Actualizar Servicio
        </button>
        <button 
          className="delete-button"
          onClick={() => mostrarModalSeleccionarServicio('Eliminar')}
        >
          Eliminar Servicio
        </button>
      </div>
    </div>
  );
};
