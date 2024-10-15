import "./App.css";
import { FormLogin } from "./components/FormLogin";
import { useState } from "react";

function App() {
  // Corrección: Cambiar la sintaxis de useState
  const [user, setUser] = useState(null);

  return (
    <div className="App"> {/* Corrección de 'classname' a 'className' */}
      <FormLogin setUser={setUser} /> {/* Corrección: setuser a setUser */}
    </div>
  );
}

export default App;
