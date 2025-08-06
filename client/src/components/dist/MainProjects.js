"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ProjectCard_1 = require("../components/ProjectCard");
require("../styles/mainProjects.css");
var config_1 = require("../config");
var MainProjects = function () {
    var _a = react_1.useState([]), latestProjects = _a[0], setLatestProjects = _a[1];
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        fetch(config_1.API_BASE_URL + "/api/projects/latest")
            .then(function (res) {
            if (!res.ok) {
                throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 HTTP: " + res.status);
            }
            return res.json();
        })
            .then(function (data) {
            if (!Array.isArray(data)) {
                throw new Error('Ответ не является массивом проектов');
            }
            setLatestProjects(data);
        })["catch"](function (err) { return console.error('Ошибка загрузки последних проектов:', err); });
    }, []);
    return (react_1["default"].createElement("div", { className: "latest-projects-block" },
        react_1["default"].createElement("div", { className: "latest-projects-cards" }, latestProjects.map(function (p) { return (react_1["default"].createElement(ProjectCard_1["default"], { key: p.id, name: p.name, image_url: p.image_url, description: p.description })); })),
        react_1["default"].createElement("button", { onClick: function () { return navigate('/projects'); }, className: "see-all-projects-btn" }, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B")));
};
exports["default"] = MainProjects;
