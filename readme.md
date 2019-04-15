# Toast Provider for React [WIP]

## Install

- Using `npm`: `npm i aj-toaster -S`
- Using `yarn`: `yarn add aj-toaster -S`

## Browser Compatibility

The latest and the greatest browsers.

## Usage

Wrap your component with the `Toaster` provider and get a toast notification manager for free:

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
import {useToaster} from "aj-toaster"; // <-- load hook
function App() {
  const toaster = useToaster(); // <-- get toaster context.
  const handleAdd = () => {
    toaster.success("Post was created!"); // <-- call methods
  };
  return (
  <div>
    <button onClick={handleAdd}>Add</button>
  </div>);
}
```

## Styles

Todo: add more docs.

## Options

TODO: All this stuff will change with v1.0.0.

- The provider takes an optional theme prop: `<Toaster theme="<theme-name>"> ...`. (todo ...)
- The `toaster` context provides the following methods:

    - `add`: takes an object with `{title: <string>, message: <string>}`.
    - `success`: takes a string for the message and calls add for you.
    - `warning` (todo)
    - `error`   (todo)

- The `toaster` context provides the following properties:

    - `toasts`: contains all the toasts.

## Development

- Install latest version of Node 10 `nvm install 10`.
- Also install `yarn` and `http-server` globally with `npm i yarn http-server -g`.
- Run `yarn install` to install all the dependencies.
- Develop in the `src` folder and run `yarn build` to build to `umd/` and `./toaster.mjs`.
- To check the gh-pages, first run `yarn gh:watch` and run `http-server . -p 8080 -c-1` and go to `http://localhost:8080/gh-pages/index.dev.html`to see the page. All the changes made will be rebuilt and updated to `gh-pages/dist/index.js`

## Tests

- functional tests coming soon...

## Maintainer

- As the maintainer you can then run `yarn gh` to publish the new version to Github.
- As the maintainer, to publish a new version, run `yarn publish:<patch|minor|major>`. For example, to publish a new patch version run `yarn publish:patch`. Make sure that the working directory is clean, no changes to commit.

**TODOS**

- [] Make version 1.0.0
