import "./siimple.css";
import React, {useEffect} from "react";
import {useToaster} from "toaster/toaster";
import "./app.css";

function App() {
  const toaster = useToaster();

  useEffect(() => {
    toaster.success("Your post was created successfully!");
  }, []);

  const handleAdd = () => {
    toaster.add({
      title: "Nice!",
      message: "Post was saved!",
    });
  };

  const addFailure = () => {
    toaster.failure("Couldn't save the data to the database...");
  }

  return (
    <div className="my-page">
      <h2 className="siimple-h2">Simple Toaster</h2>
      <p className="siimple-p">total: {toaster.toasts.length}</p>
    <button
      onClick={handleAdd}
      className="siimple-btn siimple-btn--primary">Add a Toast
    </button>
    <button
      onClick={addFailure}
      className="siimple-btn siimple-btn--error">
      Add Failure Toast
    </button>
  </div>);
}

export default App;
