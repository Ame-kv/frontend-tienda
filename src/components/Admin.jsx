import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";

import { 
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiStar,
  FiChevronLeft,
  FiCheckSquare,
  FiGrid,
  FiBarChart2
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

  // Datos para las tarjetas de estadísticas
  const stats = {
    totalSales: { value: "$12,548", label: "Ventas Totales", icon: <FiDollarSign /> },
    newOrders: { value: "324", label: "Pedidos Nuevos", icon: <FiShoppingBag /> },
    customers: { value: "1,287", label: "Clientes", icon: <FiUsers /> },
    satisfaction: { value: "4.8", label: "Satisfacción", icon: <FiStar /> },
  };

  // Datos para las gráficas con nuevos colores
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
    // Cerrar sidebar en móviles al hacer clic en un item
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="clothesfever-dashboard">
      {/* Botón para móviles */}
      <button className="cf-mobile-menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Overlay para móviles */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div className="cf-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar izquierdo */}
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

      {/* Contenido principal */}
<div className="cf-main-content">
  {/* Encabezado */}
  <div className="cf-header">
    <div className="cf-header-info">
      <h2>
        {activeView === 'dashboard' && 'Dashboard'}
        {activeView === 'elements' && 'Ajustes de Datos'}
        {activeView === 'regular-tables' && 'Tablas'}
        {activeView === 'perfil' && 'Perfil'}
        {activeView === 'reports' && 'Reportes'}
      </h2>
      <p className="cf-subtitle">
        {activeView === 'dashboard' && 'Resumen general del negocio'}
        {activeView === 'elements' && 'Editar y gestionar productos'}
        {activeView === 'regular-tables' && 'Tablas y datos detallados'}
        {activeView === 'perfil' && 'Configuración de tu perfil'}
        {activeView === 'reports' && 'Estadísticas y análisis detallados'}
      </p>
    </div>
  </div>

        {/* Contenido dinámico */}
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

              {/* Sección de gráficas en el dashboard */}
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
        </div>
      </div>
    </div>
  );
};

export default Admin;