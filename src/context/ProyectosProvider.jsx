import {useState, useEffect, createContext, lazy} from "react";
import clienteAxios from "../config/ClienteAxios";
import { useNavigate} from "react-router-dom";
import useAuth from '../hooks/useAuth';


const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    //state de los proyectos
    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [tarea, setTarea] = useState({});
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
    const [colaborador, setColaborador] = useState({})

    const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
    const [modalColaborador, setModalColaborador] = useState(false);
    const [buscador, setBuscador] = useState(false)


    //state de los colaboradores
    const [email, setEmail] = useState('');


    const navigate = useNavigate();
    const { auth } = useAuth()


    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.get('/obtener-proyectos', config)
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [auth])


    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }


    const submitProyecto = async proyecto => {
        if(proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
    }

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

            // Sincronizar el state
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            setAlerta({
                mensaje: 'Proyecto Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/crear-proyectos', proyecto, config)

            setProyectos([...proyectos, data])

            setAlerta({
                mensaje: 'Proyecto Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.get(`/proyectos/${id}`, config )
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

            // Sincronizar el state
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id )
            setProyectos(proyectosActualizados)

            setAlerta({
                mensaje: data.mensaje,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea = async tarea => {
        if(tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }
    }

    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/agregar', tarea, config)

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = [...proyecto.tareas, data]
            setProyecto(proyectoActualizado)

            setAlerta({
                mensaje: 'Tarea Creada Correctamente',
                error: false
            })

            setTimeout(() => {
                setModalFormularioTarea(false)
                setAlerta({})
            }, 3000);

        } catch (error) {
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            })
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/${tarea.id}`, tarea, config)
            
            const proyectosActualizado = {...proyecto}
            proyectosActualizado.tareas = proyectosActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
            setProyecto(proyectosActualizado)
            
            setAlerta({
                mensaje: data.mensaje,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);

            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () => {
    
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/${tarea._id}`, config)

            setAlerta({
                mensaje: data.mensaje,
                error: false
            })
            
            setModalEliminarTarea(false)

            setTarea(tarea)

            eliminarTareaProyecto(data)

            setTimeout(() => {
                setTarea({})
            }, 3000);


        } catch (error) {
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            })
        }
    }

    const submitColaborador = async email => {
        
        setCargando(true)
        
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/nuevo-colaborador', { email }, config)

            setColaborador(data)

            setAlerta({})

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false)
        }
    }

    const agregarColaborador = async email => {

        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/colaboradores/${proyecto._id}`,  {email} , config)
        
            setAlerta({
                mensaje: data.mensaje,
                error: false
            })

            setColaborador({})

            setTimeout(() => {
                setAlerta({})
            }, 3000);

        } catch (error) {
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            })
        }
    }

    const handleColaborador = (colaborador) => {
        setModalColaborador(!modalColaborador)
        setColaborador(colaborador)
    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/eliminar-colaboradores/${proyecto._id}`,  {id: colaborador._id}, config)

            const proyectoActualizado = {...proyecto}

            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id )

            setProyecto(proyectoActualizado)
            setAlerta({
                mensaje: data.mensaje,
                error: false
            })

            setColaborador({})
            setModalColaborador(false)
            setAlerta({})
            
        } catch (error) {
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            })
        }
    }
        
    const completarTarea = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/estado/${id}`, {}, config);
            const proyectoActualizado = {...proyecto};

            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
            setProyecto(proyectoActualizado)
            setAlerta({})
        } catch (error) {
            console.log(error)
        }
    }

    const handleBuscador = async () => {
        setBuscador(!buscador)
    }

    const submitSocket = () => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado);
    }

    const submitTareasProyecto = (tarea) => {
        submitSocket(tarea)
    }

    const eliminarSocket = () => {
        const proyectosActualizado = {...proyecto}
        proyectosActualizado.tareas = proyectosActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)
        setProyecto(proyectosActualizado)
    }

    const eliminarTareaProyecto = tarea => {
        eliminarSocket(tarea)
    }

    const cerrarSesionProyecto = () => {
        setProyectos([])
        setProyecto({})
        setAlerta({})
        navigate(`/`)
    }
        
    return ( 
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,

                //tareas
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,

                //colaboradores
                email,
                setEmail,
                colaborador,
                submitColaborador,
                agregarColaborador,
                modalColaborador,
                handleColaborador,
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                eliminarTareaProyecto,
                cerrarSesionProyecto
            }}
        >{children}</ProyectosContext.Provider>
     );
}

export {ProyectosProvider}
 
export default ProyectosContext