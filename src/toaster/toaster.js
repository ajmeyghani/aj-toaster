import React, {createContext, useState, useContext, useEffect, useRef} from "react";
import {animationDurationFromCssProp} from "toaster/utils";
import "toaster/toaster.css";

const ToasterContext = createContext();

const TYPES = {
  success: "success",
  failure: "failure",
  warning: "warning",
  info: "info",
};

const DEFAULT_ANIMATION_DURATION = 300; /* ms */
const DEFAULT_THEME = "theme1";



function ToastProvider(props) {
  const [activeToast, setActiveToast] = useState(null);
  const [autoDismissQ, setAutoDismissQ] = useState([]);
  const [animDuration, setAnimDuration] = useState(200);
  const toasterRef = useRef(null);
  const theme = props.theme || DEFAULT_THEME;

  /* remove active toast */
  const remove = id => setActiveToast(null);
  const inactive = id => setActiveToast(prev => ({
    ...prev, _isActive: false,
  }));

  /* get animation duration from the css property. */
  useEffect(() => {
    if (toasterRef.current) {
      const durationValue = animationDurationFromCssProp(
        toasterRef.current, "--animation-duration");

      setAnimDuration(
        durationValue || DEFAULT_ANIMATION_DURATION);
    }
  }, [activeToast]);

  /* set active toast. */
  const add = ({message, title, type}, dismissOpt) => {
    if (!message || !type) {
      throw new Error(
        "Need to provide a message and a type.");
    }

    const isAutoDismiss = dismissOpt ?
      Boolean(dismissOpt.dismiss) : false;

    const dismissAfterWhile = isAutoDismiss ?
      dismissOpt.dismiss : 0;

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

    if (autoDismissQ.length) {
      for (const fnId of autoDismissQ) {
        window.clearTimeout(fnId);
      }
      setAutoDismissQ([]);
    }

    if (activeToast) {
      inactive();
      setTimeout(() => {
        setActiveToast(newToast);
      }, animDuration);
    } else {
      setActiveToast(newToast);
    }

    if (isAutoDismiss) {
      const timeoutIds = (() => {
        const a = setTimeout(() => {
          inactive();
        }, dismissAfterWhile);

        const b = setTimeout(() => {
          remove();
        }, dismissAfterWhile + 500);
        return [a, b];
      })();
      setAutoDismissQ(timeoutIds);
    }
  };

  const removeWithDelay = () => {
    if (autoDismissQ.length) {
      for (const fnId of autoDismissQ) {
        window.clearTimeout(fnId);
      }
      setAutoDismissQ([]);
    }
    inactive();
    setTimeout(() => {
      remove();
    }, animDuration);
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
        <div ref={toasterRef}
        className={`aj-toaster-wrapper --${theme}`}>
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

  const {remove, toast} = props;
  const {title, message, type} = toast;
  const [isActive, setIsActive] = useState(false);

  const onRemove = () => () => remove();

  /* handles adding or removing active class for
  * show/hide animations.
  */
  useEffect(() => {
    setIsActive(toast._isActive ? true : false);
  }, [toast._isActive]);

  return (
    <div className={`aj-toaster aj-toaster--${type} ${isActive ?"--active" : "--inactive"}`}>
      <div className="aj-toaster__content">
        {
         title ?
          <p className="aj-toaster__title">{title}</p> : null
        }
        <p className="aj-toaster__message">{message}</p>
      </div>
      <div className="aj-toaster__dismiss">
        <button onClick={onRemove()}>
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
