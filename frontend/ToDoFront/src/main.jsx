
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/normalize.css"
import { GeneralContx } from "./context/generalContextProvider.jsx"

import "./styles/index.css"

createRoot(document.getElementById('root')).render(
  <GeneralContx>
    <App />
  </GeneralContx>
    
)
