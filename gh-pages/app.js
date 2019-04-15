import "./siimple.css";
import React, {useEffect} from "react";
import {useToaster} from "toaster/toaster";
import "./app.css";

function App() {
  const toaster = useToaster();
  const handleAdd = () => {
    toaster.add({
      message: "Post was saved!"
    });
  };
  useEffect(() => {
    toaster.success("Your post was created successfully!");
  }, [])
  return (<div className="my-page">
    <h2 className="siimple-h2">Simple Toaster</h2>
    <p className="siimple-p">total: {toaster.toasts.length}</p>
    <button className="siimple-btn siimple-btn--primary" onClick={handleAdd}>Add a Toast</button>
  </div>);
}

export default App;
