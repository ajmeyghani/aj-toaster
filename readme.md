# Toast Provider for React [WIP]

## Install

- Using `npm`: `npm i aj-toaster -S`
- Using `yarn`: `yarn add aj-toaster -S`

## Browser Compatibility

The latest and the greatest browsers.

## Peer Dependencies

Make sure the following are available in your setup:

```
"react": "^16.8.0",
"react-dom": "^16.8.0"
```

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

## Themes

There is limited support for custom color schemes. To define a new color theme,
create a theme in your own css and define the custom properties controlling the
colors. In the example below we are defining `theme3`:

```
.aj-toaster.--theme3 {
  --aj-toaster__success: green;
  --aj-toaster__failure: red;
  --aj-toaster__info: blue;
  --aj-toaster__warning: orange;

  --aj-toaster__success-text: white;
  --aj-toaster__warning-text: white;
  --aj-toaster__info-text: white;
  --aj-toaster__failure-text: white;

  --aj-toaster__width: 300px;
}
```

After defining the theme, just pass in the name of the class name, without the
double dashes, when using the provider:

```
<Toaster theme="theme3">
</Toater>
```

## Options

All this stuff may change with v1.0.0.

- The provider takes an optional theme prop: `<Toaster theme="mytheme"></Toaster>`.
- The `toaster` context provides the following methods:

- `add`: takes two objects, the first describes the toast and the second optional argument defines how to dismiss it.
If the second object is not given, the toast won't auto dismiss. The following snippet describes each arguments in
more detail:

```
toaster.add(
  {
    title: <string>, (optional)
    message: <string>, (required)
    type: <string>, required, one of "failure"|"success"|"info"|"warning",
  },
  {
    dismiss: <number> duration in milliseconds to auto dismiss.
  }
)
```

- `success`, `warning`, `info`, `failure`: all take a string for the message and
call `add` for you with some default titles. Just like `add`, you can specify an optional `dismiss` config
to auto dismiss a toast.

## Development

- Install the latest version of Node 10 `nvm install 10`.
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

- [] Make version 1.0.0 and improve animations.
