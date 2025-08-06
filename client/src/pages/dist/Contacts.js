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
require("../styles/contacts.css");
var IG_png_1 = require("../images/IG.png");
var tg_png_1 = require("../images/tg.png");
var config_1 = require("../config");
var WA_png_1 = require("../images/WA.png");
var Contacts = function () {
    var _a = react_1.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState(false), formSubmitted = _b[0], setFormSubmitted = _b[1];
    var handleFormChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleFormSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/messages", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Ошибка отправки сообщения');
                    }
                    setFormSubmitted(true);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    // Через 3 секунды скрыть сообщение об успехе
                    setTimeout(function () {
                        setFormSubmitted(false);
                    }, 3000);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    alert('Не удалось отправить сообщение. Попробуйте позже.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "contact-container" },
        react_1["default"].createElement("main", { className: "contact-main" },
            react_1["default"].createElement("section", { className: "apsuastore-location-section" },
                react_1["default"].createElement("div", { className: "apsuastore-contact-info" },
                    react_1["default"].createElement("h2", null, "\u041A\u041E\u041D\u0422\u0410\u041A\u0422\u042B"),
                    react_1["default"].createElement("hr", { className: 'content-hr' }),
                    react_1["default"].createElement("div", { className: "apsamarket-contact-block" },
                        react_1["default"].createElement("div", { className: "apsuastore-contact-item" },
                            react_1["default"].createElement("img", { src: "https://i.postimg.cc/0QLHg0JH/ic-round-phone.png", alt: "location", className: "apsuastore-contact-icon" }),
                            react_1["default"].createElement("a", { href: "tel:+79409203814", className: "apsuastore-contact-text" }, "+7 (940) 920-38-14")),
                        react_1["default"].createElement("div", { className: "apsuastore-contact-item" },
                            react_1["default"].createElement("img", { src: "https://i.postimg.cc/x1DPRZy7/Group-2.png", alt: "location", className: "apsuastore-contact-icon" }),
                            react_1["default"].createElement("a", { href: "mailto:apsamarket1@gmail.com", className: "apsuastore-contact-text" }, "apsamarket1@gmail.com")),
                        react_1["default"].createElement("div", { className: "social-links" },
                            react_1["default"].createElement("a", { href: "https://wa.me/79409203814", target: "_blank", rel: "noopener noreferrer", className: "social-link" },
                                react_1["default"].createElement("img", { src: WA_png_1["default"], alt: "iconWA", className: "footer-icon" })),
                            react_1["default"].createElement("a", { href: "#", className: "social-link" },
                                react_1["default"].createElement("img", { src: tg_png_1["default"], alt: "iconTG", className: "footer-icon" })),
                            react_1["default"].createElement("a", { href: "https://www.instagram.com/li.kasl/", target: "_blank", rel: "noopener noreferrer", className: "social-link" },
                                react_1["default"].createElement("img", { src: IG_png_1["default"], alt: "iconIG", className: "footer-icon" })))))),
            react_1["default"].createElement("section", { className: "contact-form-section" },
                react_1["default"].createElement("div", { className: "" },
                    react_1["default"].createElement("h2", { className: "contact-section-title" }, "\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043D\u0430\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435"),
                    formSubmitted ? (react_1["default"].createElement("div", { className: "contact-form-success" },
                        react_1["default"].createElement("div", { className: "contact-success-icon" }, "\u2713"),
                        react_1["default"].createElement("h3", { className: "contact-success-title" }, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435!"),
                        react_1["default"].createElement("p", { className: "contact-success-text" }, "\u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0438 \u043E\u0442\u0432\u0435\u0442\u0438\u043C \u0432\u0430\u043C \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F."))) : (react_1["default"].createElement("form", { className: "contact-form", onSubmit: handleFormSubmit },
                        react_1["default"].createElement("div", { className: "contact-form-grid" },
                            react_1["default"].createElement("div", { className: "contact-form-group" },
                                react_1["default"].createElement("label", { className: "contact-form-label" }, "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F*"),
                                react_1["default"].createElement("input", { type: "text", name: "name", className: "contact-form-input", value: formData.name, onChange: handleFormChange, required: true })),
                            react_1["default"].createElement("div", { className: "contact-form-group" },
                                react_1["default"].createElement("label", { className: "contact-form-label" }, "Email*"),
                                react_1["default"].createElement("input", { type: "email", name: "email", className: "contact-form-input", value: formData.email, onChange: handleFormChange, required: true })),
                            react_1["default"].createElement("div", { className: "contact-form-group contact-form-full" },
                                react_1["default"].createElement("label", { className: "contact-form-label" }, "\u0422\u0435\u043C\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F"),
                                react_1["default"].createElement("input", { type: "text", name: "subject", className: "contact-form-input", value: formData.subject, onChange: handleFormChange })),
                            react_1["default"].createElement("div", { className: "contact-form-group contact-form-full" },
                                react_1["default"].createElement("label", { className: "contact-form-label" }, "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435*"),
                                react_1["default"].createElement("textarea", { name: "message", className: "contact-form-textarea", value: formData.message, onChange: handleFormChange, rows: 5, required: true }))),
                        react_1["default"].createElement("div", { className: "contact-form-submit" },
                            react_1["default"].createElement("button", { type: "submit", className: "contact-form-button" }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435")))))))));
};
exports["default"] = Contacts;
