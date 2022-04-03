import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/ClienteAxios';

const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({})

    const handleSumit = async e => {
        e.preventDefault();

        if(email === '' || email.length < 6){
            setAlerta({
                mensaje: 'El Email es obligatorio',
                error: true
            })

            return 
        }   


        try {
            const {data} = await clienteAxios.post('/olvide-password', {email});
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

    const {mensaje} = alerta;

    return ( 
        <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">
            Recupera tu acceso y no pierdas tus {""}
            <span className="text-slate-700">Proyectos</span>
         </h1>

        {mensaje && <Alerta alerta={alerta}/>}

         <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSumit}>
             <h1 className="font-bold text-center pb-5 text-4xl text-sky-600">Recuperar Password</h1>
            

             <div className="my-5">
                 <label 
                    className="uppercase text-grey-600 block text-xl font-bold"
                    htmlFor="email"
                >Email</label>
                 <input
                    id="email" 
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 border  bg-gray-50 px-6 py-2"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
             </div>

             <input 
                type="submit" 
                value="Enviar Instrucciones"
                className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
         </form>

         <nav className='lg:flex lg:justify-between'>
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/"
                >¿Ya tienes una cuenta? inicia Sesion</Link>

                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/registrar"
                >¿No tienes una cuenta? Registrate</Link>
            </nav>
    </>
     );
}
 
export default OlvidePassword;