import { useEffect, useState } from "react";
import { obtenerJuegos } from "../api";
import TarjetaJuego from "../components/TarjetaJuego";
import FormularioJuego from "../pages/FormularioJuego";
import "./BibliotecaJuegos.css";

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorConexion, setErrorConexion] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargarJuegos = async () => {
    try {
      setCargando(true);
      const data = await obtenerJuegos();
      setJuegos(data);
      setErrorConexion(false);
    } catch (error) {
      console.error("Error al cargar los juegos:", error.message);
      setErrorConexion(true);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  return (
    <div className="biblioteca">
      <div className="biblioteca-header">
        <h1>🎮 Mi Biblioteca</h1>
        <button className="btn-agregar" onClick={() => setMostrarFormulario(true)}>+ Agregar Juego</button>
      </div>

      {mostrarFormulario && (
        <FormularioJuego
          onClose={() => setMostrarFormulario(false)}
          onJuegoAgregado={cargarJuegos}
        />
      )}

      <div className="contenedor-juegos">
        {cargando ? (
          <p className="biblioteca-vacia">⏳ Cargando juegos...</p>
        ) : errorConexion ? (
          <div className="estado-error">
            <h3>⚠️ No se pudo conectar con el servidor</h3>
            <p>Verifica si el backend está encendido.</p>
          </div>
        ) : juegos.length === 0 ? (
          <div className="biblioteca-grid">
            {juegos.map((juego) => (
              <TarjetaJuego key={juego._id} juego={juego} />
            ))}
          </div>
        ) : (
          <p className="biblioteca-vacia">No hay juegos en tu biblioteca. ¡Agrega algunos!</p>
        )}
      </div>
    </div>
  );
};

export default BibliotecaJuegos;
