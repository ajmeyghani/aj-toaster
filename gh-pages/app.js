import "./siimple.css";
import React, {useEffect} from "react";
import {useToaster} from "toaster/toaster";
import "./app.css";

function App() {
  const toaster = useToaster();

  useEffect(() => {
    toaster.success("Welcome to React Toaster!", {dismiss: 2e3});
  }, []);

  const addServerError = () => {
    toaster.add({
      title: "An error occurred...",
      message: "Couldn't get the data from the server.",
      type: "failure",
    },
    {
      dismiss: 0,
    });
  };

  const addSuccess = () => {
    toaster.success("Your post was saved!");
  };

  const addFailure = () => {
    toaster.failure("Couldn't save the data to the database...");
  };

  const addWarning = () => {
    toaster.warning("Try again...");
  };

  const addInfo = () => {
    toaster.info("Here is some extra information." +
    "Here is some extra information." +
    "Here is some extra information." +
    "Here is some extra information. 55" +
    "Here is some extra information." +
    "Here is some extra information." +
    "Here is some extra information. 66" +
    "Here is some extra information END."
    );
  };

  return (
    <div className="my-page">
      <h2 className="siimple-h2">Toaster 0.4.3</h2>
      <p className="siimple-p">total: {toaster.toasts.length}</p>
      <div className="buttons">
        <button
          onClick={addServerError}
          className="siimple-btn siimple-btn--navy">
          Server Error
        </button>

        <button
          onClick={addSuccess}
          className="siimple-btn siimple-btn--success">
          Success
        </button>
        <button
          onClick={addFailure}
          className="siimple-btn siimple-btn--error">
          Failure
        </button>
        <button
          onClick={addWarning}
          className="siimple-btn siimple-btn--warning">
          Warning
        </button>
        <button
          onClick={addInfo}
          className="siimple-btn siimple-btn--primary">
          Info
        </button>
      </div>
  </div>);
}

export default App;
