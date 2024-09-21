import { useState,useContext } from "react"
import PropTypes from 'prop-types';
import completar from "./assets/caja.svg"
import editar from "./assets/editar.svg"
import eliminar from "./assets/basura.svg"
import guardar from "./assets/disco.svg"
import cancelar from "./assets/eliminar-documento.svg"
import desmarcar from "./assets/circulo-marca-x.svg"
import axios from "axios"
import Swal from 'sweetalert2'

import "./styles/todoCard.css"
import { generalContx } from "./context/generalContext";

export function ToDoCard({title,description,state,id,edit,create}){
    const {changeChangeComplete,changeAdding} = useContext(generalContx)
    const [editing,setEditing] = useState(edit)
    
    const[taskCardValues,setTaskCardValues] = useState({
        idTask : id,
        title : title,
        description : description,
        state : state,
        edit : edit

    })

    const [taskEdit,setTaskEdit] = useState({
        title : taskCardValues.title,
        description : taskCardValues.description
    })

    const sweetMessage = (title,text,icon) => {
        Swal.fire({
            title : title,
            text: text,
            icon: icon,
            timer: 3000
        })
    }
    
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


    const editTask = () => {
        let type = 0
        let datos = {}

        if(taskEdit.title === taskCardValues.title && taskEdit.description !== taskCardValues.description){
            type = 1
            datos = {
                idTask : taskCardValues.idTask,
                description : taskEdit.description
            }
        }
        else if(taskEdit.title !== taskCardValues.title && taskEdit.description === taskCardValues.description){
            type = 2
            datos = {
                idTask : taskCardValues.idTask,
                title : taskEdit.title
            }
        }
        else if(taskEdit.title !== taskCardValues.title && taskEdit.description !== taskCardValues.description){
            type = 3
            datos = {
                idTask : taskCardValues.idTask,
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

    const createTask = () => {
        

        
            const datos = {
                title : taskEdit.title,
                description : taskEdit.description,
                state : taskCardValues.state
            }
            console.log(datos.state)
            axios.post("http://127.0.0.1:3002/task/create",datos,{withCredentials:true})
            .then((response) => {
                console.log(response.data)
                handleTaskCardValuesChange("idTask",response.data.idCreated)
                handleTaskCardValuesChange("title",taskEdit.title)
                handleTaskCardValuesChange("description",taskCardValues.description)

                setEditing(false)
                changeChangeComplete()
                changeAdding(false)
            })


    }

    const selectOption = (event) => {
        event.preventDefault()

        if(taskEdit.title.length === 0){
            sweetMessage("Invalido","Por favor introduzca un nombre para la tarea","error")
        }
        else{
            if(create){
                createTask()
            }
            else{
                editTask()
            }
        }
        
    }

    const changeTask = (event) => {
        event.preventDefault()

        let datos = {}

        if(event.target.className === "com"){
            datos = {
                idTask : taskCardValues.idTask,
                state : "pending"
            }
        }
        else if(event.target.className === "pen"){
            datos = {
                idTask : taskCardValues.idTask,
                state : "completed"
            }
        }

        axios.patch("http://127.0.0.1:3002/task/changeState",datos,{withCredentials : true})
        .then(() => {
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
                    <img src={guardar} alt="" onClick={selectOption} />
                    <img src={cancelar} onClick={cancelEdit} alt="" />
                </> : 
                <>
                    {state === "completed" ? <img className = "com" src={desmarcar} onClick={changeTask}alt="" /> : <img className="pen" src={completar} onClick={changeTask} alt="" />}
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
    edit : PropTypes.bool,
    create : PropTypes.bool

  };