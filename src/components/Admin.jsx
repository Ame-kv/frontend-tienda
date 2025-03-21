import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { 
  FiPieChart,
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiSettings,
  FiBarChart2,
  FiChevronLeft,
  FiCreditCard,
  FiTruck,
  FiStar,
  FiCheckSquare,
  FiGrid,
  FiLayers
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
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");

  // Datos para las tarjetas de estadísticas
  const stats = {
    totalSales: { value: "$12,548", label: "Ventas Totales", icon: <FiDollarSign /> },
    newOrders: { value: "324", label: "Pedidos Nuevos", icon: <FiShoppingBag /> },
    customers: { value: "1,287", label: "Clientes", icon: <FiUsers /> },
    satisfaction: { value: "4.8", label: "Satisfacción", icon: <FiStar /> },
  };

  // Datos para las gráficas
  const ventasPorMes = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ventas 2023",
        data: [4500, 5200, 4800, 6100, 7300, 8200],
        backgroundColor: "rgba(93, 120, 255, 0.7)",
        borderColor: "rgba(93, 120, 255, 1)",
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
          "rgba(93, 120, 255, 0.7)",
          "rgba(108, 95, 252, 0.7)",
          "rgba(76, 201, 240, 0.7)",
          "rgba(248, 150, 30, 0.7)",
          "rgba(247, 37, 133, 0.7)"
        ],
        borderColor: [
          "rgba(93, 120, 255, 1)",
          "rgba(108, 95, 252, 1)",
          "rgba(76, 201, 240, 1)",
          "rgba(248, 150, 30, 1)",
          "rgba(247, 37, 133, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  const opciones = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "",
        font: {
          size: 16
        }
      }
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleMenuClick = (view) => {
    setActiveView(view);
  };

  return (
    <div className="clothesfever-dashboard">
      {/* Sidebar izquierdo */}
      <div className="cf-sidebar">
        <div className="cf-sidebar-header">
          <h1>ClothesFever</h1>
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
          <div>
            <h2>
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'elements' && 'Ajustes de Datos'}
              {activeView === 'regular-tables' && 'Tablas'}
              {activeView === 'perfil' && 'Perfil'}
            </h2>
            <p className="cf-subtitle">
              {activeView === 'dashboard' && 'Resumen completo del rendimiento'}
              {activeView === 'elements' && 'Editar y gestionar productos'}
              {activeView === 'regular-tables' && 'Tablas y datos detallados'}
              {activeView === 'perfil' && 'Configuración de tu perfil'}
            </p>
          </div>
          <button className="cf-back-button" onClick={handleBackToDashboard}>
            <FiChevronLeft /> Volver
          </button>
        </div>

        {/* Contenido dinámico */}
        {activeView === 'dashboard' && (
          <>
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
      </div>
    </div>
  );
};

export default Admin;