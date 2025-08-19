"use strict";
exports.__esModule = true;
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
exports["default"] = vite_1.defineConfig({
    base: '/product/',
    plugins: [plugin_react_1["default"]()]
});
