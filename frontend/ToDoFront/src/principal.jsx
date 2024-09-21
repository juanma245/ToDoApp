import { useState,useContext,useEffect } from "react"
import { HeaderComponent } from "./header"
import { FooterComponent } from "./footer"
import { ToDoCard } from "./toDoCard"
import { generalContx } from "./context/generalContext"
import { useNavigate } from "react-router-dom"
import agregarTodo from "./assets/agregar.svg"
import axios from "axios"
import "./styles/principal.css"

export function Principal(){
    
    const {listOption,adding,changeAdding,changeComplete} = useContext(generalContx)
    const Navigate = useNavigate()
    const [toDos,setToDos] = useState([{
        idTarea : 0,
        titulo : '',
        descripcion : '',
        estado : ''
    }])



    useEffect(() => {
        axios.get("http://127.0.0.1:3002/task//listTasks",{withCredentials : true})
        .then(response => {
            setToDos(response.data)
        }).catch(() => {
            Navigate("/login")
        })
    },[Navigate,changeComplete])

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
                            {listOption === "all" ? <ToDoCard id = {0} state="pending" title="" description="" edit/> : <ToDoCard id = {0} state={listOption} title="" description="" edit/> }
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