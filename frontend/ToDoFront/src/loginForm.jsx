import { useContext } from "react"
import { generalContx } from "./context/generalContext"
import { useNavigate } from "react-router-dom"
import user from "./assets/usuario.svg"

export function LoginForm(){

    const Navigate = useNavigate()

    const {changeLoginOption} = useContext(generalContx)
    
    const seleccionar = () => {
        changeLoginOption(1)
    }

    const logged = (event) => {
        event.preventDefault()
        Navigate("/principal")
        
    } 

    return <>
            <form onSubmit={logged}>
                <img src={user} alt="" />
                <input 
                    type="text"
                    placeholder="Usuario" />
                <input 
                    type="password"
                    placeholder="Contraseña" />
                <button type="submit">Login</button>
                <button onClick={seleccionar}>Registrar</button>

            </form>
        </>
}