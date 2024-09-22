import { useContext} from "react";
import { generalContx } from "./context/generalContext";
import { LoginForm } from "./loginForm";
import { SinginForm } from "./registerForm";
import { FooterComponent } from "./footer";

import "./styles/login.css"
export function Login(){
    
    //uso del contexto
    const {loginOption} = useContext(generalContx)

    return(
        <>
            <main className="formContent">
                {loginOption === 0 ?  <LoginForm/> : <SinginForm/>}
            </main>
            <FooterComponent/>
        </>
    )
}