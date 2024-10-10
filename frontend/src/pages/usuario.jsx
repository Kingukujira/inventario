import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 para mensajes de éxito y error

export function Usuario() {
  // Estados para manejar datos del formulario
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [passwordUsuario, setPasswordUsuario] = useState('');
  const [, setUsuarioId] = useState(null); // Para manejar el ID del usuario a actualizar
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios

  // Función para obtener la lista de usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/usuarios/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    }
  };

  // Llamar a la función para cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

// Función para agregar un nuevo usuario
const handleAgregarUsuario = async () => {
  try {
    await axios.post('http://localhost:8000/api/v1/usuarios/', 
      { 
        nombre: nombreUsuario,
        correo_electronico: correoUsuario,
        password: passwordUsuario,
      }, 
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      }
    );
    Swal.fire({
      title: '¡Éxito!',
      text: 'Usuario agregado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });

    // Limpiar campos y actualizar la lista
    setNombreUsuario('');
    setCorreoUsuario('');
    setPasswordUsuario('');
    fetchUsuarios(); // Actualizar la lista de usuarios
  } catch (error) {
    console.error('Error al agregar el usuario', error);
    Swal.fire({
      title: '¡Error!',
      text: 'Hubo un problema al agregar el usuario. Inténtalo de nuevo.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
};

  // Función para actualizar un usuario existente
  const handleActualizarUsuario = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/usuarios/${id}/`, 
        { 
          nombre: nombreUsuario,
          correo_electronico: correoUsuario,
          password: passwordUsuario,
        }, 
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      Swal.fire({
        title: '¡Éxito!',
        text: 'Usuario actualizado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      // Limpiar campos y actualizar la lista
      setUsuarioId(null); // Reseteamos el ID
      setNombreUsuario('');
      setCorreoUsuario('');
      setPasswordUsuario('');
      fetchUsuarios(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
      Swal.fire({
        title: '¡Error!',
        text: 'Hubo un problema al actualizar el usuario. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Función para eliminar un usuario
  const handleEliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/usuarios/${id}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: '¡Éxito!',
        text: 'Usuario eliminado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      fetchUsuarios(); // Actualizar la lista después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
      Swal.fire({
        title: '¡Error!',
        text: 'Hubo un problema al eliminar el usuario. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Confirmar eliminación del usuario
  const confirmarEliminarUsuario = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleEliminarUsuario(id);
      }
    });
  };

  // Función para mostrar el modal de selección de usuario
  const mostrarModalSeleccionarUsuario = (accion) => {
    const usuarioListHtml = usuarios.map(usuario => `
      <div>
        <button class="select-user-button" style="margin: 5px;" data-id="${usuario.id}">
          ${usuario.nombre} - ${usuario.correo_electronico}
        </button>
      </div>
    `).join('');

    Swal.fire({
      title: accion === 'Actualizar' ? 'Selecciona un usuario para actualizar' : 'Selecciona un usuario para eliminar',
      html: usuarioListHtml,
      focusConfirm: false,
      showCloseButton: true,
      didOpen: () => { // Cambiado de onOpen a didOpen
        document.querySelectorAll('.select-user-button').forEach(button => {
          button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            if (accion === 'Actualizar') {
              mostrarModalActualizar(id);
            } else {
              confirmarEliminarUsuario(id);
            }
          });
        });
      }
    });
  };

  // Función para mostrar el modal de actualización
  const mostrarModalActualizar = async (id) => {
    const usuario = usuarios.find(user => user.id === parseInt(id));
    setUsuarioId(usuario.id);
    setNombreUsuario(usuario.nombre);
    setCorreoUsuario(usuario.correo_electronico);
    setPasswordUsuario(''); // Mantén el campo de contraseña vacío

    const { value: formValues } = await Swal.fire({
      title: 'Actualizar Usuario',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre del Usuario" value="${usuario.nombre}">
        <input id="correo" class="swal2-input" placeholder="Correo Electrónico" value="${usuario.correo_electronico}">
        <input id="password" class="swal2-input" type="password" placeholder="Contraseña (opcional)">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
    });

    if (formValues) {
      const nombre = document.getElementById('nombre').value;
      const correo = document.getElementById('correo').value;
      const password = document.getElementById('password').value;

      setNombreUsuario(nombre);
      setCorreoUsuario(correo);
      setPasswordUsuario(password);
      handleActualizarUsuario(usuario.id);
    }
  };

  return (
    <div className="container">
      {/* Formulario para agregar un Usuario */}
      <div className="form-section">
        <h2>Agregar Usuario</h2>
        <input
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          placeholder="Nombre del Usuario"
          className="input-field"
        />
        <input
          type="email"
          value={correoUsuario}
          onChange={(e) => setCorreoUsuario(e.target.value)}
          placeholder="Correo Electrónico"
          className="input-field"
        />
        <input
          type="password"
          value={passwordUsuario}
          onChange={(e) => setPasswordUsuario(e.target.value)}
          placeholder="Contraseña"
          className="input-field"
        />
        <button 
          className="submit-button" 
          onClick={handleAgregarUsuario}
        >
          Agregar Usuario
        </button>
      </div>

      <div className="action-buttons">
        <button 
          className="update-button"
          onClick={() => mostrarModalSeleccionarUsuario('Actualizar')}
        >
          Actualizar Usuario
        </button>
        <button 
          className="delete-button"
          onClick={() => mostrarModalSeleccionarUsuario('Eliminar')}
        >
          Eliminar Usuario
        </button>
      </div>
    </div>
  );
}
