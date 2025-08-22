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
exports.__esModule = true;
var react_1 = require("react");
var ProductList_1 = require("../components/ProductList");
var SearchContext_1 = require("../components/SearchContext");
var productData_1 = require("../components/product/productData");
require("../styles/homePage.css");
var productDataWithId = productData_1.productData.map(function (category) {
    var _a;
    return (__assign(__assign({}, category), { id: ((_a = productData_1.categoryMapping[category.title]) === null || _a === void 0 ? void 0 : _a.toString()) || "all" }));
});
function HomePage() {
    var _a;
    var _b = react_1.useState("all"), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = react_1.useState(null), selectedSubcategory = _c[0], setSelectedSubcategory = _c[1];
    var _d = react_1.useState([]), expandedCategories = _d[0], setExpandedCategories = _d[1];
    var _e = react_1.useState(0), productsCount = _e[0], setProductsCount = _e[1];
    var _f = SearchContext_1.useSearch(), searchQuery = _f.searchQuery, isSearchActive = _f.isSearchActive, clearSearch = _f.clearSearch;
    var _g = react_1.useState(false), isSidebarOpen = _g[0], setIsSidebarOpen = _g[1];
    var sidebarRef = react_1.useRef(null);
    var toggleCategory = function (categoryTitle) {
        setExpandedCategories(function (prev) {
            return prev.includes(categoryTitle) ? [] : [categoryTitle];
        });
    };
    var handleSubcategorySelect = function (categoryTitle, subCategoryId) {
        var category_id = productData_1.categoryMapping[categoryTitle];
        setSelectedCategory((category_id === null || category_id === void 0 ? void 0 : category_id.toString()) || "all");
        setSelectedSubcategory(subCategoryId);
        setIsSidebarOpen(false);
    };
    var getDisplayTitle = function () {
        var _a;
        if (isSearchActive)
            return "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430: \"" + searchQuery + "\"";
        if (selectedCategory === "all")
            return "Все товары";
        if (selectedSubcategory)
            return selectedSubcategory.toString();
        var categoryName = (_a = Object.entries(productData_1.categoryMapping).find(function (_a) {
            var id = _a[1];
            return id.toString() === selectedCategory;
        })) === null || _a === void 0 ? void 0 : _a[0];
        return categoryName || "Товары";
    };
    react_1.useEffect(function () {
        var handleClickOutside = function (e) {
            if (isSidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () { return document.removeEventListener("mousedown", handleClickOutside); };
    }, [isSidebarOpen]);
    return (react_1["default"].createElement("div", { className: "homePage" },
        react_1["default"].createElement("div", { className: "catalog-container" },
            react_1["default"].createElement("div", { className: "mobile-sidebar-toggle" },
                react_1["default"].createElement("button", { "aria-label": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433", className: "burger-btn " + (isSidebarOpen ? "open" : ""), onClick: function () { return setIsSidebarOpen(function (o) { return !o; }); } }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"),
                react_1["default"].createElement("div", { className: "catalog-line" })),
            !isSearchActive && (react_1["default"].createElement("aside", { className: "catalog-sidebar " + (isSidebarOpen ? "visible" : ""), ref: sidebarRef },
                react_1["default"].createElement("div", { className: "sidebar-header" },
                    react_1["default"].createElement("h2", null, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0442\u043E\u0432\u0430\u0440\u043E\u0432")),
                react_1["default"].createElement("div", { className: "categories-list" }, productDataWithId.map(function (category) { return (react_1["default"].createElement("div", { key: category.title, className: "category-section" },
                    react_1["default"].createElement("div", { className: "category-header " + (expandedCategories.includes(category.title) ? "expanded" : ""), onClick: function () { return toggleCategory(category.title); } },
                        react_1["default"].createElement("span", { className: "category-title" }, category.title),
                        react_1["default"].createElement("i", { className: "chevron-icon" }, "\u25BC")),
                    expandedCategories.includes(category.title) && (react_1["default"].createElement("div", { className: "subcategories" }, category.items.map(function (item) { return (react_1["default"].createElement("div", { key: item.subCategoryId, className: "subcategory" },
                        react_1["default"].createElement("h4", { className: "subcategory-title " + ((selectedSubcategory === null || selectedSubcategory === void 0 ? void 0 : selectedSubcategory.toString()) ===
                                item.subCategoryId.toString()
                                ? "active"
                                : ""), onClick: function () {
                                return handleSubcategorySelect(category.title, item.subCategoryId);
                            } }, item.title2))); }))))); })))),
            react_1["default"].createElement("main", { className: "catalog-main " + (isSearchActive ? "full-width" : "") },
                react_1["default"].createElement("div", { className: "catalog-header" },
                    react_1["default"].createElement("div", { className: "catalog-title" },
                        react_1["default"].createElement("h1", null, "\u041D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B"),
                        react_1["default"].createElement("div", { className: "catalog-subtitle" },
                            isSearchActive && (react_1["default"].createElement("button", { onClick: clearSearch, className: "clear-search-btn", title: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A" }, "\u2715 \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A")),
                            productsCount > 0 && (react_1["default"].createElement("span", { className: "products-count" },
                                "\u041D\u0430\u0439\u0434\u0435\u043D\u043E: ",
                                productsCount)))),
                    react_1["default"].createElement("div", { className: "filters-bar" })),
                react_1["default"].createElement("div", { className: "catalog-products-container" },
                    react_1["default"].createElement(ProductList_1.ProductList, { category_id: selectedCategory === "all" ? undefined : Number(selectedCategory), subCategoryId: (_a = selectedSubcategory === null || selectedSubcategory === void 0 ? void 0 : selectedSubcategory.toString()) !== null && _a !== void 0 ? _a : undefined, selectedCategory: selectedCategory, selectedSubcategory: (selectedSubcategory === null || selectedSubcategory === void 0 ? void 0 : selectedSubcategory.toString()) || "", searchQuery: searchQuery, onProductsCountChange: setProductsCount }))))));
}
exports["default"] = HomePage;
