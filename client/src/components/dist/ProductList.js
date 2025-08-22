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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProductList = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var CartContext_1 = require("./CartContext");
var SearchContext_1 = require("./SearchContext");
require("../styles/product.css");
var api_1 = require("../utils/api");
var cart_png_1 = require("../../public/cart.png");
exports.ProductList = function (_a) {
    var category_id = _a.category_id, selectedCategory = _a.selectedCategory, selectedSubcategory = _a.selectedSubcategory, _b = _a.viewMode, viewMode = _b === void 0 ? "grid" : _b, _c = _a.sortOption, sortOption = _c === void 0 ? "default" : _c, onProductsCountChange = _a.onProductsCountChange, subCategoryId = _a.subCategoryId;
    var _d = react_1.useState([]), products = _d[0], setProducts = _d[1];
    var _e = react_1.useState([]), filteredProducts = _e[0], setFilteredProducts = _e[1];
    var _f = react_1.useState(true), loading = _f[0], setLoading = _f[1];
    var _g = react_1.useState(null), error = _g[0], setError = _g[1];
    var addToCart = CartContext_1.useCart().addToCart;
    var searchQuery = SearchContext_1.useSearch().searchQuery; // ✅ используешь только его
    var getSubcategoryNameById = function (id) {
        var map = {
            "501": "Микроволновки",
            "502": "Холодильники",
            "503": "Телевизоры",
            "504": "Стиральные машины",
            "505": "Пылесосы",
            "506": "Утюги"
        };
        return map[id] || "Неизвестная подкатегория";
    };
    react_1.useEffect(function () {
        var hasCategory = category_id !== undefined && category_id !== null;
        var hasSubcategory = subCategoryId !== undefined && subCategoryId !== null && subCategoryId !== "";
        var hasSearch = searchQuery && searchQuery.trim() !== "";
        var fetchProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, enrichedData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setLoading(true);
                        setError(null);
                        return [4 /*yield*/, api_1.getProducts({ category_id: category_id, searchQuery: searchQuery, subCategoryId: subCategoryId })];
                    case 1:
                        data = _a.sent();
                        enrichedData = data.map(function (product) { return (__assign(__assign({}, product), { subcategory: getSubcategoryNameById(product.subCategoryId) })); });
                        setProducts(enrichedData);
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        setError("Ошибка загрузки товаров");
                        console.error("Ошибка загрузки товаров:", err_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchProducts();
    }, [category_id, subCategoryId, searchQuery]);
    react_1.useEffect(function () {
        var filtered = products;
        if (searchQuery && searchQuery.trim()) {
            var query_1 = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(function (product) {
                var _a, _b;
                return product.name.toLowerCase().includes(query_1) || ((_a = product.subCategoryId) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query_1)) || ((_b = product.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(query_1));
            });
        }
        else {
            if (selectedCategory && selectedCategory !== "all") {
                filtered = filtered.filter(function (product) { return product.category_id === Number(selectedCategory); });
            }
            if (selectedSubcategory && selectedSubcategory.toLowerCase() !== "all") {
                filtered = filtered.filter(function (product) { var _a; return ((_a = product.subCategoryId) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === selectedSubcategory.toLowerCase(); });
            }
        }
        setFilteredProducts(filtered);
        if (onProductsCountChange) {
            onProductsCountChange(filtered.length);
        }
    }, [products, selectedCategory, selectedSubcategory, searchQuery, onProductsCountChange]);
    // Сортировка
    var getSortedProducts = function () {
        if (sortOption === "default") {
            return filteredProducts;
        }
        return __spreadArrays(filteredProducts).sort(function (a, b) {
            switch (sortOption) {
                case "price_asc":
                    if (a.price !== b.price)
                        return a.price - b.price;
                    return a.name.localeCompare(b.name, "ru");
                case "price_desc":
                    if (a.price !== b.price)
                        return b.price - a.price;
                    return a.name.localeCompare(b.name, "ru");
                case "name_asc":
                    return a.name.localeCompare(b.name, "ru", { numeric: true });
                case "name_desc":
                    return b.name.localeCompare(a.name, "ru", { numeric: true });
                case "popular":
                    if (a.stock_quantity !== b.stock_quantity)
                        return b.stock_quantity - a.stock_quantity;
                    return a.name.localeCompare(b.name, "ru");
                case "availability":
                    if (a.stock_quantity > 0 && b.stock_quantity === 0)
                        return -1;
                    if (a.stock_quantity === 0 && b.stock_quantity > 0)
                        return 1;
                    return a.price - b.price;
                default:
                    return 0;
            }
        });
    };
    var displayProducts = getSortedProducts();
    var handleAddToCart = function (product) {
        console.log("Добавляем товар в корзину:", product);
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image_url: product.image_url,
            description: product.description || ""
        });
    };
    if (loading)
        return react_1["default"].createElement("div", { className: "loading" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0442\u043E\u0432\u0430\u0440\u043E\u0432...");
    if (error)
        return react_1["default"].createElement("div", { className: "error" }, error);
    if (displayProducts.length === 0) {
        var noProductsMessage = selectedSubcategory
            ? "\u0422\u043E\u0432\u0430\u0440\u044B \u0432 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"
            : "Товары не найдены";
        return react_1["default"].createElement("div", { className: "no-products" }, noProductsMessage);
    }
    return (react_1["default"].createElement("div", { className: "product-list " + (viewMode === "list" ? "product-list-view" : "product-grid-view") }, displayProducts.map(function (product) { return (react_1["default"].createElement("div", { key: product.id, className: "product-card " + (viewMode === "list" ? "product-card-list" : "product-card-grid") },
        react_1["default"].createElement("div", { className: "product-image-cell" }, product.image_url && (react_1["default"].createElement("img", { src: product.image_url, alt: product.name, className: "product-image-admin" }))),
        react_1["default"].createElement("div", { className: "product-info" }, viewMode === "list" ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "product-list-info-right" },
                react_1["default"].createElement("div", { className: "product-price" },
                    product.price.toLocaleString(),
                    " \u20BD"),
                react_1["default"].createElement("div", { className: "product-list-info-left" },
                    react_1["default"].createElement("h3", { className: "product-name" }, product.name),
                    product.description && (react_1["default"].createElement("p", { className: "product-description" }, product.description)),
                    react_1["default"].createElement("button", { onClick: function () { return handleAddToCart(product); }, disabled: product.stock_quantity === 0, className: "add-to-cart-btn" },
                        react_1["default"].createElement("img", { src: "/cart.png", alt: "cart", className: "cart-card-icon" })))))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + product.id + "?type=popular", className: "product-name-link" },
                react_1["default"].createElement("h3", { className: "product-name" }, product.name),
                product.description && (react_1["default"].createElement("p", { className: "product-description" }, product.description)),
                react_1["default"].createElement("p", null, "...\u043F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435")),
            react_1["default"].createElement("div", { className: "cart-price-productStock" },
                react_1["default"].createElement("div", { className: "product-price" },
                    product.price.toLocaleString(),
                    " \u20BD"),
                react_1["default"].createElement("a", { onClick: function () { return addToCart({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.price,
                        image_url: product.image_url,
                        quantity: 1,
                        description: product.description
                    }); }, className: "add-to-cart-btn", style: { cursor: 'pointer' } },
                    react_1["default"].createElement("img", { src: cart_png_1["default"], alt: "icon", className: "product-details-cart-img" }))),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + product.id + "?type=popular", className: "product-name-link" },
                react_1["default"].createElement("div", { className: "contact-the-seller" }, "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u043E\u043C"))))))); })));
};
