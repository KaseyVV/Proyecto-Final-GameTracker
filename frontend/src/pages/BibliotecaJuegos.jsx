import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerJuegos } from "../api.js";
import TarjetaJuego from "../components/TarjetaJuego.jsx";
import './BibliotecaJuegos.css';



function BibliotecaJuegos() {
    const [juegos, setJuegos] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const cargarJuegos = async () => {
            try {
                const data = await obtenerJuegos();
                setJuegos(data);
            } catch (error) {
                console.log("Error al cargar juegos", error);
            }
        }; 
        cargarJuegos();
    }, []);

    return (
        <div className="biblioteca">
            <div className="biblioteca-header">
                <h1>Mi Biblioteca de Juegos</h1>
                <botton className="btn-agregar" onClick ={() => navigate("/nuevo")}> + Agragar Juegos </botton>
            </div>
        

            <div className="biblioteca-grid">
                {juegos.length === 0 ? (
                    juegos.map((juego) => (
                        <TarjetaJuego 
                            key={juego.id}
                            juego={juego}
                            onClick={() => navigate(`/juego/${juego.id}`)}
                        />
                    ))
                ) : (
                    <p className="biblioteca-vacia">No hay juegos en tu biblioteca. ¡Agrega algunos!</p>
                )}
            </div>
        </div>
    );
}
export default BibliotecaJuegos;