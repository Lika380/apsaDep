
import { API_BASE_URL } from "../config"

export interface ProductData {
  name: string;
  description?: string;
  price: number;
  category_id: string;
  image_url?: string;
  stock_quantity: number;
  subcategory?: string;
  subCategoryId?: string; 
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
}

export interface Popular {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}

export interface Category1 {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}

export interface Category2 {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}
export interface Category3 {
  id: string;
  name: string;
  description?: string;
  price: number; 
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}
export interface Category4 {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}
export interface Category5 {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
}

export interface CategoryProduct {
  id: string;          // или number, как у тебя в БД
  name: string;        // название товара
  description?: string; // описание (необязательно)
  price: number;       // цена
  category: string;    // категория (bakaleya, milk и т.д.)
  image_url?: string;  // ссылка на картинку
  stock_quantity?: number;
  subcategory?: string;
}


// Утилиты для работы с токенами
export const tokenUtils = {
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },
  
  setToken: (token: string): void => {
    localStorage.setItem('authToken', token);
  },
  
  removeToken: (): void => {
    localStorage.removeItem('authToken');
  },
  
  isTokenValid: (): boolean => {
    const token = tokenUtils.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};

// Утилита для API запросов с автоматическим добавлением токена
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = tokenUtils.getToken();

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // Проверка на истекший токен
  if (response.status === 401) {
    tokenUtils.removeToken();
    window.location.href = '/';
    throw new Error('Недействительный токен');
  }

  // Пробуем распарсить ответ
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Ошибка разбора JSON ответа');
  }

  // Если ошибка — выбрасываем её
  if (!response.ok) {
    throw new Error(data?.message || `Ошибка: ${response.status}`);
  }

  return data; // уже распарсенный JSON
};

// API функции
export const api = {


  getReviews: async (productId: string) => {
    return await apiRequest(`/api/reviews?productId=${encodeURIComponent(productId)}`);
  },
  
  getMainOffers: async (): Promise<Record<string, string>> => {
    const res = await fetch(`${API_BASE_URL}/api/main-offers`);
    if (!res.ok) {
      throw new Error('Ошибка загрузки main offers');
    }
    const data = await res.json();
    // Предположим, что API возвращает массив вида [{ id: "promo1", text: "Заголовок 1" }, ...]
    const offersObj: Record<string, string> = {};
    data.forEach((item: { id: string; text: string }) => {
      offersObj[item.id] = item.text;
    });
    return offersObj;
  },
  
  // Аутентификация
  login: async (email: string | null, phone: string | null, password: string) => {
    console.log('register payload:', { email, phone, password });

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, password }),
    });
    return response.json();
  },
  

  register: async (email: string | null, phone: string | null, password: string, name: string) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, password, name }),
    });
    return response.json();
  },
  

  // Товары

  getProduct: async (id: string) => {
    const data = await apiRequest(`/api/products/${id}`);
    return data;
  },

  getPopularProduct: async (id: string) => {
    const data = await apiRequest(`/api/popular/${id}`);
    return data;
  },
  
  
  getProducts: async (category_id?: number, search?: string) => {
    const params = new URLSearchParams();
  
    if (category_id !== undefined && category_id !== 0) {
      params.append('category_id', category_id.toString());
    }
  
    if (search && search.trim() !== '') {
      params.append('search', search);
    }
  
    const queryString = params.toString();
    const url = queryString ? `/api/products?${queryString}` : `/api/products`;
  
    const data = await apiRequest(url);
    return data;
  },
  
  getProductsByCategory: async (category: string) => {
    const data = await apiRequest(`/api/products/category/${category}`);
    return data;
  },
  
  getPopularProducts: async () => {
    const data = await apiRequest(`/api/popular`);
    return data;
  },

  getProductByType: async (type: string, id: string) => {
    let endpoint;
  
    switch (type) {
      case "popular":
        endpoint = `/api/popular/${id}`;
        break;
      case "category1":
      case "category2":
      case "category3":
      case "category4":
      case "category5":
        endpoint = `/api/${type}/${id}`;
        break;
      default:
        endpoint = `/api/products/${id}`; // стандартная категория
    }
  
    return await apiRequest(endpoint);
  },
  
  // Категории
  getCategories: async () => {
    const data = await apiRequest('/api/categories');
    return data;
  },

  // Корзина
  getCart: async () => {
    const data = await apiRequest('/api/cart');
    return data;
  },

  addToCart: async (productId: string, quantity: number = 1) => {
    const data = await apiRequest('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    return data;
  },

  updateCartItem: async (productId: string, quantity: number) => {
    const data = await apiRequest(`/api/cart/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    return data;
  },

  removeFromCart: async (productId: string) => {
    const data = await apiRequest(`/api/cart/${productId}`, {
      method: 'DELETE',
    });
    return data;
  },

  // Административные функции
  admin: {
    getUsers: async () => {
      const data = await apiRequest('/api/admin/users');
      return data;
    },
  
    createProduct: async (productData: ProductData) => {
      const data = await apiRequest('/api/admin/products', {
        method: 'POST',
        body: JSON.stringify(productData), 
      });
      return data;
    },
  
    updateProduct: async (productId: string, productData: ProductData) => {
      const data = await apiRequest(`/api/admin/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
      return data;
    },
  
    deleteProduct: async (productId: string) => {
      const data = await apiRequest(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });
      return data;
    },
  
    createProject: async (projectData: Omit<Project, "id">) => {
      const data = await apiRequest('/api/admin/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
      });
      return data;
    },
    
    updateProject: async (
      projectId: string,
      projectData: {
        name: string;
        description?: string;
        image_url?: string;
      }
    ) => {
      const data = await apiRequest(`/api/admin/projects/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      });
      return data;
    },

    deleteProject: async (projectId: string) => {
      const data = await apiRequest(`/api/admin/projects/${projectId}`, {
        method: 'DELETE',
      });
      return data;
    },

    getProjects: async () => {
      const data = await apiRequest('/projects');
      return data;
    },

    createPopular: async (popularData: Omit<Popular, "id">) => {
      const res = await fetch(`${API_BASE_URL}/api/popular`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`
,
        },
        body: JSON.stringify(popularData),
      });
      
      return await res.json();
    },
    
    
    updatePopular: async (id: string, popularData: Popular) => {
      const res = await fetch(`${API_BASE_URL}/api/popular/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`
,
        },
        body: JSON.stringify(popularData),
      });
      return await res.json();
    },
    
    
    deletePopular: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/popular/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
      });
      return await res.json();
    },
    
    
    getPopular: async () => {
      const res = await fetch(`${API_BASE_URL}/api/popular`);
      return await res.json();
    },
  //для категории 1
    
    createCategory1: async (category1Data: Omit<Category1, "id">) => {
      const res = await fetch(`${API_BASE_URL}/api/category1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(category1Data),
      });
      
      return await res.json();
    },
    
    
    updateCategory1: async (id: string, category1Data: Category1) => {
      const res = await fetch(`${API_BASE_URL}/api/category1/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(category1Data),
      });
      return await res.json();
    },
    
    
    deleteCategory1: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/category1/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
      });
      return await res.json();
    },
    
    
    getCategory1: async () => {
      const res = await fetch(`${API_BASE_URL}/api/category1`);
      return await res.json();
    },
  
    //для категории 2
    
    createCategory2: async (category2Data: Omit<Category2, "id">) => {
      const res = await fetch(`${API_BASE_URL}/api/category2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(category2Data),
      });
      
      return await res.json();
    },
    
    
    updateCategory2: async (id: string, сategory1Data: Category2) => {
      const res = await fetch(`${API_BASE_URL}/api/category2/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(сategory1Data),
      });
      return await res.json();
    },
    
    
    deleteCategory2: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/category2/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
      });
      return await res.json();
    },
    
    
    getCategory2: async () => {
      const res = await fetch(`${API_BASE_URL}/api/category2`);
      return await res.json();
    },
  
     //для категории 3
    
     createCategory3: async (category3Data: Omit<Category3, "id">) => {
      const res = await fetch(`${API_BASE_URL}/api/category3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(category3Data),
      });
      
      return await res.json();
    },
    
    
    updateCategory3: async (id: string, сategory3Data: Category3) => {
      const res = await fetch(`${API_BASE_URL}/api/category3/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(сategory3Data),
      });
      return await res.json();
    },
    
    
    deleteCategory3: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/category3/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
      });
      return await res.json();
    },
    
    
    getCategory3: async () => {
      const res = await fetch(`${API_BASE_URL}/api/category3`);
      return await res.json();
    },
  
     //для категории 4
    
     createCategory4: async (category4Data: Omit<Category4, "id">) => {
      const res = await fetch(`${API_BASE_URL}/api/category4`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(category4Data),
      });
      
      return await res.json();
    },
    
    
    updateCategory4: async (id: string, сategory4Data: Category4) => {
      const res = await fetch(`${API_BASE_URL}/api/category4/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(сategory4Data),
      });
      return await res.json();
    },
    
    
    deleteCategory4: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/category4/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
      });
      return await res.json();
    },
    
    
    getCategory4: async () => {
      const res = await fetch(`${API_BASE_URL}/api/category4`);
      return await res.json();
    },
  
     //для категории 5
    
     createCategory5: async (category5Data: Omit<Category5, "id">) => {
      const res = await fetch(`${API_BASE_URL}/api/category5`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(category5Data),
      });
      
      return await res.json();
    },
    
    
    updateCategory5: async (id: string, сategory5Data: Category5) => {
      const res = await fetch(`${API_BASE_URL}/api/category5/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
        body: JSON.stringify(сategory5Data),
      });
      return await res.json();
    },
    
    
    deleteCategory5: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/category5/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenUtils.getToken()}`,
        },
      });
      return await res.json();
    },
    
    
    getCategory5: async () => {
      const res = await fetch(`${API_BASE_URL}/api/category5`);
      return await res.json();
    },
  
  },
  
};


export async function getProducts({
  category_id,
  searchQuery,
  subCategoryId,
}: {
  category_id?: number;
  searchQuery?: string;
  subCategoryId?: string;
}) {
  let url = '/api/products?';

  if (subCategoryId) url += `subCategoryId=${encodeURIComponent(subCategoryId)}&`;
  if (category_id) url += `category_id=${category_id}&`;
  if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;

  url = url.replace(/&$/, '');

  const data = await apiRequest(url);
  return data;
}
