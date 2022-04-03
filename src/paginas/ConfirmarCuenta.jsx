import { useEffect, useState } from "react";
import {useParams, Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from "../config/ClienteAxios";

const ConfirmarCuenta = () => {
    
    const [alerta, setAlerta] = useState({})
    const [confirmada, cuentaConfirmada] = useState(false)

    const params = useParams();

    const {token} = params;

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const confirmarCuenta = await clienteAxios.get(`/confirmar/${token}`);
                setAlerta({
                    mensaje: confirmarCuenta.data.mensaje,
                    error: false
                })

                cuentaConfirmada(true)
            } catch (error) {
                setAlerta({
                    mensaje: error.response.data.mensaje,
                    error: true
                })
            }
        }

        consultarAPI()
    }, [])

    const {mensaje} = alerta;

    return ( 
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Confirma Tu Cuenta y Asi Puedes Crear Tus {''}
                <span className="text-slate-700">Proyectos</span>
            </h1>

            <div className="mt-20 md:mt-5 shadow-lg px-10 py-10 rounded-xl bg-white">
                { mensaje && <Alerta alerta={alerta} /> }
                {confirmada && (
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to="/"
                     >Inicia Sesion</Link>
                )}
            </div>
        </>
     );
}
 
export default ConfirmarCuenta;