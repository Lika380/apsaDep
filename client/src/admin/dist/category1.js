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
var Category1Admin = function () {
    var _a = react_1.useState([]), category1 = _a[0], setCategory1 = _a[1];
    var _b = react_1.useState(false), loadingCategory1 = _b[0], setLoadingCategory1 = _b[1];
    var _c = react_1.useState(null), errorCategory1 = _c[0], setErrorCategory1 = _c[1];
    var _d = react_1.useState(false), showAddCategory1 = _d[0], setShowAddCategory1 = _d[1];
    var _e = react_1.useState(null), editingCategory1 = _e[0], setEditingCategory1 = _e[1];
    var loadCategory1 = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoadingCategory1(true);
                    return [4 /*yield*/, api_1.api.admin.getCategory1()];
                case 1:
                    data = _a.sent();
                    setCategory1(data);
                    setErrorCategory1(null);
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    setErrorCategory1("Ошибка загрузки продуктов");
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 3:
                    setLoadingCategory1(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        loadCategory1();
    }, []);
    var handleAddCategory1 = function (category1Data) { return __awaiter(void 0, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.api.admin.createCategory1(category1Data)];
                case 1:
                    _a.sent();
                    loadCategory1();
                    setShowAddCategory1(false);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    setErrorCategory1("Ошибка добавления  продукта");
                    console.error(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleEditCategory1 = function (category1Data) { return __awaiter(void 0, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.api.admin.updateCategory1(category1Data.id, category1Data)];
                case 1:
                    _a.sent();
                    loadCategory1();
                    setEditingCategory1(null);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    setErrorCategory1("Ошибка обновления  продукта");
                    console.error(e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteCategory1 = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.api.admin.deleteCategory1(id)];
                case 1:
                    _a.sent();
                    loadCategory1();
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    setErrorCategory1("Ошибка удаления  продукта");
                    console.error(e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "admin-section" },
        react_1["default"].createElement("div", { className: "section-header" },
            react_1["default"].createElement("h2", null, "\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F 1"),
            react_1["default"].createElement("button", { className: "add-btn", onClick: function () { return setShowAddCategory1(true); } }, "+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440")),
        errorCategory1 && react_1["default"].createElement("div", { className: "error-message" }, errorCategory1),
        loadingCategory1 && react_1["default"].createElement("div", { className: "loading-message" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."),
        !loadingCategory1 && category1.length === 0 ? (react_1["default"].createElement("div", { className: "placeholder-content" },
            react_1["default"].createElement("div", { className: "placeholder-icon" }, "\uD83C\uDF1F"),
            react_1["default"].createElement("h3", null, "\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F 1 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"),
            react_1["default"].createElement("p", null, "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F 1."))) : (react_1["default"].createElement("div", { className: "products-table" }, category1.map(function (item) { return (react_1["default"].createElement("div", { key: item.id, className: "table-row" },
            react_1["default"].createElement("div", { className: "product-image-cell" }, item.image_url ? (react_1["default"].createElement("img", { src: item.image_url, alt: item.name, className: "product-image-admin" })) : (react_1["default"].createElement("div", { className: "no-image" }, "\uD83C\uDF1F"))),
            react_1["default"].createElement("span", { className: "product-name" }, item.name),
            react_1["default"].createElement("span", { className: "price" },
                item.price.toLocaleString(),
                " \u20BD"),
            react_1["default"].createElement("span", null,
                "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F ID ",
                item.category_id),
            react_1["default"].createElement("div", { className: "actions" },
                react_1["default"].createElement("button", { className: "action-btn edit", onClick: function () { return setEditingCategory1(item); } }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"),
                react_1["default"].createElement("button", { className: "action-btn delete", onClick: function () { return handleDeleteCategory1(item.id); } }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))); }))),
        react_1["default"].createElement(AddCategory1Modal, { show: showAddCategory1, onClose: function () { return setShowAddCategory1(false); }, onSave: handleAddCategory1 }),
        react_1["default"].createElement(EditCategory1Modal, { show: !!editingCategory1, category1: editingCategory1, onClose: function () { return setEditingCategory1(null); }, onSave: handleEditCategory1 })));
};
var AddCategory1Modal = function (_a) {
    var show = _a.show, onClose = _a.onClose, onSave = _a.onSave;
    var _b = react_1.useState({
        name: "",
        description: "",
        price: 0,
        category_id: 1,
        image_url: "",
        stock_quantity: 0
    }), formData = _b[0], setFormData = _b[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        onSave(formData);
        onClose();
    };
    if (!show)
        return null;
    return (react_1["default"].createElement("div", { className: "modal-overlay" },
        react_1["default"].createElement("div", { className: "modal-content" },
            react_1["default"].createElement("div", { className: "modal-header" },
                react_1["default"].createElement("h3", null, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440"),
                react_1["default"].createElement("button", { className: "modal-close", onClick: onClose }, "\u00D7")),
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "modal-form" },
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435:"),
                    react_1["default"].createElement("input", { type: "text", value: formData.name, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }, required: true })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:"),
                    react_1["default"].createElement("textarea", { value: formData.description, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { description: e.target.value })); } })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u0426\u0435\u043D\u0430:"),
                    react_1["default"].createElement("input", { type: "number", value: formData.price, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { price: Number(e.target.value) })); }, required: true, min: 0 })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "ID \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438:"),
                    react_1["default"].createElement("input", { type: "number", value: formData.category_id, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { category_id: Number(e.target.value) })); }, required: true, min: 1 })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:"),
                    react_1["default"].createElement("input", { type: "url", value: formData.image_url, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { image_url: e.target.value })); } })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043D\u0430 \u0441\u043A\u043B\u0430\u0434\u0435:"),
                    react_1["default"].createElement("input", { type: "number", value: formData.stock_quantity, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { stock_quantity: Number(e.target.value) })); }, required: true, min: 0 })),
                react_1["default"].createElement("div", { className: "modal-actions" },
                    react_1["default"].createElement("button", { type: "button", className: "btn-cancel", onClick: onClose }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
                    react_1["default"].createElement("button", { type: "submit", className: "btn-save" }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))))));
};
var EditCategory1Modal = function (_a) {
    var show = _a.show, category1 = _a.category1, onClose = _a.onClose, onSave = _a.onSave;
    var _b = react_1["default"].useState({
        name: "",
        description: "",
        price: 0,
        category_id: 1,
        image_url: "",
        stock_quantity: 0
    }), formData = _b[0], setFormData = _b[1];
    react_1["default"].useEffect(function () {
        if (category1) {
            setFormData({
                name: category1.name,
                description: category1.description || "",
                price: category1.price,
                category_id: category1.category_id,
                image_url: category1.image_url || "",
                stock_quantity: category1.stock_quantity
            });
        }
    }, [category1]);
    var handleSubmit = function (e) {
        e.preventDefault();
        if (category1) {
            onSave(__assign(__assign({}, category1), formData));
            onClose();
        }
    };
    if (!show || !category1)
        return null;
    return (react_1["default"].createElement("div", { className: "modal-overlay" },
        react_1["default"].createElement("div", { className: "modal-content" },
            react_1["default"].createElement("div", { className: "modal-header" },
                react_1["default"].createElement("h3", null, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E 1"),
                react_1["default"].createElement("button", { className: "modal-close", onClick: onClose }, "\u00D7")),
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "modal-form" },
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435:"),
                    react_1["default"].createElement("input", { type: "text", value: formData.name, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }, required: true })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:"),
                    react_1["default"].createElement("textarea", { value: formData.description, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { description: e.target.value })); } })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u0426\u0435\u043D\u0430:"),
                    react_1["default"].createElement("input", { type: "number", value: formData.price, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { price: Number(e.target.value) })); }, required: true, min: 0 })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "ID \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438:"),
                    react_1["default"].createElement("input", { type: "number", value: formData.category_id, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { category_id: Number(e.target.value) })); }, required: true, min: 1 })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:"),
                    react_1["default"].createElement("input", { type: "url", value: formData.image_url, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { image_url: e.target.value })); } })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043D\u0430 \u0441\u043A\u043B\u0430\u0434\u0435:"),
                    react_1["default"].createElement("input", { type: "number", value: formData.stock_quantity, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { stock_quantity: Number(e.target.value) })); }, required: true, min: 0 })),
                react_1["default"].createElement("div", { className: "modal-actions" },
                    react_1["default"].createElement("button", { type: "button", className: "btn-cancel", onClick: onClose }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
                    react_1["default"].createElement("button", { type: "submit", className: "btn-save" }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"))))));
};
exports["default"] = Category1Admin;
