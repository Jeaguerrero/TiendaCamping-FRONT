import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import '../styles/editlist.css'; // Importar el archivo CSS

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({}); // Estado para las imágenes
  const navigate = useNavigate(); // Para la navegación programática

  // Obtener la lista de productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('Token no encontrado en localStorage');
          return;
        }

        const response = await fetch('http://localhost:4002/products', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setProducts(data.content); // Asumiendo que los productos están en el campo "content"
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  // Obtener imagen en base64
  const fetchImage = async (imageId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:4002/images/${imageId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data || !data.file) {
        return null;
      }

      const base64Image = data.file;
      let mimeType = 'image/jpeg';

      if (base64Image.startsWith('iVBOR')) {
        mimeType = 'image/png';
      } else if (base64Image.startsWith('/9j/4AAQSk')) {
        mimeType = 'image/jpeg';
      }

      return `data:${mimeType};base64,${base64Image}`;
    } catch (error) {
      console.error('Error al obtener imagen:', error);
      return null;
    }
  };

  // Obtener imágenes después de cargar los productos
  useEffect(() => {
    const loadImages = async () => {
      const productImages = {};

      for (const product of products) {
        const imageBase64 = await fetchImage(product.imageID);
        if (imageBase64) {
          productImages[product.id] = imageBase64;
        }
      }

      setImages(productImages);
    };

    if (products.length > 0) {
      loadImages();
    }
  }, [products]);

  // Eliminar producto
  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:4002/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Producto eliminado exitosamente');
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        console.error('Error al eliminar producto.');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Navegar a la página de edición
  const handleEdit = (productId) => {
    navigate(`/edit/${productId}`);
  };

  return (
    <div className="editList">
      <h2>Editar Productos</h2>
      <ul>
        {products.length === 0 ? (
          <li>No hay productos disponibles</li>
        ) : (
          products.map((product) => {
            const imageBase64 = images[product.id];

            return (
              <li key={product.id} className="productItem">
                {imageBase64 ? (
                  <img
                    src={imageBase64}
                    alt={product.description}
                    className="productImage"
                  />
                ) : (
                  <span className="noImage">Imagen no disponible</span>
                )}
                <div className="productDetails">
                  <span className="productDescription">{product.description}</span>
                  <span className="productPrice">Precio: ${product.price.toFixed(2)}</span>
                  <span className="productStock">Stock: {product.stock}</span>
                  <span className="productCategory">
                    Categoría: {product.category.id} - {product.category.name}
                  </span>
                </div>
                <div className="buttonsContainer">
                  <button
                    className="editButton"
                    onClick={() => handleEdit(product.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default ProductList;
