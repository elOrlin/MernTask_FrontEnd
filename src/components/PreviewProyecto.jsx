import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({proyecto}) => {
    
    const {auth} = useAuth();
    const {nombre, _id, cliente, creador} = proyecto;
   console.log()
    return ( 
        <div className="border-b p-5 flex flex-col md:flex-row justify-between">
            <div className="flex items-center gap-2">
                <p className="flex-1">
                    {nombre}
                    
                    <span className="text-sm text-gray-500 uppercase"> {""} {cliente}</span>
                </p>

                {auth._id !== creador && (
                    <p className="font-bold text-sm uppercase rounded-lg text-white p-1 cursor-pointer bg-green-500">Colaborador</p>
                )}
            </div>

            <Link
                to={`${_id}`}
            >Ver Proyecto</Link>
        </div>
     );
}
 
export default PreviewProyecto;