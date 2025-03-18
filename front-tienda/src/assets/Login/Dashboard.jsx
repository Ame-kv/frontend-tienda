import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import UserDashboard from "../../views/UserDashboard";
import ProductDashboard from "../../views/ProductDashboard";

const productsData = [
  { id: 1, name: "Camiseta Negra", price: "$20" },
  { id: 2, name: "Jeans Azul", price: "$35" },
  { id: 3, name: "Zapatillas Blancas", price: "$50" },
  { id: 4, name: "Chaqueta de Cuero", price: "$80" },
  { id: 5, name: "Gorra Roja", price: "$15" },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Mi Tienda</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/product-dashboard" element={<ProductDashboard />}>Productos</Nav.Link>
              <Nav.Link as={Link} to="/user-dashboard" element={<UserDashboard />}>Usuarios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido principal */}
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ 
          minHeight: "100vh", 
          width: "100vw", 
          backgroundColor: "rgba(0, 0, 0, 0.1)" 
        }}>
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100" 
            style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.9)", 
              borderRadius: "12px", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
              padding: "3rem",
              maxWidth: "1200px", 
              width: "100%" 
            }}>

          <h2 className="text-dark mb-4">Lista de Productos</h2>

          {/* Barra de búsqueda */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "500px", width: "100%" }} 
          />

          {/* Lista de productos */}
          <ul className="list-group mt-3" style={{ maxHeight: "400px", overflowY: "auto", width: "100%" }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {product.name}
                  <span className="badge bg-primary rounded-pill">{product.price}</span>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center text-muted">No se encontraron productos</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}