/*
* config for gh-pages.
*/

import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import clear from "rollup-plugin-clear";
const IS_PROD = process.env.NODE_ENV === "production";

const name = "aj_toaster";

const globals = {
  "prop-types": "PropTypes",
  "react-dom": "ReactDOM",
  "react-transition-group": "ReactTransitionGroup",
  "react": "React",
};

const external = Object.keys(globals);

const postCssConfig = postcss({
  extensions: [".css"],
});

const resolveConf = resolve({
  customResolveOptions: {
    moduleDirectory: "src",
  },
});

const clean = clear({
  targets: ["gh-pages/dist"],
  watch: false,
});

const babelOptions = () => {
  const result = {
    babelrc: false,
    presets: [
      "@babel/preset-react",
    ],
    plugins: [],
  };
  return result;
};

const devPlugins = [
  babel(babelOptions()),
  resolveConf,
  commonjs(),
  postCssConfig,
  clean,
];

const entries = [
  {
    input: "gh-pages/index.js",
    output: {
      name,
      file: "./gh-pages/dist/index.js",
      format: "umd",
      exports: "named",
      globals,
    },
    external,
    plugins: devPlugins,
  },
];

if (IS_PROD) {
  const prodEntry = {
    input: "gh-pages/index.js",
    output: {
      name,
      file: "./gh-pages/dist/index.min.js",
      format: "umd",
      exports: "named",
      globals,
    },
    external,
    plugins: [...devPlugins, terser()],
  };

  entries.push(prodEntry);
}

export default entries;
