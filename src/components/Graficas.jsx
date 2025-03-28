import React from "react";
import { Bar, Pie } from "react-chartjs-2";
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
import "../styles/Admin.css";

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

const Graficas = () => {
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

  return (
    <div className="graficas-view">
      <h2 className="graficas-title">Estadísticas de Ventas</h2>
      
      <div className="graficas-grid">
        <div className="grafica-container">
          <h3>Ventas Mensuales</h3>
          <div className="grafica-wrapper">
            <Bar data={ventasPorMes} options={opciones} />
          </div>
        </div>
        
        <div className="grafica-container">
          <h3>Productos Más Vendidos</h3>
          <div className="grafica-wrapper">
            <Pie data={productosMasVendidos} options={opciones} />
          </div>
        </div>
        
        <div className="grafica-container">
          <h3>Ventas por Categoría</h3>
          <div className="grafica-wrapper">
            <Bar 
              data={{
                labels: ["Hombre", "Mujer", "Niños", "Unisex"],
                datasets: [
                  {
                    label: "Ventas",
                    data: [12000, 18000, 7000, 5000],
                    backgroundColor: "rgba(108, 95, 252, 0.7)"
                  }
                ]
              }} 
              options={opciones} 
            />
          </div>
        </div>
        
        <div className="grafica-container">
          <h3>Métodos de Pago</h3>
          <div className="grafica-wrapper">
            <Pie 
              data={{
                labels: ["Tarjeta", "Efectivo", "Transferencia", "PayPal"],
                datasets: [
                  {
                    data: [45, 30, 15, 10],
                    backgroundColor: [
                      "rgba(93, 120, 255, 0.7)",
                      "rgba(40, 167, 69, 0.7)",
                      "rgba(255, 193, 7, 0.7)",
                      "rgba(220, 53, 69, 0.7)"
                    ]
                  }
                ]
              }} 
              options={opciones} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graficas;