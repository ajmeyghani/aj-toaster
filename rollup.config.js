import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import clear from "rollup-plugin-clear";

const name = "aj_toaster";
const src = "src/toaster/toaster.js";

const globals = {
  "prop-types": "PropTypes",
  "react-dom": "ReactDOM",
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
  targets: ["umd", "toaster.mjs"],
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

export default [
  {
    input: src,
    output: {
      name,
      file: "./toaster.mjs",
      format: "esm",
      exports: "named",
    },
    external: [...external, "raf"],
    plugins: [
      babel(babelOptions()),
      postCssConfig,
      resolveConf,
      clean,
    ],
  },
  {
    input: src,
    output: {
      name,
      file: "./umd/toaster.js",
      format: "umd",
      exports: "named",
      globals,
    },
    external,
    plugins: devPlugins,
  },
  {
    input: src,
    output: {
      name,
      file: "./umd/toaster.min.js",
      format: "umd",
      exports: "named",
      globals,
    },
    external,
    plugins: [...devPlugins, terser()],
  },
];
