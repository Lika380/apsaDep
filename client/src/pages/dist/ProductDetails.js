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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../utils/api");
require("../styles/productDetails.css");
var CartContext_1 = require("../components/CartContext");
var useAuth_1 = require("../hooks/useAuth");
var WA_png_1 = require("../images/WA.png");
var IG_png_1 = require("../images/IG.png");
var ProductDetails = function () {
    var _a;
    var id = react_router_dom_1.useParams().id;
    var _b = react_1.useState(null), product = _b[0], setProduct = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(null), error = _d[0], setError = _d[1];
    var addToCart = CartContext_1.useCart().addToCart;
    var user = useAuth_1.useAuth().user;
    var _e = react_1.useState([]), reviews = _e[0], setReviews = _e[1];
    var _f = react_1.useState(false), loadingReviews = _f[0], setLoadingReviews = _f[1];
    var _g = react_1.useState(""), reviewText = _g[0], setReviewText = _g[1];
    var _h = react_1.useState(""), reviewMessage = _h[0], setReviewMessage = _h[1];
    var location = react_router_dom_1.useLocation();
    var type = ((_a = location.state) === null || _a === void 0 ? void 0 : _a.type) || "products";
    react_1.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        setLoading(true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, api_1.api.getProductByType(type || "", id)];
                    case 2:
                        data = _b.sent();
                        setProduct(data);
                        setError(null);
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        setError("Ошибка загрузки товара");
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    }, [id, type]);
    react_1.useEffect(function () {
        if (!id)
            return;
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        setLoadingReviews(true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, api_1.api.getReviews(id)];
                    case 2:
                        data = _b.sent();
                        setReviews(data);
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        setReviews([]);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoadingReviews(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    }, [id]);
    var normalizeInstagramUrl = function (inst) {
        if (!inst)
            return null;
        if (inst.startsWith("http://") || inst.startsWith("https://")) {
            return inst;
        }
        return "https://instagram.com/" + inst.replace(/^@/, "");
    };
    // Отправка нового отзыва
    var handleReviewSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var token, res, err, newReview_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!user) {
                        setReviewMessage("Чтобы оставить отзыв, нужно войти в аккаунт.");
                        return [2 /*return*/];
                    }
                    if (!reviewText.trim())
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    token = api_1.tokenUtils.getToken();
                    return [4 /*yield*/, fetch((import.meta.env.VITE_API_BASE_URL || "") + "/api/reviews", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + token
                            },
                            body: JSON.stringify({
                                userId: user.id,
                                productId: id,
                                text: reviewText.trim()
                            })
                        })];
                case 2:
                    res = _a.sent();
                    if (!!res.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, res.json()];
                case 3:
                    err = _a.sent();
                    throw new Error(err.message || "Ошибка отправки отзыва");
                case 4: return [4 /*yield*/, res.json()];
                case 5:
                    newReview_1 = _a.sent();
                    setReviews(function (prev) { return __spreadArrays([
                        {
                            id: newReview_1.reviewId,
                            user_id: user.id,
                            user_identifier: user.email || user.phone || "Вы",
                            text: reviewText.trim(),
                            created_at: new Date().toISOString()
                        }
                    ], prev); });
                    setReviewText("");
                    setReviewMessage("Спасибо за отзыв!");
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    setReviewMessage(error_1.message || "Ошибка при отправке отзыва");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    if (loading)
        return react_1["default"].createElement("div", null, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...");
    if (error || !product)
        return react_1["default"].createElement("div", null, error || "Товар не найден");
    var handleDeleteReview = function (reviewId) { return __awaiter(void 0, void 0, void 0, function () {
        var token, res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm("Удалить этот отзыв?"))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    token = api_1.tokenUtils.getToken();
                    return [4 /*yield*/, fetch((import.meta.env.VITE_API_BASE_URL || "") + "/api/reviews/" + reviewId, {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + token
                            }
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!res.ok) {
                        throw new Error(data.message || "Ошибка при удалении отзыва");
                    }
                    setReviews(function (prev) { return prev.filter(function (r) { return r.id !== reviewId; }); });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    alert(err_1.message || "Ошибка удаления отзыва");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "product-details" },
        react_1["default"].createElement("h2", { className: "product-card-name" }, "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0442\u043E\u0432\u0430\u0440\u0430"),
        react_1["default"].createElement("div", { className: "product-details-content" },
            react_1["default"].createElement("div", { className: "product-detail-img" }, product.image_url && react_1["default"].createElement("img", { src: product.image_url, alt: product.name, style: { maxWidth: 600 } })),
            react_1["default"].createElement("div", { className: "product-detail-info" },
                react_1["default"].createElement("div", { className: "product-detail-info-content" },
                    react_1["default"].createElement("h2", null, product.name),
                    react_1["default"].createElement("p", null, product.description),
                    react_1["default"].createElement("div", { className: "product-detail-info-price-cart" },
                        react_1["default"].createElement("p", { className: "product-detail-info-price" },
                            react_1["default"].createElement("strong", null, "\u0426\u0435\u043D\u0430:"),
                            " ",
                            product.price.toLocaleString(),
                            " \u20BD")),
                    react_1["default"].createElement("button", { onClick: function () {
                            if (product) {
                                addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image_url: product.image_url,
                                    quantity: 1,
                                    description: product.description || "",
                                    type: "popular"
                                });
                            }
                        }, className: "product-details-cart-button", style: { cursor: "pointer", background: "none", border: "none" } }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443"),
                    react_1["default"].createElement("div", { className: "contact-buttons" },
                        react_1["default"].createElement("p", null, "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u043E\u043C"),
                        product.website && (react_1["default"].createElement("a", { href: product.website.startsWith("http") ? product.website : "https://" + product.website, target: "_blank", rel: "noopener noreferrer", className: "btn btn-website" }, "C\u0430\u0439\u0442")),
                        product.instagram && (react_1["default"].createElement("a", { href: normalizeInstagramUrl(product.instagram) || "#", target: "_blank", rel: "noopener noreferrer" },
                            react_1["default"].createElement("img", { src: IG_png_1["default"], alt: "iconIG", className: "cart-footer-icon" }))),
                        product.whatsapp && (react_1["default"].createElement("a", { href: "https://wa.me/" + product.whatsapp.replace(/\D/g, ""), target: "_blank", rel: "noopener noreferrer", className: "btn btn-whatsapp" },
                            react_1["default"].createElement("img", { src: WA_png_1["default"], alt: "iconWA", className: "cart-icon-wa" }))))))),
        react_1["default"].createElement("div", { className: "reviews-section" },
            react_1["default"].createElement("h3", null, "\u041E\u0442\u0437\u044B\u0432\u044B"),
            user ? (react_1["default"].createElement("form", { onSubmit: handleReviewSubmit, className: "reviews-section-input" },
                react_1["default"].createElement("textarea", { placeholder: "\u0412\u0430\u0448 \u043E\u0442\u0437\u044B\u0432...", value: reviewText, onChange: function (e) { return setReviewText(e.target.value); }, required: true, rows: 4 }),
                react_1["default"].createElement("button", { type: "submit" }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432"),
                reviewMessage && react_1["default"].createElement("p", null, reviewMessage))) : (react_1["default"].createElement("p", null,
                "\u0427\u0442\u043E\u0431\u044B \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432, ",
                react_1["default"].createElement("a", { href: "/login" }, "\u0432\u043E\u0439\u0434\u0438\u0442\u0435 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442"),
                ".")),
            loadingReviews ? (react_1["default"].createElement("p", null, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u0437\u044B\u0432\u043E\u0432...")) : (react_1["default"].createElement("div", { className: "reviews-list", style: { marginTop: 20 } },
                reviews.length === 0 && react_1["default"].createElement("p", null, "\u041E\u0442\u0437\u044B\u0432\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442."),
                reviews.map(function (r) { return (react_1["default"].createElement("div", { key: r.id, style: { borderBottom: "1px solid #ccc", padding: "10px 0" } },
                    react_1["default"].createElement("p", null,
                        react_1["default"].createElement("strong", null, r.user_identifier),
                        " ",
                        react_1["default"].createElement("em", null,
                            "(",
                            new Date(r.created_at).toLocaleString(),
                            ")")),
                    react_1["default"].createElement("p", null, r.text),
                    (user === null || user === void 0 ? void 0 : user.role) === "admin" && (react_1["default"].createElement("button", { onClick: function () { return handleDeleteReview(r.id); }, style: {
                            background: "transparent",
                            color: "red",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            fontSize: "0.9em"
                        } }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))); }))))));
};
exports["default"] = ProductDetails;
