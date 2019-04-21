import React, {createContext, useState, useContext, useEffect} from "react";
import "toaster/toaster.css";

const ToasterContext = createContext();

const TYPES = {
  success: "success",
  failure: "failure",
  warning: "warning",
  info: "info",
};

function ToastProvider(props) {
  const [activeToast, setActiveToast] = useState(null);
  const [timeOuts, setTimeouts] = useState([]);
  const theme = props.theme || "theme1";

  /* remove active toast */
  const remove = id => setActiveToast(null);

  /* inactive ro active */
  const inactive = id => setActiveToast(prev => ({...prev, _isActive: false}));
  const active = id => setActiveToast(prev => ({...prev, _isActive: true}));

  /* TODO */
  /* manage timeout functions */
  useEffect(() => {
    return () => {
      if (timeOuts.length > 5) {
        setTimeouts([]);
      }
    };
  }, [timeOuts]);

  /* set active toast. */
  const add = ({message, title, type}, dismissOpt) => {
    if (!message || !type) {
      throw new Error(
        "Need to provide a message and a type.");
    }

    const isAutoDismiss = dismissOpt ? Boolean(dismissOpt.dismiss) : false;
    const dismissAfterWhile = isAutoDismiss ? dismissOpt.dismiss : 0;
    const id = +new Date();

    const newToast = {
      id,
      message: message,
      title: title || "",
      type: type,
      isAutoDismiss,
      dismissAfterWhile,
      _isActive: true,
    };

    setActiveToast(newToast);

    if (isAutoDismiss) {
      const timeoutId = ((id) => {
        let a = setTimeout(() => {
          inactive();
        }, dismissAfterWhile);

        let b = setTimeout(() => {
          remove(id);
        }, dismissAfterWhile + 500);
        return [a, b];
      })(id);
      setTimeouts(prev => [...prev, [timeoutId]]);
    }
  };

  const removeWithDelay = (id) => {
    inactive();
    setTimeout(() => {
      remove(id);
    }, 350);
  };

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
      value={{add, success, failure, warning, info, activeToast}}>
      {
        !activeToast ? null :
        <div className={`aj-toaster-wrapper --${theme}`}>
          <Toast
          toast={activeToast}
          remove={removeWithDelay} />
        </div>
      }

      {props.children}
    </ToasterContext.Provider>
  );
}

function Toast(props) {
  if (!props.toast) {
    return null;
  }

  const {id, title, message, type} = props.toast;
  const {remove, toast} = props;
  const [isActive, setIsActive] = useState(false);

  const onRemove = id => () => remove(id);

  useEffect(() => {
    setIsActive(toast._isActive ? true : false);
  }, [toast._isActive]);

  return (
    <div className={`aj-toaster aj-toaster--${type} ${isActive ?"active" : "inactive"}`}>
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
