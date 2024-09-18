import { useState,useContext } from "react"
import { HeaderComponent } from "./header"
import { FooterComponent } from "./footer"
import { generalContx } from "./context/generalContext"
import agregarTodo from "./assets/agregar.svg"
import "./styles/principal.css"

export function Principal(){
    
    const {listOption,adding,changeAdding} = useContext(generalContx)

    const [toDos,setToDos] = useState([
        {
            id : 1,
            nombre : "tarea 1",
            descripcion : "descripcion 1",
            estado : "waiting"
        },
        {
            id : 2,
            nombre : "tarea 2",
            descripcion : "descripcion 2",
            estado : "waiting"
        },
        {
            id : 3,
            nombre : "tarea 3",
            descripcion : "descripcion 3",
            estado : "completed"
        }
    ])

    const addToDo = (event) => {
        event.preventDefault()
        changeAdding(true)

    }
    
    return(
        <>
            <HeaderComponent/>
            <main className="principalContent">
                <section>
                    <ul>
                        {listOption === "all" ? toDos.map((toDo) => 
                        <li key={toDo.id}>
                            <article className={toDo.estado}>
                                <h3>{toDo.nombre}</h3>
                                <h3>{toDo.descripcion}</h3>
                            </article>
                        </li>) : null}
                        {listOption === "waiting" ? toDos.filter((toDo => toDo.estado === "waiting")).map((toDo) => 
                        <li key={toDo.id}>
                            <article className={toDo.estado}>
                                <h3>{toDo.nombre}</h3>
                                <h3>{toDo.descripcion}</h3>
                            </article>
                        </li>) : null}
                        {listOption === "completed" ? toDos.filter((toDo => toDo.estado === "completed")).map((toDo) => 
                        <li key={toDo.id}>
                            <article className={toDo.estado}>
                                <h3>{toDo.nombre}</h3>
                                <h3>{toDo.descripcion}</h3>
                            </article>
                        </li>) : null}
                        {adding ? <li>
                            <article>
                                <h3>preparando</h3>
                                <h3>preparando</h3>
                            </article>
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