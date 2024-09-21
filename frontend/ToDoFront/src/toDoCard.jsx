import { useState,useContext } from "react"
import PropTypes from 'prop-types';
import completar from "./assets/caja.svg"
import editar from "./assets/editar.svg"
import eliminar from "./assets/basura.svg"
import guardar from "./assets/disco.svg"
import cancelar from "./assets/eliminar-documento.svg"
import desmarcar from "./assets/circulo-marca-x.svg"
import axios from "axios"

import "./styles/todoCard.css"
import { generalContx } from "./context/generalContext";

export function ToDoCard({title,description,state,id,edit}){
    const {changeChangeComplete} = useContext(generalContx)
    const [editing,setEditing] = useState(edit)
    
    const [taskEdit,setTaskEdit] = useState({
        title : '',
        description : ''
    })

    const[taskCardValues,setTaskCardValues] = useState({
        title : title,
        description : description,
        edit : edit

    })
    


    const editTarea = () => {
        setEditing(true)
    }
    const cancelEdit = () => {
        setEditing(false)
    }

    const handleTaskEditChange = (event) => {
        const { name, value } = event.target;
        setTaskEdit({
            ...taskEdit,
            [name]: value
            });
    };

    const handleTaskCardValuesChange = (name,value) => {
        setTaskCardValues({
            ...taskCardValues,
            [name]: value
            });
    };


    const createTask = (event) => {
        event.preventDefault()
        let type = 0
        let datos = {}
        if(taskEdit.title.length === 0 && taskEdit.description.length !== 0){
            type = 1
            datos = {
                idTask : id,
                description : taskEdit.description
            }
        }
        else if(taskEdit.title.length !== 0 && taskEdit.description.length === 0){
            type = 2
            datos = {
                idTask : id,
                title : taskEdit.title
            }
        }
        else if(taskEdit.title.length !== 0 && taskEdit.description.length !== 0){
            type = 3
            datos = {
                idTask : id,
                title : taskEdit.title,
                description : taskEdit.description
            }
        }
        else{
            setEditing(false)
        }
        axios.patch("http://127.0.0.1:3002/task/editTask",datos,{withCredentials : true})
        .then(() => {
            if(type === 1){
                handleTaskCardValuesChange("description",taskEdit.description)
            }
            else if(type === 2){
                handleTaskCardValuesChange("title",taskEdit.title)
            }
            else if(type === 3){
                handleTaskCardValuesChange("description",taskEdit.description)
                handleTaskCardValuesChange("title",taskEdit.title)
            }

            setEditing(false)
            changeChangeComplete()
            
        })
    }


    return(
        <article className={state} >
            <div className="toDoCardInfo">
                {editing ? 
                <>
                    <input 
                        type="text" 
                        name = "title"
                        placeholder={taskCardValues.title}
                        value={taskEdit.title}
                        onChange={handleTaskEditChange}/>
                    <input 
                        type="text" 
                        placeholder={taskCardValues.description}
                        name = "description"
                        value={taskEdit.description}
                        onChange={handleTaskEditChange}/>
                </>: 
                <>
                    <h3>{taskCardValues.title}</h3>
                    <h3>{taskCardValues.description}</h3>
                </>
                }
                
            </div>
            <div className="todoCardOptions">
                {editing ? 
                <>
                    <img src={guardar} alt="" onClick={createTask} />
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
    id : PropTypes.number.isRequired,
    edit : PropTypes.bool

  };