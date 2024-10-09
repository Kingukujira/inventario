import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export function Comentario() {
  // Estados para agregar Comentario
  const [sitioTuristicoComentario, setSitioTuristicoComentario] = useState('');
  const [usuarioComentario, setUsuarioComentario] = useState('');
  const [comentario, setComentario] = useState('');
  const [rating, setRating] = useState('');

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
    </div>
  );
};
