import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiImage, FiSave, FiX, FiCheckCircle, FiPlus } from "react-icons/fi";
import "../styles/DataSettings.css";

const DataSettings = () => {
  // Datos de ejemplo para productos
  const initialProducts = [
    {
      id: 1,
      name: "Camiseta básica",
      price: 19.99,
      stock: 45,
      category: "Camisetas",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Jeans ajustados",
      price: 49.99,
      stock: 30,
      category: "Pantalones",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Zapatos deportivos",
      price: 79.99,
      stock: 22,
      category: "Calzado",
      image: "https://via.placeholder.com/150"
    }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    image: "https://via.placeholder.com/150"
  });

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditedProduct({ ...product });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedProduct({});
    setNewImage(null);
  };

  const handleSave = (id) => {
    const updatedProducts = products.map(product => 
      product.id === id ? { ...editedProduct, image: newImage || editedProduct.image } : product
    );
    setProducts(updatedProducts);
    setEditingId(null);
    setEditedProduct({});
    setNewImage(null);
    showNotification("Producto actualizado correctamente", "success");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProducts(products.filter(product => product.id !== id));
      showNotification("Producto eliminado correctamente", "success");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ 
      ...prev, 
      [name]: name === 'price' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ 
      ...prev, 
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) {
      showNotification("Por favor completa todos los campos requeridos", "error");
      return;
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setIsAddingNew(false);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      category: "",
      image: "https://via.placeholder.com/150"
    });
    showNotification("Producto añadido correctamente", "success");
  };

  const cancelAddProduct = () => {
    setIsAddingNew(false);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      category: "",
      image: "https://via.placeholder.com/150"
    });
  };

  // Función para determinar la clase del stock
  const getStockClass = (stock) => {
    if (stock < 10) return "low-stock";
    if (stock < 25) return "medium-stock";
    return "good-stock";
  }; 

  return (
     
     
     <div className="data-settings"> 
      <div className="data-settings-header">
        <h2 className="data-settings-title">Gestión de Productos</h2>
        <span className="products-count">{products.length} productos</span>
      </div>
      
      {/* Notificación */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <FiCheckCircle className="notification-icon" />
          <span>{notification.message}</span>
        </div>
      )}

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>IMAGEN</th>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>CATEGORÍA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila para añadir nuevo producto */}
            {isAddingNew && (
              <tr className="table-row adding-row">
                <td>
                  <label htmlFor="new-image-upload" className="image-upload-label">
                    <FiImage className="image-icon" />
                    <input 
                      id="new-image-upload" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleNewImageChange}
                      style={{ display: 'none' }}
                    />
                    <img 
                      src={newProduct.image} 
                      alt="Preview" 
                      className="image-preview" 
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRThFQ0VGIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMTYiIHI9IjgiIGZpbGw9IiM5QTk5OTkiLz48cGF0aCBkPSJNNiAzMkM2IDI5Ljc5IDkuNzkgMjggMTIgMjhIMjhDMzAuMjEgMjggMzQgMjkuNzkgMzQgMzJWMzRINlYzMloiIGZpbGw9IiM5QTk5OTkiLz4KPC9zdmc+';
                      }}
                    />
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                    className="edit-input"
                    placeholder="Nombre del producto"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleNewProductChange}
                    className="edit-input"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleNewProductChange}
                    className="edit-input"
                    min="0"
                    placeholder="0"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleNewProductChange}
                    className="edit-input"
                    placeholder="Categoría"
                  />
                </td>
                <td className="actions-cell">
                  <button 
                    onClick={handleAddProduct}
                    className="action-button save-button"
                    title="Guardar producto"
                  >
                    <FiSave />
                  </button>
                  <button 
                    onClick={cancelAddProduct}
                    className="action-button cancel-button"
                    title="Cancelar"
                  >
                    <FiX />
                  </button>
                </td>
              </tr>
            )}

            {/* Filas de productos existentes */}
            {products.map(product => (
              <tr key={product.id} className="table-row">
                {editingId === product.id ? (
                  <>
                    <td>
                      <label htmlFor={`image-upload-${product.id}`} className="image-upload-label">
                        <FiImage className="image-icon" />
                        <input 
                          id={`image-upload-${product.id}`} 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                        {newImage ? (
                          <img src={newImage} alt="Preview" className="image-preview" />
                        ) : (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="image-preview"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRThFQ0VGIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMTYiIHI9IjgiIGZpbGw9IiM5QTk5OTkiLz48cGF0aCBkPSJNNiAzMkM2IDI5Ljc5IDkuNzkgMjggMTIgMjhIMjhDMzAuMjEgMjggMzQgMjkuNzkgMzQgMzJWMzRINlYzMloiIGZpbGw9IiM5QTk5OTkiLz4KPC9zdmc+';
                            }}
                          />
                        )}
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editedProduct.name || ''}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        value={editedProduct.price || ''}
                        onChange={handleInputChange}
                        className="edit-input"
                        step="0.01"
                        min="0"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="stock"
                        value={editedProduct.stock || ''}
                        onChange={handleInputChange}
                        className="edit-input"
                        min="0"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="category"
                        value={editedProduct.category || ''}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    </td>
                    <td className="actions-cell">
                      <button 
                        onClick={() => handleSave(product.id)} 
                        className="action-button save-button"
                        title="Guardar cambios"
                      >
                        <FiSave />
                      </button>
                      <button 
                        onClick={handleCancelEdit} 
                        className="action-button cancel-button"
                        title="Cancelar edición"
                      >
                        <FiX />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRThFQ0VGIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMTYiIHI9IjgiIGZpbGw9IiM5QTk5OTkiLz48cGF0aCBkPSJNNiAzMkM2IDI5Ljc5IDkuNzkgMjggMTIgMjhIMjhDMzAuMjEgMjggMzQgMjkuNzkgMzQgMzJWMzRINlYzMloiIGZpbGw9IiM5QTk5OTkiLz4KPC9zdmc+';
                        }}
                      />
                    </td>
                    <td className="product-name">{product.name}</td>
                    <td className="product-price">${product.price.toFixed(2)}</td>
                    <td className={`product-stock ${getStockClass(product.stock)}`}>
                      {product.stock}
                    </td>
                    <td className="product-category">{product.category}</td>
                    <td className="actions-cell">
                      <button 
                        onClick={() => handleEdit(product)} 
                        className="action-button edit-button"
                        title="Editar producto"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)} 
                        className="action-button delete-button"
                        title="Eliminar producto"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button 
        className="add-product-button"
        onClick={() => setIsAddingNew(true)}
        disabled={isAddingNew}
      >
        <FiPlus /> Añadir Nuevo Producto
      </button>
    </div>
  );
};

export default DataSettings;