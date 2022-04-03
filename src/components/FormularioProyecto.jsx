import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')
    
    const params = useParams();
    const { mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos();

    useEffect(() => {
        if(params.id && proyecto.nombre){
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                mensaje: 'Todos los Campos son Obligatorios',
                error: true
            })

            return 
        }

       await  submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})
       mostrarAlerta({})
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

    const {mensaje} = alerta;

    return ( 
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg" onSubmit={handleSubmit}>
            {mensaje && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm shadow">Nombre Proyecto</label>
                    <input 
                        id="nombre"
                        type="text" 
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre del Proyecto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />

                <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm shadow">Descripcion del Proyecto</label>
                    <input 
                        id="descripcion"
                        type="text" 
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Descripcion del Proyecto"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                    />

                <label htmlFor="fechaEntrega" className="text-gray-700 uppercase font-bold text-sm shadow">Fecha Entrega del Proyecto</label>
                    <input 
                        id="fechaEntrega"
                        type="date" 
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fechaEntrega}
                        onChange={e => setFechaEntrega(e.target.value)}
                    />

                <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm shadow">Cliente del Proyecto</label>
                    <input 
                        id="cliente"
                        type="text" 
                        className="border w-full p-2 mt-2 mb-6 placeholder-gray-400 rounded-md"
                        placeholder="Nombre del Proyecto"
                        value={cliente}
                        onChange={e => setCliente(e.target.value)}
                    />
            </div>
            <input 
                type="submit"
                value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer"
            />
        </form>
     );
}
 
export default FormularioProyecto;