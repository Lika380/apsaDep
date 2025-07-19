const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const app = express();
const JWT_SECRET = 'your-secret-key-change-in-production';
app.use(cors());
app.use(express.json());
const router = express.Router();

// Инициализация базы данных
const db = new sqlite3.Database('./new_database.db');




// Создание таблиц
db.serialize(() => {
//для названиии категории 
  db.run(`
    CREATE TABLE IF NOT EXISTS main_offer (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS popular (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category_id INTEGER,
      image_url TEXT,
      stock_quantity INTEGER
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS category1 (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category_id INTEGER,
      image_url TEXT,
      stock_quantity INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS category2 (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category_id INTEGER,
      image_url TEXT,
      stock_quantity INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS category3 (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category_id INTEGER,
      image_url TEXT,
      stock_quantity INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS category4 (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category_id INTEGER,
      image_url TEXT,
      stock_quantity INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS category5 (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category_id INTEGER,
      image_url TEXT,
      stock_quantity INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      image_url TEXT,
      description TEXT
    )
  `);
  // Таблица пользователей
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Таблица категорий товаров
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    parent_id INTEGER DEFAULT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories (id)
  )`);

  // Таблица товаров
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER,
    image_url TEXT,
    stock_quantity INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  )`);

  // Таблица корзины
  db.run(`CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id TEXT,
    quantity INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  )`);


  // Создание администратора по умолчанию
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin', ?, 'admin')`, [adminPassword]);  
  db.run(`INSERT OR IGNORE INTO categories (id, name) VALUES 
    (1, 'Телевизоры и цифровое ТВ'),
    (2, 'Смартфоны и гаджеты'),
    (3, 'Ноутбуки и компьютеры'),
    (4, 'Аудиотехника'),
    (5, 'Техника для кухни'),
    (6, 'Техника для дома'),
    (7, 'Красота и здоровье'),
    (8, 'Умный дом'),
    (9, 'Посуда'),
    (10, 'Игры и софт'),
    (11, 'Хобби и развлечения'),
    (12, 'Спортивные товары'),
    (13, 'Фото и видео'),
    (14, 'Автоэлектроника'),
    (15, 'Строительство и ремонт'),
    (16, 'Дача, сад и огород')`);

  db.run(`INSERT OR IGNORE INTO categories (id, name, parent_id) VALUES 
    -- Телевизоры и цифровое ТВ
    (101, 'Телевизоры', 1),
    (102, '12-27 дюймов', 101),
    (103, '28-38 дюймов', 101),
    (104, '39-49 дюймов', 101),
    (105, '50-64 дюйма', 101),
    (106, '65-74 дюйма', 101),
    (107, '75 дюймов и больше', 101),
    (108, 'Smart TV', 101),
    (109, '4K Ultra HD', 101),
    (110, 'OLED телевизоры', 101),
    (111, 'QLED телевизоры', 101),

    
    -- Смартфоны и гаджеты
    (201, 'Смартфоны', 2),
    (202, 'iPhone', 201),
    (203, 'Samsung Galaxy', 201),
    (204, 'Xiaomi', 201),
    (205, 'Huawei', 201),
    (206, 'Honor', 201),
    (207, 'OPPO', 201),
    (208, 'Realme', 201),
    (209, 'OnePlus', 201),
    (210, 'Планшеты', 2),
    (211, 'iPad', 210),
    (212, 'Samsung Tab', 210),
    (213, 'Android планшеты', 210),
    (214, 'Умные часы и браслеты', 2),
    (215, 'Apple Watch', 214),

    
    -- Ноутбуки и компьютеры
    (301, 'Ноутбуки', 3),
    (302, 'Ультрабуки', 301),
    (303, 'Игровые ноутбуки', 301),
    (304, 'Офисные ноутбуки', 301),
    (305, 'MacBook', 301),

    -- Аудиотехника
    (401, 'Наушники', 4),
    (402, 'Полноразмерные наушники', 401),

    
    -- Техника для кухни
    (501, 'Крупная бытовая техника', 5),
    (502, 'Холодильники', 501),
    (503, 'Двухкамерные холодильники', 502),
    (504, 'Side-by-Side', 502),
    (505, 'Морозильные камеры', 502),

    
    -- Техника для дома
    (601, 'Климатическая техника', 6),
    (602, 'Кондиционеры', 601),
    (603, 'Сплит-системы', 602),
    (604, 'Мобильные кондиционеры', 602),

    
    -- Красота и здоровье
    (701, 'Техника для ухода за волосами', 7),
    (702, 'Фены', 701),
    (703, 'Плойки', 701),

    
    -- Умный дом
    (801, 'Системы безопасности', 8),
    (802, 'IP камеры', 801),
    (803, 'Видеодомофоны', 801),
    (804, 'Датчики движения', 801),
    (805, 'Сигнализации', 801),
    (806, 'Умное освещение', 8),

    
    -- Посуда
    (901, 'Кухонная посуда', 9),
    (902, 'Кастрюли и сковороды', 901),
    (903, 'Наборы посуды', 901),
    (904, 'Ножи', 901),
    (905, 'Кухонные принадлежности', 901),
    (906, 'Столовая посуда', 9),

    
    -- Игры и софт
    (1001, 'Видеоигры', 10),
    (1002, 'PlayStation', 1001),
    (1003, 'Xbox', 1001),
    (1004, 'Nintendo Switch', 1001),
    (1005, 'PC игры', 1001),
    (1006, 'Игровые аксессуары', 10),

    
    -- Хобби и развлечения
    (1101, 'Настольные игры', 11),
    (1102, 'Пазлы', 11),
    (1103, 'Конструкторы', 11),
    (1104, 'Коллекционирование', 11),
    
    -- Спортивные товары
    (1201, 'Фитнес', 12),
    (1202, 'Тренажеры', 1201),
    (1203, 'Гантели', 1201),
    (1204, 'Коврики для йоги', 1201),
    (1205, 'Велосипеды', 12),
    
    -- Фото и видео
    (1301, 'Фотоаппараты', 13),
    (1302, 'Зеркальные фотоаппараты', 1301),
    (1303, 'Беззеркальные камеры', 1301),

    
    -- Автоэлектроника
    (1401, 'Автомагнитолы', 14),
    (1402, 'Навигаторы', 14),
    (1403, 'Видеорегистраторы', 14),
    
    -- Строительство и ремонт
    (1501, 'Электроинструменты', 15),
    (1502, 'Дрели', 1501),
    (1503, 'Перфораторы', 1501),
    (1504, 'Шуруповерты', 1501),
    
    -- Дача, сад и огород
    (1601, 'Садовая техника', 16),
    (1602, 'Газонокосилки', 1601),
    (1603, 'Триммеры', 1601),
    (1604, 'Культиваторы', 1601),
    (1605, 'Садовый инвентарь', 16),
    
    -- Товары для детей
    (1701, 'Игрушки', 17),
    (1702, 'Развивающие игрушки', 1701),
    (1703, 'Куклы', 1701),
    
    -- Одежда и обувь
    (1801, 'Мужская одежда', 18),
    (1802, 'Рубашки', 1801),
    (1803, 'Брюки', 1801),
    (1804, 'Куртки', 1801),
    
    -- Канцелярия
    (1901, 'Письменные принадлежности', 19),
    (1902, 'Ручки', 1901),
    (1903, 'Карандаши', 1901),
    (1904, 'Маркеры', 1901),
    
    -- Книги
    (2001, 'Художественная литература', 20),
    (2002, 'Романы', 2001),
    (2003, 'Детективы', 2001),
    
    -- Музыкальные инструменты
    (2101, 'Струнные инструменты', 21),
    (2102, 'Гитары', 2101),
    (2103, 'Скрипки', 2101),
    (2104, 'Клавишные инструменты', 21),
    
    -- Ювелирные изделия
    (2201, 'Кольца', 22),
    (2202, 'Серьги', 22),
    (2203, 'Цепочки', 22),
    
    -- Путешествия и туризм
    (2301, 'Чемоданы и сумки', 23),
    (2302, 'Чемоданы', 2301),
    (2303, 'Рюкзаки', 2301),
    (2304, 'Дорожные сумки', 2301),
    
    -- Зоотовары
    (2401, 'Товары для собак', 24),
    (2402, 'Корм для собак', 2401),
    (2403, 'Игрушки для собак', 2401),
    (2404, 'Товары для кошек', 24),
    
    -- Продукты питания
    (2501, 'Бакалея', 25),
    (2502, 'Крупы', 2501),
    (2503, 'Макароны', 2501),
    (2504, 'Консервы', 2501)
`);

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER,
    image_url TEXT,
    stock_quantity INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  )
`);



  // Обновленные тестовые товары с правильными категориями
  const testProducts = [
    // Телевизоры
    { id: uuidv4(), name: 'Телевизор Samsung 55" 4K UHD', price: 65999, category_id: 109, stock_quantity: 5, description: 'Smart TV с поддержкой 4K HDR' },
    { id: uuidv4(), name: 'Телевизор LG OLED 65"', price: 129999, category_id: 110, stock_quantity: 3, description: 'OLED телевизор премиум класса' },
    
    // Смартфоны
    { id: uuidv4(), name: 'iPhone 15 Pro 256GB', price: 119999, category_id: 202, stock_quantity: 10, description: 'Последняя модель iPhone' },
    { id: uuidv4(), name: 'iPhone 14 128GB', price: 79999, category_id: 202, stock_quantity: 15, description: 'iPhone предыдущего поколения' },
    { id: uuidv4(), name: 'Samsung Galaxy S24 Ultra', price: 99999, category_id: 203, stock_quantity: 7, description: 'Флагманский Android смартфон' },

  ];

  testProducts.forEach(product => {
    db.run(`INSERT OR IGNORE INTO products (id, name, price, category_id, stock_quantity) VALUES (?, ?, ?, ?, ?)`,
      [product.id, product.name, product.price, product.category_id, product.stock_quantity]);
  });
});

// Middleware для проверки JWT токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Токен доступа отсутствует' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Недействительный токен' });
    }
    req.user = user;
    next();
  });
};

// Маршруты аутентификации
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Логин и пароль обязательны' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', 
      [username, hashedPassword], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
          }
          return res.status(500).json({ message: 'Ошибка создания пользователя' });
        }
        res.status(201).json({ message: 'Пользователь успешно создан' });
      });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Логин и пароль обязательны' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      role: user.role,
      username: user.username
    });
  });
});


app.get('/api/products', (req, res) => {
  const tables = ['products', 'popular', 'category1', 'category2', 'category3', 'category4', 'category5'];
  let allProducts = [];
  let index = 0;

  const fetchNext = () => {
    if (index >= tables.length) {
      return res.json(allProducts);
    }
    const table = tables[index];
    db.all(`SELECT *, '${table}' as source_table FROM ${table}`, (err, rows) => {
      if (err) {
        return res.status(500).json({ message: `Ошибка при запросе из таблицы ${table}` });
      }
      allProducts = allProducts.concat(rows);
      index++;
      fetchNext();
    });
  };

  fetchNext();
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const tables = ['products', 'popular', 'category1', 'category2', 'category3', 'category4', 'category5'];

  let index = 0;

  const searchNextTable = () => {
    if (index >= tables.length) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const table = tables[index];
    db.get(`SELECT *, '${table}' as source_table FROM ${table} WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ message: `Ошибка при запросе из таблицы ${table}` });
      }
      if (row) {
        return res.json(row);
      } else {
        index++;
        searchNextTable();
      }
    });
  };

  searchNextTable();
});



app.get('/api/catalog/product/:id', (req, res) => {
  const id = req.params.id;
  const tables = ['popular', 'category1', 'category2', 'category3', 'category4', 'category5'];

  let index = 0;

  function tryNextTable() {
    if (index >= tables.length) {
      return res.status(404).json({ message: 'Товар не найден в каталоге' });
    }
    const table = tables[index];
    db.get(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, row) => {
      if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
      if (row) return res.json(row);
      index++;
      tryNextTable();
    });
  }

  tryNextTable();
});

// Маршруты для категорий
app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM categories', (err, categories) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка получения категорий' });
    }
    res.json(categories);
  });
});

// Маршруты корзины (требуют авторизации)
app.get('/api/cart', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  db.all(`SELECT ci.*, p.name, p.price, p.image_url 
          FROM cart_items ci 
          JOIN products p ON ci.product_id = p.id 
          WHERE ci.user_id = ?`, [userId], (err, items) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка получения корзины' });
    }
    res.json(items);
  });
});

app.post('/api/cart', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity = 1 } = req.body;

  // Проверка существования товара
  db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    // Проверка, есть ли уже товар в корзине
    db.get('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', 
      [userId, product_id], (err, existingItem) => {
        if (err) {
          return res.status(500).json({ message: 'Ошибка базы данных' });
        }

        if (existingItem) {
          // Обновляем количество
          db.run('UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
            [quantity, userId, product_id], (err) => {
              if (err) {
                return res.status(500).json({ message: 'Ошибка обновления корзины' });
              }
              res.json({ message: 'Количество товара обновлено в корзине' });
            });
        } else {
          // Добавляем новый товар
          db.run('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
            [userId, product_id, quantity], (err) => {
              if (err) {
                return res.status(500).json({ message: 'Ошибка добавления в корзину' });
              }
              res.status(201).json({ message: 'Товар добавлен в корзину' });
            });
        }
      });
  });
});
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY ROWID DESC', (err, rows) => {
    if (err) {
      console.error('Ошибка базы данных:', err);
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    res.json(rows);
  });
});

app.get('/api/projects/latest', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY ROWID DESC LIMIT 2', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    res.json(rows);
  });
});
 
//для категории 1
app.get('/api/category1', (req, res) => {
  console.log('Запрос /api/category1 получен');
  db.all('SELECT * FROM category1', (err, rows) => {
    if (err) {
      console.error('Ошибка базы данных category1:', err);
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    res.json(rows);
  });
});

app.get('/api/category1/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM category1 WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
    if (!row) return res.status(404).json({ message: 'Популярный продукт не найден' });
    res.json(row);
  });
});



app.post('/api/category1', (req, res) => {
  const product = req.body; // данные из тела запроса
  const { name, description, price, category_id, image_url, stock_quantity } = product;

  const id = uuidv4(); // генерируем уникальный ID для продукта

  // SQL запрос с полем stock_quantity, если нет - ставим 0
  const sql = `INSERT INTO category1 (id, name, description, price, category_id, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [id, name, description, price, category_id, image_url, stock_quantity ?? 0], function(err) {
    if (err) {
      console.error('Ошибка при добавлении в category1:', err);
      return res.status(500).json({ message: 'Ошибка базы данных при добавлении популярного продукта' });
    }
    // Возвращаем добавленный продукт с id
    res.status(201).json({ id, name, description, price, category_id, image_url, stock_quantity: stock_quantity ?? 0 });
  });
});

// Обновление продукта
app.put('/api/category1/:id', (req, res) => {
  const id = req.params.id;
  console.log('PUT /api/category1/:id', id, 'body:', req.body);

  const { name, description, price, category_id, image_url } = req.body;

  const sql = `
    UPDATE category1
    SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?
    WHERE id = ?
  `;

  db.run(sql, [name, description, price, category_id, image_url, id], function(err) {
    if (err) {
      console.error('Ошибка обновления продукта:', err);
      return res.status(500).json({ message: 'Ошибка обновления продукта' });
    }
    if (this.changes === 0) {
      console.log('Популярный продукт не найден для id:', id);
      return res.status(404).json({ message: ' продукт не найден' });
    }
    res.json({ message: 'Популярный продукт обновлен' });
  });
});


// Удаление продукта
app.delete('/api/category1/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM category1 WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Ошибка удаления продукта:', err);
      return res.status(500).json({ message: 'Ошибка удаления продукта' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: ' продукт не найден' });
    }
    res.json({ message: ' продукт удален' });
  });
});





//для категории 2
app.get('/api/category2', (req, res) => {
  console.log('Запрос /api/category2 получен');
  db.all('SELECT * FROM category2', (err, rows) => {
    if (err) {
      console.error('Ошибка базы данных category2:', err);
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    res.json(rows);
  });
});

app.get('/api/category2/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM category2 WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
    if (!row) return res.status(404).json({ message: 'Популярный продукт не найден' });
    res.json(row);
  });
});



app.post('/api/category2', (req, res) => {
  const product = req.body; // данные из тела запроса
  const { name, description, price, category_id, image_url, stock_quantity } = product;

  const id = uuidv4(); // генерируем уникальный ID для продукта

  // SQL запрос с полем stock_quantity, если нет - ставим 0
  const sql = `INSERT INTO category2 (id, name, description, price, category_id, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [id, name, description, price, category_id, image_url, stock_quantity ?? 0], function(err) {
    if (err) {
      console.error('Ошибка при добавлении в category2:', err);
      return res.status(500).json({ message: 'Ошибка базы данных при добавлении популярного продукта' });
    }
    // Возвращаем добавленный продукт с id
    res.status(201).json({ id, name, description, price, category_id, image_url, stock_quantity: stock_quantity ?? 0 });
  });
});

// Обновление продукта
app.put('/api/category2/:id', (req, res) => {
  const id = req.params.id;
  console.log('PUT /api/category2/:id', id, 'body:', req.body);

  const { name, description, price, category_id, image_url } = req.body;

  const sql = `
    UPDATE category2
    SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?
    WHERE id = ?
  `;

  db.run(sql, [name, description, price, category_id, image_url, id], function(err) {
    if (err) {
      console.error('Ошибка обновления продукта:', err);
      return res.status(500).json({ message: 'Ошибка обновления продукта' });
    }
    if (this.changes === 0) {
      console.log('Популярный продукт не найден для id:', id);
      return res.status(404).json({ message: ' продукт не найден' });
    }
    res.json({ message: 'Популярный продукт обновлен' });
  });
});


// Удаление продукта
app.delete('/api/category2/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM category2 WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Ошибка удаления продукта:', err);
      return res.status(500).json({ message: 'Ошибка удаления продукта' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: ' продукт не найден' });
    }
    res.json({ message: ' продукт удален' });
  });
});

//для категории 3
app.get('/api/category3', (req, res) => {
  console.log('Запрос /api/category3 получен');
  db.all('SELECT * FROM category3', (err, rows) => {
    if (err) {
      console.error('Ошибка базы данных category3:', err);
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    res.json(rows);
  });
});

app.get('/api/category3/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM category3 WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
    if (!row) return res.status(404).json({ message: 'Популярный продукт не найден' });
    res.json(row);
  });
});



app.post('/api/category3', (req, res) => {
  const product = req.body; // данные из тела запроса
  const { name, description, price, category_id, image_url, stock_quantity } = product;

  const id = uuidv4(); // генерируем уникальный ID для продукта

  // SQL запрос с полем stock_quantity, если нет - ставим 0
  const sql = `INSERT INTO category3 (id, name, description, price, category_id, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [id, name, description, price, category_id, image_url, stock_quantity ?? 0], function(err) {
    if (err) {
      console.error('Ошибка при добавлении в category3:', err);
      return res.status(500).json({ message: 'Ошибка базы данных при добавлении популярного продукта' });
    }
    // Возвращаем добавленный продукт с id
    res.status(201).json({ id, name, description, price, category_id, image_url, stock_quantity: stock_quantity ?? 0 });
  });
});

// Обновление продукта
app.put('/api/category3/:id', (req, res) => {
  const id = req.params.id;
  console.log('PUT /api/category3/:id', id, 'body:', req.body);

  const { name, description, price, category_id, image_url, stock_quantity } = req.body;

  const sql = `
    UPDATE category3
    SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?, stock_quantity = ?
    WHERE id = ?
  `;

  db.run(sql, [name, description, price, category_id, image_url, stock_quantity, id], function(err) {
    if (err) {
      console.error('Ошибка обновления продукта:', err);
      return res.status(500).json({ message: 'Ошибка обновления продукта' });
    }
    if (this.changes === 0) {
      console.log('Продукт не найден для id:', id);
      return res.status(404).json({ message: 'Продукт не найден' });
    }
    res.json({ message: 'Продукт обновлен' });
  });
});

// Удаление продукта
app.delete('/api/category3/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM category3 WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Ошибка удаления продукта:', err);
      return res.status(500).json({ message: 'Ошибка удаления продукта' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: ' продукт не найден' });
    }
    res.json({ message: ' продукт удален' });
  });
});

//для категории 4
app.get('/api/category4', (req, res) => {
  console.log('Запрос /api/category4 получен');
  db.all('SELECT * FROM category4', (err, rows) => {
    if (err) {
      console.error('Ошибка базы данных category4:', err);
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    res.json(rows);
  });
});

app.get('/api/category4/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM category4 WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
    if (!row) return res.status(404).json({ message: 'Популярный продукт не найден' });
    res.json(row);
  });
});



app.post('/api/category4', (req, res) => {
  const product = req.body; // данные из тела запроса
  const { name, description, price, category_id, image_url, stock_quantity } = product;

  const id = uuidv4(); // генерируем уникальный ID для продукта

  // SQL запрос с полем stock_quantity, если нет - ставим 0
  const sql = `INSERT INTO category4 (id, name, description, price, category_id, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [id, name, description, price, category_id, image_url, stock_quantity ?? 0], function(err) {
    if (err) {
      console.error('Ошибка при добавлении в category4:', err);
      return res.status(500).json({ message: 'Ошибка базы данных при добавлении популярного продукта' });
    }
    // Возвращаем добавленный продукт с id
    res.status(201).json({ id, name, description, price, category_id, image_url, stock_quantity: stock_quantity ?? 0 });
  });
});

// Обновление продукта
app.put('/api/category4/:id', (req, res) => {
  const id = req.params.id;
  console.log('PUT /api/category4/:id', id, 'body:', req.body);

  const { name, description, price, category_id, image_url } = req.body;

  const sql = `
    UPDATE category4
    SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?
    WHERE id = ?
  `;

  db.run(sql, [name, description, price, category_id, image_url, id], function(err) {
    if (err) {
      console.error('Ошибка обновления продукта:', err);
      return res.status(500).json({ message: 'Ошибка обновления продукта' });
    }
    if (this.changes === 0) {
      console.log('Популярный продукт не найден для id:', id);
      return res.status(404).json({ message: ' продукт не найден' });
    }
    res.json({ message: 'Популярный продукт обновлен' });
  });
});


// Удаление продукта
app.delete('/api/category4/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM category4 WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Ошибка удаления продукта:', err);
      return res.status(500).json({ message: 'Ошибка удаления продукта' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: ' продукт не найден' });
    }
    res.json({ message: ' продукт удален' });
  });
});

//для категории 5
app.get('/api/category5', (req, res) => {
  console.log('Запрос /api/category5 получен');
  db.all('SELECT * FROM category5', (err, rows) => {
    if (err) {
      console.error('Ошибка базы данных category5:', err);
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    res.json(rows);
  });
});

app.get('/api/category5/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM category5 WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
    if (!row) return res.status(404).json({ message: 'Популярный продукт не найден' });
    res.json(row);
  });
});



app.post('/api/category5', (req, res) => {
  const product = req.body; // данные из тела запроса
  const { name, description, price, category_id, image_url, stock_quantity } = product;

  const id = uuidv4(); // генерируем уникальный ID для продукта

  // SQL запрос с полем stock_quantity, если нет - ставим 0
  const sql = `INSERT INTO category5 (id, name, description, price, category_id, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [id, name, description, price, category_id, image_url, stock_quantity ?? 0], function(err) {
    if (err) {
      console.error('Ошибка при добавлении в category5:', err);
      return res.status(500).json({ message: 'Ошибка базы данных при добавлении популярного продукта' });
    }
    // Возвращаем добавленный продукт с id
    res.status(201).json({ id, name, description, price, category_id, image_url, stock_quantity: stock_quantity ?? 0 });
  });
});

// Обновление продукта
app.put('/api/category5/:id', (req, res) => {
  const id = req.params.id;
  console.log('PUT /api/category5/:id', id, 'body:', req.body);

  const { name, description, price, category_id, image_url } = req.body;

  const sql = `
    UPDATE category5
    SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?
    WHERE id = ?
  `;

  db.run(sql, [name, description, price, category_id, image_url, id], function(err) {
    if (err) {
      console.error('Ошибка обновления продукта:', err);
      return res.status(500).json({ message: 'Ошибка обновления продукта' });
    }
    if (this.changes === 0) {
      console.log('Популярный продукт не найден для id:', id);
      return res.status(404).json({ message: ' продукт не найден' });
    }
    res.json({ message: 'Популярный продукт обновлен' });
  });
});


// Удаление продукта
app.delete('/api/category5/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM category5 WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Ошибка удаления продукта:', err);
      return res.status(500).json({ message: 'Ошибка удаления продукта' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: ' продукт не найден' });
    }
    res.json({ message: ' продукт удален' });
  });
});

//для популярных
app.get('/api/popular', (req, res) => {
  console.log('Запрос /api/popular получен');
  db.all('SELECT * FROM popular', (err, rows) => {
    if (err) {
      console.error('Ошибка базы данных popular:', err);
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    res.json(rows);
  });
});

app.get('/api/popular/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM popular WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
    if (!row) return res.status(404).json({ message: 'Популярный продукт не найден' });
    res.json(row);
  });
});

app.put('/api/cart/:product_id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.params;
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Количество должно быть больше 0' });
  }

  db.run('UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?',
    [quantity, userId, product_id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Ошибка обновления корзины' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Товар не найден в корзине' });
      }
      res.json({ message: 'Количество обновлено' });
    });
});

app.delete('/api/cart/:product_id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.params;

  db.run('DELETE FROM cart_items WHERE user_id = ? AND product_id = ?',
    [userId, product_id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Ошибка удаления из корзины' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Товар не найден в корзине' });
      }
      res.json({ message: 'Товар удален из корзины' });
    });
});


app.put('/api/popular/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, } = req.body;

  const sql = `
    UPDATE popular
    SET name = ?, description = ?, price = ?, image_url = ?
    WHERE id = ?
  `;

  db.run(sql, [name, description, price, image_url, id], function(err) {
    if (err) {
      console.error('Ошибка обновления popular:', err);
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Популярный продукт не найден' });
    }
    res.json({ message: 'Популярный продукт обновлен' });
  });
});



app.post('/api/admin/products', (req, res) => {
  const { name, description, price, category_id, image_url, stock_quantity, website, instagram, whatsapp } = req.body;
  const sql = `
    INSERT INTO products
    (name, description, price, category_id, image_url, stock_quantity, website, instagram, whatsapp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [name, description, price, category_id, image_url, stock_quantity, website, instagram, whatsapp], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Ошибка добавления продукта" });
    }
    res.json({ id: this.lastID });
  });
});



// Получить последние 2 проекта
app.get('/api/projects/latest', (req, res) => {
  db.all(
    `SELECT * FROM projects ORDER BY ROWID DESC LIMIT 2`,
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
      res.json(rows);
    }
  );
});



// Админ: получить всех пользователей
app.get('/api/admin/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' });

  db.all('SELECT id, username, role, created_at FROM users', (err, users) => {
    if (err) return res.status(500).json({ message: 'Ошибка получения пользователей' });
    res.json(users);
  });
});

// Админ: создать продукт
// Создание продукта (POST /api/admin/products)
app.post('/api/admin/products', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' });

  const { name, description, price, category_id, image_url, stock_quantity, phone, instagram, whatsapp } = req.body;
  const id = uuidv4();

  db.run(
    'INSERT INTO products (id, name, description, price, category_id, image_url, stock_quantity, phone, instagram, whatsapp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, name, description, price, category_id, image_url, stock_quantity, phone, instagram, whatsapp],
    (err) => {
      if (err) return res.status(500).json({ message: 'Ошибка создания товара' });
      res.status(201).json({ message: 'Товар создан', id });
    }
  );
});


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.post('/api/popular', (req, res) => {
  const product = req.body; // данные из тела запроса
  const { name, description, price, category_id, image_url, stock_quantity } = product;

  const id = uuidv4(); // генерируем уникальный ID для продукта

  // SQL запрос с полем stock_quantity, если нет - ставим 0
  const sql = `INSERT INTO popular (id, name, description, price, category_id, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [id, name, description, price, category_id, image_url, stock_quantity ?? 0], function(err) {
    if (err) {
      console.error('Ошибка при добавлении в popular:', err);
      return res.status(500).json({ message: 'Ошибка базы данных при добавлении популярного продукта' });
    }
    // Возвращаем добавленный продукт с id
    res.status(201).json({ id, name, description, price, category_id, image_url, stock_quantity: stock_quantity ?? 0 });
  });
});

// Обновление популярного продукта
app.put('/api/admin/products/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' });

  const { id } = req.params;
  const {
    name,
    description,
    price,
    category_id,
    image_url,
    stock_quantity,
    website, // добавлено
    instagram,
    whatsapp
  } = req.body;

  db.run(
    'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?, stock_quantity = ?, website = ?, instagram = ?, whatsapp = ? WHERE id = ?',
    [name, description, price, category_id, image_url, stock_quantity, website, instagram, whatsapp, id],
    function (err) {
      if (err) {
        console.error('Ошибка обновления товара в БД:', err);
        return res.status(500).json({ message: 'Ошибка обновления товара' });
      }
      if (this.changes === 0) return res.status(404).json({ message: 'Товар не найден' });
      res.json({ message: 'Товар обновлен' });
    }
  );
});




// Удаление популярного продукта
app.delete('/api/popular/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM popular WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Ошибка удаления популярного продукта:', err);
      return res.status(500).json({ message: 'Ошибка удаления популярного продукта' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Популярный продукт не найден' });
    }
    res.json({ message: 'Популярный продукт удален' });
  });
});


// Админ: удалить продукт
app.delete('/api/admin/products/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' });

  const { id } = req.params;

  db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ message: 'Ошибка удаления товара' });
    if (this.changes === 0) return res.status(404).json({ message: 'Товар не найден' });
    res.json({ message: 'Товар удален' });
  });
});

// Админ: обновить проект
app.put('/api/admin/projects/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' });

  const { id } = req.params;
  const { name, description, image_url } = req.body;

  db.run(
    'UPDATE projects SET name = ?, description = ?, image_url = ? WHERE id = ?',
    [name, description, image_url, id],
    function (err) {
      if (err) return res.status(500).json({ message: 'Ошибка при обновлении проекта' });
      if (this.changes === 0) return res.status(404).json({ message: 'Проект не найден' });
      res.json({ message: 'Проект обновлен' });
    }
  );
});

// Админ: удалить проект
app.delete('/api/admin/projects/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' });

  const { id } = req.params;

  db.run('DELETE FROM projects WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ message: 'Ошибка при удалении проекта' });
    if (this.changes === 0) return res.status(404).json({ message: 'Проект не найден' });
    res.json({ message: 'Проект удален' });
  });
});




// Получить товары по категории
app.get("/api/products/category/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;

  const sql = `
    SELECT p.*
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = ?
  `;

  db.all(sql, [categoryName], (err, rows) => {
    if (err) {
      console.error("Ошибка при запросе продуктов по категории:", err);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
    res.json(rows);
  });
});




// Обработка закрытия приложения
// ✅ Роуты объявляются здесь, вне process.on
// POST — создать новую запись
app.post('/api/main-offers/:key', (req, res) => {
  const { key } = req.params;
  const { text } = req.body;
  db.run('INSERT INTO main_offer (id, text) VALUES (?, ?)', [key, text], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: key, text });
  });
});

// PUT — обновить по ключу
app.put('/api/main-offers/:key', (req, res) => {
  const { key } = req.params;
  const { text } = req.body;
  db.run('UPDATE main_offer SET text = ? WHERE id = ?', [text, key], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ id: key, text });
  });
});

// DELETE — удалить по ключу
app.delete('/api/main-offers/:key', (req, res) => {
  const { key } = req.params;
  db.run('DELETE FROM main_offer WHERE id = ?', [key], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  });
});
 

app.get('/api/main-offers/:key', (req, res) => {
  const { key } = req.params;
  db.get('SELECT * FROM main_offer WHERE id = ?', [key], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});



app.get('/api/main-offers', (req, res) => {
  db.all('SELECT id, text FROM main_offer', (err, rows) => {
    if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
    res.json(rows);
  });
  
});



//для подписок
app.post('/api/subscribe', (req, res) => {
  console.log('Получен запрос на /api/subscribe с телом:', req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email обязателен' });
  }

  const stmt = db.prepare('INSERT INTO subscribers (email) VALUES (?)');
  stmt.run(email, function(err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(409).json({ error: 'Этот email уже подписан' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, email });
  });
});

app.get('/api/subscribers', (req, res) => {
  db.all('SELECT id, email FROM subscribers', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(rows);
  });
});

app.delete('/api/subscribers/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM subscribers WHERE id = ?');
  stmt.run(id, function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка при удалении' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Подписчик не найден' });
    }
    res.json({ message: 'Подписчик удалён' });
  });
});


//для формы обратной связи в контактах 
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Ошибка сервера' });
    res.json(rows);
  });
});

// Удалить сообщение по id
app.delete('/api/messages/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM messages WHERE id = ?', id, function(err) {
    if (err) return res.status(500).json({ error: 'Ошибка сервера' });
    if (this.changes === 0) return res.status(404).json({ error: 'Сообщение не найдено' });
    res.json({ message: 'Сообщение удалено' });
  });
});

// server.js или app.js

app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Имя, email и сообщение обязательны' });
  }

  const stmt = db.prepare(
    'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)'
  );

  stmt.run(name, email, subject || '', message, function(err) {
    if (err) {
      console.error('Ошибка при сохранении сообщения:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json({ id: this.lastID, name, email, subject, message });
  });
});



// ✅ Обработка закрытия БД — отдельно
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('База данных закрыта.');
    process.exit(0);
  });
});


const PORT = 3001;


const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Порт ${PORT} уже используется. Возможно, сервер уже запущен или не был корректно завершён.`);
    process.exit(1); // Завершить процесс, чтобы не зависал
  } else {
    console.error('Ошибка сервера:', err);
  }
});
