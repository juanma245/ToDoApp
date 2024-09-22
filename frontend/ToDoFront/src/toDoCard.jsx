import { useState,useContext } from "react"
import { generalContx } from "./context/generalContext";
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


export function ToDoCard({title,description,state,id,edit,create}){
    const {changeChangeComplete,changeAdding} = useContext(generalContx)
    //Estado para saber si se esta editando la tarea 
    const [editing,setEditing] = useState(edit)
    
    //Estado que guarda los valores que se muestran en la tarjeta, se hizo así para poder hacerlo dinámico 
    const[taskCardValues,setTaskCardValues] = useState({
        idTask : id,
        title : title,
        description : description,
        state : state,
        edit : edit

    })

    //Estado que guarda los datos que se estan editando 
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
    
    //Función para indicar que se está editando una tarea
    const editTarea = () => {
        setEditing(true)
    }

    //Función para indicar que se canceló la edición de la tarea 
    const cancelEdit = () => {
        setEditing(false)
        changeAdding(false)
    }

    //Función para manejar los cambios en el estado taskEdit
    const handleTaskEditChange = (event) => {
        const { name, value } = event.target;
        setTaskEdit({
            ...taskEdit,
            [name]: value
            });
    };

    //Función para manejar los cambios en el estado taskCardValues
    const handleTaskCardValuesChange = (name,value) => {
        setTaskCardValues({
            ...taskCardValues,
            [name]: value
            });
    };

    //Función para editar la tarea
    const editTask = () => {
        let type = 0
        let datos = {}

        //Comprobación para saber que datos se enviaran en la petición
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
            //En caso de que no se haya realizado ningun cambio
            setEditing(false)
        }
        axios.patch("http://127.0.0.1:3002/task/editTask",datos,{withCredentials : true})
        .then(() => {
            //Comprobacion para cambiar los datos mostrados en la tarjeta
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

    //Función para crear una tarea
    const createTask = () => {
        //Datos que se envían a la petición 
        const datos = {
            title : taskEdit.title,
            description : taskEdit.description,
            state : taskCardValues.state
        }

        axios.post("http://127.0.0.1:3002/task/create",datos,{withCredentials:true})
        .then((response) => {
            //Actualización de los datos que se muestran en la tarjeta
            handleTaskCardValuesChange("idTask",response.data.idCreated)
            handleTaskCardValuesChange("title",taskEdit.title)
            handleTaskCardValuesChange("description",taskCardValues.description)

            setEditing(false)
            changeChangeComplete()
            changeAdding(false)
        })


    }

    //Función para saber si se está editando o creando una tarea
    const selectOption = (event) => {
        event.preventDefault()
        //Se valida que la tarea no quede sin titulo 
        if(taskEdit.title.length === 0){
            sweetMessage("Invalido","Por favor introduzca un nombre para la tarea","error")
        }
        else{
            //Se usa la bandera create para saber si es una edición o una creación  
            if(create){
                createTask()
            }
            else{
                editTask()
            }
        }
        
    }

    //Función para cambiar el estado de una tarea
    const changeTask = (event) => {
        event.preventDefault()

        let datos = {}

        //Según la clase se sabe si la tarea esta completada o pendiente
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

    //Función para eliminar una tarea
    const deleteTask = async(event) => {
        event.preventDefault()
        //Comprobación de seguridad
        const result = await Swal.fire({
            title: 'Eliminar tarea',
            text: "¿Está seguro de querer eliminar para siempre esta tarea?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        })
        if (result.isConfirmed) {
            const datos = {
                idTask : taskCardValues.idTask
            }

            axios.delete("http://127.0.0.1:3002/task/deleteTask",{withCredentials : true,data : datos})
            .then(() => {
                changeChangeComplete()
            })
          } 
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
                    <img src={eliminar} onClick={deleteTask} alt="" />
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