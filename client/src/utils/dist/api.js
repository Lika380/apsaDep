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
exports.getProducts = exports.api = exports.apiRequest = exports.tokenUtils = void 0;
var config_1 = require("../config");
exports.tokenUtils = {
    getToken: function () {
        return localStorage.getItem('authToken');
    },
    setToken: function (token) {
        localStorage.setItem('authToken', token);
    },
    removeToken: function () {
        localStorage.removeItem('authToken');
    },
    isTokenValid: function () {
        var token = exports.tokenUtils.getToken();
        if (!token)
            return false;
        try {
            var payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        }
        catch (_a) {
            return false;
        }
    }
};
exports.apiRequest = function (endpoint, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var token, config, response, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = exports.tokenUtils.getToken();
                    config = __assign(__assign({}, options), { headers: __assign(__assign({ 'Content-Type': 'application/json' }, (token && { Authorization: "Bearer " + token })), options.headers) });
                    return [4 /*yield*/, fetch("" + config_1.API_BASE_URL + endpoint, config)];
                case 1:
                    response = _b.sent();
                    if (response.status === 401) {
                        exports.tokenUtils.removeToken();
                        window.location.href = '/';
                        throw new Error('Недействительный токен');
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    throw new Error('Ошибка разбора JSON ответа');
                case 5:
                    if (!response.ok) {
                        throw new Error((data === null || data === void 0 ? void 0 : data.message) || "\u041E\u0448\u0438\u0431\u043A\u0430: " + response.status);
                    }
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.api = {
    getReviews: function (productId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apiRequest("/api/reviews?productId=" + encodeURIComponent(productId))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    getMainOffers: function () { return __awaiter(void 0, void 0, Promise, function () {
        var res, data, offersObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/main-offers")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Ошибка загрузки main offers');
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    offersObj = {};
                    data.forEach(function (item) {
                        offersObj[item.id] = item.text;
                    });
                    return [2 /*return*/, offersObj];
            }
        });
    }); },
    login: function (email, phone, password) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('register payload:', { email: email, phone: phone, password: password });
                    return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/login", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, phone: phone, password: password })
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    }); },
    register: function (email, phone, password, name) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/register", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email, phone: phone, password: password, name: name })
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    }); },
    getProduct: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apiRequest("/api/products/" + id)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); },
    getPopularProduct: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apiRequest("/api/popular/" + id)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); },
    getProducts: function (category_id, search) { return __awaiter(void 0, void 0, void 0, function () {
        var params, queryString, url, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = new URLSearchParams();
                    if (category_id !== undefined && category_id !== 0) {
                        params.append('category_id', category_id.toString());
                    }
                    if (search && search.trim() !== '') {
                        params.append('search', search);
                    }
                    queryString = params.toString();
                    url = queryString ? "/api/products?" + queryString : "/api/products";
                    return [4 /*yield*/, exports.apiRequest(url)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); },
    getProductsByCategory: function (category) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apiRequest("/api/products/category/" + category)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); },
    getPopularProducts: function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apiRequest("/api/popular")];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); },
    getProductByType: function (type, id) { return __awaiter(void 0, void 0, void 0, function () {
        var endpoint;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    switch (type) {
                        case "popular":
                            endpoint = "/api/popular/" + id;
                            break;
                        case "category1":
                        case "category2":
                        case "category3":
                        case "category4":
                        case "category5":
                            endpoint = "/api/" + type + "/" + id;
                            break;
                        default:
                            endpoint = "/api/products/" + id; // стандартная категория
                    }
                    return [4 /*yield*/, exports.apiRequest(endpoint)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    getCategories: function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apiRequest('/api/categories')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); },
    getCart: function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apiRequest('/api/cart')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); },
    addToCart: function (productId, quantity) {
        if (quantity === void 0) { quantity = 1; }
        return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.apiRequest('/api/cart', {
                            method: 'POST',
                            body: JSON.stringify({ product_id: productId, quantity: quantity })
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    },
    updateCartItem: function (productId, quantity) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apiRequest("/api/cart/" + productId, {
                        method: 'PUT',
                        body: JSON.stringify({ quantity: quantity })
                    })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); },
    removeFromCart: function (productId) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apiRequest("/api/cart/" + productId, {
                        method: 'DELETE'
                    })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); },
    admin: {
        getUsers: function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.apiRequest('/api/admin/users')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        createProduct: function (productData) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.apiRequest('/api/admin/products', {
                            method: 'POST',
                            body: JSON.stringify(productData)
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        updateProduct: function (productId, productData) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.apiRequest("/api/admin/products/" + productId, {
                            method: 'PUT',
                            body: JSON.stringify(productData)
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        deleteProduct: function (productId) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.apiRequest("/api/admin/products/" + productId, {
                            method: 'DELETE'
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        createProject: function (projectData) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.apiRequest('/api/admin/projects', {
                            method: 'POST',
                            body: JSON.stringify(projectData)
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        updateProject: function (projectId, projectData) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.apiRequest("/api/admin/projects/" + projectId, {
                            method: 'PUT',
                            body: JSON.stringify(projectData)
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        deleteProject: function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.apiRequest("/api/admin/projects/" + projectId, {
                            method: 'DELETE'
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        getProjects: function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.apiRequest('/projects')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        createPopular: function (popularData) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/popular", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(popularData)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        updatePopular: function (id, popularData) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/popular/" + id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(popularData)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        deletePopular: function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/popular/" + id, {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        getPopular: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/popular")];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        createCategory1: function (category1Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category1", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(category1Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        updateCategory1: function (id, category1Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category1/" + id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(category1Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        deleteCategory1: function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category1/" + id, {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        getCategory1: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category1")];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        createCategory2: function (category2Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category2", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(category2Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        updateCategory2: function (id, сategory1Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category2/" + id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(сategory1Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        deleteCategory2: function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category2/" + id, {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        getCategory2: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category2")];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        createCategory3: function (category3Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category3", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(category3Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        updateCategory3: function (id, сategory3Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category3/" + id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(сategory3Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        deleteCategory3: function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category3/" + id, {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        getCategory3: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category3")];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        createCategory4: function (category4Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category4", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(category4Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        updateCategory4: function (id, сategory4Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category4/" + id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(сategory4Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        deleteCategory4: function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category4/" + id, {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        getCategory4: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category4")];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        createCategory5: function (category5Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category5", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(category5Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        updateCategory5: function (id, сategory5Data) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category5/" + id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            },
                            body: JSON.stringify(сategory5Data)
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        deleteCategory5: function (id) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category5/" + id, {
                            method: "DELETE",
                            headers: {
                                Authorization: "Bearer " + exports.tokenUtils.getToken()
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        getCategory5: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config_1.API_BASE_URL + "/api/category5")];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); }
    }
};
function getProducts(_a) {
    var category_id = _a.category_id, searchQuery = _a.searchQuery, subCategoryId = _a.subCategoryId;
    return __awaiter(this, void 0, void 0, function () {
        var url, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = '/api/products?';
                    if (subCategoryId)
                        url += "subCategoryId=" + encodeURIComponent(subCategoryId) + "&";
                    if (category_id)
                        url += "category_id=" + category_id + "&";
                    if (searchQuery)
                        url += "search=" + encodeURIComponent(searchQuery) + "&";
                    url = url.replace(/&$/, '');
                    return [4 /*yield*/, exports.apiRequest(url)];
                case 1:
                    data = _b.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getProducts = getProducts;
