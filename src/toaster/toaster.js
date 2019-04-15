import React, {createContext, useState, useContext, useEffect} from "react";
import "toaster/toaster.css";

const ToasterContext = createContext();

function ToastProvider(props) {
  const [toasts, setToasts] = useState([]);
  const theme = props.theme ? props.theme : "default-theme";

  useEffect(() => {
    console.log("new toasts", toasts);
  }, [toasts])

  const add = ({message, title}) => {
    if (!message) {
      throw new Error(
        "Need to provide a string value for the message field.");
    }

    setToasts([...toasts, {
      id: +new Date(),
      message: message,
      title: title ? title : "",
      isVisible: false,
    }]);
  };

  const remove = id => setToasts(
    prev => prev.filter(t => t.id !== id));

  const success = message => add({
    title: "Success!",
    message,
  });

  const setVisible = (id) => {
    setToasts(prev => {
      const copy = [...prev];
      for (let t of copy) {
        if (t.id === id) {
          t.isVisible = true;
        }
      }
      return copy;
    });
  };

  const setInvisible = (id) => {
    setTimeout(() => {
      remove(id);
    }, 200)

    setToasts(prev => {
      const copy = [...prev];
      for (let t of copy) {
        if (t.id === id) {
          t.isVisible = false;
        }
      }
      return copy;
    });
  };

  return (
    <ToasterContext.Provider value={{add, success, toasts}}>
      <div className={`aj-toaster --${theme}`}>
       <ul>
         {toasts.map((toast) => (
           <Toast
            key={toast.id}
            toast={toast}
            remove={remove}
            setInvisible={setInvisible}
            setVisible={setVisible}>
          </Toast>
         ))}
       </ul>
      </div>
      {props.children}
    </ToasterContext.Provider>
  );
}

function Toast(props) {
  const {id, title, message, isVisible} = props.toast;
  const {remove, setVisible, setInvisible} = props;
  const onInvis = id => () => setInvisible(id);

  useEffect(() => {
    if (id && !isVisible) {
      setTimeout(() => {
        setVisible(id);
      }, 50)
    }
  }, []);

  return (
    <li className={`--toast-success ${isVisible ? "visible" : ""}`}>
      <div className="toast-content">
        {
         title ? <p className="toast-content__title">{title}</p> : null
        }
        <p className="toast-content__body">{message} {isVisible ? "true" : "false"}</p>
      </div>
      <div className="toast-dismiss">
        <button onClick={onInvis(id)}>&times;</button>
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
