import React from "react";
import "../styles/RegularTables.css";

const RegularTables = () => {
  // Datos de ejemplo mínimos

  const products = [
    { id: "#PROD-001", name: "Camiseta Básica", category: "Ropa", price: 25.99, stock: 45, sales: 120 },
    { id: "#PROD-002", name: "Pantalón Jeans", category: "Ropa", price: 49.99, stock: 12, sales: 85 },
  ];

  const users = [
    { id: "#USER-001", name: "María García", email: "maria@email.com", phone: "+1 234 567 890", joinDate: "2024-01-15", status: "Activo" },
    { id: "#USER-002", name: "Carlos López", email: "carlos@email.com", phone: "+1 234 567 891", joinDate: "2024-02-20", status: "Activo" },
  ];

  // Función para obtener la clase del estado del stock
  const getStockStatus = (stock) => {
    return stock > 20 ? "stock-badge" : "stock-badge low";
  };

  // Función para obtener la clase del estado del usuario
  const getUserStatus = (status) => {
    return status === "Activo" ? "status-badge completado" : "status-badge pendiente";
  };

  return (
    
    <div className="regular-tables-view">
      <div className="rt-content">
        {/* Tabla de Productos */}
        <div className="rt-table-container">
          <div className="rt-table-header">
            <h3>Inventario de Productos</h3>
            <span className="rt-badge">{products.length} productos</span>
          </div>
          <div className="table-responsive">
            <table className="rt-table">
              <thead>
                <tr>
                  <th>ID Producto</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Ventas</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="product-id">{product.id}</td>
                    <td className="product-name">{product.name}</td>
                    <td className="product-category">{product.category}</td>
                    <td className="product-price">${product.price.toFixed(2)}</td>
                    <td className="product-stock">
                      <span className={getStockStatus(product.stock)}>
                        {product.stock} unidades
                      </span>
                    </td>
                    <td className="product-sales">{product.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla de Usuarios */}
        <div className="rt-table-container">
          <div className="rt-table-header">
            <h3>Usuarios Registrados</h3>
            <span className="rt-badge">{users.length} usuarios</span>
          </div>
          <div className="table-responsive">
            <table className="rt-table">
              <thead>
                <tr>
                  <th>ID Usuario</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Fecha de Registro</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="user-id">{user.id}</td>
                    <td className="user-name">{user.name}</td>
                    <td className="user-email">{user.email}</td>
                    <td className="user-phone">{user.phone}</td>
                    <td className="user-join-date">{user.joinDate}</td>
                    <td className="user-status">
                      <span className={getUserStatus(user.status)}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularTables;