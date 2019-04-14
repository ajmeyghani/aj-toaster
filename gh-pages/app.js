import React from "React";
import {useToaster} from "toaster/toaster";
import "./app.css";

function App() {
  const toaster = useToaster();
  const handleAdd = () => {
    toaster.add("message 1");
  };
  return (<div>
    <p>total: {toaster.toasts.length}</p>
    <button onClick={handleAdd}>Add</button>
  </div>);
}

export default App;
