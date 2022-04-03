import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/ClienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const {setAuth} = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes('')){
            setAlerta({
                mensaje: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        try {
            const {data} = await clienteAxios.post('/login', {email, password});
            localStorage.setItem('token', data.token);
            
            setAuth(data)

            if(data){
                navigate('/proyectos')
            }

        } catch (error) {
            setAlerta({
                mensaje: "Hubo un error intente mas tarde",
                error: true
            })
        }
    }

    const {mensaje} = alerta;

    return ( 
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Inicia Sesion y Administra tus {""}
                <span className="text-slate-700">Proyectos</span>
             </h1>
            {mensaje && <Alerta alerta={alerta}/>}
             <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                 <h1 className="font-bold text-center pb-5 text-4xl text-sky-600">Iniciar Sesion</h1>
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

                 <div className="my-5">
                     <label 
                        className="uppercase text-grey-600 block text-xl font-bold"
                        htmlFor="password"
                    >Password</label>
                     <input
                        id="password" 
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 border  bg-gray-50 px-6 py-2"
                        value={password}
                        onChange={e => setPassword(e.target.value)}    
                    />
                 </div>

                 <input 
                    type="submit" 
                    value="Iniciar Sesion"
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
             </form>

             <nav className='lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to="/registrar"
                    >¿ No tienes una cuenta? Registrate</Link>

                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to="/olvide-password"
                    >Olvide Mi Password</Link>
                </nav>
        </>
        
     );
}
 
export default Login;