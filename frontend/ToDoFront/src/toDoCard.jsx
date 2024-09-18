import { useState } from "react"
import PropTypes from 'prop-types';
import completar from "./assets/caja.svg"
import editar from "./assets/editar.svg"
import eliminar from "./assets/basura.svg"
import guardar from "./assets/disco.svg"
import cancelar from "./assets/eliminar-documento.svg"
import desmarcar from "./assets/circulo-marca-x.svg"

import "./styles/todoCard.css"

export function ToDoCard({title,description,state,edit}){
    const [editing,setEditing] = useState(edit)

    const editTarea = () => {
        setEditing(true)
    }
    const cancelEdit = () => {
        setEditing(false)
    }

    return(
        <article className={state} >
            <div className="toDoCardInfo">
                {editing ? 
                <>
                    <input 
                        type="text" 
                        value={title}/>
                    <input 
                        type="text" 
                        value={description}/>
                </>: 
                <>
                    <h3>{title}</h3>
                    <h3>{description}</h3>
                </>
                }
                
            </div>
            <div className="todoCardOptions">
                {editing ? 
                <>
                    <img src={guardar} alt="" />
                    <img src={cancelar} onClick={cancelEdit} alt="" />
                </> : 
                <>
                    {state === "completed" ? <img src={desmarcar} alt="" /> : <img src={completar} alt="" />}
                    <img src={editar} onClick={editTarea} alt="" />
                    <img src={eliminar} alt="" />
                </>}

                
            </div>
            
        </article>
    )
}

ToDoCard.propTypes = {
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    state : PropTypes.string.isRequired,
    edit : PropTypes.bool

  };