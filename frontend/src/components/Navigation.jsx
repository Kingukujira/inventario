import { Link } from 'react-router-dom';

export function Navigation() {
  return (
   <div> 
    <Link to="/crear formulario">
     <h1>Crear formulario</h1>
     </Link>
        <Link to="/Inventario">
        <h1>Inventario</h1>
        </Link>
    </div>
  )
}
