import React, { useState, useRef } from "react";
import "../styles/Reports.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [dateRange, setDateRange] = useState({
    start: "2025-03-01",
    end: "2025-03-31"
  });
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const reportRef = useRef();

  // Datos de ejemplo para reportes
  const salesData = {
    monthly: [
      { month: "Ene", sales: 12500, orders: 145, growth: 12 },
      { month: "Feb", sales: 13800, orders: 152, growth: 8 },
      { month: "Mar", sales: 15200, orders: 168, growth: 15 }
    ],
    weekly: [
      { week: "Sem 1", sales: 3800, orders: 42, growth: 5 },
      { week: "Sem 2", sales: 4200, orders: 46, growth: 12 },
      { week: "Sem 3", sales: 4500, orders: 50, growth: 8 },
      { week: "Sem 4", sales: 4700, orders: 52, growth: 15 }
    ]
  };

  const topProducts = [
    { name: "Camiseta Básica", sales: 89, revenue: 2311.11, growth: 15 },
    { name: "Pantalón Jeans", sales: 67, revenue: 3349.33, growth: 8 },
    { name: "Zapatos Deportivos", sales: 45, revenue: 3595.50, growth: 22 },
    { name: "Chamarra de Cuero", sales: 32, revenue: 2878.00, growth: -5 },
    { name: "Gorra Casual", sales: 28, revenue: 419.72, growth: 12 }
  ];

  const customerMetrics = {
    totalCustomers: 1245,
    newCustomers: 89,
    returningCustomers: 345,
    avgOrderValue: 89.50,
    customerSatisfaction: 4.7
  };

  const financialSummary = {
    totalRevenue: 45200,
    totalExpenses: 28700,
    netProfit: 16500,
    profitMargin: 36.5
  };

  // Función para formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  // Función para obtener clase de crecimiento
  const getGrowthClass = (growth) => {
    return growth >= 0 ? "growth-positive" : "growth-negative";
  };

  // Función para exportar a PDF
  const exportToPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Obtener fecha actual para el nombre del archivo
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      
      pdf.save(`reporte-clothesfever-${dateString}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta nuevamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Función para exportar a CSV (manteniendo la funcionalidad existente)
  const exportToCSV = () => {
    // Aquí puedes mantener tu lógica existente para exportar a CSV
    alert('Exportando a CSV...');
  };

  return (
    <div className="reports-view" ref={reportRef}>
      <div className="reports-header">
        <h1>Reportes</h1>
        <div className="report-controls">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
            <option value="quarterly">Trimestral</option>
            <option value="yearly">Anual</option>
          </select>
          
          <div className="date-range">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
            <span>a</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>

          <div className="export-buttons">
            <button 
              className="export-btn pdf"
              onClick={exportToPDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <span className="loading-spinner"></span>
                  Generando PDF...
                </>
              ) : (
                <>
                  📄 Descargar PDF
                </>
              )}
            </button>
            
            <button 
              className="export-btn csv"
              onClick={exportToCSV}
            >
              📊 Exportar CSV
            </button>
          </div>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="metrics-grid">
        <div className="metric-card revenue">
          <div className="metric-icon">💰</div>
          <div className="metric-info">
            <h3>Ingresos Totales</h3>
            <p className="metric-value">{formatCurrency(financialSummary.totalRevenue)}</p>
            <span className="metric-change positive">+12.5% vs periodo anterior</span>
          </div>
        </div>

        <div className="metric-card orders">
          <div className="metric-icon">📦</div>
          <div className="metric-info">
            <h3>Órdenes Totales</h3>
            <p className="metric-value">{salesData[selectedPeriod].reduce((sum, item) => sum + item.orders, 0)}</p>
            <span className="metric-change positive">+8.3% vs periodo anterior</span>
          </div>
        </div>

        <div className="metric-card customers">
          <div className="metric-icon">👥</div>
          <div className="metric-info">
            <h3>Clientes Activos</h3>
            <p className="metric-value">{customerMetrics.totalCustomers}</p>
            <span className="metric-change positive">+{customerMetrics.newCustomers} nuevos</span>
          </div>
        </div>

        <div className="metric-card profit">
          <div className="metric-icon">📈</div>
          <div className="metric-info">
            <h3>Ganancia Neta</h3>
            <p className="metric-value">{formatCurrency(financialSummary.netProfit)}</p>
            <span className="metric-change positive">{financialSummary.profitMargin}% margen</span>
          </div>
        </div>
      </div>

      <div className="reports-content">
        {/* Gráfico de Ventas */}
        <div className="report-section">
          <div className="section-header">
            <h2>Tendencia de Ventas</h2>
            <span className="section-badge">{selectedPeriod}</span>
          </div>
          <div className="sales-chart">
            <div className="chart-container">
              {salesData[selectedPeriod].map((item, index) => (
                <div key={index} className="chart-bar">
                  <div 
                    className="bar-fill"
                    style={{ height: `${(item.sales / 20000) * 100}%` }}
                  ></div>
                  <div className="bar-label">
                    <span className="bar-amount">{formatCurrency(item.sales)}</span>
                    <span className="bar-period">{item.month || item.week}</span>
                    <span className={`bar-growth ${getGrowthClass(item.growth)}`}>
                      {item.growth > 0 ? '+' : ''}{item.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Productos Más Vendidos */}
        <div className="report-section">
          <div className="section-header">
            <h2>Productos Más Vendidos</h2>
            <span className="section-badge">Top 5</span>
          </div>
          <div className="top-products">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Ventas</th>
                  <th>Ingresos</th>
                  <th>Crecimiento</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="product-name">{product.name}</td>
                    <td className="sales-count">{product.sales} unidades</td>
                    <td className="revenue-amount">{formatCurrency(product.revenue)}</td>
                    <td className={`growth-indicator ${getGrowthClass(product.growth)}`}>
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Métricas de Clientes */}
        <div className="report-section">
          <div className="section-header">
            <h2>Métricas de Clientes</h2>
          </div>
          <div className="customer-metrics-grid">
            <div className="customer-metric">
              <h4>Clientes Nuevos</h4>
              <p className="metric-number">{customerMetrics.newCustomers}</p>
              <span className="metric-desc">este periodo</span>
            </div>
            <div className="customer-metric">
              <h4>Clientes Recurrentes</h4>
              <p className="metric-number">{customerMetrics.returningCustomers}</p>
              <span className="metric-desc">28% del total</span>
            </div>
            <div className="customer-metric">
              <h4>Valor Promedio</h4>
              <p className="metric-number">{formatCurrency(customerMetrics.avgOrderValue)}</p>
              <span className="metric-desc">por orden</span>
            </div>
            <div className="customer-metric">
              <h4>Satisfacción</h4>
              <p className="metric-number">{customerMetrics.customerSatisfaction}/5</p>
              <span className="metric-desc">rating promedio</span>
            </div>
          </div>
        </div>

        {/* Resumen Financiero */}
        <div className="report-section">
          <div className="section-header">
            <h2>Resumen Financiero</h2>
          </div>
          <div className="financial-summary">
            <div className="financial-item">
              <span className="financial-label">Ingresos Totales:</span>
              <span className="financial-value revenue">{formatCurrency(financialSummary.totalRevenue)}</span>
            </div>
            <div className="financial-item">
              <span className="financial-label">Gastos Totales:</span>
              <span className="financial-value expense">{formatCurrency(financialSummary.totalExpenses)}</span>
            </div>
            <div className="financial-divider"></div>
            <div className="financial-item total">
              <span className="financial-label">Ganancia Neta:</span>
              <span className="financial-value profit">{formatCurrency(financialSummary.netProfit)}</span>
            </div>
            <div className="financial-item">
              <span className="financial-label">Margen de Ganancia:</span>
              <span className="financial-value margin">{financialSummary.profitMargin}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;