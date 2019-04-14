# Toast Provider for React [WIP]

TOOD...

## Install

- Using `npm`: `npm i aj-toaster -S`
- Using `yarn`: `yarn add aj-toaster -S`

## Usage

Wrap your component with the `Toaster` provider and get a toast notification manager for free.

**index.js**

```js
import Toaster from "aj-toaster";
<Toaster>
  <App />
</Toaster>
```

**app.js**

```js
import React from "React";
import {useToaster} from "aj-toaster";
function App() {
  const toaster = useToaster();
  const handleAdd = () => {
    toaster.add("message 1");
  };
  return (<div>
    <button onClick={handleAdd}>Add</button>
  </div>);
}
```
