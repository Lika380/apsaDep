const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Инициализация базы данных
const db = new sqlite3.Database('./database.db');

// Создание таблиц
db.serialize(() => {
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

  // Таблица избранного
  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  )`);

  // Создание администратора по умолчанию
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin', ?, 'admin')`, [adminPassword]);  // Заполнение расширенных категорий
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
    (16, 'Дача, сад и огород'),
    (17, 'Товары для детей'),
    (18, 'Одежда и обувь'),
    (19, 'Канцелярия'),
    (20, 'Книги'),
    (21, 'Музыкальные инструменты'),
    (22, 'Ювелирные изделия'),
    (23, 'Путешествия и туризм'),
    (24, 'Зоотовары'),
    (25, 'Продукты питания')`);

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
    (112, 'Цифровые приставки', 1),
    (113, 'Антенны', 1),
    (114, 'Кронштейны для ТВ', 1),
    (115, 'Медиаплееры', 1),
    
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
    (216, 'Samsung Watch', 214),
    (217, 'Xiaomi Band', 214),
    (218, 'Фитнес-браслеты', 214),
    (219, 'Наушники и гарнитуры', 2),
    (220, 'AirPods', 219),
    (221, 'Беспроводные наушники', 219),
    (222, 'Игровые гарнитуры', 219),
    (223, 'Аксессуары для телефонов', 2),
    (224, 'Чехлы', 223),
    (225, 'Защитные стекла', 223),
    (226, 'Зарядные устройства', 223),
    (227, 'Power Bank', 223),
    (228, 'Кабели', 223),
    
    -- Ноутбуки и компьютеры
    (301, 'Ноутбуки', 3),
    (302, 'Ультрабуки', 301),
    (303, 'Игровые ноутбуки', 301),
    (304, 'Офисные ноутбуки', 301),
    (305, 'MacBook', 301),
    (306, 'Трансформеры 2-в-1', 301),
    (307, 'Настольные компьютеры', 3),
    (308, 'Игровые ПК', 307),
    (309, 'Офисные ПК', 307),
    (310, 'Моноблоки', 307),
    (311, 'Mac', 307),
    (312, 'Мониторы', 3),
    (313, 'Игровые мониторы', 312),
    (314, '4K мониторы', 312),
    (315, 'Ультраширокие мониторы', 312),
    (316, 'Комплектующие', 3),
    (317, 'Процессоры', 316),
    (318, 'Видеокарты', 316),
    (319, 'Оперативная память', 316),
    (320, 'SSD диски', 316),
    (321, 'Материнские платы', 316),
    (322, 'Периферия', 3),
    (323, 'Клавиатуры', 322),
    (324, 'Мыши', 322),
    (325, 'Коврики для мыши', 322),
    (326, 'Веб-камеры', 322),
    (327, 'Принтеры и МФУ', 3),
    (328, 'Лазерные принтеры', 327),
    (329, 'Струйные принтеры', 327),
    (330, '3D принтеры', 327),
    
    -- Аудиотехника
    (401, 'Наушники', 4),
    (402, 'Полноразмерные наушники', 401),
    (403, 'Внутриканальные наушники', 401),
    (404, 'Беспроводные наушники', 401),
    (405, 'Игровые гарнитуры', 401),
    (406, 'Студийные наушники', 401),
    (407, 'Колонки и акустика', 4),
    (408, 'Портативные колонки', 407),
    (409, 'Умные колонки', 407),
    (410, 'Домашние кинотеатры', 407),
    (411, 'Саундбары', 407),
    (412, 'Студийные мониторы', 407),
    (413, 'Музыкальное оборудование', 4),
    (414, 'DJ оборудование', 413),
    (415, 'Микрофоны', 413),
    (416, 'Аудиоинтерфейсы', 413),
    (417, 'Виниловые проигрыватели', 4),
    (418, 'Радиоприемники', 4),
    
    -- Техника для кухни
    (501, 'Крупная бытовая техника', 5),
    (502, 'Холодильники', 501),
    (503, 'Двухкамерные холодильники', 502),
    (504, 'Side-by-Side', 502),
    (505, 'Морозильные камеры', 502),
    (506, 'Винные шкафы', 502),
    (507, 'Стиральные машины', 501),
    (508, 'Фронтальные стиральные машины', 507),
    (509, 'Вертикальные стиральные машины', 507),
    (510, 'Стирально-сушильные машины', 507),
    (511, 'Посудомоечные машины', 501),
    (512, 'Полноразмерные посудомойки', 511),
    (513, 'Компактные посудомойки', 511),
    (514, 'Плиты и варочные панели', 501),
    (515, 'Газовые плиты', 514),
    (516, 'Электрические плиты', 514),
    (517, 'Индукционные панели', 514),
    (518, 'Духовые шкафы', 514),
    (519, 'Мелкая техника для кухни', 5),
    (520, 'Микроволновые печи', 519),
    (521, 'Мультиварки', 519),
    (522, 'Блендеры', 519),
    (523, 'Кофемашины', 519),
    (524, 'Тостеры', 519),
    (525, 'Чайники', 519),
    (526, 'Миксеры', 519),
    (527, 'Мясорубки', 519),
    (528, 'Соковыжималки', 519),
    
    -- Техника для дома
    (601, 'Климатическая техника', 6),
    (602, 'Кондиционеры', 601),
    (603, 'Сплит-системы', 602),
    (604, 'Мобильные кондиционеры', 602),
    (605, 'Обогреватели', 601),
    (606, 'Конвекторы', 605),
    (607, 'Масляные радиаторы', 605),
    (608, 'Тепловентиляторы', 605),
    (609, 'Увлажнители воздуха', 601),
    (610, 'Осушители воздуха', 601),
    (611, 'Очистители воздуха', 601),
    (612, 'Уборочная техника', 6),
    (613, 'Пылесосы', 612),
    (614, 'Вертикальные пылесосы', 613),
    (615, 'Роботы-пылесосы', 613),
    (616, 'Моющие пылесосы', 613),
    (617, 'Пароочистители', 612),
    (618, 'Техника для глажки', 6),
    (619, 'Утюги', 618),
    (620, 'Парогенераторы', 618),
    (621, 'Отпариватели', 618),
    
    -- Красота и здоровье
    (701, 'Техника для ухода за волосами', 7),
    (702, 'Фены', 701),
    (703, 'Плойки', 701),
    (704, 'Выпрямители для волос', 701),
    (705, 'Фен-щетки', 701),
    (706, 'Машинки для стрижки', 701),
    (707, 'Техника для бритья', 7),
    (708, 'Электробритвы', 707),
    (709, 'Триммеры', 707),
    (710, 'Эпиляторы', 707),
    (711, 'Техника для здоровья', 7),
    (712, 'Массажеры', 711),
    (713, 'Тонометры', 711),
    (714, 'Ингаляторы', 711),
    (715, 'Весы', 711),
    (716, 'Термометры', 711),
    
    -- Умный дом
    (801, 'Системы безопасности', 8),
    (802, 'IP камеры', 801),
    (803, 'Видеодомофоны', 801),
    (804, 'Датчики движения', 801),
    (805, 'Сигнализации', 801),
    (806, 'Умное освещение', 8),
    (807, 'Умные лампочки', 806),
    (808, 'Умные выключатели', 806),
    (809, 'Умные розетки', 8),
    (810, 'Климат-контроль', 8),
    (811, 'Умные термостаты', 810),
    (812, 'Датчики температуры', 810),
    (813, 'Центры управления', 8),
    (814, 'Умные колонки', 813),
    (815, 'Хабы', 813),
    
    -- Посуда
    (901, 'Кухонная посуда', 9),
    (902, 'Кастрюли и сковороды', 901),
    (903, 'Наборы посуды', 901),
    (904, 'Ножи', 901),
    (905, 'Кухонные принадлежности', 901),
    (906, 'Столовая посуда', 9),
    (907, 'Тарелки', 906),
    (908, 'Чашки и кружки', 906),
    (909, 'Столовые приборы', 906),
    (910, 'Стеклянная посуда', 9),
    (911, 'Бокалы', 910),
    (912, 'Графины', 910),
    
    -- Игры и софт
    (1001, 'Видеоигры', 10),
    (1002, 'PlayStation', 1001),
    (1003, 'Xbox', 1001),
    (1004, 'Nintendo Switch', 1001),
    (1005, 'PC игры', 1001),
    (1006, 'Игровые аксессуары', 10),
    (1007, 'Геймпады', 1006),
    (1008, 'Игровые кресла', 1006),
    (1009, 'Гарнитуры', 1006),
    (1010, 'Программное обеспечение', 10),
    (1011, 'Windows', 1010),
    (1012, 'Office', 1010),
    (1013, 'Антивирусы', 1010),
    
    -- Хобби и развлечения
    (1101, 'Настольные игры', 11),
    (1102, 'Пазлы', 11),
    (1103, 'Конструкторы', 11),
    (1104, 'Коллекционирование', 11),
    (1105, 'Творчество', 11),
    (1106, 'Рукоделие', 1105),
    (1107, 'Рисование', 1105),
    (1108, 'Лепка', 1105),
    
    -- Спортивные товары
    (1201, 'Фитнес', 12),
    (1202, 'Тренажеры', 1201),
    (1203, 'Гантели', 1201),
    (1204, 'Коврики для йоги', 1201),
    (1205, 'Велосипеды', 12),
    (1206, 'Горные велосипеды', 1205),
    (1207, 'Шоссейные велосипеды', 1205),
    (1208, 'Детские велосипеды', 1205),
    (1209, 'Самокаты', 12),
    (1210, 'Роликовые коньки', 12),
    (1211, 'Лыжи и сноуборды', 12),
    (1212, 'Бассейны', 12),
    
    -- Фото и видео
    (1301, 'Фотоаппараты', 13),
    (1302, 'Зеркальные фотоаппараты', 1301),
    (1303, 'Беззеркальные камеры', 1301),
    (1304, 'Компактные камеры', 1301),
    (1305, 'Мгновенные камеры', 1301),
    (1306, 'Объективы', 13),
    (1307, 'Вспышки', 13),
    (1308, 'Штативы', 13),
    (1309, 'Видеокамеры', 13),
    (1310, 'Экшн-камеры', 13),
    (1311, 'Дроны', 13),
    
    -- Автоэлектроника
    (1401, 'Автомагнитолы', 14),
    (1402, 'Навигаторы', 14),
    (1403, 'Видеорегистраторы', 14),
    (1404, 'Радар-детекторы', 14),
    (1405, 'Автосигнализации', 14),
    (1406, 'Акустика для авто', 14),
    (1407, 'Зарядные устройства', 14),
    (1408, 'Держатели для телефонов', 14),
    
    -- Строительство и ремонт
    (1501, 'Электроинструменты', 15),
    (1502, 'Дрели', 1501),
    (1503, 'Перфораторы', 1501),
    (1504, 'Шуруповерты', 1501),
    (1505, 'Пилы', 1501),
    (1506, 'Ручные инструменты', 15),
    (1507, 'Отвертки', 1506),
    (1508, 'Молотки', 1506),
    (1509, 'Ключи', 1506),
    (1510, 'Строительные материалы', 15),
    (1511, 'Крепеж', 1510),
    (1512, 'Клеи и герметики', 1510),
    
    -- Дача, сад и огород
    (1601, 'Садовая техника', 16),
    (1602, 'Газонокосилки', 1601),
    (1603, 'Триммеры', 1601),
    (1604, 'Культиваторы', 1601),
    (1605, 'Садовый инвентарь', 16),
    (1606, 'Лопаты', 1605),
    (1607, 'Грабли', 1605),
    (1608, 'Секаторы', 1605),
    (1609, 'Поливочное оборудование', 16),
    (1610, 'Шланги', 1609),
    (1611, 'Разбрызгиватели', 1609),
    
    -- Товары для детей
    (1701, 'Игрушки', 17),
    (1702, 'Развивающие игрушки', 1701),
    (1703, 'Куклы', 1701),
    (1704, 'Машинки', 1701),
    (1705, 'Конструкторы', 1701),
    (1706, 'Детская техника', 17),
    (1707, 'Детские планшеты', 1706),
    (1708, 'Детские часы', 1706),
    (1709, 'Радиоуправляемые игрушки', 1706),
    (1710, 'Товары для новорожденных', 17),
    (1711, 'Коляски', 1710),
    (1712, 'Автокресла', 1710),
    (1713, 'Мониторы дыхания', 1710),
    
    -- Одежда и обувь
    (1801, 'Мужская одежда', 18),
    (1802, 'Рубашки', 1801),
    (1803, 'Брюки', 1801),
    (1804, 'Куртки', 1801),
    (1805, 'Женская одежда', 18),
    (1806, 'Платья', 1805),
    (1807, 'Блузки', 1805),
    (1808, 'Юбки', 1805),
    (1809, 'Обувь', 18),
    (1810, 'Кроссовки', 1809),
    (1811, 'Туфли', 1809),
    (1812, 'Сапоги', 1809),
    
    -- Канцелярия
    (1901, 'Письменные принадлежности', 19),
    (1902, 'Ручки', 1901),
    (1903, 'Карандаши', 1901),
    (1904, 'Маркеры', 1901),
    (1905, 'Бумага', 19),
    (1906, 'Тетради', 19),
    (1907, 'Папки', 19),
    (1908, 'Органайзеры', 19),
    
    -- Книги
    (2001, 'Художественная литература', 20),
    (2002, 'Романы', 2001),
    (2003, 'Детективы', 2001),
    (2004, 'Фантастика', 2001),
    (2005, 'Учебная литература', 20),
    (2006, 'Справочники', 20),
    (2007, 'Детские книги', 20),
    
    -- Музыкальные инструменты
    (2101, 'Струнные инструменты', 21),
    (2102, 'Гитары', 2101),
    (2103, 'Скрипки', 2101),
    (2104, 'Клавишные инструменты', 21),
    (2105, 'Пианино', 2104),
    (2106, 'Синтезаторы', 2104),
    (2107, 'Духовые инструменты', 21),
    (2108, 'Ударные инструменты', 21),
    
    -- Ювелирные изделия
    (2201, 'Кольца', 22),
    (2202, 'Серьги', 22),
    (2203, 'Цепочки', 22),
    (2204, 'Браслеты', 22),
    (2205, 'Часы', 22),
    (2206, 'Мужские часы', 2205),
    (2207, 'Женские часы', 2205),
    
    -- Путешествия и туризм
    (2301, 'Чемоданы и сумки', 23),
    (2302, 'Чемоданы', 2301),
    (2303, 'Рюкзаки', 2301),
    (2304, 'Дорожные сумки', 2301),
    (2305, 'Туристическое снаряжение', 23),
    (2306, 'Палатки', 2305),
    (2307, 'Спальные мешки', 2305),
    (2308, 'Термосы', 2305),
    
    -- Зоотовары
    (2401, 'Товары для собак', 24),
    (2402, 'Корм для собак', 2401),
    (2403, 'Игрушки для собак', 2401),
    (2404, 'Товары для кошек', 24),
    (2405, 'Корм для кошек', 2404),
    (2406, 'Лотки', 2404),
    (2407, 'Аквариумы', 24),
    (2408, 'Террариумы', 24),
    
    -- Продукты питания
    (2501, 'Бакалея', 25),
    (2502, 'Крупы', 2501),
    (2503, 'Макароны', 2501),
    (2504, 'Консервы', 2501),
    (2505, 'Напитки', 25),
    (2506, 'Соки', 2505),
    (2507, 'Вода', 2505),
    (2508, 'Чай и кофе', 25),
    (2509, 'Сладости', 25),
    (2510, 'Шоколад', 2509),
    (2511, 'Печенье', 2509)
`);
  // Обновленные тестовые товары с правильными категориями
  const testProducts = [
    // Телевизоры
    { id: uuidv4(), name: 'Телевизор Samsung 55" 4K UHD', price: 65999, category_id: 109, stock_quantity: 5, description: 'Smart TV с поддержкой 4K HDR' },
    { id: uuidv4(), name: 'Телевизор LG OLED 65"', price: 129999, category_id: 110, stock_quantity: 3, description: 'OLED телевизор премиум класса' },
    { id: uuidv4(), name: 'Телевизор TCL 43" Smart TV', price: 29999, category_id: 108, stock_quantity: 8, description: 'Доступный Smart TV' },
    { id: uuidv4(), name: 'Телевизор Sony 75" QLED', price: 189999, category_id: 111, stock_quantity: 2, description: 'Премиум QLED телевизор' },
    
    // Смартфоны
    { id: uuidv4(), name: 'iPhone 15 Pro 256GB', price: 119999, category_id: 202, stock_quantity: 10, description: 'Последняя модель iPhone' },
    { id: uuidv4(), name: 'iPhone 14 128GB', price: 79999, category_id: 202, stock_quantity: 15, description: 'iPhone предыдущего поколения' },
    { id: uuidv4(), name: 'Samsung Galaxy S24 Ultra', price: 99999, category_id: 203, stock_quantity: 7, description: 'Флагманский Android смартфон' },
    { id: uuidv4(), name: 'Samsung Galaxy A54', price: 35999, category_id: 203, stock_quantity: 12, description: 'Среднебюджетный Samsung' },
    { id: uuidv4(), name: 'Xiaomi 14 Pro', price: 69999, category_id: 204, stock_quantity: 8, description: 'Флагман от Xiaomi' },
    { id: uuidv4(), name: 'Honor 90 Lite', price: 24999, category_id: 206, stock_quantity: 20, description: 'Доступный смартфон Honor' },
    
    // Планшеты  
    { id: uuidv4(), name: 'iPad Air 11" M2', price: 79999, category_id: 211, stock_quantity: 6, description: 'Планшет Apple с чипом M2' },
    { id: uuidv4(), name: 'iPad Pro 12.9" M2', price: 129999, category_id: 211, stock_quantity: 4, description: 'Профессиональный iPad' },
    { id: uuidv4(), name: 'Samsung Galaxy Tab S9', price: 59999, category_id: 212, stock_quantity: 8, description: 'Android планшет Samsung' },
    
    // Умные часы
    { id: uuidv4(), name: 'Apple Watch Series 9 45mm', price: 42999, category_id: 215, stock_quantity: 15, description: 'Умные часы от Apple' },
    { id: uuidv4(), name: 'Apple Watch SE 40mm', price: 29999, category_id: 215, stock_quantity: 20, description: 'Доступные умные часы Apple' },
    { id: uuidv4(), name: 'Samsung Galaxy Watch 6', price: 24999, category_id: 216, stock_quantity: 12, description: 'Android умные часы' },
    { id: uuidv4(), name: 'Xiaomi Mi Band 8', price: 3999, category_id: 217, stock_quantity: 50, description: 'Фитнес-браслет Xiaomi' },
    
    // Наушники
    { id: uuidv4(), name: 'AirPods Pro 2', price: 24999, category_id: 220, stock_quantity: 25, description: 'Беспроводные наушники с шумоподавлением' },
    { id: uuidv4(), name: 'Sony WH-1000XM5', price: 29999, category_id: 404, stock_quantity: 8, description: 'Премиум наушники с шумоподавлением' },
    { id: uuidv4(), name: 'JBL Tune 770NC', price: 8999, category_id: 404, stock_quantity: 15, description: 'Беспроводные наушники JBL' },
    { id: uuidv4(), name: 'HyperX Cloud III', price: 12999, category_id: 405, stock_quantity: 10, description: 'Игровая гарнитура' },
    
    // Ноутбуки
    { id: uuidv4(), name: 'MacBook Air M2 13"', price: 129999, category_id: 305, stock_quantity: 6, description: 'Ультрабук от Apple' },
    { id: uuidv4(), name: 'MacBook Pro 14" M3', price: 199999, category_id: 305, stock_quantity: 3, description: 'Профессиональный MacBook' },
    { id: uuidv4(), name: 'ASUS ROG Strix G15', price: 89999, category_id: 303, stock_quantity: 4, description: 'Игровой ноутбук ASUS' },
    { id: uuidv4(), name: 'Lenovo ThinkPad E15', price: 55999, category_id: 304, stock_quantity: 8, description: 'Офисный ноутбук Lenovo' },
    { id: uuidv4(), name: 'Dell XPS 13', price: 109999, category_id: 302, stock_quantity: 5, description: 'Премиум ультрабук Dell' },
    
    // Мониторы
    { id: uuidv4(), name: 'Dell UltraSharp 27" 4K', price: 35999, category_id: 314, stock_quantity: 12, description: 'Профессиональный 4K монитор' },
    { id: uuidv4(), name: 'ASUS ROG Swift 27" 144Hz', price: 45999, category_id: 313, stock_quantity: 6, description: 'Игровой монитор с высокой частотой' },
    { id: uuidv4(), name: 'LG UltraWide 34"', price: 52999, category_id: 315, stock_quantity: 4, description: 'Ультраширокий монитор' },
    
    // Техника для кухни
    { id: uuidv4(), name: 'Холодильник Samsung Side-by-Side 617л', price: 89999, category_id: 504, stock_quantity: 3, description: 'Большой холодильник с инвертором' },
    { id: uuidv4(), name: 'Холодильник LG двухкамерный 384л', price: 55999, category_id: 503, stock_quantity: 5, description: 'Двухкамерный холодильник' },
    { id: uuidv4(), name: 'Стиральная машина Bosch 8кг', price: 65999, category_id: 508, stock_quantity: 4, description: 'Фронтальная стиральная машина' },
    { id: uuidv4(), name: 'Посудомоечная машина Electrolux', price: 39999, category_id: 512, stock_quantity: 6, description: 'Полноразмерная посудомойка' },
    { id: uuidv4(), name: 'Микроволновая печь Panasonic 25л', price: 12999, category_id: 520, stock_quantity: 18, description: 'Микроволновка с грилем' },
    { id: uuidv4(), name: 'Мультиварка Redmond 5л', price: 6999, category_id: 521, stock_quantity: 25, description: 'Мультиварка с множеством программ' },
    { id: uuidv4(), name: 'Кофемашина DeLonghi', price: 45999, category_id: 523, stock_quantity: 8, description: 'Автоматическая кофемашина' },
    
    // Техника для дома  
    { id: uuidv4(), name: 'Пылесос Dyson V15 Detect', price: 54999, category_id: 614, stock_quantity: 6, description: 'Беспроводной пылесос премиум класса' },
    { id: uuidv4(), name: 'Пылесос-робот Xiaomi', price: 24999, category_id: 615, stock_quantity: 10, description: 'Умный робот-пылесос' },
    { id: uuidv4(), name: 'Кондиционер Samsung 2.5кВт', price: 42999, category_id: 603, stock_quantity: 5, description: 'Сплит-система инверторная' },
    { id: uuidv4(), name: 'Увлажнитель воздуха Philips', price: 8999, category_id: 609, stock_quantity: 15, description: 'Ультразвуковой увлажнитель' },
    
    // Красота и здоровье
    { id: uuidv4(), name: 'Фен Dyson Supersonic', price: 39999, category_id: 702, stock_quantity: 8, description: 'Профессиональный фен' },
    { id: uuidv4(), name: 'Электробритва Philips', price: 12999, category_id: 708, stock_quantity: 12, description: 'Роторная электробритва' },
    { id: uuidv4(), name: 'Массажер для шеи Xiaomi', price: 4999, category_id: 712, stock_quantity: 20, description: 'Массажер с подогревом' },
    
    // Умный дом
    { id: uuidv4(), name: 'Умная колонка Яндекс Станция Макс', price: 15999, category_id: 814, stock_quantity: 12, description: 'Голосовой помощник Алиса' },
    { id: uuidv4(), name: 'Умная лампа Philips Hue E27', price: 3999, category_id: 807, stock_quantity: 30, description: 'RGB лампа с управлением через приложение' },
    { id: uuidv4(), name: 'IP камера Xiaomi 360°', price: 2999, category_id: 802, stock_quantity: 25, description: 'Поворотная камера видеонаблюдения' },
    { id: uuidv4(), name: 'Умная розетка TP-Link', price: 1299, category_id: 809, stock_quantity: 50, description: 'Wi-Fi розетка с таймером' },
    
    // Игры и софт
    { id: uuidv4(), name: 'PlayStation 5', price: 59999, category_id: 1002, stock_quantity: 3, description: 'Игровая консоль Sony' },
    { id: uuidv4(), name: 'Xbox Series X', price: 54999, category_id: 1003, stock_quantity: 4, description: 'Игровая консоль Microsoft' },
    { id: uuidv4(), name: 'Nintendo Switch OLED', price: 34999, category_id: 1004, stock_quantity: 8, description: 'Портативная игровая консоль' },
    { id: uuidv4(), name: 'Геймпад Xbox Wireless', price: 5999, category_id: 1007, stock_quantity: 15, description: 'Беспроводной контроллер' },
    
    // Фото и видео
    { id: uuidv4(), name: 'Canon EOS R6 Mark II', price: 189999, category_id: 1303, stock_quantity: 2, description: 'Беззеркальная камера Canon' },
    { id: uuidv4(), name: 'GoPro Hero 12 Black', price: 42999, category_id: 1310, stock_quantity: 6, description: 'Экшн-камера 4K' },
    { id: uuidv4(), name: 'DJI Mini 4 Pro', price: 89999, category_id: 1311, stock_quantity: 4, description: 'Компактный дрон с 4K камерой' },
    
    // Спорт
    { id: uuidv4(), name: 'Беговая дорожка Oxygen', price: 89999, category_id: 1202, stock_quantity: 2, description: 'Электрическая беговая дорожка' },
    { id: uuidv4(), name: 'Велотренажер DFC', price: 24999, category_id: 1202, stock_quantity: 5, description: 'Магнитный велотренажер' },
    { id: uuidv4(), name: 'Гантели разборные 20кг', price: 8999, category_id: 1203, stock_quantity: 10, description: 'Набор разборных гантелей' },
    
    // Автоэлектроника
    { id: uuidv4(), name: 'Видеорегистратор 70mai A800', price: 12999, category_id: 1403, stock_quantity: 15, description: '4K видеорегистратор' },
    { id: uuidv4(), name: 'Автомагнитола Pioneer', price: 18999, category_id: 1401, stock_quantity: 8, description: 'Мультимедиа система 2DIN' },
    
    // Детские товары
    { id: uuidv4(), name: 'Детский планшет Digma', price: 8999, category_id: 1707, stock_quantity: 12, description: 'Обучающий планшет для детей' },
    { id: uuidv4(), name: 'Умные часы для детей', price: 3999, category_id: 1708, stock_quantity: 20, description: 'GPS часы с видеозвонком' },
    
    // Аудиотехника
    { id: uuidv4(), name: 'Колонка JBL Charge 5', price: 8999, category_id: 408, stock_quantity: 25, description: 'Портативная Bluetooth колонка' },
    { id: uuidv4(), name: 'Домашний кинотеатр Samsung', price: 35999, category_id: 410, stock_quantity: 4, description: 'Система 5.1 с сабвуфером' },
    { id: uuidv4(), name: 'Саундбар LG с Dolby Atmos', price: 22999, category_id: 411, stock_quantity: 6, description: 'Саундбар с объемным звуком' }
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
  const { category_id, search } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (category_id) {
    query += ' AND category_id = ?';
    params.push(category_id);
  }

  if (search) {
    query += ' AND name LIKE ?';
    params.push(`%${search}%`);
  }

  db.all(query, params, (err, products) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка получения товаров' });
    }
    res.json(products);
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка получения товара' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(product);
  });
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

// Маршруты избранного
app.get('/api/favorites', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  db.all(`SELECT f.*, p.name, p.price, p.image_url 
          FROM favorites f 
          JOIN products p ON f.product_id = p.id 
          WHERE f.user_id = ?`, [userId], (err, items) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка получения избранного' });
    }
    res.json(items);
  });
});

app.post('/api/favorites', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.body;

  // Проверка существования товара
  db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка базы данных' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    db.run('INSERT OR IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)',
      [userId, product_id], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Ошибка добавления в избранное' });
        }
        res.status(201).json({ message: 'Товар добавлен в избранное' });
      });
  });
});

app.delete('/api/favorites/:product_id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.params;

  db.run('DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
    [userId, product_id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Ошибка удаления из избранного' });
      }
      res.json({ message: 'Товар удален из избранного' });
    });
});

// Административные маршруты
app.get('/api/admin/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  db.all('SELECT id, username, role, created_at FROM users', (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка получения пользователей' });
    }
    res.json(users);
  });
});

app.post('/api/admin/products', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  const { name, description, price, category_id, image_url, stock_quantity } = req.body;
  const id = uuidv4();

  db.run('INSERT INTO products (id, name, description, price, category_id, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, name, description, price, category_id, image_url, stock_quantity], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка создания товара' });
      }
      res.status(201).json({ message: 'Товар создан', id });
    });
});

app.put('/api/admin/products/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  const { id } = req.params;
  const { name, description, price, category_id, image_url, stock_quantity } = req.body;

  db.run('UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?, stock_quantity = ? WHERE id = ?',
    [name, description, price, category_id, image_url, stock_quantity, id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Ошибка обновления товара' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json({ message: 'Товар обновлен' });
    });
});

app.delete('/api/admin/products/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  const { id } = req.params;

  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Ошибка удаления товара' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json({ message: 'Товар удален' });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Admin credentials: username: admin, password: admin123`);
});

// Обработка закрытия приложения
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('База данных закрыта.');
    process.exit(0);
  });
});
