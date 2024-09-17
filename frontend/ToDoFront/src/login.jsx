import { useContext} from "react";
import { generalContx } from "./context/generalContext";
import { LoginForm } from "./loginForm";
import { SinginForm } from "./registerForm";

import "./styles/login.css"
export function Login(){
    
    const {loginOption} = useContext(generalContx)

    return(
        <>
            <main className="formContent">
                {loginOption === 0 ?  <LoginForm/> : <SinginForm/>}
            </main>
            <footer>
                <ul>
                    iconos
                    <li>Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a></li>
                </ul>
            </footer>
        </>
    )
}