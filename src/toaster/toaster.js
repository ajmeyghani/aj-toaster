import React, {createContext, useState, useContext, useEffect} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "toaster/toaster.css";

const ToasterContext = createContext();

const TYPES = {
  success: "success",
  failure: "failure",
  warning: "warning",
  default: "success",
}

function ToastProvider(props) {
  const [toasts, setToasts] = useState([]);
  const theme = props.theme ? props.theme : "default-theme";

  /* adds toasts to the list */
  const add = ({message, title, type}) => {
    if (!message) {
      throw new Error(
        "Need to provide a string value for the message field.");
    }

    setToasts([...toasts, {
      id: +new Date(),
      message: message,
      title: title || "",
      type: type || TYPES.default,
    }]);
  };

  /* remove items from the toasts list */
  const remove = id => setToasts(
    prev => prev.filter(t => t.id !== id));

  /* helper to add success messages */
  const success = message => add({
    title: "Success!",
    message: message,
    type: TYPES.success,
  });

  /* helper to add success messages */
  const failure = message => add({
    title: "Oops ...",
    message: message,
    type: TYPES.failure,
  });

  return (
    <ToasterContext.Provider value={{add, success, failure, toasts}}>
      <div className={`aj-toaster --${theme}`}>
        <ul>
          <TransitionGroup className="--toast-items">
            {toasts.map((toast) => (
            <CSSTransition
              key={toast.id} timeout={300} classNames="--toast-item">

              <Toast
              toast={toast}
              remove={remove} />

            </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
      </div>
      {props.children}
    </ToasterContext.Provider>
  );
}

function Toast(props) {
  const {id, title, message, type} = props.toast;
  const {remove} = props;
  const onRemove = id => () => remove(id);

  return (
    <li className={`--toast-${type}`}>
      <div className="toast-content">
        {
         title ? <p className="toast-content__title">{title}</p> : null
        }
        <p className="toast-content__body">{message}</p>
      </div>
      <div className="toast-dismiss">
        <button onClick={onRemove(id)}>&times;</button>
      </div>
    </li>
  );
}

const useToaster = () => useContext(ToasterContext);

export {
  ToastProvider as default,
  ToasterContext,
  useToaster,
};
