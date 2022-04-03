import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from '../components/PreviewProyecto';
import Alerta from "../components/Alerta";

const Proyectos = () => {

    const {proyectos, alerta} = useProyectos();

    const {mensaje} = alerta;

    return (  
        <>
            <h1 className="text-4xl font-black">Proyectos</h1>
            {mensaje && <Alerta alerta={alerta}/>}
            <div className="bg-white shadow mt-10 rounded-lg p-5">
                {proyectos.length ? 
                proyectos.map(proyecto => (
                    <PreviewProyecto 
                        key={proyecto._id}
                        proyecto={proyecto}
                    />
                 )) 
               : <p className="mt-5 text-center text-gray-600 uppercase p-5">no hay proyectos aun</p>}
            </div>
        </>
    );
}
 
export default Proyectos;