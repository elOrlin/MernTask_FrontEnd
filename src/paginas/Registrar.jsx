import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/ClienteAxios';

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({})

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')) {
           setAlerta({
               mensaje: 'Todos los campos son obligatorios',
               error: true
           })
           return
        }

        if(password !== repetirPassword ) {
            setAlerta({
                mensaje: 'Los password no son iguales',
                error: true
            })
            return
        }

        if(password.length < 6 ) {
            setAlerta({
                mensaje: 'El Password es muy corto, agrega minimo 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        // Crear el usuario en la API
       try {
        const {data} = await clienteAxios.post('/usuarios', {nombre, email, password});
        setAlerta({
            mensaje: data.mensaje,
            error: false
        })

        navigate('/')
        
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
            Crea Tu Cuenta y Administra tus {""}
            <span className="text-slate-700">Proyectos</span>
         </h1>
        {mensaje && <Alerta alerta={alerta}/>}
         <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
             <h1 className="font-bold text-center pb-5 text-4xl text-sky-600">Crear Cuenta</h1>
             <div className="my-5">
                 <label 
                    className="uppercase text-grey-600 block text-xl font-bold"
                    htmlFor="nombre"
                >nombre</label>
                 <input
                    id="nombre" 
                    type="text"
                    placeholder="Tu Nombre"
                    className="w-full mt-3 border  bg-gray-50 px-6 py-2"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}  
                />
             </div>

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
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full mt-3 border  bg-gray-50 px-6 py-2"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
             </div>

             <div className="my-5">
                 <label 
                    className="uppercase text-grey-600 block text-xl font-bold"
                    htmlFor="password"
                >Repetir Password</label>
                 <input
                    id="password" 
                    type="password"
                    placeholder="Repetir tu Password"
                    className="w-full mt-3 border  bg-gray-50 px-6 py-2"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
             </div>

             <input 
                type="submit" 
                value="Crear Cuenta"
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
                    to="/olvide-password"
                >Olvide Mi Password</Link>
            </nav>
    </>
     );
}
 
export default Registrar;