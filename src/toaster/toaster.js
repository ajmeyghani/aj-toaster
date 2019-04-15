import React, {createContext, useState, useContext, useEffect} from "react";
import "toaster/toaster.css";

const ToasterContext = createContext();

function ToastProvider(props) {
  const [toasts, setToasts] = useState([]);
  const theme = props.theme ? props.theme : "default-theme";

  const success = message => add({
    title: "Success!",
    message,
  });

  const add = ({message, title}) => {
    if (!message) {
      throw new Error(
        "Need to provide a string value for the message field.");
    }

    setToasts([...toasts, {
      id: +new Date(),
      message: message,
      title: title ? title : "",
    }]);
  };

  const remove = id => setToasts(
    prev => prev.filter(t => t.id !== id));

  return (
    <ToasterContext.Provider value={{add, remove, toasts, success}}>
      <div className={`aj-toaster --${theme}`}>
       <ul>
         {toasts.map((toast) => (
           <Toast key={toast.id} toast={toast} remove={remove}></Toast>
         ))}
       </ul>
      </div>
      {props.children}
    </ToasterContext.Provider>
  );
}

function Toast(props) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 20)
    return () => setIsVisible(false);
  }, []);

  const {id, title, message} = props.toast;
  const {remove} = props;
  const onRemove = id => () => {
    setIsVisible(false);
    setTimeout(() => {
      remove(id);
    }, 200);
  };

  return (
    <li className={`--toast-success ${isVisible ? "visible" : ""}`}>
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
