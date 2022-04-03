import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "../components/Busqueda";

const Header = () => {

    const {handleBuscador, cerrarSesionProyecto} = useProyectos();
    const {cerrarSesion} = useAuth();

    const handleCerrarSesion = () => {
        cerrarSesionProyecto();
        cerrarSesion();
        localStorage.removeItem('token')
    }

    return ( 
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center">
                    MernTask
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-4">

                <button
                    type="button"
                    className="font-bold uppercase"
                    onClick={handleBuscador}
                >Buscar Proyectos</button>

                    <Link
                        to="/proyectos"
                        className="font-bold uppercase"
                    >Proyectos</Link>

                    <button
                        type="button"
                        className="text-white text-sm bg-sky-600 p-3 rounded-md font-bold uppercase"
                        onClick={handleCerrarSesion}
                    >Cerrar Sesion</button>

                    <Busqueda />
                </div>
            </div>
        </header>
     );
}
 
export default Header;