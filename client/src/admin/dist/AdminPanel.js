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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AdminPanel = void 0;
var react_1 = require("react");
var useAuth_1 = require("../hooks/useAuth");
var api_1 = require("../utils/api");
require("../styles/admin.css");
var ProjectsAdmin_1 = require("./ProjectsAdmin");
var PopularAdmin_1 = require("./PopularAdmin");
var category1_1 = require("./category1");
var category2_1 = require("./category2");
var category3_1 = require("./category3");
var category4_1 = require("./category4");
var category5_1 = require("./category5");
var productData_1 = require("../components/product/productData");
var productData_2 = require("../components/product/productData");
var config_1 = require("../config");
var tabs = [
    { id: "dashboard", name: "Dashboard", icon: "📊" },
    { id: "products", name: "Товары", icon: "📦" },
    { id: "project", name: "проекты", icon: "🍞" },
    { id: "popular", name: "популярное", icon: "🍞" },
    { id: "category1", name: "Бакалея", icon: "🍞" },
    { id: "category2", name: "Молочная продукция", icon: "🥛" },
    { id: "category3", name: "Соки", icon: "🧃" },
    { id: "category4", name: "Замороженные продукты", icon: "❄️" },
    { id: "category5", name: "Красота / спорт / одежда", icon: "💄" },
    { id: "subscribers", name: "Подписчики", icon: "📧" },
    { id: "messages", name: "Сообщения", icon: "📩" },
];
var categoryMap = {
    televizory: 1,
    smartfony: 2,
    noutbuki: 3,
    audiotekhnika: 4,
    tekhnikaKukhnya: 5,
    tekhnikaDom: 6,
    krasotaZdorovye: 7,
    umnyDom: 8,
    posuda: 9,
    igrySoft: 10,
    hobbiRazvlecheniya: 11,
    sportTovary: 12,
    fotoVideo: 13,
    autoelektronika: 14,
    stroitelstvoRemont: 15,
    dachaSadOgorod: 16,
    tovaryDlyaDetey: 17,
    odezhdaObuv: 18,
    kantselyariya: 19,
    knigi: 20,
    muzykalnyeInstrumenty: 21,
    yuvelirnyeIzdelia: 22,
    puteshestviyaTurizm: 23,
    zootovary: 24,
    produktyPitania: 25
};
var AddProductModal = function (_a) {
    var _b;
    var show = _a.show, onClose = _a.onClose, onSave = _a.onSave, categories = _a.categories;
    var _c = react_1.useState({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        stock_quantity: 0,
        website: '',
        instagram: '',
        whatsapp: '',
        category_id: '',
        mainCategory: '',
        subCategory: ''
    }), formData = _c[0], setFormData = _c[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        // Находим main категорию
        var mainCat = productData_1.productData.find(function (m) { return m.title === formData.mainCategory; });
        if (!mainCat) {
            alert("Выберите основную категорию");
            return;
        }
        // Находим подкатегорию внутри main
        var subCat = mainCat.items.find(function (i) { return i.title2 === formData.subCategory; });
        if (!subCat) {
            alert("Выберите подкатегорию");
            return;
        }
        var category_id = mainCat.category_id.toString();
        var subCategoryId = subCat.subCategoryId.toString();
        // Отправляем в onSave все нужные данные, включая subCategoryId
        onSave(__assign(__assign({}, formData), { category_id: category_id, subCategoryId: subCategoryId }));
        onClose();
        // Очистка формы
        setFormData({
            name: '',
            description: '',
            price: 0,
            image_url: '',
            stock_quantity: 0,
            website: '',
            instagram: '',
            whatsapp: '',
            category_id: '',
            mainCategory: '',
            subCategory: '',
            subCategoryId: ''
        });
    };
    if (!show)
        return null;
    return (react_1["default"].createElement("div", { className: "modal-overlay" },
        react_1["default"].createElement("div", { className: "modal-content" },
            react_1["default"].createElement("div", { className: "modal-header" },
                react_1["default"].createElement("h3", null, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440"),
                react_1["default"].createElement("button", { className: "modal-close", onClick: onClose }, "\u00D7")),
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "modal-form" },
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430:"),
                    react_1["default"].createElement("input", { type: "text", value: formData.name, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }, required: true })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:"),
                    react_1["default"].createElement("textarea", { value: formData.description, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { description: e.target.value })); } })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u0426\u0435\u043D\u0430 (\u20BD):"),
                    react_1["default"].createElement("input", { type: "number", min: 0, value: formData.price, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { price: Number(e.target.value) })); }, required: true })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:"),
                    react_1["default"].createElement("input", { type: "url", value: formData.image_url, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { image_url: e.target.value })); } })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043D\u0430 \u0441\u043A\u043B\u0430\u0434\u0435:"),
                    react_1["default"].createElement("input", { type: "number", min: 0, value: formData.stock_quantity, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { stock_quantity: Number(e.target.value) })); }, required: true })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u0412\u0435\u0431-\u0441\u0430\u0439\u0442:"),
                    react_1["default"].createElement("input", { type: "url", value: formData.website, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { website: e.target.value })); }, placeholder: "https://example.com" })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "Instagram (\u0441\u0441\u044B\u043B\u043A\u0430):"),
                    react_1["default"].createElement("input", { type: "url", value: formData.instagram, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { instagram: e.target.value })); }, placeholder: "https://instagram.com/..." })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "WhatsApp (\u043D\u043E\u043C\u0435\u0440):"),
                    react_1["default"].createElement("input", { type: "tel", value: formData.whatsapp, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { whatsapp: e.target.value })); }, placeholder: "+79999999999" })),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:"),
                    react_1["default"].createElement("select", { value: formData.mainCategory, onChange: function (e) {
                            return setFormData(__assign(__assign({}, formData), { mainCategory: e.target.value, subCategory: '' }));
                        }, required: true },
                        react_1["default"].createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E"),
                        productData_1.productData.map(function (main) { return (react_1["default"].createElement("option", { key: main.title, value: main.title }, main.title)); }))),
                formData.mainCategory && (react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("label", null, "\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:"),
                    react_1["default"].createElement("select", { value: formData.subCategoryId || "", onChange: function (e) {
                            var _a;
                            var selectedSubCatId = e.target.value;
                            var selectedSubCat = (_a = productData_1.productData
                                .find(function (main) { return main.title === formData.mainCategory; })) === null || _a === void 0 ? void 0 : _a.items.find(function (item) { return item.subCategoryId.toString() === selectedSubCatId; });
                            setFormData(__assign(__assign({}, formData), { subCategoryId: selectedSubCatId, subCategory: selectedSubCat ? selectedSubCat.title2 : "" }));
                        }, required: true },
                        react_1["default"].createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E"), (_b = productData_1.productData
                        .find(function (main) { return main.title === formData.mainCategory; })) === null || _b === void 0 ? void 0 :
                        _b.items.map(function (item) { return (react_1["default"].createElement("option", { key: item.subCategoryId, value: item.subCategoryId.toString() }, item.title2)); })))),
                react_1["default"].createElement("div", { className: "modal-actions" },
                    react_1["default"].createElement("button", { type: "button", className: "btn-cancel", onClick: onClose }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
                    react_1["default"].createElement("button", { type: "submit", className: "btn-save" }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))))));
};
var EditProductModal = function (_a) {
    var _b;
    var show = _a.show, product = _a.product, onClose = _a.onClose, onSave = _a.onSave, categories = _a.categories;
    var _c = react_1.useState({
        name: "",
        description: "",
        price: 0,
        category_id: "",
        image_url: "",
        stock_quantity: 0,
        website: "",
        instagram: "",
        whatsapp: "",
        mainCategory: "",
        subCategory: ""
    }), formData = _c[0], setFormData = _c[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        var mainCat = productData_1.productData.find(function (m) { return m.title === formData.mainCategory; });
        if (!mainCat) {
            alert("Выберите основную категорию");
            return;
        }
        var subCat = mainCat.items.find(function (i) { return i.title2 === formData.subCategory; });
        if (!subCat) {
            alert("Выберите подкатегорию");
            return;
        }
        var category_id = mainCat.category_id.toString();
        var subCategoryId = subCat.subCategoryId.toString();
        var updatedProduct = __assign(__assign({}, formData), { category_id: category_id,
            subCategoryId: subCategoryId, id: (product === null || product === void 0 ? void 0 : product.id) || '' });
        onSave(updatedProduct);
        onClose();
    };
    react_1.useEffect(function () {
        if (product) {
            setFormData(__assign(__assign({}, product), { mainCategory: product.mainCategory || "", subCategory: product.subCategory || "" }));
        }
    }, [product]);
    var handleSave = function () {
        var _a, _b;
        if (!product)
            return;
        var mainCategory = formData.mainCategory, subCategory = formData.subCategory, rest = __rest(formData, ["mainCategory", "subCategory"]);
        var main = productData_1.productData.find(function (m) { return m.title === mainCategory; });
        var sub = main === null || main === void 0 ? void 0 : main.items.find(function (s) { return s.title2 === subCategory; });
        var category_id = ((_a = main === null || main === void 0 ? void 0 : main.category_id) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        var sub_category_id = ((_b = sub === null || sub === void 0 ? void 0 : sub.subCategoryId) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        if (!category_id || !sub_category_id) {
            alert("Выберите корректную категорию и подкатегорию");
            return;
        }
        var updatedProduct = __assign(__assign({}, rest), { id: product.id, category_id: category_id, subCategoryId: sub_category_id });
        onSave(updatedProduct);
        onClose();
    };
    if (!show || !product)
        return null;
    return (react_1["default"].createElement("div", { className: "modal" },
        react_1["default"].createElement("div", { className: "modal-content" },
            react_1["default"].createElement("h3", null, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u043E\u0432\u0430\u0440"),
            react_1["default"].createElement("label", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435:"),
            react_1["default"].createElement("input", { type: "text", value: formData.name, onChange: function (e) {
                    return setFormData(__assign(__assign({}, formData), { name: e.target.value }));
                } }),
            react_1["default"].createElement("label", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:"),
            react_1["default"].createElement("textarea", { value: formData.description, onChange: function (e) {
                    return setFormData(__assign(__assign({}, formData), { description: e.target.value }));
                } }),
            react_1["default"].createElement("label", null, "\u0426\u0435\u043D\u0430:"),
            react_1["default"].createElement("input", { type: "number", value: formData.price, onChange: function (e) {
                    return setFormData(__assign(__assign({}, formData), { price: parseFloat(e.target.value) }));
                } }),
            react_1["default"].createElement("label", null, "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:"),
            react_1["default"].createElement("select", { value: formData.mainCategory, onChange: function (e) {
                    return setFormData(__assign(__assign({}, formData), { mainCategory: e.target.value, subCategory: "" }));
                } },
                react_1["default"].createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E"),
                productData_1.productData.map(function (main) { return (react_1["default"].createElement("option", { key: main.title, value: main.title }, main.title)); })),
            formData.mainCategory && (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("label", null, "\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:"),
                react_1["default"].createElement("select", { value: formData.subCategoryId || "", onChange: function (e) {
                        var _a;
                        var selectedSubCatId = e.target.value;
                        var selectedSubCat = (_a = productData_1.productData
                            .find(function (main) { return main.title === formData.mainCategory; })) === null || _a === void 0 ? void 0 : _a.items.find(function (item) { return item.subCategoryId.toString() === selectedSubCatId; });
                        setFormData(__assign(__assign({}, formData), { subCategoryId: selectedSubCatId, subCategory: selectedSubCat ? selectedSubCat.title2 : "" }));
                    } },
                    react_1["default"].createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E"), (_b = productData_1.productData
                    .find(function (main) { return main.title === formData.mainCategory; })) === null || _b === void 0 ? void 0 :
                    _b.items.map(function (item) { return (react_1["default"].createElement("option", { key: item.subCategoryId, value: item.subCategoryId.toString() }, item.title2)); })))),
            react_1["default"].createElement("label", null, "\u0424\u043E\u0442\u043E (URL):"),
            react_1["default"].createElement("input", { type: "text", value: formData.image_url, onChange: function (e) {
                    return setFormData(__assign(__assign({}, formData), { image_url: e.target.value }));
                } }),
            react_1["default"].createElement("label", null, "\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438 (\u0448\u0442):"),
            react_1["default"].createElement("input", { type: "number", value: formData.stock_quantity, onChange: function (e) {
                    return setFormData(__assign(__assign({}, formData), { stock_quantity: parseInt(e.target.value) }));
                } }),
            react_1["default"].createElement("label", null, "Instagram:"),
            react_1["default"].createElement("input", { type: "text", value: formData.instagram, onChange: function (e) {
                    return setFormData(__assign(__assign({}, formData), { instagram: e.target.value }));
                } }),
            react_1["default"].createElement("label", null, "WhatsApp:"),
            react_1["default"].createElement("input", { type: "text", value: formData.whatsapp, onChange: function (e) {
                    return setFormData(__assign(__assign({}, formData), { whatsapp: e.target.value }));
                } }),
            react_1["default"].createElement("label", null, "\u0421\u0430\u0439\u0442:"),
            react_1["default"].createElement("input", { type: "text", value: formData.website, onChange: function (e) {
                    return setFormData(__assign(__assign({}, formData), { website: e.target.value }));
                } }),
            react_1["default"].createElement("div", { className: "modal-actions" },
                react_1["default"].createElement("button", { onClick: handleSave }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"),
                react_1["default"].createElement("button", { onClick: onClose }, "\u041E\u0442\u043C\u0435\u043D\u0430")))));
};
exports.AdminPanel = function () {
    var user = useAuth_1.useAuth().user;
    var _a = react_1.useState("dashboard"), activeTab = _a[0], setActiveTab = _a[1];
    var _b = react_1.useState([]), products = _b[0], setProducts = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(null), error = _d[0], setError = _d[1];
    var _e = react_1.useState(false), showAddProduct = _e[0], setShowAddProduct = _e[1];
    var _f = react_1.useState(null), editingProduct = _f[0], setEditingProduct = _f[1];
    //для названии блоков с товарами в main.tsx
    var _g = react_1.useState({}), offers = _g[0], setOffers = _g[1];
    var _h = react_1.useState([]), categoryProducts = _h[0], setCategoryProducts = _h[1];
    var _j = react_1.useState(false), loadingCategoryProducts = _j[0], setLoadingCategoryProducts = _j[1];
    var _k = react_1.useState(null), errorCategoryProducts = _k[0], setErrorCategoryProducts = _k[1];
    //для подписки в разделе [хотите стать спонсором ]
    var _l = react_1.useState([]), subscribers = _l[0], setSubscribers = _l[1];
    var _m = react_1.useState(false), loadingSubscribers = _m[0], setLoadingSubscribers = _m[1];
    var productCategories = tabs.filter(function (tab) { return tab.id.startsWith("category"); });
    //для формы обратной связи в контактах 
    var _o = react_1.useState([]), messages = _o[0], setMessages = _o[1];
    var _p = react_1.useState(false), loadingMessages = _p[0], setLoadingMessages = _p[1];
    //для названии категории
    var offerKeys = ['promo1', 'promo2', 'promo3', 'promo4', 'promo5'];
    //для формы обратной связи в контактах 
    var loadMessages = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoadingMessages(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/messages")];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    setMessages(data);
                    return [3 /*break*/, 6];
                case 4:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 6];
                case 5:
                    setLoadingMessages(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (activeTab === 'messages') {
            loadMessages();
        }
    }, [activeTab]);
    var handleDeleteMessage = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var res, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/messages/" + id, { method: 'DELETE' })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error('Ошибка удаления сообщения');
                    setMessages(function (prev) { return prev.filter(function (m) { return m.id !== id; }); });
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.error(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    //для подписки в разделе [хотите стать спонсором ]
    var loadSubscribers = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoadingSubscribers(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/subscribers")];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    setSubscribers(data);
                    return [3 /*break*/, 6];
                case 4:
                    e_3 = _a.sent();
                    console.error(e_3);
                    return [3 /*break*/, 6];
                case 5:
                    setLoadingSubscribers(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (activeTab === 'subscribers') {
            loadSubscribers();
        }
    }, [activeTab]);
    var handleDeleteSubscriber = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/subscribers/" + id, {
                            method: 'DELETE'
                        })];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Ошибка удаления подписчика');
                    }
                    // После удаления обновляем список подписчиков
                    setSubscribers(function (prev) { return prev.filter(function (sub) { return sub.id !== id; }); });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    //для названии блоков с товарами в main.tsx
    react_1.useEffect(function () {
        fetch(config_1.API_BASE_URL + "/api/main-offers")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var obj = {};
            data.forEach(function (item) {
                obj[item.id] = item.text;
            });
            setOffers(obj);
        });
    }, []);
    var handleOfferChange = function (key, value) {
        setOffers(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = value, _a)));
        });
    };
    var handleOfferSave = function (key) {
        fetch(config_1.API_BASE_URL + "/api/main-offers/" + key, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: offers[key] })
        });
    };
    // Загрузка продуктов по категории
    var loadProductsByCategory = function (categoryName) { return __awaiter(void 0, void 0, void 0, function () {
        var data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoadingCategoryProducts(true);
                    return [4 /*yield*/, api_1.api.getProductsByCategory(categoryName)];
                case 1:
                    data = _a.sent();
                    setCategoryProducts(data);
                    setErrorCategoryProducts(null);
                    return [3 /*break*/, 4];
                case 2:
                    err_2 = _a.sent();
                    setErrorCategoryProducts("Ошибка загрузки товаров категории");
                    console.error(err_2);
                    return [3 /*break*/, 4];
                case 3:
                    setLoadingCategoryProducts(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Загрузка всех товаров
    var loadProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, api_1.api.getProducts()];
                case 1:
                    data = _a.sent();
                    setProducts(data);
                    setError(null);
                    return [3 /*break*/, 4];
                case 2:
                    err_3 = _a.sent();
                    setError("Ошибка загрузки товаров");
                    console.error(err_3);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Удаление продукта
    var handleDeleteProduct = function (productId) { return __awaiter(void 0, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.api.admin.deleteProduct(productId)];
                case 1:
                    _a.sent();
                    if (["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)) {
                        loadProductsByCategory(activeTab);
                    }
                    else {
                        loadProducts();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    setError("Ошибка удаления товара");
                    console.error(err_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Добавление продукта
    var handleAddProduct = function (productData) { return __awaiter(void 0, void 0, void 0, function () {
        var productToSave, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    productToSave = __assign({}, productData);
                    // Если надо подставить category_id по activeTab (например, для вкладок категорий)
                    if (["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)) {
                        productToSave.category_id = String(categoryMap[activeTab]);
                    }
                    else if (!productToSave.category_id) {
                        productToSave.category_id = "0"; // дефолт
                    }
                    return [4 /*yield*/, api_1.api.admin.createProduct(productToSave)];
                case 1:
                    _a.sent();
                    if (["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)) {
                        loadProductsByCategory(activeTab);
                    }
                    else {
                        loadProducts();
                    }
                    setShowAddProduct(false);
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    setError("Ошибка добавления товара");
                    console.error(err_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Редактирование продукта
    var handleEditProduct = function (productData) { return __awaiter(void 0, void 0, void 0, function () {
        var err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.api.admin.updateProduct(productData.id, productData)];
                case 1:
                    _a.sent();
                    if (["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)) {
                        loadProductsByCategory(activeTab);
                    }
                    else {
                        loadProducts();
                    }
                    setEditingProduct(null);
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    setError("Ошибка обновления товара");
                    console.error(err_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (["bakaleya", "milk", "juices", "frozen", "beauty"].includes(activeTab)) {
            loadProductsByCategory(activeTab);
        }
        else if (activeTab === "products") {
            loadProducts();
        }
    }, [activeTab]);
    var renderDashboard = function () {
        var offerKeys = ["promo1", "promo2", "promo3", "promo4", "promo5"];
        return (react_1["default"].createElement("div", { className: "admin-section" },
            react_1["default"].createElement("h2", null, "Dashboard"),
            react_1["default"].createElement("div", { className: "dashboard-grid" },
                react_1["default"].createElement("div", { className: "dashboard-card" },
                    react_1["default"].createElement("div", { className: "card-header" },
                        react_1["default"].createElement("h3", null, "\u041E\u0431\u0449\u0430\u044F \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430")),
                    react_1["default"].createElement("div", { className: "card-content" },
                        react_1["default"].createElement("div", { className: "stat-item" },
                            react_1["default"].createElement("span", { className: "stat-label" }, "\u0412\u0441\u0435\u0433\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432:"),
                            react_1["default"].createElement("span", { className: "stat-value" }, products.length)))),
                react_1["default"].createElement("div", null),
                react_1["default"].createElement("div", { className: "dashboard-card" },
                    react_1["default"].createElement("div", { className: "card-header" },
                        react_1["default"].createElement("h3", null, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0434\u043B\u044F \u0433\u043B\u0430\u0432\u043D\u043E\u0439")),
                    react_1["default"].createElement("div", { className: "card-content" }, offerKeys.map(function (key) { return (react_1["default"].createElement("div", { key: key, style: { marginBottom: "15px" } },
                        react_1["default"].createElement("label", null,
                            react_1["default"].createElement("strong", null, key)),
                        react_1["default"].createElement("textarea", { rows: 2, style: { width: "100%" }, value: offers[key] || "", onChange: function (e) { return handleOfferChange(key, e.target.value); } }),
                        react_1["default"].createElement("button", { onClick: function () { return handleOfferSave(key); } }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))); }))))));
    };
    var renderProducts = function () { return (react_1["default"].createElement("div", { className: "admin-section" },
        react_1["default"].createElement("div", { className: "section-header" },
            react_1["default"].createElement("h2", null, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430\u043C\u0438"),
            react_1["default"].createElement("button", { className: "add-btn", onClick: function () { return setShowAddProduct(true); } }, "+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440")),
        error && react_1["default"].createElement("div", { className: "error-message" }, error),
        loading && react_1["default"].createElement("div", { className: "loading-message" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."),
        !loading && products.length === 0 ? (react_1["default"].createElement("div", { className: "placeholder-content" },
            react_1["default"].createElement("div", { className: "placeholder-icon" }, "\uD83D\uDCE6"),
            react_1["default"].createElement("h3", null, "\u0422\u043E\u0432\u0430\u0440\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"),
            react_1["default"].createElement("p", null, "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u0442\u043E\u0432\u0430\u0440, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u0443."))) : (react_1["default"].createElement("div", { className: "products-table" }, products.map(function (product) { return (react_1["default"].createElement("div", { key: product.id, className: "table-row" },
            react_1["default"].createElement("div", { className: "product-image-cell" }, product.image_url ? (react_1["default"].createElement("img", { src: product.image_url, alt: product.name, className: "product-image-admin" })) : (react_1["default"].createElement("div", { className: "no-image" }, "\uD83D\uDCE6"))),
            react_1["default"].createElement("span", { className: "product-name" }, product.name),
            react_1["default"].createElement("span", { className: "price" },
                product.price.toLocaleString(),
                " \u20BD"),
            react_1["default"].createElement("div", { className: "actions" },
                react_1["default"].createElement("button", { className: "action-btn edit", onClick: function () { return setEditingProduct(product); } }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"),
                react_1["default"].createElement("button", { className: "action-btn delete", onClick: function () { return handleDeleteProduct(product.id); } }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))); }))))); };
    var renderCategoryProducts = function () {
        var _a;
        return (react_1["default"].createElement("div", { className: "admin-section" },
            react_1["default"].createElement("div", { className: "section-header" },
                react_1["default"].createElement("h2", null,
                    "\u0422\u043E\u0432\u0430\u0440\u044B \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438: ", (_a = tabs.find(function (t) { return t.id === activeTab; })) === null || _a === void 0 ? void 0 :
                    _a.name),
                react_1["default"].createElement("button", { className: "add-btn", onClick: function () { return setShowAddProduct(true); } }, "+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440")),
            errorCategoryProducts && (react_1["default"].createElement("div", { className: "error-message" }, errorCategoryProducts)),
            loadingCategoryProducts && (react_1["default"].createElement("div", { className: "loading-message" }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...")),
            !loadingCategoryProducts && categoryProducts.length === 0 ? (react_1["default"].createElement("div", { className: "placeholder-content" },
                react_1["default"].createElement("div", { className: "placeholder-icon" }, "\uD83D\uDCE6"),
                react_1["default"].createElement("h3", null, "\u0422\u043E\u0432\u0430\u0440\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"),
                react_1["default"].createElement("p", null, "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u0442\u043E\u0432\u0430\u0440."))) : (react_1["default"].createElement("div", { className: "products-table" }, categoryProducts.map(function (product) { return (react_1["default"].createElement("div", { key: product.id, className: "table-row" },
                react_1["default"].createElement("div", { className: "product-image-cell" }, product.image_url ? (react_1["default"].createElement("img", { src: product.image_url, alt: product.name, className: "product-image-admin" })) : (react_1["default"].createElement("div", { className: "no-image" }, "\uD83D\uDCE6"))),
                react_1["default"].createElement("span", { className: "product-name" }, product.name),
                react_1["default"].createElement("span", { className: "price" },
                    product.price.toLocaleString(),
                    " \u20BD"),
                react_1["default"].createElement("div", { className: "actions" },
                    react_1["default"].createElement("button", { className: "action-btn edit", onClick: function () {
                            setEditingProduct(product);
                            setShowAddProduct(false);
                        } }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"),
                    react_1["default"].createElement("button", { className: "action-btn delete", onClick: function () { return handleDeleteProduct(product.id); } }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))); })))));
    };
    var renderContent = function () {
        switch (activeTab) {
            case "dashboard":
                return renderDashboard();
            case "products":
                return renderProducts();
            case "popular":
                return react_1["default"].createElement(PopularAdmin_1["default"], null);
            case "project":
                return react_1["default"].createElement(ProjectsAdmin_1["default"], null);
            case "category1":
                return react_1["default"].createElement(category1_1["default"], null);
            case "category2":
                return react_1["default"].createElement(category2_1["default"], null);
            case "category3":
                return react_1["default"].createElement(category3_1["default"], null);
            case "category4":
                return react_1["default"].createElement(category4_1["default"], null);
            case "category5":
                return react_1["default"].createElement(category5_1["default"], null);
            case "subscribers":
                return (react_1["default"].createElement("div", { className: "admin-section" },
                    react_1["default"].createElement("h2", null, "\u041F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u0438"),
                    loadingSubscribers ? react_1["default"].createElement("p", null, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...") : null,
                    react_1["default"].createElement("ul", { style: { listStyle: 'none', paddingLeft: 0 } }, subscribers.map(function (sub) { return (react_1["default"].createElement("li", { key: sub.id, style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' } },
                        react_1["default"].createElement("span", null, sub.email),
                        react_1["default"].createElement("button", { className: "action-btn delete", style: {
                                cursor: 'pointer',
                                backgroundColor: '#e74c3c',
                                color: '#fff',
                                border: 'none',
                                padding: '4px 8px',
                                borderRadius: '4px'
                            }, onClick: function () { return handleDeleteSubscriber(sub.id); } }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"))); }))));
            case "messages":
                return (react_1["default"].createElement("div", { className: "admin-section" },
                    react_1["default"].createElement("h2", null, "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0441 \u0444\u043E\u0440\u043C\u044B \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438"),
                    loadingMessages ? (react_1["default"].createElement("p", null, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...")) : messages.length === 0 ? (react_1["default"].createElement("p", null, "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043D\u0435\u0442")) : (react_1["default"].createElement("ul", { style: { listStyle: "none", paddingLeft: 0 } }, messages.map(function (msg) { return (react_1["default"].createElement("li", { key: msg.id, style: { marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" } },
                        react_1["default"].createElement("p", null,
                            react_1["default"].createElement("b", null, "\u041E\u0442:"),
                            " ",
                            msg.name,
                            " (",
                            msg.email,
                            ")"),
                        react_1["default"].createElement("p", null,
                            react_1["default"].createElement("b", null, "\u0422\u0435\u043C\u0430:"),
                            " ",
                            msg.subject || "-"),
                        react_1["default"].createElement("p", null,
                            react_1["default"].createElement("b", null, "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435:"),
                            " ",
                            msg.message),
                        react_1["default"].createElement("p", null,
                            react_1["default"].createElement("small", null, new Date(msg.created_at).toLocaleString())),
                        react_1["default"].createElement("button", { className: "action-btn delete", style: { cursor: "pointer", backgroundColor: "#e74c3c", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px" }, onClick: function () { return handleDeleteMessage(msg.id); } }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"))); })))));
                return renderCategoryProducts();
            default:
                return renderDashboard();
        }
    };
    return (react_1["default"].createElement("div", { className: "admin-panel" },
        react_1["default"].createElement("div", { className: "admin-header" },
            react_1["default"].createElement("div", { className: "admin-title" },
                react_1["default"].createElement("h1", null, "\u0410\u0434\u043C\u0438\u043D \u043F\u0430\u043D\u0435\u043B\u044C"),
                react_1["default"].createElement("p", null,
                    "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C ", user === null || user === void 0 ? void 0 :
                    user.email,
                    "!")),
            react_1["default"].createElement("div", { className: "admin-user-info" },
                react_1["default"].createElement("div", { className: "admin-avatar" }, (user === null || user === void 0 ? void 0 : user.email) ? user.email.charAt(0).toUpperCase() : "A"))),
        react_1["default"].createElement("div", { className: "admin-content" },
            react_1["default"].createElement("nav", { className: "admin-sidebar" }, tabs.map(function (tab) { return (react_1["default"].createElement("button", { key: tab.id, className: "sidebar-tab " + (activeTab === tab.id ? "active" : ""), onClick: function () { return setActiveTab(tab.id); } },
                react_1["default"].createElement("span", { className: "tab-icon" }, tab.icon),
                react_1["default"].createElement("span", { className: "tab-name" }, tab.name))); })),
            react_1["default"].createElement("main", { className: "admin-main" }, renderContent())),
        react_1["default"].createElement(AddProductModal, { show: showAddProduct, onClose: function () { return setShowAddProduct(false); }, onSave: handleAddProduct, categories: productData_2.categoriesList.map(function (cat) { return ({ id: String(cat.id), name: cat.name, icon: cat.icon || '' }); }) }),
        react_1["default"].createElement(EditProductModal, { show: !!editingProduct, product: editingProduct, onClose: function () { return setEditingProduct(null); }, onSave: handleEditProduct, categories: productData_2.categoriesList.map(function (c) { return ({ id: String(c.id), name: c.name }); }) })));
};
exports["default"] = exports.AdminPanel;
