"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("../utils/api");
var config_1 = require("../config");
var ProjectsAdmin = function () {
    var _a = react_1.useState([]), projects = _a[0], setProjects = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), error = _c[0], setError = _c[1];
    var _d = react_1.useState(false), showAddModal = _d[0], setShowAddModal = _d[1];
    var _e = react_1.useState(null), editingProject = _e[0], setEditingProject = _e[1];
    // Загрузка проектов
    var loadProjects = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/projects")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Ошибка HTTP: ' + response.status);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setProjects(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Ошибка загрузки проектов:', error_1);
                    setError('Ошибка загрузки проектов');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        loadProjects();
    }, []);
    // Добавить проект
    var handleAddProject = function (projectData) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.api.admin.createProject(projectData)];
                case 1:
                    _a.sent();
                    setShowAddModal(false);
                    loadProjects();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    setError("Ошибка добавления проекта");
                    console.error(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Редактировать проект
    var handleEditProject = function (projectData) { return __awaiter(void 0, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.api.admin.updateProject(projectData.id, projectData)];
                case 1:
                    _a.sent();
                    setEditingProject(null);
                    loadProjects();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    setError("Ошибка редактирования проекта");
                    console.error(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Удалить проект
    var handleDeleteProject = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm("Удалить проект?"))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_1.api.admin.deleteProject(id)];
                case 2:
                    _a.sent();
                    loadProjects();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    setError("Ошибка удаления проекта");
                    console.error(e_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "admin-section" },
        react_1["default"].createElement("div", { className: "section-header" },
            react_1["default"].createElement("h2", null, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C\u0438"),
            react_1["default"].createElement("button", { className: "add-btn", onClick: function () { return setShowAddModal(true); } }, "+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442")),
        error && react_1["default"].createElement("div", { className: "error-message" }, error),
        loading && react_1["default"].createElement("div", { className: "loading-message" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."),
        !loading && projects.length === 0 ? (react_1["default"].createElement("div", { className: "placeholder-content" },
            react_1["default"].createElement("div", { className: "placeholder-icon" }, "\uD83D\uDCBC"),
            react_1["default"].createElement("h3", null, "\u041F\u0440\u043E\u0435\u043A\u0442\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"),
            react_1["default"].createElement("p", null, "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442."))) : (react_1["default"].createElement("div", { className: "projects-table" }, projects.map(function (project) { return (react_1["default"].createElement("div", { key: project.id, className: "table-row" },
            react_1["default"].createElement("div", { className: "project-image-cell" }, project.image_url ? (react_1["default"].createElement("img", { src: project.image_url, alt: project.name, className: "project-image-admin" })) : (react_1["default"].createElement("div", { className: "no-image" }, "\uD83D\uDCBC"))),
            react_1["default"].createElement("span", { className: "project-name" }, project.name),
            react_1["default"].createElement("span", { className: "project-description" }, project.description),
            react_1["default"].createElement("div", { className: "actions" },
                react_1["default"].createElement("button", { className: "action-btn edit", onClick: function () { return setEditingProject(project); } }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"),
                react_1["default"].createElement("button", { className: "action-btn delete", onClick: function () { return handleDeleteProject(project.id); } }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))); }))),
        react_1["default"].createElement(AddProjectModal, { show: showAddModal, onClose: function () { return setShowAddModal(false); }, onSave: handleAddProject }),
        react_1["default"].createElement(EditProjectModal, { show: !!editingProject, project: editingProject, onClose: function () { return setEditingProject(null); }, onSave: handleEditProject })));
};
exports["default"] = ProjectsAdmin;
// Модалка добавления проекта
var AddProjectModal = function (_a) {
    var show = _a.show, onClose = _a.onClose, onSave = _a.onSave;
    var _b = react_1.useState({
        name: "",
        description: "",
        image_url: ""
    }), formData = _b[0], setFormData = _b[1];
    react_1["default"].useEffect(function () {
        if (!show) {
            setFormData({ name: "", description: "", image_url: "" });
        }
    }, [show]);
    if (!show)
        return null;
    var handleSubmit = function (e) {
        e.preventDefault();
        onSave(formData);
    };
    return (react_1["default"].createElement("div", { className: "modal-overlay" },
        react_1["default"].createElement("div", { className: "modal-content" },
            react_1["default"].createElement("div", { className: "modal-header" },
                react_1["default"].createElement("h3", null, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"),
                react_1["default"].createElement("button", { className: "modal-close", onClick: onClose }, "\u00D7")),
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "modal-form" },
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430:"),
                    react_1["default"].createElement("input", { type: "text", value: formData.name, onChange: function (e) {
                            return setFormData(__assign(__assign({}, formData), { name: e.target.value }));
                        }, required: true, autoFocus: true })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:"),
                    react_1["default"].createElement("textarea", { value: formData.description, onChange: function (e) {
                            return setFormData(__assign(__assign({}, formData), { description: e.target.value }));
                        } })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:"),
                    react_1["default"].createElement("input", { type: "url", value: formData.image_url, onChange: function (e) {
                            return setFormData(__assign(__assign({}, formData), { image_url: e.target.value }));
                        } })),
                react_1["default"].createElement("div", { className: "modal-actions" },
                    react_1["default"].createElement("button", { type: "button", className: "btn-cancel", onClick: onClose }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
                    react_1["default"].createElement("button", { type: "submit", className: "btn-save" }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))))));
};
// Модалка редактирования проекта
var EditProjectModal = function (_a) {
    var show = _a.show, project = _a.project, onClose = _a.onClose, onSave = _a.onSave;
    var _b = react_1.useState({
        name: "",
        description: "",
        image_url: ""
    }), formData = _b[0], setFormData = _b[1];
    react_1.useEffect(function () {
        if (project) {
            setFormData({
                name: project.name,
                description: project.description || "",
                image_url: project.image_url || ""
            });
        }
    }, [project]);
    if (!show || !project)
        return null;
    var handleSubmit = function (e) {
        e.preventDefault();
        onSave(__assign({ id: project.id }, formData));
    };
    return (react_1["default"].createElement("div", { className: "modal-overlay" },
        react_1["default"].createElement("div", { className: "modal-content" },
            react_1["default"].createElement("div", { className: "modal-header" },
                react_1["default"].createElement("h3", null, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"),
                react_1["default"].createElement("button", { className: "modal-close", onClick: onClose }, "\u00D7")),
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "modal-form" },
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430:"),
                    react_1["default"].createElement("input", { type: "text", value: formData.name, onChange: function (e) {
                            return setFormData(__assign(__assign({}, formData), { name: e.target.value }));
                        }, required: true, autoFocus: true })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:"),
                    react_1["default"].createElement("textarea", { value: formData.description, onChange: function (e) {
                            return setFormData(__assign(__assign({}, formData), { description: e.target.value }));
                        } })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:"),
                    react_1["default"].createElement("input", { type: "url", value: formData.image_url, onChange: function (e) {
                            return setFormData(__assign(__assign({}, formData), { image_url: e.target.value }));
                        } })),
                react_1["default"].createElement("div", { className: "modal-actions" },
                    react_1["default"].createElement("button", { type: "button", className: "btn-cancel", onClick: onClose }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
                    react_1["default"].createElement("button", { type: "submit", className: "btn-save" }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"))))));
};
