import { useContext } from "react"
import { generalContx } from "./context/generalContext"
import newUser from "./assets/agregar-usuario.svg"


export function SinginForm(){

    const {changeLoginOption} = useContext(generalContx)
    
    const seleccionar = () => {
        changeLoginOption(0)
    }

    return(
        <>
            <form action="">
                <img src={newUser} alt="" />
                <input 
                    type="text"
                    placeholder="Nombre" />
                <input 
                    type="text"
                    placeholder="Usuario" />
                <input 
                    type="password" 
                    placeholder="Contraseña"/>
                <input 
                    type="password"
                    placeholder="Confirmar contraseña" />
                <button type="submit">Registrar</button>
                <button onClick={seleccionar}>Cancelar</button>
            </form>
        </>
    )
}