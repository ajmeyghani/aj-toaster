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
const DEFAULT_THEME = "default-theme";

function ToastProvider(props) {
  const [activeToast, setActiveToast] = useState(null);
  const [autoDismissQ, setAutoDismissQ] = useState([]);
  const [isInTransition, setIsInTransition] = useState(false);
  const [animDuration, setAnimDuration] = useState(DEFAULT_ANIMATION_DURATION);
  const toasterRef = useRef(null);
  const theme = props.theme || DEFAULT_THEME;

  /* remove active toast */
  const remove = id => setActiveToast(null);

  /* deactivate the active toast, before it's removed. */
  const deactivate = id => setActiveToast(prev => ({
    ...prev, _isActive: false,
  }));

  /* get animation duration from the css property */
  useEffect(() => {
    if (toasterRef.current) {
      const durationValue = animationDurationFromCssProp(
        toasterRef.current, "--aj-toaster__animation-duration");

      setAnimDuration(
        durationValue || DEFAULT_ANIMATION_DURATION);
    }
  }, [activeToast]);

  /* helper for clearing all the auto dismiss callbacks */
  const resetAutoDismissQ = () => {
    if (autoDismissQ.length) {
      for (const fnId of autoDismissQ) {
        window.clearTimeout(fnId);
      }
      setAutoDismissQ([]);
    }
  };

  /* set active toast. */
  const set = ({message, title, type}, dismissOpt) => {
    if (!message || !type) {
      throw new Error(
        "Need to provide a message and a type.");
    }

    if (!(type in TYPES)) {
      throw new Error("Not a valid type.");
    }

    if (isInTransition) {
      return;
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

    resetAutoDismissQ();

    setIsInTransition(true);
    setTimeout(() => {
      setIsInTransition(false);
    }, animDuration * 2);

    if (activeToast) {
      deactivate();
      setTimeout(() => {
        setActiveToast(newToast);
      }, animDuration);
    } else {
      setActiveToast(newToast);
    }

    if (isAutoDismiss) {
      const a = setTimeout(() => {
        deactivate();
      }, dismissAfterWhile);

      const b = setTimeout(() => {
        remove();
      }, dismissAfterWhile + animDuration + 200);

      setAutoDismissQ([a, b]);
    }
  };

  const add = set; /* alias for set */

  const removeWithAnimation = () => {
    resetAutoDismissQ();
    deactivate();
    setTimeout(() => {
      remove();
    }, animDuration);
  };

  /* Helper for creating toasts with some defaults. */
  const toast = (type) => (message, dismissOpt, title) => {
    const titles = {
      [TYPES.success]: "Success!",
      [TYPES.warning]: "Warning!",
      [TYPES.failure]: "Oops ...",
      [TYPES.info]: "Note!",
    };
    return set({
      title: title || titles[type],
      message: message,
      type: TYPES[type],
    }, dismissOpt);
  };

  const success = (...args) => toast(TYPES.success)(...args);
  const warning = (...args) => toast(TYPES.warning)(...args);
  const failure = (...args) => toast(TYPES.failure)(...args);
  const info = (...args) => toast(TYPES.info)(...args);

  return (
    <ToasterContext.Provider
      value={{set, add, success, failure, warning, info}}>
      {
        !activeToast ? null :
        <div ref={toasterRef}
        className={`aj-toaster-wrapper --${theme}`}>
          <Toast
          toast={activeToast}
          remove={removeWithAnimation} />
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
