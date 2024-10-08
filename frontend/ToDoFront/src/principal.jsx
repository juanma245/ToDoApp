import { useState,useContext,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HeaderComponent } from "./header"
import { FooterComponent } from "./footer"
import { ToDoCard } from "./toDoCard"
import { generalContx } from "./context/generalContext"
import agregarTodo from "./assets/agregar.svg"
import axios from "axios"
import "./styles/principal.css"

export function Principal(){
    
    //Uso del contexto 
    const {listOption,adding,changeAdding,changeComplete} = useContext(generalContx)
    const Navigate = useNavigate()
    //Estado para guardar la lista de tareas
    const [toDos,setToDos] = useState([{
        idTarea : 0,
        titulo : '',
        descripcion : '',
        estado : ''
    }])

    //Se obtienen la lista de tareas, esto se hace al cargar la página, y cada vez que se complete un cambio 
    useEffect(() => {
        axios.get("http://127.0.0.1:3002/task//listTasks",{withCredentials : true})
        .then(response => {
            setToDos(response.data)
        }).catch(() => {
            //En caso de error ir al login
            Navigate("/login")
        })
    },[Navigate,changeComplete])

    //Función para indicar que se está añadiendo una tarea nueva
    const addToDo = (event) => {
        event.preventDefault()
        changeAdding(true)

    }
    
    return(
        <>
            <HeaderComponent/>
            <main className="principalContent">
                <section>
                    <ul className="todoList">
                        {listOption === "all" ? toDos.map((toDo) => 
                        <li key={toDo.idTarea}>
                            <ToDoCard id = {toDo.idTarea} state={toDo.estado} title={toDo.titulo} description={toDo.descripcion}/>
                            
                        </li>) : null}
                        {listOption === "pending" ? toDos.filter((toDo => toDo.estado === "pending")).map((toDo) => 
                        <li key={toDo.idTarea}>
                            <ToDoCard id = {toDo.idTarea} state={toDo.estado} title={toDo.titulo} description={toDo.descripcion}/>
                        </li>) : null}
                        {listOption === "completed" ? toDos.filter((toDo => toDo.estado === "completed")).map((toDo) => 
                        <li key={toDo.idTarea}>
                            <ToDoCard  id = {toDo.idTarea} state={toDo.estado} title={toDo.titulo} description={toDo.descripcion}/>
                        </li>) : null}
                        {adding ? <li>
                            {listOption === "all" ? <ToDoCard id = {0} state="pending" title="" description="" edit create/> : <ToDoCard id = {0} state={listOption} title="" description="" edit create/> }
                        </li> : null}
                    
                    </ul>
                </section>
                <section>
                    {!adding ? <div className="addContent"><img src={agregarTodo} onClick={addToDo} alt="" /></div>: null}
                </section>

            </main>
            <FooterComponent/>
        </>
    )
}