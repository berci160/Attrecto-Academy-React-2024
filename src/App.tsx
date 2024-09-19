import React, { useState } from "react";

import Navbar from "./components/navbar/Navbar";
import { Button } from "./components/Button/Button";

function App() {
  const [count, setCount] = useState(0);
  const [errorMessage,setErrorMessage] = useState(false);
  const updateCounter = (increase: boolean) => {
    setCount((currentValue) => {
      if(increase)
      {
        setErrorMessage(false);
        return currentValue+1;
      } else if(increase === false && currentValue>0)
      {
        return currentValue-1;
      }
      else
      {setErrorMessage(true);
        return currentValue;
      }
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="container d-flex justify-content-center">
        <div className="card bg-white shadow text-center p-4 m-4">
          <div>{errorMessage&&( <h3>Hiba! a számláló nem lehet negatív!</h3>)}</div>
          <h1>Counter:{count}</h1>
          <div className="d-flex justify-content-center flex-wrap gap-2">
            <Button color="primary" onClick={()=>updateCounter(true)}>Increase +</Button>
            <Button color="secondary" onClick={()=>updateCounter(false)}>Decrease -</Button>
            <Button color="danger" onClick={()=>setCount(0)}>Reset</Button>
             
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
