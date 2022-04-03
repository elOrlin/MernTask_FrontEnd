import { useEffect, useState } from "react";
import useProyectos from "../hooks/useProyectos";
import  Alerta from '../components/Alerta';
import { useParams } from "react-router-dom";

const FormularioModal = () => {

    const params = useParams();

    //state de las tareas
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');

    const { alerta, mostrarAlerta, submitTarea, handleModalTarea, tarea} = useProyectos();

    const PRIORIDAD = ['Baja', 'Media', 'Alta'];

    useEffect(() => {
        if(tarea?._id) {
            setId(tarea._id)
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0])
            setPrioridad(tarea.prioridad)
            return
        } 

        setId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')

    }, [tarea])

    const handleSubmit = async e => {

        e.preventDefault(); 

        if([nombre, descripcion, prioridad].includes('')){
            mostrarAlerta({
                mensaje: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }

        await submitTarea({id, nombre, descripcion, fechaEntrega, prioridad, proyecto: params.id});

            setId('')
            setNombre('')
            setDescripcion('')
            setFechaEntrega('')
            setPrioridad('')
            handleModalTarea(false)
            setTarea({})
    }

    const {mensaje} = alerta;

    return ( 
        <>
            {id ? 'Editar Tarea' : 'Crear Tarea'}
            {mensaje && <Alerta alerta={alerta} />}
            <form className="mt-10" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label 
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="nombre" 
                    >
                        Nombre Tarea
                     </label>
                     <input 
                        type="text" 
                        id="nombre"
                        placeholder="Nombre de la Tarea"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="descripcion"
                    >
                        Descripcion Tarea
                     </label>
                     <input 
                        type="text" 
                        id="descripcion"
                        placeholder="Descripcion de la Tarea"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="fechaEntrega"
                    >
                        Fecha Entrega Tarea
                     </label>
                     <input 
                        type="Date" 
                        id="fechaEntrega"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fechaEntrega}
                        onChange={e => setFechaEntrega(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="prioridad" 
                    >
                        Prioridad Tarea
                     </label>
                     <select 
                        type="text" 
                        id="prioridad"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={prioridad}
                        onChange={e => setPrioridad(e.target.value)}
                    >
                    <option value="">--Seleccione --</option>
                    {PRIORIDAD.map(prioridad => (
                        <option key={prioridad}>{prioridad}</option>
                    ))}
                    </select>
                </div>

                <input
                   type="submit"
                   className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
                   value={ id ? 'Guardar Cambios' : 'Crear Tarea'}
                />
            </form>
        </>
     );
}
 
export default FormularioModal;