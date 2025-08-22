"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom"); // добавили useLocation
var CartContext_1 = require("./CartContext");
var SearchContext_1 = require("./SearchContext");
require("../components/Header.css");
require("../styles/loginModal.css");
var AuthPage_1 = require("../components/AuthPage");
var UserDropdown_1 = require("../components/UserDropdown");
var useAuth_1 = require("../hooks/useAuth");
var Header = function () {
    var _a = react_1.useState(false), isScrolled = _a[0], setIsScrolled = _a[1];
    var _b = react_1.useState(false), isMobileMenuOpen = _b[0], setIsMobileMenuOpen = _b[1];
    var getItemsCount = CartContext_1.useCart().getItemsCount;
    var _c = SearchContext_1.useSearch(), searchQuery = _c.searchQuery, setSearchQuery = _c.setSearchQuery;
    var navigate = react_router_dom_1.useNavigate();
    var location = react_router_dom_1.useLocation(); // текущий путь
    var _d = react_1.useState(false), isAuthOpen = _d[0], setIsAuthOpen = _d[1];
    var isAuthenticated = useAuth_1.useAuth().isAuthenticated;
    var mobileMenuRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var handleClickOutside = function (e) {
            if (isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () { return document.removeEventListener("mousedown", handleClickOutside); };
    }, [isMobileMenuOpen]);
    react_1.useEffect(function () {
        var onScroll = function () { return setIsScrolled(window.scrollY > 50); };
        window.addEventListener("scroll", onScroll);
        return function () { return window.removeEventListener("scroll", onScroll); };
    }, []);
    var handleSearch = function (e) {
        e.preventDefault();
        if (searchQuery.trim())
            navigate("/catalog");
    };
    var showSearch = location.pathname === "/catalog" || location.pathname === "/cartPage";
    return (React.createElement("header", { className: "header " + (isScrolled ? "header-scrolled" : "") },
        React.createElement("nav", { className: "header-nav" },
            React.createElement("div", { className: "header-content" },
                React.createElement("a", { href: "/", className: "logo" }, "ApsaMarket"),
                showSearch && (React.createElement("form", { className: "header-search-form", onSubmit: handleSearch },
                    React.createElement("input", { type: "text", placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0442\u043E\u0432\u0430\u0440\u0430\u043C...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "header-search-input" }),
                    React.createElement("button", { type: "submit" },
                        React.createElement("img", { src: "/search.png", alt: "search", className: "header-search-icon" })))),
                React.createElement("button", { className: "mobile-menu-btn " + (isMobileMenuOpen ? "active" : ""), onClick: function () { return setIsMobileMenuOpen(!isMobileMenuOpen); }, "aria-label": "\u041C\u0435\u043D\u044E" },
                    React.createElement("span", null),
                    React.createElement("span", null),
                    React.createElement("span", null)),
                React.createElement("div", { className: "headerAction" },
                    React.createElement("a", { href: "/cartPage", className: "actionIcon" },
                        React.createElement("img", { src: "/cart.png", alt: "cart", className: "header-icon" }),
                        getItemsCount() > 0 && (React.createElement("span", { className: "icon-badge" }, getItemsCount()))),
                    React.createElement("a", { href: "/catalog", className: "catalog" }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"),
                    React.createElement("a", { href: "#", className: "header-phone" }, "+7 (940) 900-14-16"),
                    React.createElement("div", { className: "authBtn" },
                        isAuthenticated ? (React.createElement(UserDropdown_1.UserDropdown, null)) : (React.createElement("button", { onClick: function () { return setIsAuthOpen(true); }, className: "actionIcon-btn" }, "\u0412\u043E\u0439\u0442\u0438")),
                        React.createElement(AuthPage_1.AuthPage, { isOpen: isAuthOpen, onClose: function () { return setIsAuthOpen(false); } }))))),
        React.createElement("div", { className: "mobileMenu " + (isMobileMenuOpen ? "active" : ""), ref: mobileMenuRef },
            React.createElement("div", { className: "mobileMenu-inner" },
                React.createElement("button", { className: "close-mobile-menu", "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E", onClick: function () { return setIsMobileMenuOpen(false); } }, "\u2715"),
                React.createElement("nav", { className: "mobileMenu-list" },
                    React.createElement("a", { href: "/", onClick: function () { return setIsMobileMenuOpen(false); } }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F"),
                    React.createElement("a", { href: "/catalog", onClick: function () { return setIsMobileMenuOpen(false); } }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"),
                    React.createElement("a", { href: "/cartPage", onClick: function () { return setIsMobileMenuOpen(false); } },
                        "\u041A\u043E\u0440\u0437\u0438\u043D\u0430 ",
                        getItemsCount() > 0 && React.createElement("span", { className: "icon-badge" }, getItemsCount())),
                    isAuthenticated ? (React.createElement(UserDropdown_1.UserDropdown, null)) : (React.createElement("button", { onClick: function () {
                            setIsAuthOpen(true);
                            setIsMobileMenuOpen(false);
                        }, className: "actionIcon-btn" }, "\u0412\u043E\u0439\u0442\u0438")))))));
};
exports["default"] = Header;
