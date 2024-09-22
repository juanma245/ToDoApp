import { useContext } from "react"
import { generalContx } from "./context/generalContext"
import "./styles/header.css"


export function HeaderComponent(){
    //Uso de el contexto 
    const {changeListOption,adding} = useContext(generalContx)
 

    //Función para seleccionar que lista quiere ver, si las pendientes, completadas o todas
    const selectListOption = (event) => {
        if(!adding){
            changeListOption(event.target.id)
        }
        
    }
    return(
        <header>
            <div>
                <h4 id="all" onClick={selectListOption}>Todas</h4>
                <h4 id ="pending" onClick={selectListOption}>Pendientes</h4>
                <h4 id ="completed" onClick={selectListOption}>Completadas</h4>
            </div>
        </header>

    )
}