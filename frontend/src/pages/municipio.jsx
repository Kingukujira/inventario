import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

export const Municipio = () => {
  const [nombreMunicipio, setNombreMunicipio] = useState(''); // Inicializa como cadena vacía
  const [departamentoId, setDepartamentoId] = useState(''); // Inicializa como cadena vacía
  const [municipios, setMunicipios] = useState([]); // Lista de municipios
  const [, setMunicipioId] = useState(null); // ID del municipio a actualizar

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
      setNombreMunicipio(''); // Reinicia el campo
      setDepartamentoId(''); // Reinicia el campo

      // Muestra el mensaje de éxito utilizando SweetAlert2
      Swal.fire({
        title: '¡Éxito!',
        text: 'Municipio agregado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      fetchMunicipios(); // Actualiza la lista de municipios después de agregar

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

  // Función para obtener la lista de municipios
  const fetchMunicipios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/municipios/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      setMunicipios(response.data); // Guarda los municipios en el estado
    } catch (error) {
      console.error('Error al obtener los municipios', error);
    }
  };

  // UseEffect para cargar los municipios al montar el componente
  useEffect(() => {
    fetchMunicipios();
  }, []);

  // Función para mostrar el modal de selección de municipio
  const mostrarModalSeleccionarMunicipio = (accion) => {
    const municipioListHtml = municipios.map(municipio => `
      <div>
        <button class="select-municipio-button" style="margin: 5px;" data-id="${municipio.id}">
          ${municipio.nombre}
        </button>
      </div>
    `).join('');

    Swal.fire({
      title: accion === 'Actualizar' ? 'Selecciona un municipio para actualizar' : 'Selecciona un municipio para eliminar',
      html: municipioListHtml,
      focusConfirm: false,
      showCancelButton: true,
    });

    // Añadir el evento de clic a cada botón después de que se muestre el modal
    setTimeout(() => {
      document.querySelectorAll('.select-municipio-button').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          if (accion === 'Actualizar') {
            mostrarModalActualizar(id);
          } else {
            confirmarEliminarMunicipio(id);
          }
        });
      });
    }, 100);
  };

  // Función para mostrar el modal de actualización
  const mostrarModalActualizar = async (id) => {
    const municipio = municipios.find(mun => mun.id === parseInt(id));
    setMunicipioId(municipio.id);
    setNombreMunicipio(municipio.nombre);
    setDepartamentoId(municipio.departamento.id || ''); // Asegúrate de que sea cadena vacía si es undefined

    const { value: formValues } = await Swal.fire({
      title: 'Actualizar Municipio',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre del Municipio" value="${municipio.nombre}">
        <input id="departamento" class="swal2-input" placeholder="ID del Departamento" value="${municipio.departamento.id || ''}"> <!-- Asegúrate de que sea cadena vacía -->
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
    });

    if (formValues) {
      const nombre = document.getElementById('nombre').value;
      const departamento = document.getElementById('departamento').value;
      handleActualizarMunicipio(municipio.id, nombre, departamento);
    }
  };

  // Función para actualizar un municipio existente
  const handleActualizarMunicipio = async (id, nombre, departamento) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/municipios/${id}/`, 
        { 
          nombre: nombre,
          departamento: departamento 
        }, 
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      Swal.fire({
        title: '¡Éxito!',
        text: 'Municipio actualizado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      setNombreMunicipio(''); // Limpiar el campo
      setDepartamentoId(''); // Limpiar el campo
      fetchMunicipios(); // Actualiza la lista de municipios
    } catch (error) {
      console.error('Error al actualizar el municipio', error);
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo actualizar el municipio. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Función para eliminar un municipio
  const handleEliminarMunicipio = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/municipios/${id}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: '¡Éxito!',
        text: 'Municipio eliminado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      fetchMunicipios(); // Actualiza la lista después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el municipio', error);
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo eliminar el municipio. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Confirmar eliminación del municipio
  const confirmarEliminarMunicipio = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleEliminarMunicipio(id);
      }
    });
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

      <div className="action-buttons">
        <button 
          className="update-button"
          onClick={() => mostrarModalSeleccionarMunicipio('Actualizar')}
        >
          Actualizar Municipio
        </button>
        <button 
          className="delete-button"
          onClick={() => mostrarModalSeleccionarMunicipio('Eliminar')}
        >
          Eliminar Municipio
        </button>
      </div>
    </div>
  );
};
