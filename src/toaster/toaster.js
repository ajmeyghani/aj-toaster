import React, {createContext, useState, useContext, useEffect} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "toaster/toaster.css";

const ToasterContext = createContext();

const TYPES = {
  success: "success",
  failure: "failure",
  warning: "warning",
  info: "info",
};

function ToastProvider(props) {
  const [toasts, setToasts] = useState([]);
  const [timeOuts, setTimeouts] = useState([]);
  const theme = props.theme || "theme1";

  /* TODO */
  /* manage timeout functions */
  useEffect(() => {
    return () => {
      if (timeOuts.length > 5) {
        setTimeouts([]);
      }
    };
  }, [timeOuts]);

  /* adds toasts to the list */
  const add = ({message, title, type}, dismissOpt) => {
    if (!message || !type) {
      throw new Error(
        "Need to provide a message and a type.");
    }

    const isAutoDismiss = dismissOpt ? Boolean(dismissOpt.dismiss) : false;
    const dismissPeriod = isAutoDismiss ? dismissOpt.dismiss : 0;
    const id = +new Date();

    const newToast = {
      id,
      message: message,
      title: title || "",
      type: type,
      isAutoDismiss,
      dismissPeriod,
    };

    setToasts([newToast]);

    if (isAutoDismiss) {
      const timeoutId = ((id) => {
        return setTimeout(() => {
          remove(id);
        }, dismissPeriod);
      })(id);
      setTimeouts(prev => [...prev, timeoutId]);
    }
  };

  /* remove items from the toasts list */
  const remove = id => setToasts(
    prev => prev.filter(t => t.id !== id));


  /* helpers for different message types */
  const success = (message, dismissOpt) => add({
    title: "Success!",
    message: message,
    type: TYPES.success,
  }, dismissOpt);

  const failure = (message, dismissOpt) => add({
    title: "Oops ...",
    message: message,
    type: TYPES.failure,
  }, dismissOpt);

  const warning = (message, dismissOpt) => add({
    title: "Warning!",
    message: message,
    type: TYPES.warning,
  }, dismissOpt);

  const info = (message, dismissOpt) => add({
    title: "Info!",
    message: message,
    type: TYPES.info,
  }, dismissOpt);

  return (
    <ToasterContext.Provider
      value={{add, success, failure, warning, info, toasts}}>
      <div className={`aj-toaster --${theme}`}>
          <TransitionGroup className="aj-toaster__items">
            {toasts.map((toast) => (
            <CSSTransition
              key={toast.id} timeout={300} classNames="--toast-item">

              <Toast
              toast={toast}
              remove={remove} />

            </CSSTransition>
            ))}
          </TransitionGroup>
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
    <div className={`--${type}`}>
      <div className="aj-toaster__content">
        {
         title ? <p className="aj-toaster__title">{title}</p> : null
        }
        <p className="aj-toaster__message">{message}</p>
      </div>
      <div className="aj-toaster__dismiss">
        <button onClick={onRemove(id)}>
        &times;
        </button>
      </div>
    </div>
  );
}

const useToaster = () => useContext(ToasterContext);

export {
  ToastProvider as default,
  ToasterContext,
  useToaster,
};
