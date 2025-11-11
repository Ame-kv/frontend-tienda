import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";

import { 
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiStar,
  FiCheckSquare,
  FiGrid,
  FiBarChart2,
  FiBell,
  FiX,
  FiExternalLink,
  FiPackage,
  FiUserPlus,
  FiRefreshCw,
  FiCreditCard
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import RegularTables from "./RegularTables";
import DataSettings from "./DataSettings";
import "../styles/Admin.css";
import Perfil from "./Perfil";
import Reports from "./Reports";
import Subscriptions from "./Subscriptions";

// Registrar componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Datos para las tarjetas de estadísticas
  const stats = {
    totalSales: { value: "$12,548", label: "Ventas Totales", icon: <FiDollarSign /> },
    newOrders: { value: "324", label: "Pedidos Nuevos", icon: <FiShoppingBag /> },
    customers: { value: "1,287", label: "Clientes", icon: <FiUsers /> },
    satisfaction: { value: "4.8", label: "Satisfacción", icon: <FiStar /> },
  };

  // Notificaciones de ejemplo
  useEffect(() => {
    const exampleNotifications = [
      {
        id: 1,
        title: "Nuevo pedido recibido",
        message: "Pedido #1234 ha sido realizado por María García",
        time: "Hace 5 min",
        read: false,
        type: "order",
        action: "viewOrder",
        orderId: "1234",
        customer: "María García",
        amount: "$156.00"
      },
      {
        id: 2,
        title: "Producto agotado",
        message: "Camiseta básica negra talla M está agotada",
        time: "Hace 1 hora",
        read: false,
        type: "inventory",
        action: "viewInventory",
        product: "Camiseta básica negra",
        size: "M",
        stock: 0
      },
      {
        id: 3,
        title: "Nuevo cliente registrado",
        message: "Carlos López se ha registrado en la plataforma",
        time: "Hace 2 horas",
        read: false,
        type: "customer",
        action: "viewCustomers",
        customer: "Carlos López",
        email: "carlos@email.com"
      },
      {
        id: 4,
        title: "Pedido enviado",
        message: "Pedido #1228 ha sido enviado al cliente",
        time: "Hace 3 horas",
        read: true,
        type: "order",
        action: "viewOrder",
        orderId: "1228",
        status: "enviado",
        tracking: "TRK123456789"
      },
      {
        id: 5,
        title: "Stock bajo",
        message: "Pantalón jeans azul talla 32 está por agotarse",
        time: "Hace 4 horas",
        read: false,
        type: "inventory",
        action: "viewInventory",
        product: "Pantalón jeans azul",
        size: "32",
        stock: 5
      },
      {
        id: 6,
        title: "Actualización del sistema",
        message: "Nueva versión 2.1.0 disponible",
        time: "Ayer",
        read: true,
        type: "system",
        action: "viewSystem",
        version: "2.1.0",
        features: ["Mejoras en rendimiento", "Nuevos reportes"]
      }
    ];
    
    setNotifications(exampleNotifications);
  }, []);

  // Contador de TODAS las notificaciones (leídas y no leídas)
  const totalNotifications = notifications.length;

  // Función para manejar acciones de notificaciones
  const handleNotificationAction = (notification) => {
    markAsRead(notification.id);
    
    switch (notification.action) {
      case "viewOrder":
        alert(`📦 Detalles del Pedido #${notification.orderId}\n\n` +
              `Cliente: ${notification.customer || "No especificado"}\n` +
              `Monto: ${notification.amount || "No especificado"}\n` +
              `Estado: ${notification.status || "Pendiente"}\n` +
              `Tracking: ${notification.tracking || "No disponible"}`);
        setActiveView('regular-tables');
        break;
        
      case "viewInventory":
        alert(`📊 Detalles de Inventario\n\n` +
              `Producto: ${notification.product}\n` +
              `Talla: ${notification.size || "N/A"}\n` +
              `Stock actual: ${notification.stock} unidades\n` +
              `Acción: ${notification.stock === 0 ? "Reabastecer urgentemente" : "Revisar inventario"}`);
        setActiveView('elements');
        break;
        
      case "viewCustomers":
        alert(`👤 Detalles del Cliente\n\n` +
              `Nombre: ${notification.customer}\n` +
              `Email: ${notification.email || "No especificado"}\n` +
              `Fecha registro: Hoy`);
        setActiveView('regular-tables');
        break;
        
      case "viewSystem":
        alert(`🔄 Actualización del Sistema\n\n` +
              `Versión: ${notification.version}\n` +
              `Nuevas características:\n• ${notification.features?.join('\n• ') || "Mejoras generales"}`);
        break;
        
      default:
        break;
    }
    
    setShowNotifications(false);
  };

  // Función para marcar notificación como leída
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Función para eliminar notificación
  const removeNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Resto del código igual...
  const ventasPorMes = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ventas 2023",
        data: [4500, 5200, 4800, 6100, 7300, 8200],
        backgroundColor: "rgba(74, 108, 147, 0.7)",
        borderColor: "rgba(74, 108, 147, 1)",
        borderWidth: 1
      }
    ]
  };

  const productosMasVendidos = {
    labels: ["Camisetas", "Pantalones", "Zapatos", "Accesorios", "Vestidos"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "rgba(74, 108, 147, 0.7)",
          "rgba(108, 122, 137, 0.7)",
          "rgba(158, 158, 158, 0.7)",
          "rgba(189, 189, 189, 0.7)",
          "rgba(224, 224, 224, 0.7)"
        ],
        borderColor: [
          "rgba(74, 108, 147, 1)",
          "rgba(108, 122, 137, 1)",
          "rgba(158, 158, 158, 1)",
          "rgba(189, 189, 189, 1)",
          "rgba(224, 224, 224, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333333",
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: "",
        font: {
          size: window.innerWidth < 768 ? 14 : 16
        },
        color: "#333333"
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#666666",
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        },
        grid: {
          color: "rgba(224, 224, 224, 0.5)"
        }
      },
      y: {
        ticks: {
          color: "#666666",
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        },
        grid: {
          color: "rgba(224, 224, 224, 0.5)"
        }
      }
    }
  };

  const handleMenuClick = (view) => {
    setActiveView(view);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="clothesfever-dashboard">
      <button className="cf-mobile-menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {sidebarOpen && window.innerWidth < 768 && (
        <div className="cf-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className={`cf-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="cf-sidebar-header">
          <h1>ClothesFever</h1>
          <button className="cf-sidebar-close" onClick={() => setSidebarOpen(false)}>
            ×
          </button>
        </div>

        <div className="cf-menu">
          <div className="cf-menu-section">
            <h3 className="cf-menu-title">MENU</h3>
            <ul>
              <li 
                className={`cf-menu-item ${activeView === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleMenuClick('dashboard')}
              >
                <FiCheckSquare className="cf-menu-icon" />
                <span className="cf-menu-text">Dashboard</span>
              </li>
            </ul>
          </div>

          <div className="cf-menu-section">
            <h3 className="cf-menu-category">COMPONENTES</h3>
            <ul>
              <li 
                className={`cf-menu-item ${activeView === 'elements' ? 'active' : ''}`}
                onClick={() => handleMenuClick('elements')}
              >
                <FiGrid className="cf-menu-icon" />
                <span className="cf-menu-text">Ajustes de datos</span>
              </li>
              <li 
                className={`cf-menu-item ${activeView === 'regular-tables' ? 'active' : ''}`}
                onClick={() => handleMenuClick('regular-tables')}
              >
                <FiGrid className="cf-menu-icon" />
                <span className="cf-menu-text">Tablas</span>
              </li>
              <li 
                className={`cf-menu-item ${activeView === 'reports' ? 'active' : ''}`}
                onClick={() => handleMenuClick('reports')}
              >
                <FiBarChart2 className="cf-menu-icon" />
                <span className="cf-menu-text">Reportes</span>
              </li>
              {/* NUEVO ITEM DE SUSCRIPCIONES */}
              <li 
                className={`cf-menu-item ${activeView === 'subscriptions' ? 'active' : ''}`}
                onClick={() => handleMenuClick('subscriptions')}
              >
                <FiCreditCard className="cf-menu-icon" />
                <span className="cf-menu-text">Suscripciones</span>
              </li>
            </ul>
          </div>

          <div className="cf-menu-section">
            <h3 className="cf-menu-category">---</h3>
            <ul>
              <li 
                className={`cf-menu-item ${activeView === 'perfil' ? 'active' : ''}`}
                onClick={() => handleMenuClick('perfil')}
              >
                <FiCheckSquare className="cf-menu-icon" />
                <span className="cf-menu-text">Perfil</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cf-main-content">
        <div className="cf-header">
          <div className="cf-header-info">
            <h2>
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'elements' && 'Ajustes de Datos'}
              {activeView === 'regular-tables' && 'Tablas'}
              {activeView === 'perfil' && 'Perfil'}
              {activeView === 'reports' && 'Reportes'}
              {activeView === 'subscriptions' && 'Paquetes y Planes'} {/* NUEVO */}
            </h2>
            <p className="cf-subtitle">
              {activeView === 'dashboard' && 'Resumen general del negocio'}
              {activeView === 'elements' && 'Editar y gestionar productos'}
              {activeView === 'regular-tables' && 'Tablas y datos detallados'}
              {activeView === 'perfil' && 'Configuración de tu perfil'}
              {activeView === 'reports' && 'Estadísticas y análisis detallados'}
              {activeView === 'subscriptions' && 'Elige el plan perfecto para tu negocio'} {/* NUEVO */}
            </p>
          </div>
          
          <div className="cf-notifications-container">
            <button 
              className="cf-notifications-btn"
              onClick={toggleNotifications}
            >
              <FiBell className="cf-notifications-icon" />
              {/* MOSTRAR EL TOTAL DE NOTIFICACIONES */}
              {totalNotifications > 0 && (
                <span className="cf-notifications-badge">
                  {totalNotifications}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="cf-notifications-panel">
                <div className="cf-notifications-header">
                  <h3>Notificaciones</h3>
                  <div className="cf-notifications-actions">
                    <button 
                      className="cf-close-notifications"
                      onClick={toggleNotifications}
                    >
                      <FiX />
                    </button>
                  </div>
                </div>

                <div className="cf-notifications-list">
                  {notifications.length === 0 ? (
                    <div className="cf-no-notifications">
                      No hay notificaciones
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`cf-notification-item ${notification.read ? 'read' : 'unread'}`}
                        onClick={() => handleNotificationAction(notification)}
                      >
                        <div className="cf-notification-icon">
                          {notification.type === 'order' && <FiShoppingBag />}
                          {notification.type === 'inventory' && <FiPackage />}
                          {notification.type === 'customer' && <FiUserPlus />}
                          {notification.type === 'system' && <FiRefreshCw />}
                        </div>
                        <div className="cf-notification-content">
                          <div className="cf-notification-header">
                            <div className="cf-notification-title">
                              {notification.title}
                            </div>
                            <div className="cf-notification-time">
                              {notification.time}
                            </div>
                          </div>
                          <div className="cf-notification-message">
                            {notification.message}
                          </div>
                          <div className="cf-notification-action">
                            <span className="cf-action-text">
                              {notification.type === 'order' && 'Ver pedido'}
                              {notification.type === 'inventory' && 'Revisar inventario'}
                              {notification.type === 'customer' && 'Ver cliente'}
                              {notification.type === 'system' && 'Ver detalles'}
                            </span>
                            <FiExternalLink className="cf-action-icon" />
                          </div>
                        </div>
                        <button 
                          className="cf-notification-remove"
                          onClick={(e) => removeNotification(notification.id, e)}
                        >
                          <FiX />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="cf-content-wrapper">
          {activeView === 'dashboard' && (
            <><br /> <br /> <br /> <br /> <br /> <br /> <br />
              <div className="cf-stats-grid">
                {Object.entries(stats).map(([key, stat]) => (
                  <div key={key} className="cf-stat-card">
                    <div className="cf-stat-icon">{stat.icon}</div>
                    <div className="cf-stat-content">
                      <div className="cf-stat-value">{stat.value}</div>
                      <div className="cf-stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cf-graphs-section">
                <h3 className="cf-section-title">Estadísticas de Ventas</h3>
                <div className="cf-graphs-grid">
                  <div className="cf-graph-container">
                    <h4>Ventas Mensuales</h4>
                    <div className="cf-graph-wrapper">
                      <Bar data={ventasPorMes} options={opciones} />
                    </div>
                  </div>
                  
                  <div className="cf-graph-container">
                    <h4>Productos Más Vendidos</h4>
                    <div className="cf-graph-wrapper">
                      <Pie data={productosMasVendidos} options={opciones} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeView === 'elements' && <DataSettings />}
          {activeView === 'regular-tables' && <RegularTables />}
          {activeView === 'perfil' && <Perfil />}
          {activeView === 'reports' && <Reports />}
          {activeView === 'subscriptions' && <Subscriptions />} {/* NUEVO */}
        </div>
      </div>
    </div>
  );
};

export default Admin;