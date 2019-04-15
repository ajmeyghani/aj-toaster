import React, {createContext, useState, useContext} from "react";
import "toaster/toaster.css";

const ToasterContext = createContext();

function ToastProvider(props) {
  const [toasts, setToasts] = useState([]);
  console.log(props.theme);
  const theme = props.theme ? props.theme : "default-theme";

  const success = message => add({
    title: "Success!",
    message,
  });

  const add = ({message, title}) => {
    setToasts([...toasts, {
      id: +new Date(),
      message: message,
      title: title ? title : "",
    }]);
  };

  const remove = id => setToasts(
    prev => prev.filter(t => t.id !== id));

  const onRemove = id => () => remove(id);

  return (
    <ToasterContext.Provider value={{add, remove, toasts, success}}>
      <div className={`aj-toaster --${theme}`}>
       <ul>
         {toasts.map(({message, id, title}) => (
           <li className="success" key={id}>
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
         ))}
       </ul>
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
