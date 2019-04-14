import React, {createContext, useState, useContext} from "react";
import "toaster/toaster.css";

const ToasterContext = createContext();

function ToastProvider(props) {
  const [toasts, setToasts] = useState([]);

  const add = message => {
    setToasts([...toasts, {
      id: +new Date(),
      message: message,
    }]);
  };

  const remove = id => setToasts(
    prev => prev.filter(t => t.id !== id));

  const onRemove = id => () => remove(id);

  return (
    <ToasterContext.Provider value={{add, remove, toasts}}>
      <div className="aj-toaster">
        {toasts.map(({message, id}) => (
          <li key={id}>{message} - {id}
            <button onClick={onRemove(id)}>&times;</button>
          </li>
        ))}
      </div>
      {props.children}
    </ToasterContext.Provider>
  );
}

const useToaster = () => useContext(ToasterContext);

export {
  ToastProvider as default,
  ToasterContext,
  useToaster,
};
