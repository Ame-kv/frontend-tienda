import React from "react";

const RegularTables = () => {
  // Datos de ejemplo para las tablas
  const products = [
    { id: 1, name: "Crop Top Estampado", category: "Tops", price: 19.99, stock: 45, sales: 120 },
    { id: 2, name: "Blusa Floreada", category: "Blusas", price: 24.99, stock: 32, sales: 85 },
    { id: 3, name: "Conjunto Azul", category: "Conjuntos", price: 39.99, stock: 18, sales: 42 },
    { id: 4, name: "Súeter Crochet", category: "Abrigos", price: 29.99, stock: 27, sales: 63 },
  ];

  const orders = [
    { id: "#ORD-001", customer: "María García", date: "2025-03-25", amount: 89.99, status: "Completado" },
    { id: "#ORD-002", customer: "Carlos López", date: "2025-03-24", amount: 120.50, status: "En proceso" },
    { id: "#ORD-003", customer: "Ana Martínez", date: "2025-03-24", amount: 65.75, status: "Enviado" },
    { id: "#ORD-004", customer: "Juan Pérez", date: "2025-03-23", amount: 210.00, status: "Pendiente" },
  ];

  return (
    <div className="regular-tables-view">
      <div className="rt-content">
        {/* Tabla de Productos */}
        <div className="rt-table-container">
          <div className="rt-table-header">
            <h3>Productos</h3>
            <span className="rt-badge">{products.length} productos</span>
          </div>
          <div className="table-responsive">
            <table className="rt-table">
              <thead>
                <tr>
                  <th>ID</th>
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
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <span className={`stock-badge ${product.stock < 20 ? 'low' : ''}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>{product.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <br />

        {/* Tabla de Órdenes Recientes */}
        <div className="rt-table-container">
          <div className="rt-table-header">
            <h3>Órdenes Recientes</h3>
            <span className="rt-badge">{orders.length} órdenes</span>
          </div>
          <div className="table-responsive">
            <table className="rt-table">
              <thead>
                <tr>
                  <th>ID Orden</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>${order.amount.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
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
