import React, { useState } from 'react';
import "../styles/sidebar.css";

const categories = ['Abrigos', 'Botellas', 'Carpas', 'Linternas', 'Mochilas'];

function FilterBar({ setFilters }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const applyFilters = () => {
    setFilters({ categories: selectedCategories, price: selectedPrice });
  };

  return (
    <div className="sidebar">
      <div className="filter-title">Filtrar por:</div>

      {/* Categorías */}
      <div>
        <button 
          className="filter-button" 
          onClick={() => setSelectedCategories([])}
        >
          Limpiar Categorías
        </button>
        <div className="filter-group">
          {categories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                value={category}
                onChange={handleCategoryChange}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <div className="filter-group">
          <label>
            <input
              type="radio"
              name="price"
              value="asc"
              checked={selectedPrice === 'asc'}
              onChange={handlePriceChange}
            />
            Menor a Mayor
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="desc"
              checked={selectedPrice === 'desc'}
              onChange={handlePriceChange}
            />
            Mayor a Menor
          </label>
        </div>
      </div>

      {/* Botón Aplicar */}
      <button className="apply-filters-button" onClick={applyFilters}>
        Aplicar Filtros
      </button>
    </div>
  );
}

export default FilterBar;
