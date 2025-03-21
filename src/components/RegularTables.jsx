import React from "react";

const RegularTables = () => {
  // Datos de ejemplo para las tablas


  const orders = [
    { id: "#ORD-001", customer: "María García", date: "2025-03-25", amount: 89.99, status: "Completado" },
    { id: "#ORD-002", customer: "Carlos López", date: "2025-03-24", amount: 120.50, status: "En proceso" },
    { id: "#ORD-003", customer: "Ana Martínez", date: "2025-03-24", amount: 65.75, status: "Enviado" },
    { id: "#ORD-004", customer: "Juan Pérez", date: "2025-03-23", amount: 210.00, status: "Pendiente" },
  ];

  return (
    <div className="regular-tables-view">
      <div className="rt-content">
    

        {/* Tabla de Órdenes Recientes */}
        <div className="rt-table-container">
          <div className="rt-table-header">
            <h3>Usuarios y ordenes</h3>
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
