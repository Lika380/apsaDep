"use strict";
exports.__esModule = true;
var Header_1 = require("./components/Header");
var Footer_1 = require("./components/Footer");
var Main_1 = require("./pages/Main");
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
var AdminPanel_1 = require("./admin/AdminPanel");
var Profile_1 = require("./pages/Profile");
var CartPage_1 = require("./pages/CartPage");
var HomePage_1 = require("./pages/HomePage");
var CartContext_1 = require("./components/CartContext");
var SearchContext_1 = require("./components/SearchContext");
var AuthContext_1 = require("./components/AuthContext");
var AccomodationPolicy_1 = require("./components/information/AccomodationPolicy");
var Contacts_1 = require("./pages/Contacts");
var Projects_1 = require("./pages/Projects");
var InvestorPage_1 = require("./pages/InvestorPage");
var MakersPage_1 = require("./pages/MakersPage");
var ProductDetails_1 = require("./pages/ProductDetails");
function App() {
    return (React.createElement(AuthContext_1.AuthProvider, null,
        React.createElement(CartContext_1.CartProvider, null,
            React.createElement(SearchContext_1.SearchProvider, null,
                React.createElement("div", { className: "app" },
                    React.createElement(react_router_dom_1.BrowserRouter, null,
                        React.createElement(Header_1["default"], null),
                        React.createElement("main", null,
                            React.createElement(react_router_dom_1.Routes, null,
                                React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(Main_1["default"], null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/admin", element: React.createElement(AdminPanel_1.AdminPanel, null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/profile", element: React.createElement(Profile_1.Profile, null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/cartPage", element: React.createElement(CartPage_1["default"], null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/catalog", element: React.createElement(HomePage_1["default"], null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/privacy", element: React.createElement(AccomodationPolicy_1["default"], null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/contacts", element: React.createElement(Contacts_1["default"], null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/projects", element: React.createElement(Projects_1["default"], null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/investorPage", element: React.createElement(InvestorPage_1["default"], null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/makersPage", element: React.createElement(MakersPage_1["default"], null) }),
                                React.createElement(react_router_dom_1.Route, { path: "/product/:id", element: React.createElement(ProductDetails_1["default"], null) }))),
                        React.createElement(Footer_1["default"], null)))))));
}
exports["default"] = App;
