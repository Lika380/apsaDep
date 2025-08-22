import React, { useState, useEffect, useRef } from "react";
import { ProductList } from "../components/ProductList";
import { useSearch } from "../components/SearchContext";
import {
  productData,
  categoryMapping,
} from "../components/product/productData";
import "../styles/homePage.css";


const productDataWithId = productData.map((category) => ({
  ...category,
  id: categoryMapping[category.title]?.toString() || "all",
}));


export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);
  const { searchQuery, isSearchActive, clearSearch } = useSearch();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryTitle) ? [] : [categoryTitle]
    );
  };

  const handleSubcategorySelect = (categoryTitle: string, subCategoryId: number) => {
    const category_id = categoryMapping[categoryTitle];
    setSelectedCategory(category_id?.toString() || "all");
    setSelectedSubcategory(subCategoryId);
    setIsSidebarOpen(false);
  };

  const getDisplayTitle = (): string => {
    if (isSearchActive) return `Результаты поиска: "${searchQuery}"`;
    if (selectedCategory === "all") return "Все товары";
    if (selectedSubcategory) return selectedSubcategory.toString();

    const categoryName = Object.entries(categoryMapping).find(
      ([, id]) => id.toString() === selectedCategory
    )?.[0];

    return categoryName || "Товары";
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="homePage">
      <div className="catalog-container">
        <div className="mobile-sidebar-toggle">
          <button
            aria-label="Открыть каталог"
            className={`burger-btn ${isSidebarOpen ? "open" : ""}`}
            onClick={() => setIsSidebarOpen((o) => !o)}
          >
           Каталог 
          </button>
          <div className="catalog-line"></div>
        </div>

        {!isSearchActive && (
          <aside
            className={`catalog-sidebar ${isSidebarOpen ? "visible" : ""}`}
            ref={sidebarRef}
          >
            <div className="sidebar-header">
              <h2>Каталог товаров</h2>
            </div>

            <div className="categories-list">
              {productDataWithId.map((category) => (
                <div key={category.title} className="category-section">
                  <div
                    className={`category-header ${
                      expandedCategories.includes(category.title) ? "expanded" : ""
                    }`}
                    onClick={() => toggleCategory(category.title)}
                  >
                    <span className="category-title">{category.title}</span>
                    <i className="chevron-icon">▼</i>
                  </div>

                  {expandedCategories.includes(category.title) && (
                    <div className="subcategories">
                      {category.items.map((item) => (
                        <div key={item.subCategoryId} className="subcategory">
                          <h4
                            className={`subcategory-title ${
                              selectedSubcategory?.toString() ===
                              item.subCategoryId.toString()
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handleSubcategorySelect(category.title, item.subCategoryId)
                            }
                          >
                            {item.title2}
                          </h4>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        )}

        <main className={`catalog-main ${isSearchActive ? "full-width" : ""}`}>
          <div className="catalog-header">
            <div className="catalog-title">
              <h1>Найденные товары</h1>

              <div className="catalog-subtitle">
                {isSearchActive && (
                  <button
                    onClick={clearSearch}
                    className="clear-search-btn"
                    title="Очистить поиск"
                  >
                    ✕ Очистить поиск
                  </button>
                )}

                {productsCount > 0 && (
                  <span className="products-count">
                    Найдено: {productsCount}
                  </span>
                )}
              </div>
            </div>
            <div className="filters-bar" />
          </div>

          <div className="catalog-products-container">
            <ProductList
              category_id={selectedCategory === "all" ? undefined : Number(selectedCategory)}
              subCategoryId={selectedSubcategory?.toString() ?? undefined}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory?.toString() || ""}
              searchQuery={searchQuery}
              onProductsCountChange={setProductsCount}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

