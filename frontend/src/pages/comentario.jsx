import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export function Comentario() {
  // Estados para agregar Comentario
  const [sitioTuristicoComentario, setSitioTuristicoComentario] = useState('');
  const [usuarioComentario, setUsuarioComentario] = useState('');
  const [comentario, setComentario] = useState('');
  const [rating, setRating] = useState('');
  const [comentarios, setComentarios] = useState([]); // Lista de comentarios
  const [, setComentarioId] = useState(null); // ID del comentario a actualizar

  // Función para agregar Comentario
  const handleAgregarComentario = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/comentarios/', 
        { 
          sitio_turistico: sitioTuristicoComentario,
          usuario: usuarioComentario,
          comentario,
          rating: parseInt(rating),
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
      setSitioTuristicoComentario('');
      setUsuarioComentario('');
      setComentario('');
      setRating('');

      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Comentario agregado exitosamente',
        showConfirmButton: false,
        confirmButtonText: 'Aceptar'
      });

      fetchComentarios(); // Actualiza la lista de comentarios

    } catch (error) {
      console.error('Error al agregar el comentario', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al agregar el comentario.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Función para obtener la lista de comentarios
  const fetchComentarios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/comentarios/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      setComentarios(response.data); // Guarda los comentarios en el estado
    } catch (error) {
      console.error('Error al obtener los comentarios', error);
    }
  };

  // UseEffect para cargar los comentarios al montar el componente
  useEffect(() => {
    fetchComentarios();
  }, []);

  // Función para mostrar el modal de selección de comentario
  const mostrarModalSeleccionarComentario = (accion) => {
    const comentariosListHtml = comentarios.map(comentario => `
      <div>
        <button class="select-comentario-button" style="margin: 5px;" data-id="${comentario.id}">
          ${comentario.comentario} (Rating: ${comentario.rating})
        </button>
      </div>
    `).join('');

    Swal.fire({
      title: accion === 'Actualizar' ? 'Selecciona un comentario para actualizar' : 'Selecciona un comentario para eliminar',
      html: comentariosListHtml,
      focusConfirm: false,
      showCancelButton: true,
    });

    // Añadir el evento de clic a cada botón después de que se muestre el modal
    setTimeout(() => {
      document.querySelectorAll('.select-comentario-button').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          if (accion === 'Actualizar') {
            mostrarModalActualizar(id);
          } else {
            confirmarEliminarComentario(id);
          }
        });
      });
    }, 100);
  };

  // Función para mostrar el modal de actualización
  const mostrarModalActualizar = async (id) => {
    const comentarioSeleccionado = comentarios.find(c => c.id === parseInt(id));
    setComentarioId(comentarioSeleccionado.id);
    setSitioTuristicoComentario(comentarioSeleccionado.sitio_turistico);
    setUsuarioComentario(comentarioSeleccionado.usuario);
    setComentario(comentarioSeleccionado.comentario);
    setRating(comentarioSeleccionado.rating);

    const { value: formValues } = await Swal.fire({
      title: 'Actualizar Comentario',
      html: `
        <input id="sitio" class="swal2-input" placeholder="ID del Sitio Turístico" value="${comentarioSeleccionado.sitio_turistico}">
        <input id="usuario" class="swal2-input" placeholder="ID del Usuario" value="${comentarioSeleccionado.usuario}">
        <textarea id="comentario" class="swal2-textarea" placeholder="Comentario">${comentarioSeleccionado.comentario}</textarea>
        <input id="rating" type="number" class="swal2-input" placeholder="Rating" value="${comentarioSeleccionado.rating}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
    });

    if (formValues) {
      const sitio = document.getElementById('sitio').value;
      const usuario = document.getElementById('usuario').value;
      const comentarioTexto = document.getElementById('comentario').value;
      const ratingValor = document.getElementById('rating').value;
      handleActualizarComentario(comentarioSeleccionado.id, sitio, usuario, comentarioTexto, ratingValor);
    }
  };

  // Función para actualizar un comentario existente
  const handleActualizarComentario = async (id, sitio, usuario, comentarioTexto, ratingValor) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/comentarios/${id}/`, 
        { 
          sitio_turistico: sitio,
          usuario,
          comentario: comentarioTexto,
          rating: parseInt(ratingValor),
        }, 
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Comentario actualizado exitosamente',
        showConfirmButton: false,
        confirmButtonText: 'Aceptar'
      });

      fetchComentarios(); // Actualiza la lista de comentarios
    } catch (error) {
      console.error('Error al actualizar el comentario', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al actualizar el comentario.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Función para eliminar un comentario
  const handleEliminarComentario = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/comentarios/${id}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Comentario eliminado exitosamente',
        showConfirmButton: false,
        confirmButtonText: 'Aceptar'
      });
      fetchComentarios(); // Actualiza la lista después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el comentario', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al eliminar el comentario.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Confirmar eliminación del comentario
  const confirmarEliminarComentario = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleEliminarComentario(id);
      }
    });
  };

  return (
    <div className="container">
      {/* Formulario para agregar Comentario */}
      <div className="form-section">
        <h2>Agregar Comentario</h2>
        <input
          type="text"
          value={sitioTuristicoComentario}
          onChange={(e) => setSitioTuristicoComentario(e.target.value)}
          placeholder="ID del Sitio Turístico"
          className="input-field"
        />
        <input
          type="text"
          value={usuarioComentario}
          onChange={(e) => setUsuarioComentario(e.target.value)}
          placeholder="ID del Usuario"
          className="input-field"
        />
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Comentario"
          className="input-field"
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating"
          className="input-field"
        />
        <button className="submit-button" onClick={handleAgregarComentario}>
          Agregar Comentario
        </button>
      </div>

      <div className="action-buttons">
        <button 
          className="update-button"
          onClick={() => mostrarModalSeleccionarComentario('Actualizar')}
        >
          Actualizar Comentario
        </button>
        <button 
          className="delete-button"
          onClick={() => mostrarModalSeleccionarComentario('Eliminar')}
        >
          Eliminar Comentario
        </button>
      </div>
    </div>
  );
}
