import { useState } from "react";

export const List = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [sitiosTuristicos, setSitiosTuristicos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [tiposServicios, setTiposServicios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  // Estados para el formulario
  const [newDepartamento, setNewDepartamento] = useState("");
  const [newMunicipio, setNewMunicipio] = useState("");
  const [newSitioTuristico, setNewSitioTuristico] = useState("");
  const [newServicio, setNewServicio] = useState("");
  const [newTipoServicio, setNewTipoServicio] = useState("");
  const [newUsuario, setNewUsuario] = useState("");
  const [newComentario, setNewComentario] = useState("");

  // Funciones para agregar elementos (puedes expandir esto según sea necesario)
  const addDepartamento = () => {
    setDepartamentos([...departamentos, { id: departamentos.length + 1, nombre: newDepartamento }]);
    setNewDepartamento("");
  };

  const addMunicipio = () => {
    setMunicipios([...municipios, { id: municipios.length + 1, nombre: newMunicipio }]);
    setNewMunicipio("");
  };

  const addSitioTuristico = () => {
    setSitiosTuristicos([...sitiosTuristicos, { id: sitiosTuristicos.length + 1, nombre: newSitioTuristico }]);
    setNewSitioTuristico("");
  };

  const addServicio = () => {
    setServicios([...servicios, { id: servicios.length + 1, nombre: newServicio }]);
    setNewServicio("");
  };

  const addTipoServicio = () => {
    setTiposServicios([...tiposServicios, { id: tiposServicios.length + 1, nombre: newTipoServicio }]);
    setNewTipoServicio("");
  };

  const addUsuario = () => {
    setUsuarios([...usuarios, { id: usuarios.length + 1, nombre: newUsuario }]);
    setNewUsuario("");
  };

  const addComentario = () => {
    setComentarios([...comentarios, { id: comentarios.length + 1, comentario: newComentario }]);
    setNewComentario("");
  };

  return (
    <div>
      <h1>Inventario</h1>
      
      <h2>Agregar Departamento</h2>
      <input
        type="text"
        placeholder="Nombre del Departamento"
        value={newDepartamento}
        onChange={(e) => setNewDepartamento(e.target.value)}
      />
      <button onClick={addDepartamento}>Agregar</button>

      <h2>Agregar Municipio</h2>
      <input
        type="text"
        placeholder="Nombre del Municipio"
        value={newMunicipio}
        onChange={(e) => setNewMunicipio(e.target.value)}
      />
      <button onClick={addMunicipio}>Agregar</button>

      <h2>Agregar Sitio Turístico</h2>
      <input
        type="text"
        placeholder="Nombre del Sitio Turístico"
        value={newSitioTuristico}
        onChange={(e) => setNewSitioTuristico(e.target.value)}
      />
      <button onClick={addSitioTuristico}>Agregar</button>

      <h2>Agregar Servicio</h2>
      <input
        type="text"
        placeholder="Nombre del Servicio"
        value={newServicio}
        onChange={(e) => setNewServicio(e.target.value)}
      />
      <button onClick={addServicio}>Agregar</button>

      <h2>Agregar Tipo de Servicio</h2>
      <input
        type="text"
        placeholder="Nombre del Tipo de Servicio"
        value={newTipoServicio}
        onChange={(e) => setNewTipoServicio(e.target.value)}
      />
      <button onClick={addTipoServicio}>Agregar</button>

      <h2>Agregar Usuario</h2>
      <input
        type="text"
        placeholder="Nombre del Usuario"
        value={newUsuario}
        onChange={(e) => setNewUsuario(e.target.value)}
      />
      <button onClick={addUsuario}>Agregar</button>

      <h2>Agregar Comentario</h2>
      <input
        type="text"
        placeholder="Comentario"
        value={newComentario}
        onChange={(e) => setNewComentario(e.target.value)}
      />
      <button onClick={addComentario}>Agregar</button>

      <h2>Mostrar Información</h2>
      <div>
        <h3>Departamentos</h3>
        <ul>
          {departamentos.map((dep) => (
            <li key={dep.id}>{dep.nombre}</li>
          ))}
        </ul>
        <h3>Municipios</h3>
        <ul>
          {municipios.map((mun) => (
            <li key={mun.id}>{mun.nombre}</li>
          ))}
        </ul>
        <h3>Sitios Turísticos</h3>
        <ul>
          {sitiosTuristicos.map((sitio) => (
            <li key={sitio.id}>{sitio.nombre}</li>
          ))}
        </ul>
        <h3>Servicios</h3>
        <ul>
          {servicios.map((servicio) => (
            <li key={servicio.id}>{servicio.nombre}</li>
          ))}
        </ul>
        <h3>Tipos de Servicio</h3>
        <ul>
          {tiposServicios.map((tipo) => (
            <li key={tipo.id}>{tipo.nombre}</li>
          ))}
        </ul>
        <h3>Usuarios</h3>
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>{usuario.nombre}</li>
          ))}
        </ul>
        <h3>Comentarios</h3>
        <ul>
          {comentarios.map((comentario) => (
            <li key={comentario.id}>{comentario.comentario}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

