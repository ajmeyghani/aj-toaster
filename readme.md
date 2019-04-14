# Toast Provider for React [WIP]

## Install

- Using `npm`: `npm i aj-toaster -S`
- Using `yarn`: `yarn add aj-toaster -S`

## Usage

Wrap your component with the `Toaster` provider and get a toast notification manager for free.

**index.js**

```js
import React from "react";
import ReactDom from "react-dom";
import App from "app/app";
import Toaster from "aj-toaster";

ReactDom.render(
<Toaster> // <-- wrap your app here.
  <App />
</Toaster>, document.querySelector("#app"));
```

**app.js**

```js
import React from "React";
import {useToaster} from "aj-toaster"; // <-- use toaster
function App() {
  const toaster = useToaster();
  const handleAdd = () => {
    toaster.add("message 1"); // <-- call add.
  };
  return (<div>
    <button onClick={handleAdd}>Add</button>
  </div>);
}
```

## Styles

Todo: add more docs.
