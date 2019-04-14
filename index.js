(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
  (global = global || self, factory(global.React, global.ReactDOM));
}(this, function (React, ReactDOM) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".aj-toaster {\n  position: absolute;\n  top: 0;\n  right: 0;\n  --border-color: red;\n  border: 1px solid var(--border-color);\n}\n";
  styleInject(css);

  const ToasterContext = React.createContext();

  function ToastProvider(props) {
    const [toasts, setToasts] = React.useState([]);

    const add = message => {
      setToasts([...toasts, {
        id: +new Date(),
        message: message
      }]);
    };

    const remove = id => setToasts(prev => prev.filter(t => t.id !== id));

    const onRemove = id => () => remove(id);

    return React__default.createElement(ToasterContext.Provider, {
      value: {
        add,
        remove,
        toasts
      }
    }, React__default.createElement("div", {
      className: "aj-toaster toaster--default-theme"
    }, toasts.map(({
      message,
      id
    }) => React__default.createElement("li", {
      key: id
    }, message, " - ", id, React__default.createElement("button", {
      onClick: onRemove(id)
    }, "\xD7")))), props.children);
  }

  const useToaster = () => React.useContext(ToasterContext);

  var css$1 = ".aj-toaster {\n  --border-color: blue;\n  padding: 5px;\n}\n";
  styleInject(css$1);

  function App() {
    const toaster = useToaster();

    const handleAdd = () => {
      toaster.add("message 1");
    };

    return React__default.createElement("div", null, React__default.createElement("p", null, "total: ", toaster.toasts.length), React__default.createElement("button", {
      onClick: handleAdd
    }, "Add"));
  }

  ReactDOM.render(React__default.createElement(ToastProvider, null, React__default.createElement(App, null)), document.querySelector("#app"));

}));
