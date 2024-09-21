import { useContext, useState } from "react"
import { generalContx } from "./context/generalContext"
import newUser from "./assets/agregar-usuario.svg"
import axios from 'axios'
import Swal from 'sweetalert2'


export function SinginForm(){

    const {changeLoginOption} = useContext(generalContx)
    const [user,setUser] = useState({
        name : '',
        user : '',
        password : '',
    })
    
    const seleccionar = () => {
        setUser({
            name : '',
            user : '',
            password : '',
        })
        changeLoginOption(0)
    }

    const sweetMessage = (title,text,icon) => {
        Swal.fire({
            title : title,
            text: text,
            icon: icon,
            timer: 3000
        })
    }

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
            });
    };

    const cerateUser = async() => {
        axios.post("http://127.0.0.1:3002/user/create",user)
                .then(response => {
                    sweetMessage(response.data.message,"Se creo el usuario, por favor ingrese","success")
                    changeLoginOption(0)
                })
    }
    const validRegister = (event) => {
        event.preventDefault()

        if(user.name.length < 3 || user.name.length > 50){
            sweetMessage("Nombre no valido","el Nombre debe tener entre 3 y 50 caracteres","error")
        }
        else if(user.user.length < 4 || user.user.length > 50){
            sweetMessage("Usuario no valid0", "el usuario debe tener entre 4 y 50 caracteres", "error")
        }
        else if(user.password.length < 8 || user.password.length > 16){
            sweetMessage("contraseña no valida", "la contraseña debe tener entre 8 y 16 caracteres","error")
        }
        else{
            cerateUser()
        }

    }

    return(
        <>
            <form onSubmit={validRegister}>
                <img src={newUser} alt="" />
                <input 
                    type="text"
                    placeholder="Nombre" 
                    name="name"
                    value={user.name}
                    onChange={handleUserChange}/>
                <input 
                    type="text"
                    placeholder="Usuario" 
                    name="user"
                    value={user.user}
                    onChange={handleUserChange}/>
                    
                <input 
                    type="password" 
                    placeholder="Contraseña"
                    name="password"
                    value={user.password}
                    onChange={handleUserChange}/>

                <button type="submit">Registrar</button>
                <button onClick={seleccionar}>Cancelar</button>
            </form>
        </>
    )
}