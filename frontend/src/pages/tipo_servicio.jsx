import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

export function TipoServicio() {
  // Estado para agregar Tipo de Servicio
  const [nombreTipoServicio, setNombreTipoServicio] = useState('');
  const [tiposServicios, setTiposServicios] = useState([]); // Lista de tipos de servicios
  const [, setTipoServicioId] = useState(null); // ID del tipo de servicio a actualizar

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

      fetchTiposServicios(); // Actualiza la lista de tipos de servicios

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

  // Función para obtener la lista de tipos de servicios
  const fetchTiposServicios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/tipos-servicios/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      setTiposServicios(response.data); // Guarda los tipos de servicios en el estado
    } catch (error) {
      console.error('Error al obtener los tipos de servicios', error);
    }
  };

  // UseEffect para cargar los tipos al montar el componente
  useEffect(() => {
    fetchTiposServicios();
  }, []);

  // Función para mostrar el modal de selección de tipo de servicio
  const mostrarModalSeleccionarTipoServicio = (accion) => {
    const tiposListHtml = tiposServicios.map(tipo => `
      <div>
        <button class="select-tipo-button" style="margin: 5px;" data-id="${tipo.id}">
          ${tipo.nombre}
        </button>
      </div>
    `).join('');

    Swal.fire({
      title: accion === 'Actualizar' ? 'Selecciona un tipo de servicio para actualizar' : 'Selecciona un tipo de servicio para eliminar',
      html: tiposListHtml,
      focusConfirm: false,
      showCancelButton: true,
    });

    // Añadir el evento de clic a cada botón después de que se muestre el modal
    setTimeout(() => {
      document.querySelectorAll('.select-tipo-button').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          if (accion === 'Actualizar') {
            mostrarModalActualizar(id);
          } else {
            confirmarEliminarTipoServicio(id);
          }
        });
      });
    }, 100);
  };

  // Función para mostrar el modal de actualización
  const mostrarModalActualizar = async (id) => {
    const tipo = tiposServicios.find(t => t.id === parseInt(id));
    setTipoServicioId(tipo.id);
    setNombreTipoServicio(tipo.nombre);

    const { value: formValues } = await Swal.fire({
      title: 'Actualizar Tipo de Servicio',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre del Tipo de Servicio" value="${tipo.nombre}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
    });

    if (formValues) {
      const nombre = document.getElementById('nombre').value;
      handleActualizarTipoServicio(tipo.id, nombre);
    }
  };

  // Función para actualizar un tipo de servicio existente
  const handleActualizarTipoServicio = async (id, nombre) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/tipos-servicios/${id}/`, 
        { 
          nombre
        }, 
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      Swal.fire({
        title: '¡Éxito!',
        text: 'Tipo de servicio actualizado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      setNombreTipoServicio(''); // Limpiar el campo
      fetchTiposServicios(); // Actualiza la lista de tipos de servicios
    } catch (error) {
      console.error('Error al actualizar el tipo de servicio', error);
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo actualizar el tipo de servicio. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Función para eliminar un tipo de servicio
  const handleEliminarTipoServicio = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/tipos-servicios/${id}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: '¡Éxito!',
        text: 'Tipo de servicio eliminado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      fetchTiposServicios(); // Actualiza la lista después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el tipo de servicio', error);
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo eliminar el tipo de servicio. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Confirmar eliminación del tipo de servicio
  const confirmarEliminarTipoServicio = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleEliminarTipoServicio(id);
      }
    });
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

      <div className="action-buttons">
        <button 
          className="update-button"
          onClick={() => mostrarModalSeleccionarTipoServicio('Actualizar')}
        >
          Actualizar Tipo de Servicio
        </button>
        <button 
          className="delete-button"
          onClick={() => mostrarModalSeleccionarTipoServicio('Eliminar')}
        >
          Eliminar Tipo de Servicio
        </button>
      </div>
    </div>
  );
}
