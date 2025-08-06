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
var iPhone_png_1 = require("../images/iPhone.png");
var cart_png_1 = require("../../public/cart.png");
require("../styles/Main.css");
var MainProjects_1 = require("../components/MainProjects");
var react_router_dom_1 = require("react-router-dom");
var CartContext_1 = require("../components/CartContext");
var SearchContext_1 = require("../components/SearchContext");
var config_1 = require("../config");
var slides = [
    { img: "https://i.postimg.cc/76BJk1WF/Frame_1529.jpg" },
    { img: 'https://i.postimg.cc/MHvMKMkv/Frame_1525.jpgg' },
    { img: 'https://i.postimg.cc/6qg77Wwz/Frame_1524.jpg' }
];
var cards = [
    { img: "https://i.postimg.cc/qBywFDXv/Frame-1502.png", btnCart: 'hgjhg', btnHeart: iPhone_png_1["default"], btnSearch: iPhone_png_1["default"], title: 'Ауадхара', p: "120₽" },
    { img: "https://i.postimg.cc/R0WQLgZ9/Frame-1503.png", btnCart: iPhone_png_1["default"], btnHeart: iPhone_png_1["default"], btnSearch: "https://i.postimg.cc/qBywFDXv/Frame-1502.png", title: 'Вино "Aчба Иашта"', p: "3400₽" },
    { img: "https://i.postimg.cc/R0WQLgZ9/Frame-1503.png", btnCart: iPhone_png_1["default"], btnHeart: iPhone_png_1["default"], btnSearch: iPhone_png_1["default"], title: 'MacBook Air ', p: "$65.00 USD" },
    { img: "https://i.postimg.cc/qBywFDXv/Frame-1502.png", btnCart: iPhone_png_1["default"], btnHeart: iPhone_png_1["default"], btnSearch: iPhone_png_1["default"], title: 'Apple Watch Ultra', p: "$65.00 USD" },
    { img: "https://i.postimg.cc/R0WQLgZ9/Frame-1503.png", btnCart: 'hgjhg', btnHeart: iPhone_png_1["default"], btnSearch: iPhone_png_1["default"], title: 'Apple AirPods Max', p: "$55.00 USD" },
    { img: "https://i.postimg.cc/qBywFDXv/Frame-1502.png", btnCart: iPhone_png_1["default"], btnHeart: iPhone_png_1["default"], btnSearch: iPhone_png_1["default"], title: 'iPhone 16 ', p: "$65.00 USD" },
];
var Main = function () {
    var searchQuery = SearchContext_1.useSearch().searchQuery;
    var sliderRef = react_1.useRef(null);
    var _a = react_1.useState(0), current = _a[0], setCurrent = _a[1];
    var _b = react_1.useState(''), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(null), subscribeStatus = _c[0], setSubscribeStatus = _c[1];
    var timeoutRef = react_1.useRef(null); // корректный тип
    var _d = react_1.useState({}), offers = _d[0], setOffers = _d[1];
    var addToCart = CartContext_1.useCart().addToCart;
    var _e = react_1.useState([]), popularCards = _e[0], setPopularCards = _e[1];
    var _f = react_1.useState([]), category1Cards = _f[0], setCategory1Cards = _f[1];
    var _g = react_1.useState([]), category2Cards = _g[0], setCategory2Cards = _g[1];
    var _h = react_1.useState([]), category3Cards = _h[0], setCategory3Cards = _h[1];
    var _j = react_1.useState([]), category4Cards = _j[0], setCategory4Cards = _j[1];
    var _k = react_1.useState([]), category5Cards = _k[0], setCategory5Cards = _k[1];
    var filterCards = function (cardsArray) {
        if (!searchQuery || !searchQuery.trim())
            return cardsArray;
        var query = searchQuery.toLowerCase();
        return cardsArray.filter(function (card) {
            return card.name.toLowerCase().includes(query) ||
                (card.description && card.description.toLowerCase().includes(query));
        });
    };
    var _l = react_1.useState(false), loading = _l[0], setLoading = _l[1];
    var _m = react_1.useState(null), error = _m[0], setError = _m[1];
    var _o = react_1.useState([]), bakaleya = _o[0], setBakaleya = _o[1];
    var _p = react_1.useState([]), milk = _p[0], setMilk = _p[1];
    var _q = react_1.useState([]), juices = _q[0], setJuices = _q[1];
    var _r = react_1.useState([]), frozen = _r[0], setFrozen = _r[1];
    var _s = react_1.useState([]), beauty = _s[0], setBeauty = _s[1];
    var handleSubscribe = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setSubscribeStatus(null);
                    if (!email) {
                        setSubscribeStatus('error');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/subscribe", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    setSubscribeStatus('success');
                    setEmail('');
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    alert(data.error || 'Ошибка при подписке');
                    setSubscribeStatus('error');
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error(error_1);
                    setSubscribeStatus('error');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    //для категории 1
    react_1.useEffect(function () {
        setLoading(true);
        fetch(config_1.API_BASE_URL + "/api/category1")
            .then(function (res) {
            if (!res.ok)
                throw new Error('Ошибка сети');
            return res.json();
        })
            .then(function (data) {
            if (!Array.isArray(data)) {
                throw new Error('Полученные данные не являются массивом');
            }
            setCategory1Cards(data.map(function (item) { return (__assign(__assign({}, item), { type: "category1" })); }));
            setLoading(false);
        })["catch"](function (err) {
            setError(err.message);
            setLoading(false);
        });
    }, []);
    react_1.useEffect(function () {
        fetch(config_1.API_BASE_URL + "/api/main-offers")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var obj = {};
            data.forEach(function (item) {
                obj[item.id] = item.text;
            });
            setOffers(obj);
        })["catch"](function (err) { return console.error(err); });
    }, []);
    //для категории 2
    react_1.useEffect(function () {
        setLoading(true);
        fetch(config_1.API_BASE_URL + "/api/category2")
            .then(function (res) {
            if (!res.ok)
                throw new Error('Ошибка сети');
            return res.json();
        })
            .then(function (data) {
            if (!Array.isArray(data)) {
                throw new Error('Полученные данные не являются массивом');
            }
            setCategory2Cards(data.map(function (item) { return (__assign(__assign({}, item), { type: "category2" })); }));
            setLoading(false);
        })["catch"](function (err) {
            setError(err.message);
            setLoading(false);
        });
    }, []);
    //для категории 3
    react_1.useEffect(function () {
        setLoading(true);
        fetch(config_1.API_BASE_URL + "/api/category3")
            .then(function (res) {
            if (!res.ok)
                throw new Error('Ошибка сети');
            return res.json();
        })
            .then(function (data) {
            if (!Array.isArray(data)) {
                throw new Error('Полученные данные не являются массивом');
            }
            setCategory3Cards(data.map(function (item) { return (__assign(__assign({}, item), { type: "category3" })); }));
            setLoading(false);
        })["catch"](function (err) {
            setError(err.message);
            setLoading(false);
        });
    }, []);
    //для категории 4
    react_1.useEffect(function () {
        setLoading(true);
        fetch(config_1.API_BASE_URL + "/api/category4")
            .then(function (res) {
            if (!res.ok)
                throw new Error('Ошибка сети');
            return res.json();
        })
            .then(function (data) {
            if (!Array.isArray(data)) {
                throw new Error('Полученные данные не являются массивом');
            }
            setCategory4Cards(data.map(function (item) { return (__assign(__assign({}, item), { type: "category4" })); }));
            setLoading(false);
        })["catch"](function (err) {
            setError(err.message);
            setLoading(false);
        });
    }, []);
    //для категории 5
    react_1.useEffect(function () {
        setLoading(true);
        fetch(config_1.API_BASE_URL + "/api/category5")
            .then(function (res) {
            if (!res.ok)
                throw new Error('Ошибка сети');
            return res.json();
        })
            .then(function (data) {
            if (!Array.isArray(data)) {
                throw new Error('Полученные данные не являются массивом');
            }
            setCategory5Cards(data.map(function (item) { return (__assign(__assign({}, item), { type: "category5" })); }));
            setLoading(false);
        })["catch"](function (err) {
            setError(err.message);
            setLoading(false);
        });
    }, []);
    //для популярных
    react_1.useEffect(function () {
        setLoading(true);
        fetch(config_1.API_BASE_URL + "/api/popular")
            .then(function (res) {
            if (!res.ok)
                throw new Error('Ошибка сети');
            return res.json();
        })
            .then(function (data) {
            if (!Array.isArray(data)) {
                throw new Error('Полученные данные не являются массивом');
            }
            setPopularCards(data.map(function (item) { return (__assign(__assign({}, item), { type: "popular" })); }));
            setLoading(false);
        })["catch"](function (err) {
            setError(err.message);
            setLoading(false);
        });
    }, []);
    // СКРОЛЛ СЛАЙДЕРА
    var handleScroll = function () {
        var slider = sliderRef.current;
        if (!slider)
            return;
    };
    react_1.useEffect(function () {
        handleScroll();
        var slider = sliderRef.current;
        if (slider) {
            slider.addEventListener("scroll", handleScroll);
        }
        return function () {
            if (slider)
                slider.removeEventListener("scroll", handleScroll);
        };
    }, []);
    react_1.useEffect(function () {
        var timeout = setTimeout(function () {
            requestAnimationFrame(function () {
            });
        }, 20);
        return function () { return clearTimeout(timeout); };
    }, []);
    var resetTimeout = function () {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
    };
    react_1.useEffect(function () {
        resetTimeout();
        timeoutRef.current = setTimeout(function () {
            setCurrent(function (prev) { return (prev + 1) % slides.length; });
        }, 3000);
        return function () { return resetTimeout(); };
    }, [current]);
    var prevSlide = function () { return setCurrent(current === 0 ? slides.length - 1 : current - 1); };
    var nextSlide = function () { return setCurrent((current + 1) % slides.length); };
    popularCards.forEach(function (card) { return console.log("Карточка:", card); });
    return (react_1["default"].createElement("main", { className: "main" },
        react_1["default"].createElement("div", { className: "slider-container", style: { position: 'relative', margin: '0 auto' } },
            react_1["default"].createElement("button", { onClick: prevSlide, style: { position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }, "aria-label": "Previous Slide", className: "main-sliderBtn main-sliderBtn-left" }, "\u25C0"),
            react_1["default"].createElement("div", { className: "slide", style: { textAlign: 'center' } },
                react_1["default"].createElement("img", { src: slides[current].img, style: { width: '100%', height: 'auto', borderRadius: 8 } })),
            react_1["default"].createElement("button", { onClick: nextSlide, style: { position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }, "aria-label": "Next Slide", className: "main-sliderBtn main-sliderBtn-right" }, "\u25B6")),
        react_1["default"].createElement("section", { className: "main-popular-section" },
            react_1["default"].createElement("div", { className: "popular-title" },
                react_1["default"].createElement("h2", null, "\u041F\u041E\u041F\u0423\u041B\u042F\u0420\u041D\u041E\u0415"),
                react_1["default"].createElement("hr", null)),
            react_1["default"].createElement("div", { className: "main-popular-cards" }, popularCards.map(function (card) { return (react_1["default"].createElement("div", { className: "main-popular-card", key: card.id },
                react_1["default"].createElement("div", { className: "main-popular-card-img-buttons" },
                    react_1["default"].createElement("div", { className: "main-popular-card-img-div" }, card.image_url ? (react_1["default"].createElement("img", { src: card.image_url, alt: card.name, className: "main-popular-card-img" })) : (react_1["default"].createElement("div", { style: { width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, "\u041D\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"))),
                    react_1["default"].createElement("div", { className: "main-popular-card-buttons" },
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, state: { type: "popular" }, className: "main-popular-card-button" }, "..."),
                        react_1["default"].createElement("a", { onClick: function () { return addToCart({
                                id: card.id.toString(),
                                name: card.name,
                                price: parseFloat(card.price),
                                image_url: card.image_url,
                                quantity: 1,
                                description: card.description,
                                type: card.type || "default"
                            }); }, className: "main-popular-card-button", style: { cursor: 'pointer' } },
                            react_1["default"].createElement("img", { src: cart_png_1["default"], alt: "icon", className: "main-popular-card-button-img" })))),
                react_1["default"].createElement("div", { className: "main-popular-card-info" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, state: { type: "popular" }, className: "product-name-link" },
                        react_1["default"].createElement("h3", { className: "product-name" }, card.name),
                        react_1["default"].createElement("p", { className: "product-description" },
                            card.price,
                            " \u20BD"))))); })),
            react_1["default"].createElement("div", { className: "mainProjects-block" },
                react_1["default"].createElement(MainProjects_1["default"], null))),
        react_1["default"].createElement("section", { className: "main-top-selling-section" },
            react_1["default"].createElement("div", { className: "top-selling-title" },
                react_1["default"].createElement("h2", null, offers["promo1"]),
                react_1["default"].createElement("hr", null)),
            react_1["default"].createElement("div", { className: "main-top-selling-cards" }, category1Cards.map(function (card) { return (react_1["default"].createElement("div", { className: "main-top-selling-card", key: card.id },
                react_1["default"].createElement("div", { className: "main-top-selling-card-img-buttons" },
                    react_1["default"].createElement("div", { className: "main-top-selling-card-img-div" }, card.image_url ? (react_1["default"].createElement("img", { src: card.image_url, alt: card.name, className: "main-top-selling-card-img" })) : (react_1["default"].createElement("div", { style: { width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, "\u041D\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"))),
                    react_1["default"].createElement("div", { className: "main-top-selling-card-buttons" },
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, state: { type: "category1" }, className: "main-top-selling-card-button" }, "..."),
                        react_1["default"].createElement("a", { onClick: function () { return addToCart({
                                id: card.id.toString(),
                                name: card.name,
                                price: parseFloat(card.price),
                                image_url: card.image_url,
                                quantity: 1,
                                description: card.description,
                                type: card.type || "default"
                            }); }, className: "main-top-selling-card-button", style: { cursor: 'pointer' } },
                            react_1["default"].createElement("img", { src: cart_png_1["default"], alt: "icon", className: "main-top-selling-card-button-img" })))),
                react_1["default"].createElement("div", { className: "main-top-selling-card-info" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, state: { type: "category1" }, className: "product-name-link" },
                        react_1["default"].createElement("h4", { className: "product-name" }, card.name),
                        card.description && (react_1["default"].createElement("p", { className: "product-description" }, card.description))),
                    react_1["default"].createElement("p", null,
                        card.price,
                        " \u20BD")))); }))),
        react_1["default"].createElement("section", { className: "main-top-selling-section" },
            react_1["default"].createElement("div", { className: "top-selling-title" },
                react_1["default"].createElement("h2", null, offers["promo2"]),
                react_1["default"].createElement("hr", null)),
            react_1["default"].createElement("div", { className: "main-top-selling-cards" }, category2Cards.map(function (card) { return (react_1["default"].createElement("div", { className: "main-top-selling-card", key: card.id },
                react_1["default"].createElement("div", { className: "main-top-selling-card-img-buttons" },
                    react_1["default"].createElement("div", { className: "main-top-selling-card-img-div" }, card.image_url ? (react_1["default"].createElement("img", { src: card.image_url, alt: card.name, className: "main-top-selling-card-img" })) : (react_1["default"].createElement("div", { style: { width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, "\u041D\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"))),
                    react_1["default"].createElement("div", { className: "main-top-selling-card-buttons" },
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, state: { type: "category2" }, className: "main-top-selling-card-button" }, "..."),
                        react_1["default"].createElement("a", { onClick: function () { return addToCart({
                                id: card.id.toString(),
                                name: card.name,
                                price: parseFloat(card.price),
                                image_url: card.image_url,
                                quantity: 1,
                                description: card.description,
                                type: card.type || "default"
                            }); }, className: "main-top-selling-card-button", style: { cursor: 'pointer' } },
                            react_1["default"].createElement("img", { src: cart_png_1["default"], alt: "icon", className: "main-top-selling-card-button-img" })))),
                react_1["default"].createElement("div", { className: "main-top-selling-card-info" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, className: "product-name-link" },
                        react_1["default"].createElement("h4", { className: "product-name" }, card.name),
                        card.description && (react_1["default"].createElement("p", { className: "product-description" }, card.description))),
                    react_1["default"].createElement("p", null,
                        card.price,
                        " \u20BD")))); }))),
        react_1["default"].createElement("section", { className: "main-top-selling-section" },
            react_1["default"].createElement("div", { className: "top-selling-title" },
                react_1["default"].createElement("h2", null, offers["promo3"]),
                react_1["default"].createElement("hr", null)),
            react_1["default"].createElement("div", { className: "main-top-selling-cards" }, category3Cards.map(function (card) { return (react_1["default"].createElement("div", { className: "main-top-selling-card", key: card.id },
                react_1["default"].createElement("div", { className: "main-top-selling-card-img-buttons" },
                    react_1["default"].createElement("div", { className: "main-top-selling-card-img-div" }, card.image_url ? (react_1["default"].createElement("img", { src: card.image_url, alt: card.name, className: "main-top-selling-card-img" })) : (react_1["default"].createElement("div", { style: { width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, "\u041D\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"))),
                    react_1["default"].createElement("div", { className: "main-top-selling-card-buttons" },
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, state: { type: "category3" }, className: "main-top-selling-card-button" }, "..."),
                        react_1["default"].createElement("a", { onClick: function () { return addToCart({
                                id: card.id.toString(),
                                name: card.name,
                                price: parseFloat(card.price),
                                image_url: card.image_url,
                                quantity: 1,
                                description: card.description,
                                type: card.type || "default"
                            }); }, className: "main-top-selling-card-button", style: { cursor: 'pointer' } },
                            react_1["default"].createElement("img", { src: cart_png_1["default"], alt: "icon", className: "main-top-selling-card-button-img" })))),
                react_1["default"].createElement("div", { className: "main-top-selling-card-info" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, className: "product-name-link" },
                        react_1["default"].createElement("h4", { className: "product-name" }, card.name),
                        card.description && (react_1["default"].createElement("p", { className: "product-description" }, card.description))),
                    react_1["default"].createElement("p", null,
                        card.price,
                        " \u20BD")))); }))),
        react_1["default"].createElement("section", { className: "main-top-selling-section" },
            react_1["default"].createElement("div", { className: "top-selling-title" },
                react_1["default"].createElement("h2", null, offers["promo4"]),
                react_1["default"].createElement("hr", null)),
            react_1["default"].createElement("div", { className: "main-top-selling-cards" }, category4Cards.map(function (card) { return (react_1["default"].createElement("div", { className: "main-top-selling-card", key: card.id },
                react_1["default"].createElement("div", { className: "main-top-selling-card-img-buttons" },
                    react_1["default"].createElement("div", { className: "main-top-selling-card-img-div" }, card.image_url ? (react_1["default"].createElement("img", { src: card.image_url, alt: card.name, className: "main-top-selling-card-img" })) : (react_1["default"].createElement("div", { style: { width: '100%', height: '200px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, "\u041D\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"))),
                    react_1["default"].createElement("div", { className: "main-top-selling-card-buttons" },
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, state: { type: "category4" }, className: "main-top-selling-card-button" }, "..."),
                        react_1["default"].createElement("a", { onClick: function () { return addToCart({
                                id: card.id.toString(),
                                name: card.name,
                                price: parseFloat(card.price),
                                image_url: card.image_url,
                                quantity: 1,
                                description: card.description,
                                type: card.type || "default"
                            }); }, className: "main-top-selling-card-button", style: { cursor: 'pointer' } },
                            react_1["default"].createElement("img", { src: cart_png_1["default"], alt: "icon", className: "main-top-selling-card-button-img" })))),
                react_1["default"].createElement("div", { className: "main-top-selling-card-info" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, className: "product-name-link" },
                        react_1["default"].createElement("h4", { className: "product-name" }, card.name),
                        card.description && (react_1["default"].createElement("p", { className: "product-description" }, card.description))),
                    react_1["default"].createElement("p", null,
                        card.price,
                        " \u20BD")))); }))),
        react_1["default"].createElement("section", { className: "main-top-selling-section" },
            react_1["default"].createElement("div", { className: "top-selling-title" },
                react_1["default"].createElement("h2", null, offers["promo5"]),
                react_1["default"].createElement("hr", null)),
            react_1["default"].createElement("div", { className: "main-top-selling-cards" }, category5Cards.map(function (card) { return (react_1["default"].createElement("div", { className: "main-top-selling-card", key: card.id },
                react_1["default"].createElement("div", { className: "main-top-selling-card-img-buttons" },
                    react_1["default"].createElement("div", { className: "main-top-selling-card-img-div" }, card.image_url ? (react_1["default"].createElement("img", { src: card.image_url, alt: card.name, className: "main-top-selling-card-img" })) : (react_1["default"].createElement("div", { style: { width: '100%', height: '250px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, "\u041D\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"))),
                    react_1["default"].createElement("div", { className: "main-top-selling-card-buttons" },
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, state: { type: "category5" }, className: "main-top-selling-card-button" }, "..."),
                        react_1["default"].createElement("a", { onClick: function () { return addToCart({
                                id: card.id.toString(),
                                name: card.name,
                                price: parseFloat(card.price),
                                image_url: card.image_url,
                                quantity: 1,
                                description: card.description,
                                type: card.type || "default"
                            }); }, className: "main-top-selling-card-button", style: { cursor: 'pointer' } },
                            react_1["default"].createElement("img", { src: cart_png_1["default"], alt: "icon", className: "main-top-selling-card-button-img" })))),
                react_1["default"].createElement("div", { className: "main-top-selling-card-info" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/product/" + card.id, className: "product-name-link" },
                        react_1["default"].createElement("h4", { className: "product-name" }, card.name),
                        card.description && (react_1["default"].createElement("p", { className: "product-description" }, card.description))),
                    react_1["default"].createElement("p", null,
                        card.price,
                        " \u20BD")))); }))),
        react_1["default"].createElement("section", { className: "main-submit-promotions" },
            react_1["default"].createElement("div", { className: "main-submit-promotions-content" },
                react_1["default"].createElement("div", { className: "main-promotions" },
                    react_1["default"].createElement("h3", null,
                        "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E ",
                        react_1["default"].createElement("br", null),
                        " \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u043E\u0433\u043E?"),
                    react_1["default"].createElement("a", { href: "/catalog" },
                        "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B ",
                        react_1["default"].createElement("span", { className: "main-promotions-arrow" }, "\u2B95"))),
                react_1["default"].createElement("div", { className: "main-submit" },
                    react_1["default"].createElement("div", { className: "main-submit-content" },
                        react_1["default"].createElement("div", { className: "main-newsletter" },
                            react_1["default"].createElement("h4", { className: "main-heading" }, "\u0425\u043E\u0442\u0438\u0442\u0435 \u0441\u0442\u0430\u0442\u044C \u0447\u0430\u0441\u0442\u044C\u044E \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B?"),
                            react_1["default"].createElement("p", { className: "main-newsletter-desc" }, "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 e-mail, \u043C\u044B \u0441 \u0412\u0430\u043C\u0438 \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F!"),
                            react_1["default"].createElement("form", { className: "main-newsletter-form", onSubmit: handleSubscribe },
                                react_1["default"].createElement("div", { className: "main-form-group" },
                                    react_1["default"].createElement("input", { type: "email", className: "main-newsletter-input", placeholder: "\u0412\u0430\u0448 email", value: email, onChange: function (e) { return setEmail(e.target.value); } }),
                                    react_1["default"].createElement("button", { type: "submit", className: "main-newsletter-button" }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C")),
                                subscribeStatus === 'error' && (react_1["default"].createElement("p", { className: "main-newsletter-error" }, "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 email")))),
                        react_1["default"].createElement("div", { className: "main-submit-img" },
                            react_1["default"].createElement("img", { src: "#", alt: "" }))))))));
};
exports["default"] = Main;
