import { useState } from "react";
import { generalContx } from "./generalContext";
import PropTypes from 'prop-types';

export function GeneralContx({children}){

    const [loginOption,setLoginOption] = useState(0)
    const [loged,setLoged] = useState(false)
    const [listOption,setListOption] = useState("all")
    const [adding, setAdding] = useState(false)
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

