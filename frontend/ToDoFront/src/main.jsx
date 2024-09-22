
import { createRoot } from 'react-dom/client'
//Importar el contexto donde se encuentran las variables globales
import { GeneralContx } from "./context/generalContextProvider.jsx"
import App from './App.jsx'
import "./styles/normalize.css"
import "./styles/index.css"

createRoot(document.getElementById('root')).render(
  //Se envuelve toda la app en el contexto
  <GeneralContx>
    <App />
  </GeneralContx>
    
)
