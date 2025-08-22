"use strict";
exports.__esModule = true;
exports.UserDropdown = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var useAuth_1 = require("../hooks/useAuth");
require("../styles/userDropdown.css");
exports.UserDropdown = function (_a) {
    var userAvatar = _a.userAvatar;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownRef = react_1.useRef(null);
    var _c = useAuth_1.useAuth(), user = _c.user, logout = _c.logout, isAdmin = _c.isAdmin;
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    var handleProfileClick = function () {
        setIsOpen(false);
        navigate("/profile");
    };
    var handleAdminClick = function () {
        setIsOpen(false);
        navigate("/admin");
    };
    var handleLogout = function () {
        setIsOpen(false);
        logout();
    };
    var getInitials = function (email) {
        return email.charAt(0).toUpperCase();
    };
    return (react_1["default"].createElement("div", { className: "user-dropdown", ref: dropdownRef },
        react_1["default"].createElement("button", { className: "user-avatar-btn", onClick: function () { return setIsOpen(!isOpen); }, "aria-expanded": isOpen, "aria-haspopup": "true" },
            userAvatar ? (react_1["default"].createElement("img", { src: userAvatar, alt: "User Avatar", className: "avatar-img" })) : (react_1["default"].createElement("div", { className: "avatar-placeholder" }, (user === null || user === void 0 ? void 0 : user.email) ? getInitials(user.email) : "U")),
            react_1["default"].createElement("svg", { className: "dropdown-arrow " + (isOpen ? "open" : ""), width: "12", height: "8", viewBox: "0 0 12 8" },
                react_1["default"].createElement("path", { d: "M1 1l5 5 5-5", stroke: "currentColor", strokeWidth: "2", fill: "none" }))),
        isOpen && (react_1["default"].createElement("div", { className: "dropdown-menu" },
            react_1["default"].createElement("div", { className: "dropdown-header" },
                react_1["default"].createElement("div", { className: "user-info" },
                    react_1["default"].createElement("div", { className: "user-name" }, user === null || user === void 0 ? void 0 : user.email),
                    react_1["default"].createElement("div", { className: "user-role" }, isAdmin ? "Администратор" : "Пользователь"))),
            react_1["default"].createElement("div", { className: "dropdown-divider" }),
            react_1["default"].createElement("div", { className: "dropdown-content" },
                react_1["default"].createElement("button", { className: "dropdown-item", onClick: handleProfileClick }, "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442"),
                isAdmin && (react_1["default"].createElement("button", { className: "dropdown-item admin-item", onClick: handleAdminClick }, "\u0410\u0434\u043C\u0438\u043D \u043F\u0430\u043D\u0435\u043B\u044C"))),
            react_1["default"].createElement("div", { className: "dropdown-divider" }),
            react_1["default"].createElement("button", { className: "dropdown-item logout-item", onClick: handleLogout },
                react_1["default"].createElement("svg", { className: "item-icon", width: "16", height: "16", viewBox: "0 0 24 24" },
                    react_1["default"].createElement("path", { d: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z", fill: "currentColor" })),
                "\u0412\u044B\u0439\u0442\u0438")))));
};
