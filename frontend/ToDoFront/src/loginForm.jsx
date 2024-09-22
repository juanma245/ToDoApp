import { useContext,useState } from "react"
import { generalContx } from "./context/generalContext"
import { useNavigate } from "react-router-dom"
import userImage from "./assets/usuario.svg"
import Swal from 'sweetalert2'
import axios from "axios"

export function LoginForm(){
    //Constante para navegar entre las paginas
    const Navigate = useNavigate()

    //Uso del contexto
    const {changeLoginOption} = useContext(generalContx)
    //Estado donde se guarda los datos del inicio de sesión 
    const [user,setUser] = useState({
        user : '',
        password : '',
    })

    //Función para los mensajes de alerta
    const sweetMessage = (title,text,icon) => {
        Swal.fire({
            title : title,
            text: text,
            icon: icon,
            timer: 3000
        })
    }
    
    //Función para cambiar entre login y registro 
    const seleccionar = () => {
        changeLoginOption(1)
    }

    //Función para manejar los cambios del estado user
    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
            });
    };

    //Función para inciar sesión
    const logged = () => {
        //llamada a la Api
        axios.post("http://127.0.0.1:3002/user/login",user,{withCredentials : true})
        .then(() => {
            Navigate("/principal")
        }).catch(() => {
            //Mensaje de error
            sweetMessage("incorrecto","usuario o contraseña incorrecta","error")
        })
        
        
    } 

    //Función para validar los datos de entrada
    const validLogin = (event) => {
        event.preventDefault()
        
        if(user.user.length < 4 || user.user.length > 50){
            sweetMessage("Usuario no valido", "el usuario debe tener entre 4 y 50 caracteres", "error")
        }
        else if(user.password.length < 8 || user.password.length > 16){
            sweetMessage("contraseña no valida", "la contraseña debe tener entre 8 y 16 caracteres","error")
        }
        else{
            logged()
        }
    }

    return <>
            <form onSubmit={validLogin}>
                <img src={userImage} alt="" />  
                <input 
                    type="text"
                    placeholder="Usuario"
                    name="user"
                    value={user.user}
                    onChange={handleUserChange} />
                <input 
                    type="password"
                    placeholder="Contraseña" 
                    name="password"
                    value={user.password}
                    onChange={handleUserChange}/>
                <button type="submit">Login</button>
                <button onClick={seleccionar}>Registrar</button>

            </form>
        </>
}