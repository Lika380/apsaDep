"use strict";
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
exports.RegisterModal = void 0;
var react_1 = require("react");
var api_1 = require("../utils/api");
require("../styles/loginModal.css");
exports.RegisterModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onSwitchToLogin = _a.onSwitchToLogin;
    var _b = react_1.useState(""), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(""), phone = _c[0], setPhone = _c[1];
    var _d = react_1.useState(""), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(""), message = _e[0], setMessage = _e[1];
    var _f = react_1.useState(""), name = _f[0], setName = _f[1];
    if (!isOpen)
        return null;
    var handleRegister = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_1.api.register(email, phone, password, name)];
                case 2:
                    data = _b.sent();
                    if (data.message === "Пользователь успешно создан") {
                        setMessage("Регистрация успешна!");
                        setEmail("");
                        setPhone("");
                        setPassword("");
                        setName("");
                        onClose();
                    }
                    else {
                        setMessage(data.message || "Ошибка регистрации");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    setMessage("Ошибка подключения к серверу");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    react_1["default"].createElement("input", { type: "email", placeholder: "Email", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true });
    { /* Опционально для телефона */ }
    react_1["default"].createElement("input", { type: "tel", placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", value: phone, onChange: function (e) { return setPhone(e.target.value); } });
    return (react_1["default"].createElement("div", { className: "modal-overlay", onClick: onClose },
        react_1["default"].createElement("div", { className: "modal-content", onClick: function (e) { return e.stopPropagation(); } },
            react_1["default"].createElement("h2", null, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"),
            react_1["default"].createElement("form", { onSubmit: handleRegister, className: "auth-form" },
                react_1["default"].createElement("input", { type: "text", placeholder: "\u041B\u043E\u0433\u0438\u043D", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "auth-login", required: true }),
                react_1["default"].createElement("input", { type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", value: password, onChange: function (e) { return setPassword(e.target.value); }, className: "auth-password", required: true }),
                react_1["default"].createElement("input", { type: "text", placeholder: "\u0418\u043C\u044F", value: name, onChange: function (e) { return setName(e.target.value); }, className: "auth-name", required: true }),
                react_1["default"].createElement("button", { type: "submit", className: "auth-btn" }, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F"),
                react_1["default"].createElement("p", null, message)),
            react_1["default"].createElement("p", null,
                "\u0423\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442?",
                " ",
                react_1["default"].createElement("button", { className: "switch-btn", onClick: onSwitchToLogin }, "\u0412\u043E\u0439\u0442\u0438")),
            react_1["default"].createElement("button", { className: "close-button", onClick: onClose }, "\u00D7"))));
};
