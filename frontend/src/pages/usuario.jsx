import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 para mensajes de éxito y error

export function Usuario() {
  // Estados para agregar Usuario
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [passwordUsuario, setPasswordUsuario] = useState('');

  // Función para agregar Usuario
  const handleAgregarUsuario = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/usuarios/', 
        { 
          nombre: nombreUsuario,
          correo_electronico: correoUsuario,
          password: passwordUsuario,
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);

      // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        title: '¡Éxito!',
        text: 'Usuario agregado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      // Limpiar campos
      setNombreUsuario('');
      setCorreoUsuario('');
      setPasswordUsuario('');
      
    } catch (error) {
      console.error('Error al agregar el usuario', error);
      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        title: '¡Error!',
        text: 'Hubo un problema al agregar el usuario. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="container">
      {/* Formulario para agregar Usuario */}
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
        <button className="submit-button" onClick={handleAgregarUsuario}>
          Agregar Usuario
        </button>
      </div>
    </div>
  );
}
