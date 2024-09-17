import { Login } from "./login"
import { Principal } from "./principal"
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'



function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/principal" element ={<Principal/>}/>
        <Route path="*" element = {<Navigate to="/login"/>}/>
      </Routes>
    </Router>

    </>
  )
}

export default App
