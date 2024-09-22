import { useState } from "react";
import { generalContx } from "./generalContext";
import PropTypes from 'prop-types';

export function GeneralContx({children}){

    //Estado para saber que formulario mostrar en el login
    const [loginOption,setLoginOption] = useState(0)
    //Estado para saber si esta loggeado 
    const [loged,setLoged] = useState(false)
    //Estado para saber que listado mostrar
    const [listOption,setListOption] = useState("all")
    //Estado para saber si se está añadiendo una tarea
    const [adding, setAdding] = useState(false)
    //Estado para saber si un cambio ya se realizo 
    const [changeComplete,setChangeComplete] = useState(true)

    const changeLoginOption = (option) => {
        setLoginOption(option)
    }

    const changeLoged = (option) => {
        setLoged(option)
    }

    const changeListOption = (option) => {
        setListOption(option)
    }

    const changeAdding = (option) => {
        setAdding(option)
    }

    const changeChangeComplete = () => {
        setChangeComplete(!changeComplete)
    }

    return(
        <>
            <generalContx.Provider value={
                {
                    loginOption,
                    loged,
                    listOption,
                    adding,
                    changeComplete,
                    changeLoginOption,
                    changeLoged,
                    changeListOption,
                    changeAdding,
                    changeChangeComplete
                }
            }>
                {children}
            </generalContx.Provider>
        </>
    )
}

GeneralContx.propTypes = {
    children: PropTypes.node.isRequired, // Valida que children sea un nodo de React y es requerido
  };

