import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiImage, FiSave, FiX, FiCheckCircle, FiPlus } from "react-icons/fi";

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
    setProducts(products.filter(product => product.id !== id));
    showNotification("Producto eliminado correctamente", "success");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
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
    const newId = Math.max(...products.map(p => p.id)) + 1;
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
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
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
                    <img src={newProduct.image} alt="Preview" className="image-preview" />
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                    className="edit-input"
                    placeholder="Nombre"
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
                    placeholder="Precio"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleNewProductChange}
                    className="edit-input"
                    placeholder="Stock"
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
                  >
                    <FiSave />
                  </button>
                  <button 
                    onClick={() => setIsAddingNew(false)}
                    className="action-button cancel-button"
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
                          <img src={product.image} alt={product.name} className="image-preview" />
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
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="stock"
                        value={editedProduct.stock || ''}
                        onChange={handleInputChange}
                        className="edit-input"
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
                      >
                        <FiSave />
                      </button>
                      <button 
                        onClick={handleCancelEdit} 
                        className="action-button cancel-button"
                      >
                        <FiX />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <img src={product.image} alt={product.name} className="product-image" />
                    </td>
                    <td className="product-name">{product.name}</td>
                    <td className="product-price">${product.price.toFixed(2)}</td>
                    <td className="product-stock">{product.stock}</td>
                    <td className="product-category">{product.category}</td>
                    <td className="actions-cell">
                      <button 
                        onClick={() => handleEdit(product)} 
                        className="action-button edit-button"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)} 
                        className="action-button delete-button"
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
      >
        <FiPlus /> Añadir Nuevo Producto
      </button>
    </div>
  );
};

export default DataSettings;