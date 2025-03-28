import React, { useState } from "react";
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
import RegularTables from "./RegularTables";
import DataSettings from "./DataSettings";
import "../styles/Admin.css";
import Graficas from "./Graficas";
import Perfil from "./Perfil";

const Admin = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard"); // 'dashboard', 'elements', 'components', 'regular-tables'

  // Datos para las tarjetas de estadísticas
  const stats = {
    totalSales: { value: "$12,548", label: "Ventas Totales", icon: <FiDollarSign /> },
    newOrders: { value: "324", label: "Pedidos Nuevos", icon: <FiShoppingBag /> },
    customers: { value: "1,287", label: "Clientes", icon: <FiUsers /> },
    satisfaction: { value: "4.8", label: "Satisfacción", icon: <FiStar /> },
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
                <span className="cf-menu-text">Datos</span>
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
                className={`cf-menu-item ${activeView === 'components' ? 'active' : ''}`}
                onClick={() => handleMenuClick('components')}
              >
                <FiLayers className="cf-menu-icon" />
                <span className="cf-menu-text">Graficas</span>
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
              {activeView === 'dashboard' && 'Resumen de Rendimiento'}
              {activeView === 'elements' && 'Ajustes de Datos'}
              {activeView === 'components' && 'Components'}
              {activeView === 'regular-tables' && 'Regular Tables'}
            </h2>
            <p className="cf-subtitle">
              {activeView === 'dashboard' && 'Datos actualizados en tiempo real'}
              {activeView === 'elements' && 'Editar y gestionar productos'}
              {activeView === 'regular-tables' && 'Tablas y gráficos de datos'}
              {activeView === 'components' && <Graficas />}
              {activeView === 'perfil' && <Perfil />}
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
          </>
        )}

        {activeView === 'elements' && <DataSettings />}
        {activeView === 'regular-tables' && <RegularTables />}
        
      </div>
    </div>
  );
};

export default Admin;