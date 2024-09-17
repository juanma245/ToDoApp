import { useState } from "react";
import { generalContx } from "./generalContext";
import PropTypes from 'prop-types';

export function GeneralContx({children}){

    const [loginOption,setLoginOption] = useState(0)
    const [loged,setLoged] = useState(false)

    const changeLoginOption = (option) => {
        setLoginOption(option)
    }

    const changeLoged = (option) => {
        setLoged(option)
    }

    return(
        <>
            <generalContx.Provider value={
                {
                    loginOption,
                    loged,
                    changeLoginOption,
                    changeLoged
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

