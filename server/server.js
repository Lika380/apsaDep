import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config(); 
const app = express();
const JWT_SECRET = 'your-secret-key-change-in-production';
app.use(cors());
app.use(express.json());
const router = express.Router();
import nodemailer from 'nodemailer';



function formatDateForSQLite(date) {
  return date.toISOString().replace('T', ' ').substring(0, 19);
}


//для почты 
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;


// Инициализация базы данных
const db = new sqlite3.Database('./new_database.db');

const categoriesData = [
  [1, 'Телевизоры и цифровое ТВ', null],
  [2, 'Смартфоны и гаджеты', null],
  [3, 'Одежда и обувь', null],
  // ...
  [101, '12-28 дюймов', 1],
  [102, '12-27 дюймов', 101],
];


// Создание таблиц
db.serialize(() => {
//для названиии категории 
db.run(`CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INTEGER DEFAULT NULL,
  FOREIGN KEY (parent_id) REFERENCES categories (id)
)`);

categoriesData.forEach(([id, name, parent_id]) => {
  db.run(
    `INSERT OR IGNORE INTO categories (id, name, parent_id) VALUES (?, ?, ?)`,
    [id, name, parent_id],
    (err) => {
      if (err) {
        console.error('Ошибка вставки категории', id, err.message);
      }
    }
  );
});

  

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
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  password TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT 0,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS email_verifications (
      user_id INTEGER,
      token TEXT,
      expires_at DATETIME,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
  


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

  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    productId TEXT,
    text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`);
  
  

  // Создание администратора по умолчанию
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (email, phone, password, role) VALUES (?, ?, ?, ?)`, ['admin@example.com', null, adminPassword, 'admin']);



  db.run(`INSERT OR IGNORE INTO categories (id, name) VALUES 
    (1, 'Телевизоры и цифровое ТВ'),
    (2, 'Смартфоны и гаджеты'),
    (3, 'Красота и здоровье'),
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
  const { email, phone, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }

  try {
    // Проверяем, есть ли пользователь с таким email
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, existingUser) => {
      if (err) return res.status(500).json({ message: 'Ошибка базы данных' });

      if (existingUser) {
        if (existingUser.is_verified) {
          return res.status(400).json({ message: 'Пользователь уже зарегистрирован и подтверждён' });
        } else {
          // Пользователь есть, но не подтверждён — удаляем старые токены и отправляем новое письмо
          db.run('DELETE FROM email_verifications WHERE user_id = ?', [existingUser.id], (err) => {
            if (err) return res.status(500).json({ message: 'Ошибка удаления старых токенов' });

            const token = uuidv4();
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();// 1 час

            db.run(
              'INSERT INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)',
              [existingUser.id, token, expiresAt],
              async (err) => {
                if (err) return res.status(500).json({ message: 'Ошибка создания токена' });

                try {
                  await sendVerificationEmail(email, token);
                  return res.status(200).json({ message: 'Письмо подтверждения отправлено повторно' });
                } catch {
                  return res.status(500).json({ message: 'Ошибка отправки письма' });
                }
              }
            );
          });
        }
      } else {
        // Новый пользователь — создаём
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
          'INSERT INTO users (email, phone, password, role, is_verified) VALUES (?, ?, ?, ?, ?)',
          [email, phone || null, hashedPassword, 'user', 0],
          function (err) {
            if (err) {
              return res.status(400).json({ message: 'Пользователь уже существует' });
            }

            const userId = this.lastID;
            const token = uuidv4();
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 час

            db.run(
              'INSERT INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)',
              [userId, token, expiresAt],
              async (err) => {
                if (err) return res.status(500).json({ message: 'Ошибка подтверждения' });

                try {
                  await sendVerificationEmail(email, token);
                  res.status(201).json({ message: 'Письмо отправлено. Подтвердите email' });
                } catch (e) {
                  res.status(500).json({ message: 'Ошибка отправки письма' });
                }
              }
            );
          }
        );
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


app.get('/api/verify-email', (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).send('Токен не указан');

  db.get('SELECT * FROM email_verifications WHERE token = ?', [token], (err, row) => {
    if (err || !row) return res.status(400).send('Неверный токен');

    const now = new Date();
    const expiresAt = new Date(row.expires_at.replace(' ', 'T')); // 👈 фикс даты

    if (expiresAt < now) {
      return res.status(400).send('Токен просрочен');
    }

    db.run('UPDATE users SET is_verified = 1 WHERE id = ?', [row.user_id]);
    db.run('DELETE FROM email_verifications WHERE user_id = ?', [row.user_id]);
    res.send('Email подтвержден. Теперь вы можете войти.');
  });
});






const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // smtp.gmail.com
  port: parseInt(process.env.SMTP_PORT), // 587
  secure: false,                      // обязательно для 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});


function sendVerificationEmail(email, token) {
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;
  const url = `${baseUrl}/api/verify-email?token=${token}`;

  console.log(`📧 Попытка отправки письма на ${email} со ссылкой: ${url}`);

  return transporter.sendMail({
    from: `"Магазин" <${smtpUser}>`,
    to: email,
    subject: 'Подтвердите вашу почту',
    html: `<p>Нажмите на ссылку для подтверждения:</p><a href="${url}">${url}</a>`
  }, (err, info) => {
    if (err) {
      console.error("Ошибка при отправке письма:", err);
    } else {
      console.log("Письмо успешно отправлено:", info.response);
    }
  });
}



transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP не работает:", error);
  } else {
    console.log("✅ SMTP готов к отправке писем");
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Ошибка при поиске пользователя' });

    if (!user) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    // 🛑 Если не подтверждён — отправить новое письмо
    if (!user.is_verified && user.role !== 'admin') {
      const token = uuidv4();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

      // Удалить старые токены
      db.run('DELETE FROM email_verifications WHERE user_id = ?', [user.id], (err) => {
        if (err) return res.status(500).json({ message: 'Ошибка очистки старых токенов' });

        // Вставить новый токен
        db.run(
          'INSERT INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)',
          [user.id, token, expiresAt],
          async (err) => {
            if (err) return res.status(500).json({ message: 'Ошибка сохранения нового токена' });

            try {
              await sendVerificationEmail(email, token);
              return res.status(403).json({ message: 'Сначала подтвердите почту — письмо отправлено повторно' });
            } catch {
              return res.status(500).json({ message: 'Не удалось отправить письмо' });
            }
          }
        );
      });

      return; // Важно: остановить выполнение здесь
    }

    // ✅ Всё хорошо — возвращаем JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      email: user.email,
      role: user.role,
    });
  });
});



app.post('/api/reviews', authenticateToken, (req, res) => {
  const { text, productId } = req.body;
  console.log("Получен запрос на добавление отзыва:", { userId: req.user.id, text, productId });

  if (!text || !productId) {
    return res.status(400).json({ message: 'Текст отзыва и ID товара обязательны' });
  }

  const sql = 'INSERT INTO reviews (user_id, productId, text) VALUES (?, ?, ?)';
  db.run(sql, [req.user.id, productId, text], function (err) {
    if (err) {
      console.error("Ошибка вставки отзыва:", err);
      return res.status(500).json({ message: 'Ошибка сохранения отзыва' });
    }

    res.json({ message: 'Отзыв добавлен', reviewId: this.lastID });
  });
});


app.get('/api/reviews', (req, res) => {
  const { productId } = req.query;

  let sql = `
    SELECT reviews.id, reviews.text, reviews.created_at, users.email, users.phone
    FROM reviews
    LEFT JOIN users ON reviews.user_id = users.id
  `;

  const params = [];

  if (productId) {
    sql += ' WHERE reviews.productId = ?';
    params.push(productId);
  }

  sql += ' ORDER BY reviews.created_at DESC';

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка получения отзывов' });
    }
    const formatted = rows.map(row => ({
      id: row.id,
      text: row.text,
      created_at: row.created_at,
      user_id: row.user_id,
      user_identifier: row?.email || row?.phone || '',
    }));
    res.json(formatted);
  });
});


// Удаление отзыва (только для админа)
app.delete('/api/reviews/:id', authenticateToken, (req, res) => {
  const reviewId = req.params.id;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  db.run('DELETE FROM reviews WHERE id = ?', [reviewId], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Ошибка удаления отзыва' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Отзыв не найден' });
    }
    res.json({ message: 'Отзыв удален' });
  });
});


// Админ: получить всех пользователей
app.get('/api/admin/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' });

  db.all('SELECT id, email, phone, role, created_at FROM users', (err, users) => {
    if (err) return res.status(500).json({ message: 'Ошибка получения пользователей' });
    res.json(users);
  });
});



app.get('/api/products/category/:category_id', (req, res) => {
  const category_id = Number(req.params.category_id);
  const tables = ['products', 'popular', 'category1', 'category2', 'category3', 'category4', 'category5'];
  let allProducts = [];
  let index = 0;

  const fetchNext = () => {
    if (index >= tables.length) {
      return res.json(allProducts);
    }
    const table = tables[index];
    db.all(`SELECT *, '${table}' as source_table FROM ${table} WHERE category_id = ?`, [category_id], (err, rows) => {
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

app.get('/api/products/by-category/:id', (req, res) => {
  const category_id = parseInt(req.params.id);

  // Получаем все подкатегории + саму категорию
  const getSubcategories = `
    SELECT id FROM categories WHERE id = ? OR parent_id = ?
  `;

  db.all(getSubcategories, [category_id, category_id], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Ошибка получения подкатегорий' });

    const category_ids = rows.map(row => row.id);

    // Получаем все товары по этим категориям
    const placeholders = category_ids.map(() => '?').join(',');
    const getProducts = `SELECT * FROM products WHERE category_id IN (${placeholders})`;

    db.all(getProducts, category_ids, (err, products) => {
      if (err) return res.status(500).json({ message: 'Ошибка получения товаров' });

      res.json(products);
    });
  });
});

app.get('/api/subcategory/:id', (req, res) => {
  const { id } = req.params;
  db.all(`SELECT * FROM products WHERE subCategoryId = ?`, [id], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Ошибка базы данных' });
    res.json(rows);
  });
});
 

app.get('/api/products', (req, res) => {
  const { subCategoryId, category_id } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (category_id) {
    query += ' AND category_id = ?';
    params.push(category_id);
  }

  if (subCategoryId) {
    query += ' AND subCategoryId = ?';
    params.push(subCategoryId);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Ошибка базы данных:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка базы данных' });
    } else if (!row) {
      res.status(404).json({ error: 'Товар не найден' });
    } else {
      res.json(row);
    }
  });
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


app.post("/api/admin/projects", async (req, res) => {
  const { name, description, image_url } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Неверные данные" });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO projects (id, name, description, image_url) VALUES (?, ?, ?, ?)"
    );

    const id = uuidv4();

    stmt.run(id, name, description, image_url || null, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      res.status(201).json({
        message: "Проект создан",
        project: {
          id,
          name,
          description,
          image_url
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
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
  const { name, description, price, image_url, instagram, whatsapp, website, } = req.body;

  const sql = `
    UPDATE popular
    SET name = ?, description = ?, price = ?, image_url = ?, instagram = ?, whatsapp = ?, website = ?
    WHERE id = ?
  `;

  db.run(sql, [name, description, price, image_url, instagram, whatsapp, website, id], function(err) {
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




// Админ: создать продукт
// Создание продукта (POST /api/admin/products)
app.post('/api/admin/products', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' });

  console.log("Данные нового товара:", req.body); 
  
  const { name, description, price, category_id, image_url, stock_quantity, phone, instagram, whatsapp, subCategoryId } = req.body;
  const id = uuidv4();

  db.run(
    'INSERT INTO products (id, name, description, price, category_id, image_url, stock_quantity, phone, instagram, whatsapp, subCategoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, name, description, price, category_id, image_url, stock_quantity, phone, instagram, whatsapp, subCategoryId],
    (err) => {
      if (err) {
        console.error('Ошибка создания товара:', err);
        return res.status(500).json({ message: 'Ошибка создания товара' });
      }
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
    whatsapp,
    subCategoryId
  } = req.body;

  db.run(
    'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?, stock_quantity = ?, website = ?, instagram = ?, whatsapp = ?, subCategoryId = ? WHERE id = ?',
    [name, description, price, category_id, image_url, stock_quantity, website, instagram, whatsapp, subCategoryId, id],
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


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Порт ${PORT} уже используется. Возможно, сервер уже запущен или не был корректно завершён.`);
    process.exit(1); // Завершить процесс, чтобы не зависал
  } else {
    console.error('Ошибка сервера:', err);
  }
});


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'src/dist')));

// Любой другой API-роут должен быть выше этого catch-all

// SPA fallback — для всех "чужих" маршрутов отдаём index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/dist/index.html'));
});
