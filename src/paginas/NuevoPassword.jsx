import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'


const NuevoPassword = () => {

    const params = useParams();
    const {token} = params;

    const [password, setPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [passwordModificado, setPasswordModificado] = useState(false);


    useEffect(() => {
        const comprobarToken = async () => {
            try {
                const {data} = await clienteAxios.get(`/olvide-password/${token}`);
                setTokenValido(true)
                setAlerta({
                    mensaje: data.mensaje,
                    error: false
                })

            } catch (error) {
                setAlerta({
                    mensaje: error.response.data.mensaje,
                    error: true
                })
            }
        }
        comprobarToken()
    },[])

    const {mensaje} = alerta;

    const handleSubmit = async e => {
        e.preventDefault();

        if(password === ''){
            setAlerta({
                mensaje: 'Todos los campos son obligatoios',
                error: true
            })
            return
        }

        if(password.length < 6){
            setAlerta({
                mensaje: 'El Password debe ser minimo 6 caracteres',
                error: true
            })
            return 
        }

        try {
            const {data} = await clienteAxios.post(`/olvide-password/${token}`, {password})

            setAlerta({
                mensaje: data.mensaje,
                error: false
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            })
        }
    }
        
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu password y no pierdas acceso a tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {mensaje && <Alerta alerta={alerta} />}
        
            { tokenValido && (
                <form 
                    className="my-10 bg-white shadow rounded-lg p-10"
                    onSubmit={handleSubmit}
                >
                    
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password"
                        >Nuevo Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Escribe tu Nuevo Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit"
                        value="Guardar Nuevo Password"
                        className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    />
                    
                </form>
            )}

            {passwordModificado && (
                    <Link 
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to="/"
                    >Inicia Sesión</Link>
            )}
        </>
    )
}
export default NuevoPassword;