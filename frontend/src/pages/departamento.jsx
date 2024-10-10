import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 

export const Departamento = () => {
  // Estado para manejar el nombre del departamento
  const [nombreDepartamento, setNombreDepartamento] = useState('');
  const [departamentos, setDepartamentos] = useState([]); // Lista de departamentos
  const [, setDepartamentoId] = useState(null); // ID del departamento a actualizar

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
      fetchDepartamentos(); // Actualiza la lista de departamentos

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

  // Función para obtener la lista de departamentos
  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/departamentos/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      setDepartamentos(response.data); // Guarda los departamentos en el estado
    } catch (error) {
      console.error('Error al obtener los departamentos', error);
    }
  };

  // UseEffect para cargar los departamentos al montar el componente
  useEffect(() => {
    fetchDepartamentos();
  }, []);

  // Función para mostrar el modal de selección de departamento
  const mostrarModalSeleccionarDepartamento = (accion) => {
    const departamentoListHtml = departamentos.map(departamento => `
      <div>
        <button class="select-department-button" style="margin: 5px;" data-id="${departamento.id}">
          ${departamento.nombre}
        </button>
      </div>
    `).join('');

    Swal.fire({
      title: accion === 'Actualizar' ? 'Selecciona un departamento para actualizar' : 'Selecciona un departamento para eliminar',
      html: departamentoListHtml,
      focusConfirm: false,
      showCancelButton: true,
    });

    // Añadir el evento de clic a cada botón después de que se muestre el modal
    setTimeout(() => {
      document.querySelectorAll('.select-department-button').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          if (accion === 'Actualizar') {
            mostrarModalActualizar(id);
          } else {
            confirmarEliminarDepartamento(id);
          }
        });
      });
    }, 100);
  };

  // Función para mostrar el modal de actualización
  const mostrarModalActualizar = async (id) => {
    const departamento = departamentos.find(depto => depto.id === parseInt(id));
    setDepartamentoId(departamento.id);
    setNombreDepartamento(departamento.nombre);

    const { value: formValues } = await Swal.fire({
      title: 'Actualizar Departamento',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre del Departamento" value="${departamento.nombre}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
    });

    if (formValues) {
      const nombre = document.getElementById('nombre').value;
      handleActualizarDepartamento(departamento.id, nombre);
    }
  };

  // Función para actualizar un departamento existente
  const handleActualizarDepartamento = async (id, nombre) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/departamentos/${id}/`, 
        { 
          nombre: nombre 
        }, 
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      Swal.fire({
        title: 'Éxito!',
        text: 'Departamento actualizado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      setNombreDepartamento(''); // Limpiar el campo
      fetchDepartamentos(); // Actualiza la lista de departamentos
    } catch (error) {
      console.error('Error al actualizar el departamento', error);
      Swal.fire({
        title: 'Error!',
        text: 'No se pudo actualizar el departamento. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Función para eliminar un departamento
  const handleEliminarDepartamento = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/departamentos/${id}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: 'Éxito!',
        text: 'Departamento eliminado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      fetchDepartamentos(); // Actualiza la lista después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el departamento', error);
      Swal.fire({
        title: 'Error!',
        text: 'No se pudo eliminar el departamento. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Confirmar eliminación del departamento
  const confirmarEliminarDepartamento = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleEliminarDepartamento(id);
      }
    });
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

      <div className="action-buttons">
        <button 
          className="update-button"
          onClick={() => mostrarModalSeleccionarDepartamento('Actualizar')}
        >
          Actualizar Departamento
        </button>
        <button 
          className="delete-button"
          onClick={() => mostrarModalSeleccionarDepartamento('Eliminar')}
        >
          Eliminar Departamento
        </button>
      </div>
    </div>
  );
};
