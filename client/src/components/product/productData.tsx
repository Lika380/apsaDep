
  export const productData = [
    {
      title: "Продукты питания и напитки",
      category_id: 1,
      items: [
        { subCategoryId: 101, title2: "Молочные и кисломолочные продукты" },
        { subCategoryId: 102, title2: "Снеки, орехи, сухофрукты" },
        { subCategoryId: 103, title2: "Выпечка и сладости" },
        { subCategoryId: 104, title2: "Чай, кофе, какао" },
        { subCategoryId: 105, title2: "Мёд и продукты пчеловодства" },
        { subCategoryId: 106, title2: "Бакалея" },
        { subCategoryId: 107, title2: "Соусы, специи и приправы" },
        { subCategoryId: 108, title2: "Консервы" },
        { subCategoryId: 109, title2: "Замороженные продукты и мороженое" },
        { subCategoryId: 110, title2: "Алкогольная продукция" },
        { subCategoryId: 111, title2: "Мясо, птица и мясная продукция" },
        { subCategoryId: 112, title2: "Другое" }
      ],
    },
    {
      title: "Одежда и аксессуары",
      category_id: 2,
      items: [
        { subCategoryId: 201, title2: "Женская одежда" },
        { subCategoryId: 202, title2: "Мужская одежда" },
        { subCategoryId: 203, title2: "Детская одежда" },
        { subCategoryId: 204, title2: "Сумки" },
        { subCategoryId: 205, title2: "Украшения и бижутерия" },
        { subCategoryId: 206, title2: "Другое" },
      ],
    },
    {
      title: "Недвижимость",
      category_id: 3,
      items: [
        { subCategoryId: 301, title2: "Квартиры " },
        { subCategoryId: 302, title2: "Дома и коттеджи" },
        { subCategoryId: 303, title2: "Земельные участки" },
        { subCategoryId: 304, title2: "Аренда недвижимости" },
        { subCategoryId: 305, title2: "Другое" },
      ],
    },
    {
      title: "Красота и здоровье",
      category_id: 4,
      items: [
        { subCategoryId: 401, title2: "Натуральная косметика " },
        { subCategoryId: 402, title2: "Натуральные лекарства" },
        { subCategoryId: 402, title2: "Другое" },
      ],
    },
    {
      title: "Товары для авто / запчасти и аксессуары",
      category_id: 4,
      items: [
        { subCategoryId: 401, title2: "Наушники" },
        { subCategoryId: 402, title2: "Колонки" },
        { subCategoryId: 403, title2: "Домашний кинотеатр" },
      ],
    },
    {
      title: "Спорт и туризм",
      category_id: 5,
      items: [
        { subCategoryId: 501, title2: "Микроволновки" },
        { subCategoryId: 502, title2: "Холодильники" },
        { subCategoryId: 503, title2: "Миксеры и блендеры" },
      ],
    },
    {
      title: "Ремонт и строительство",
      category_id: 6,
      items: [
        { subCategoryId: 601, title2: "хлеб" },
        { subCategoryId: 602, title2: "сыр" },
        { subCategoryId: 603, title2: "икра" },
      ],
    },
    {
      title: "Товары для детей",
      category_id: 7,
      items: [
        { subCategoryId: 701, title2: "Игрушки" },
        { subCategoryId: 702, title2: "Товары для новорожденных" },
        { subCategoryId: 703, title2: "Детская мебель" },
      ],
    },
    {
      title: "Животные и питомцы",
      category_id: 8,
      items: [
        { subCategoryId: 801, title2: "сумки" },
        { subCategoryId: 802, title2: "обувь" },
        { subCategoryId: 803, title2: "платья" },
      ],
    },
    {
      title: "Товары для дома и хозяйства",
      category_id: 1,
      items: [
        { subCategoryId: 101, title2: "Мебель" },
        { subCategoryId: 102, title2: "Текстиль для дома" },
        { subCategoryId: 103, title2: "Декор" }
      ],
    },
    {
      title: "Хозтовары",
      category_id: 2,
      items: [
        { subCategoryId: 201, title2: "Смартфоны" },
        { subCategoryId: 202, title2: "Планшеты" },
        { subCategoryId: 203, title2: "Часы и браслеты" },
        { subCategoryId: 204, title2: "Аксессуары для телефонов" },
      ],
    },
    {
      title: "Товары для животных",
      category_id: 3,
      items: [
        { subCategoryId: 301, title2: "Уход за лицом" },
        { subCategoryId: 302, title2: "Фены и укладка" },
        { subCategoryId: 303, title2: "Маникюр" },
      ],
    },
    {
      title: "Канцелярские товары, DIY и мелкая промышленность",
      category_id: 4,
      items: [
        { subCategoryId: 401, title2: "Наушники" },
        { subCategoryId: 402, title2: "Колонки" },
        { subCategoryId: 403, title2: "Домашний кинотеатр" },
      ],
    },
    {
      title: "Другое",
      category_id: 5,
      items: [
        { subCategoryId: 501, title2: "Смотреть" }
      ],
    }
  ];


// Сопоставление названий категорий с их ID из сервера
export const categoryMapping: { [key: string]: number } = {
  "Телевизоры и цифровое ТВ": 1,
  "Смартфоны и гаджеты": 2,
  "Красота и здоровье": 3,
  "Аудиотехника": 4,
  "Техника для кухни": 5,
  "Техника для дома": 6,
  "Умный дом": 7,
  "Посуда": 8,
  "Игры и софт": 9,
  "Хобби и развлечения": 10,
  "Спортивные товары": 11,
  "Фото и видео": 12,
  "Автоэлектроника": 13,
  "Строительство и ремонт": 14,
  "Дача, сад и огород": 15,
  "Товары для детей": 16,
  "Одежда и обувь": 17,
  "Канцелярия": 18,
  "Книги": 19,
  "Музыкальные инструменты": 20,
  "Ювелирные изделия": 21,
  "Путешествия и туризм": 22,
  "Зоотовары": 23,
};



export const categoriesList = productData
  .map(cat => ({
    id: String(categoryMapping[cat.title] || ""), // приведение к строке
    name: cat.title,
    icon: "🍞",
  }))
  .filter(cat => cat.id !== "");


  let subId = 100;

  export const subCategories = productData.flatMap(main => {
    const category_id = categoryMapping[main.title];
    if (!category_id) return [];
  
    return main.items.map(item => ({
      mainCategory: main.title,
      title2: item.title2,
      category_id: category_id,      // тут ID родительской категории
      subCategoryId: subId++,      // уникальный ID подкатегории
    }));
  });
  
  
