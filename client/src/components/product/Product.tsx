import React, { useState } from 'react';
import { productData, categoryMapping } from './productData';
import '../../styles/product.css';
import { Link } from 'react-router-dom';

type ProductSubItem = {
  title2: string;
};

type ProductDataItem = {
  title: string;
  items: ProductSubItem[];
};

type ProductItemProps = {
  title: string;
  items: ProductSubItem[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  active: boolean;
};

type ProductMenuProps = {
  items: ProductSubItem[];
};

const Product: React.FC = () => {
  React.useEffect(() => {
    productData.forEach(cat => {
      console.log('Категория:', cat.title, 'ID из mapping:', categoryMapping[cat.title]);
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="products">
      <ul className="products-menu">
        {productData.map((menu: ProductDataItem, index: number) => (
          <ProductItem
            key={index}
            title={menu.title}
            items={menu.items}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            active={activeIndex === index}
          />
        ))}
      </ul>
    </div>
  );
};

const ProductItem: React.FC<ProductItemProps> = ({
  title,
  items,
  onMouseEnter,
  onMouseLeave,
  active,
}) => {
  return (
    <li className="product-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <a href="#" className="product-item1">{title}</a>
      {active && (
        <div className="nested-wrapper">
          <ProductMenu items={items} />
        </div>
      )}
    </li>
  );
};

const ProductMenu: React.FC<ProductMenuProps> = ({ items }) => {
  return (
    <div className="catalog-list">
      <ul className="nested-product-content">
        {items.map((item, index) => (
          <li key={index} className="nested-item">
              <Link to={`/products?subCategoryId=${encodeURIComponent(item.title2)}`}>
              {item.title2}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
