"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/projects.css");
var ProjectCard_1 = require("../components/ProjectCard");
var config_1 = require("../config");
var Projects = function () {
    var _a = react_1.useState([]), projects = _a[0], setProjects = _a[1];
    react_1.useEffect(function () {
        fetch(config_1.API_BASE_URL + "/api/projects")
            .then(function (res) { return res.json(); })
            .then(function (data) { return setProjects(data); })["catch"](function (err) { return console.error("Ошибка загрузки проектов:", err); });
    }, []);
    return (react_1["default"].createElement("div", { className: 'projects' },
        react_1["default"].createElement("div", { className: "projects-content" },
            react_1["default"].createElement("h2", null, "\u041F\u0420\u041E\u0415\u041A\u0422\u042B"),
            react_1["default"].createElement("div", { className: "project-cards" }, projects.map(function (project) { return (react_1["default"].createElement(ProjectCard_1["default"], { key: project.id, name: project.name, image_url: project.image_url + "?v=" + project.id, description: project.description })); })))));
};
exports["default"] = Projects;
