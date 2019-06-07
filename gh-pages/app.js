import "./siimple.css";
import React, {useEffect} from "react";
import {useToaster} from "toaster/toaster";
import "./app.css";

function App() {
  const toaster = useToaster();

  useEffect(() => {
    // toaster.success("Welcome to React Toaster!", {dismiss: 2e3});
  }, []);

  return (
    <div className="my-page">
      <h2 className="siimple-h2">Toaster 1.0.0</h2>
      <div className="buttons">
        <button
          className="siimple-btn siimple-btn--navy"
          onClick={_ => {
          toaster.clear();
        }}>Clear</button>
        <button
          onClick={_ => {
            toaster.add({
              title: "An error occurred...",
              message: "Couldn't get the data from the server.",
              type: "failure",
            },
            {
              dismiss: 2000,
            });
          }}
          className="siimple-btn siimple-btn--navy">
          Server Error
        </button>

        <button
          onClick={_ => {
            toaster.success("Your post was saved!");
          }}
          className="siimple-btn siimple-btn--success">
          Success
        </button>
        <button
          onClick={_ => {
            toaster.failure("Couldn't save the data to the database...");
          }}
          className="siimple-btn siimple-btn--error">
          Failure
        </button>
        <button
          onClick={_ => {
            toaster.warning("Try again...");
          }}
          className="siimple-btn siimple-btn--warning">
          Warning
        </button>
        <button
          onClick={() => {
            toaster.info("Here is some extra information." +
            "Here is some extra information." +
            "Here is some extra information." +
            "Here is some extra information." +
            "Here is some extra information." +
            "Here is some extra information." +
            "Here is some extra information." +
            "Here is some extra information END."
            );
          }}
          className="siimple-btn siimple-btn--primary">
          Info
        </button>
      </div>
      <div className="buttons">
        <button
          onClick={_ => {
            toaster.set({message: "hello world", type: "info"});
          }}
          className="siimple-btn siimple-btn--primary">
          Hello
        </button>
        <button
          onClick={_ => {
            toaster.set({
              message: "Bye Bye!",
              title: "Important Message",
              type: "success",
            });
          }}
          className="siimple-btn siimple-btn--success">
          Bye
        </button>
        <button
          onClick={_ => {
            toaster.success("Very good!", {dismiss: 1000}, "Good");
          }}
          className="siimple-btn siimple-btn--success">
          Success!
        </button>
      </div>
  </div>);
}

export default App;
