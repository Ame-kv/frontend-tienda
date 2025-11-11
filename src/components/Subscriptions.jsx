import React, { useState } from "react";
import { FiCheck, FiZap, FiAward, FiCalendar, FiShoppingBag, FiUsers, FiBarChart2, FiStar, FiArrowLeft } from "react-icons/fi";
import "../styles/Subscriptions.css"

// Componente de Pago
const PaymentSection = ({ selectedPlan, onBack, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  
  // Función para generar referencia OXXO
  const generateOxxoReference = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };
  
  const [oxxoReference, setOxxoReference] = useState(generateOxxoReference());

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular procesamiento de pago
    alert(`¡Pago procesado exitosamente para el plan ${selectedPlan.name}!`);
    onPaymentComplete();
  };

  const handleOxxoPayment = () => {
    // Regenerar referencia al procesar pago OXXO
    const newReference = generateOxxoReference();
    setOxxoReference(newReference);
    alert(`Referencia OXXO generada: ${newReference}\n\nPor favor realiza el pago en cualquier tienda OXXO en un plazo de 24 horas.`);
    onPaymentComplete();
  };

  return (
    <div className="payment-container">
      <button className="back-button" onClick={onBack}>
        <FiArrowLeft /> Volver a Planes
      </button>

      <div className="payment-header">
        <h2>COMPLETAR PAGO</h2>
        <p>Estás contratando: <strong>{selectedPlan.name}</strong></p>
      </div>

      <div className="payment-content">
        <div className="order-summary">
          <h3>Resumen del Pedido</h3>
          <div className="summary-card">
            <div className="plan-info">
              <div className="plan-icon">{selectedPlan.icon}</div>
              <div>
                <h4>{selectedPlan.name}</h4>
                <p>{selectedPlan.description}</p>
                <div className="plan-price">
                  <span className="price">{selectedPlan.price}</span>
                  <span className="period">/{selectedPlan.period}</span>
                </div>
              </div>
            </div>
            <ul className="plan-features-summary">
              {selectedPlan.features.slice(0, 4).map((feature, index) => (
                <li key={index}>
                  <FiCheck className="feature-icon" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="payment-form-section">
          <h3>Método de Pago</h3>
          <div className="payment-methods">
            <button
              className={`payment-method-btn ${paymentMethod === "card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("card")}
            >
              💳 Tarjeta de Crédito/Débito
            </button>
            <button
              className={`payment-method-btn ${paymentMethod === "oxxo" ? "active" : ""}`}
              onClick={() => setPaymentMethod("oxxo")}
            >
              🏪 Pago en OXXO
            </button>
          </div>

          {paymentMethod === "card" && (
            <form className="payment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre en la Tarjeta</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="form-group">
                <label>Número de Tarjeta</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de Expiración</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/AA"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="pay-now-btn">
                PAGAR {selectedPlan.price}
              </button>
            </form>
          )}

          {paymentMethod === "oxxo" && (
            <div className="oxxo-section">
              <div className="oxxo-instructions">
                <h4>Instrucciones para pago en OXXO</h4>
                <ol>
                  <li>Acude a cualquier tienda OXXO</li>
                  <li>Proporciona la siguiente referencia de pago:</li>
                </ol>
                
                <div className="oxxo-reference">
                  <span className="reference-label">Referencia:</span>
                  <span className="reference-number">{oxxoReference}</span>
                </div>

                <div className="oxxo-amount">
                  <span className="amount-label">Monto a pagar:</span>
                  <span className="amount-number">{selectedPlan.price}</span>
                </div>

                <div className="oxxo-note">
                  <p><strong>Importante:</strong> Tienes 24 horas para realizar el pago. Después de pagar, tu suscripción se activará automáticamente.</p>
                </div>
              </div>

              <button className="oxxo-btn" onClick={handleOxxoPayment}>
                🏪 GENERAR REFERENCIA OXXO
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="security-info">
        <FiCheck className="security-icon" />
        <span>Pago 100% seguro y encriptado</span>
      </div>
    </div>
  );
};

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showPayment, setShowPayment] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  const plans = {
    monthly: [
      {
        id: "starter",
        name: "STARTER",
        price: "$99",
        period: "semana",
        description: "Perfecto para comenzar",
        features: [
          "Hasta 50 prendas vendidas/mes",
          "1 tienda online básica",
          "Soporte por email",
          "Dashboard de ventas básico",
          "Reportes semanales",
          "Hasta 100 productos en catálogo"
        ],
        popular: false,
        icon: <FiShoppingBag />,
        recommendedFor: "Emprendedores individuales"
      },
      {
        id: "business",
        name: "BUSINESS",
        price: "$299",
        period: "mes",
        description: "Para negocios en crecimiento",
        features: [
          "Hasta 500 prendas vendidas/mes",
          "3 tiendas online",
          "Soporte prioritario 12/5",
          "Dashboard avanzado",
          "Reportes en tiempo real",
          "Productos ilimitados",
          "Cupones y promociones",
          "Analítica de clientes"
        ],
        popular: true,
        icon: <FiUsers />,
        recommendedFor: "Pequeñas empresas"
      },
      {
        id: "pro",
        name: "PRO",
        price: "$599",
        period: "mes",
        description: "Para ventas de alto volumen",
        features: [
          "Prendas ilimitadas vendidas",
          "Tiendas online ilimitadas",
          "Soporte premium 24/7",
          "Dashboard empresarial",
          "Reportes personalizados",
          "Productos ilimitados",
          "API de integración",
          "White-label",
          "Multi-usuario",
          "Analítica avanzada"
        ],
        popular: false,
        icon: <FiAward />,
        recommendedFor: "Empresas establecidas"
      }
    ],
    yearly: [
      {
        id: "starter",
        name: "STARTER",
        price: "$999",
        period: "año",
        description: "Perfecto para comenzar",
        originalPrice: "$1,188",
        discount: "16% de descuento",
        features: [
          "Hasta 50 prendas vendidas/mes",
          "1 tienda online básica",
          "Soporte por email",
          "Dashboard de ventas básico",
          "Reportes semanales",
          "Hasta 100 productos en catálogo"
        ],
        popular: false,
        icon: <FiShoppingBag />,
        recommendedFor: "Emprendedores individuales"
      },
      {
        id: "business",
        name: "BUSINESS",
        price: "$2,999",
        period: "año",
        description: "Para negocios en crecimiento",
        originalPrice: "$3,588",
        discount: "16% de descuento",
        features: [
          "Hasta 500 prendas vendidas/mes",
          "3 tiendas online",
          "Soporte prioritario 12/5",
          "Dashboard avanzado",
          "Reportes en tiempo real",
          "Productos ilimitados",
          "Cupones y promociones",
          "Analítica de clientes"
        ],
        popular: true,
        icon: <FiUsers />,
        recommendedFor: "Pequeñas empresas"
      },
      {
        id: "pro",
        name: "PRO",
        price: "$5,999",
        period: "año",
        description: "Para ventas de alto volumen",
        originalPrice: "$7,188",
        discount: "16% de descuento",
        features: [
          "Prendas ilimitadas vendidas",
          "Tiendas online ilimitadas",
          "Soporte premium 24/7",
          "Dashboard empresarial",
          "Reportes personalizados",
          "Productos ilimitados",
          "API de integración",
          "White-label",
          "Multi-usuario",
          "Analítica avanzada"
        ],
        popular: false,
        icon: <FiAward />,
        recommendedFor: "Empresas establecidas"
      }
    ]
  };

  const timePackages = [
    {
      id: "weekly",
      name: "SEMANAL",
      price: "$99",
      duration: "1 semana",
      description: "Ideal para eventos y temporadas cortas",
      features: [
        "Prendas ilimitadas por 7 días",
        "Todas las funciones PRO",
        "Soporte prioritario incluido",
        "Perfecto para ferias y eventos",
        "Sin compromiso a largo plazo"
      ],
      popular: false,
      icon: <FiCalendar />,
      badge: "POPULAR"
    },
    {
      id: "monthly",
      name: "MENSUAL",
      price: "$299",
      duration: "1 mes",
      description: "Flexibilidad mensual completa",
      features: [
        "Hasta 500 prendas vendidas",
        "Todas las funciones BUSINESS",
        "Soporte 12/5",
        "Ideal para pruebas extendidas",
        "Cancelación flexible"
      ],
      popular: true,
      icon: <FiBarChart2 />,
      badge: "RECOMENDADO"
    },
    {
      id: "semiannual",
      name: "6 MESES",
      price: "$1,499",
      duration: "6 meses",
      description: "Mejor valor por tu dinero",
      features: [
        "Hasta 500 prendas/mes",
        "Todas las funciones BUSINESS",
        "Soporte prioritario",
        "Ahorro del 16% vs mensual",
        "Estabilidad a mediano plazo"
      ],
      popular: false,
      icon: <FiStar />,
      badge: "AHORRO"
    }
  ];

  const handleSubscribe = (plan, type) => {
    setCurrentPlan({
      ...plan,
      type: type
    });
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    alert("¡Tu suscripción ha sido activada exitosamente!");
    setShowPayment(false);
    setCurrentPlan(null);
  };

  const handleBackToPlans = () => {
    setShowPayment(false);
    setCurrentPlan(null);
  };

  if (showPayment && currentPlan) {
    return (
      <PaymentSection 
        selectedPlan={currentPlan}
        onBack={handleBackToPlans}
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  return (
    <div className="subscriptions-container">
      <div className="subscriptions-header">
        <h1>Paquetes y Planes</h1>
        <p>Elige el plan perfecto basado en tu volumen de ventas y necesidades temporales</p>
        
        <div className="billing-toggle">
          <button
            className={`toggle-btn ${billingCycle === "monthly" ? "active" : ""}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Planes por Ventas
          </button>
          <button
            className={`toggle-btn ${billingCycle === "yearly" ? "active" : ""}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Planes Anuales
          </button>
        </div>
      </div>

      {/* Planes por Volumen de Ventas */}
      <div className="plans-section">
        <h2>PLANES POR VOLUMEN DE VENTAS</h2>
        <p className="section-subtitle">Paga según la cantidad de prendas que vendas cada mes</p>
        
        <div className="plans-grid">
          {plans[billingCycle].map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? "popular" : ""} ${
                selectedPlan === plan.id ? "selected" : ""
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && <div className="popular-badge">MÁS POPULAR</div>}
              
              <div className="plan-header">
                <div className="plan-icon">{plan.icon}</div>
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="recommended-for">
                  {plan.recommendedFor}
                </div>
              </div>

              <div className="plan-price">
                <div className="price-main">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="price-original">
                    <span className="original-price">${plan.originalPrice}</span>
                    <span className="discount">{plan.discount}</span>
                  </div>
                )}
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <FiCheck className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`subscribe-btn ${selectedPlan === plan.id ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe(plan, "suscripción");
                }}
              >
                {selectedPlan === plan.id ? "PLAN SELECCIONADO" : "SELECCIONAR PLAN"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Paquetes por Tiempo */}
      <div className="packages-section">
        <h2>PAQUETES POR TIEMPO</h2>
        <p className="section-subtitle">Flexibilidad total con nuestros planes temporales</p>
        
        <div className="packages-grid">
          {timePackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card ${pkg.popular ? "popular" : ""}`}
            >
              {pkg.popular && <div className="popular-badge">{pkg.badge}</div>}
              
              <div className="package-header">
                <div className="package-icon">{pkg.icon}</div>
                <h3>{pkg.name}</h3>
                <p className="package-duration">{pkg.duration}</p>
                <p className="package-description">{pkg.description}</p>
              </div>

              <div className="package-price">
                <span className="price">{pkg.price}</span>
                <span className="period">/{pkg.duration.toLowerCase()}</span>
              </div>

              <ul className="package-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}>
                    <FiCheck className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`package-btn ${pkg.popular ? "popular" : ""}`}
                onClick={() => handleSubscribe(pkg, "paquete temporal")}
              >
                CONTRATAR {pkg.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Información Adicional */}
      <div className="subscriptions-info">
        <h3>¿POR QUÉ ELEGIR NUESTROS PLANES?</h3>
        <div className="info-grid">
          <div className="info-card">
            <FiZap className="info-icon" />
            <h4>Escalable</h4>
            <p>Crece con tu negocio - cambia de plan cuando lo necesites</p>
          </div>
          <div className="info-card">
            <FiShoppingBag className="info-icon" />
            <h4>Basado en Ventas</h4>
            <p>Solo pagas por las prendas que realmente vendes</p>
          </div>
          <div className="info-card">
            <FiCalendar className="info-icon" />
            <h4>Flexibilidad Total</h4>
            <p>Planes semanales, mensuales o de 6 meses</p>
          </div>
          <div className="info-card">
            <FiCheck className="info-icon" />
            <h4>Sin Sorpresas</h4>
            <p>Precios claros sin cargos ocultos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;