import React, { useState } from 'react';
 
const categories = ['Abrigos', 'Abrigos 2', 'Botellas', 'Carpas', 'Linternas'];
 
function FilterBar({ setFilters }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
 
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
 
  return (
<div className="sidebar">
<div className="filter-title">Filtrar por:</div>
 
      {/* Categorías */}
<div>
<button 
          className="filter-button" 
          onClick={() => setShowCategories(!showCategories)}
>
          Categorías
</button>
        {showCategories && (
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
        )}
</div>
 
      {/* Precio */}
<div>
<button 
          className="filter-button" 
          onClick={() => setShowPrice(!showPrice)}
>
          Precio
</button>
        {showPrice && (
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
        )}
</div>
</div>
  );
}
 
export default FilterBar;