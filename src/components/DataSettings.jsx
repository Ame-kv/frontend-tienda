import React, { useState } from "react";

const DataSettings = () => {
  // Ruta correcta de tu placeholder local
  const placeholder = "/imagenes/placeholder.png";

  // Productos iniciales con imágenes locales
  const initialProducts = [
    {
      _id: "688b04af93935a48ae71e329",
      name: "Blusa Rosa",
      price: 350,
      stock: 12,
      category: "Blusa",
      image: "/imagenes/blusa rosa.jpg"
    },
    {
      _id: "a8124b19d1234789b1a82e72",
      name: "Pantalón Negro",
      price: 550,
      stock: 8,
      category: "Pantalón",
      image: "/imagenes/pantalón.jpg"
    },
    {
      _id: "e11f9c7daab2458bb95e71fa",
      name: "Vestido Azul",
      price: 720,
      stock: 5,
      category: "Vestido",
      image: "/imagenes/vestidocasual.jpg"
    }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);

  // Producto nuevo (imagen vacía → usa placeholder después)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: ""
  });

  // Agregar producto
  const handleAddProduct = () => {
    const productoFinal = {
      ...newProduct,
      _id: Date.now().toString(),
      image: newProduct.image || placeholder
    };

    setProducts([...products, productoFinal]);

    // Limpiar formulario
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category: "",
      image: ""
    });
  };

  // Guardar edición
  const handleSaveProduct = () => {
    setProducts(
      products.map((p) =>
        p._id === editingProduct._id
          ? { ...editingProduct, image: editingProduct.image || placeholder }
          : p
      )
    );

    setEditingProduct(null);
  };

  // Eliminar producto
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p._id !== id));
  };

  // Cancelar creación
  const cancelAddProduct = () => {
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category: "",
      image: ""
    });
  };

  return (
    <div className="admin-settings">
      <h2>Administrar Catálogo de Prendas</h2>

      {/* Agregar producto */}
      <div className="add-product-card">
        <h3>Agregar Nueva Prenda</h3>

        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Categoría"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="URL de Imagen (opcional)"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />

        <button onClick={handleAddProduct}>Agregar</button>
        <button onClick={cancelAddProduct}>Cancelar</button>
      </div>

      <hr />

      {/* Lista de productos */}
      <h3>Productos Existentes</h3>

      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholder;
              }}
            />

            {editingProduct && editingProduct._id === product._id ? (
              <>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value
                    })
                  }
                />

                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value
                    })
                  }
                />

                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: e.target.value
                    })
                  }
                />

                <input
                  type="text"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value
                    })
                  }
                />

                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: e.target.value
                    })
                  }
                />

                <button onClick={handleSaveProduct}>Guardar</button>
                <button onClick={() => setEditingProduct(null)}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <h4>{product.name}</h4>
                <p>Precio: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>Categoría: {product.category}</p>

                <button onClick={() => setEditingProduct(product)}>
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSettings;
