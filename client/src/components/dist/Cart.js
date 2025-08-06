"use strict";
exports.__esModule = true;
exports.Cart = void 0;
var CartContext_1 = require("../components/CartContext");
var SearchContext_1 = require("../components/SearchContext");
require("../styles/cart.css");
var react_router_dom_1 = require("react-router-dom");
exports.Cart = function () {
    var _a = CartContext_1.useCart(), cart = _a.cart, removeFromCart = _a.removeFromCart;
    var searchQuery = SearchContext_1.useSearch().searchQuery;
    var filteredCart = cart.filter(function (item) {
        if (!searchQuery || !searchQuery.trim())
            return true;
        var query = searchQuery.toLowerCase();
        return (item.name.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query)));
    });
    return (React.createElement("div", { className: "cartBlock" }, filteredCart.length === 0 ? (React.createElement("div", { className: "empty-cart" },
        React.createElement("p", null, "\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430."),
        React.createElement("p", null, "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430"))) : (React.createElement("div", { className: "cartCards" },
        React.createElement("div", { className: "cartCardContent" }, filteredCart.map(function (item) {
            console.log("cart item:", item);
            return (React.createElement("div", { key: item.id, className: "cartCard" },
                React.createElement("div", { className: "product-image-cell" }, item.image_url && (React.createElement("img", { src: item.image_url, alt: item.name, className: "cartItemImage" }))),
                React.createElement("div", { className: "cartItemInfo" },
                    React.createElement("div", { className: "cart-title" },
                        React.createElement(react_router_dom_1.Link, { to: "/product/" + item.id, state: { type: item.type || "default" }, className: "product-name-link" },
                            React.createElement("h3", { className: "product-name" }, item.name),
                            item.description && (React.createElement("p", { className: "product-description" }, item.description)),
                            React.createElement("p", null, "...\u043F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435"))),
                    React.createElement("div", { className: "cart-price" },
                        React.createElement("p", { className: "cartItemPrice" },
                            item.price.toLocaleString(),
                            " \u20BD"),
                        React.createElement("button", { onClick: function () { return removeFromCart(item.id); }, className: "cartDeleteBtn" }, "\u2013")),
                    React.createElement(react_router_dom_1.Link, { to: "/product/" + item.id, state: { type: item.type || "default" }, className: "product-name-link" },
                        React.createElement("div", { className: "cart-contact-the-seller" }, "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u043E\u043C")))));
        }))))));
};
