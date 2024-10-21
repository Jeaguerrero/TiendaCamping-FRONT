// src/components/MarketPage.jsx
import React from 'react';
import Todo from './Todo'; // Import the Todo component
import './MarketPage.css'; // Import the CSS for this component

const products = [
    { id: 1, description: 'Product 1', price: 10.99, stock: 5, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/SiGEe8AAAAASUVORK5CYII=' },
    { id: 2, description: 'Product 2', price: 20.49, stock: 3, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/SiGEe8AAAAASUVORK5CYII=' },
    // Add more products as needed
  ];
  

const MarketPage = () => {
  const deleteTodo = (index) => {
    // Handle the deletion of the product (optional implementation)
    console.log(`Delete product at index ${index}`);
  };

  return (
    <div className="market-container">
      <h1>Productos</h1>
      <div className="products-box">
        {products.map((product, index) => (
          <Todo
            key={product.id}
            id={product.id}
            description={product.description}
            price={product.price}
            stock={product.stock}
            index={index}
            deleteTodo={deleteTodo}
            img={product.img}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketPage;
