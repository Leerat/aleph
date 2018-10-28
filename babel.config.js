const presets = [
  ["@babel/env", {
    targets: {
      browsers: "last 2 versions"
    },
    useBuiltIns: "usage",
    loose: true,
    modules: false,
    // debug: true
  }],
  "@babel/preset-react"
]

const plugins = [
  "@babel/plugin-transform-runtime",
  ["@babel/plugin-proposal-decorators",{ legacy: true }],
  "@babel/plugin-proposal-optional-chaining",
  "@babel/plugin-syntax-dynamic-import",
  ["@babel/plugin-proposal-class-properties", { loose: true }],
  "react-hot-loader/babel"
]

module.exports = { presets, plugins }
