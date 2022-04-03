import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {

    const {email, setEmail, mostrarAlerta, alerta, submitColaborador} = useProyectos();

    const handleSumit = (e) => {
        e.preventDefault();

        if(email === ''){
            mostrarAlerta({
                mensaje: 'El Email Es Obligatorio',
                error: true
            })

            return
        }
        
        submitColaborador(email)
    }

    const {mensaje} = alerta;

    return ( 
        <form className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow" onSubmit={handleSumit}>
            {mensaje && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label 
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="email" 
                    >
                        Email Colaborador
                     </label>
                     <input 
                        type="email" 
                        id="email"
                        placeholder="Email del Usuario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input
                   type="submit"
                   className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
                   value='Añadir Colaboradores'
                />
        </form>
     );
}
 
export default FormularioColaborador;