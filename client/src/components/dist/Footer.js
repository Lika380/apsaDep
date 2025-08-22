"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/footer.css");
var IG_png_1 = require("../images/IG.png");
var tg_png_1 = require("../images/tg.png");
var WA_png_1 = require("../images/WA.png");
var Footer = function () {
    return (react_1["default"].createElement("footer", { className: "footer" },
        react_1["default"].createElement("div", { className: "footer-content" },
            react_1["default"].createElement("div", { className: "footer-section" },
                react_1["default"].createElement("h3", null, "\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438"),
                react_1["default"].createElement("ul", null,
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { href: "/contacts" }, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { href: "/projects" }, "\u041F\u0440\u043E\u0435\u043A\u0442\u044B")))),
            react_1["default"].createElement("div", { className: "footer-section" },
                react_1["default"].createElement("h3", null, "\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u0430\u043C"),
                react_1["default"].createElement("ul", null,
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { href: "/investorPage" }, "\u0421\u043F\u043E\u043D\u0441\u043E\u0440\u0430\u043C \u0438 \u0438\u043D\u0432\u0435\u0441\u0442\u043E\u0440\u0430\u043C")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("a", { href: "/makersPage" }, "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F\u043C")))),
            react_1["default"].createElement("div", { className: "footer-section contact-info" },
                react_1["default"].createElement("div", { className: "contact-item" },
                    react_1["default"].createElement("strong", null, "+7 (940) 900-14-16"),
                    react_1["default"].createElement("span", null, "apsamarket1@gmail.com")),
                react_1["default"].createElement("div", { className: "social-links" },
                    react_1["default"].createElement("a", { href: "https://wa.me/79409203814", target: "_blank", rel: "noopener noreferrer", className: "social-link" },
                        react_1["default"].createElement("img", { src: WA_png_1["default"], alt: "iconWA", className: "footer-icon" })),
                    react_1["default"].createElement("a", { href: "#", className: "social-link" },
                        react_1["default"].createElement("img", { src: tg_png_1["default"], alt: "iconTG", className: "footer-icon" })),
                    react_1["default"].createElement("a", { href: "https://www.instagram.com/li.kasl/", target: "_blank", rel: "noopener noreferrer", className: "social-link" },
                        react_1["default"].createElement("img", { src: IG_png_1["default"], alt: "iconIG", className: "footer-icon" }))))),
        react_1["default"].createElement("div", { className: "footer-bottom" },
            react_1["default"].createElement("div", { className: "footer-copyright" },
                react_1["default"].createElement("p", null, "\u00A9 2025 ApsaMarket. \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B"),
                react_1["default"].createElement("div", { className: "footer-links" },
                    react_1["default"].createElement("a", { href: "/privacy" }, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"))))));
};
exports["default"] = Footer;
