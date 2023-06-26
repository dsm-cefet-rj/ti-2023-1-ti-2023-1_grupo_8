// import { Container } from "react-bootstrap";
// import Navbar from 'react-bootstrap/Navbar';

// const Layout = (props) => {
//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Navbar.Brand href="#home">Home</Navbar.Brand>
//       </Navbar>
//       <Container>{props.children}</Container>
//     </>
//   );
// };
// export default Layout;

import { Container, Button } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import "./estilolayout.css"

const Layout = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">TableMaster 2.0</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <nav className="ml-auto">
            <Button variant="success" as={Link} to="/home" style={{ marginRight: "20px" }}>
              Home
            </Button>
            <Button variant="success" as={Link} to="/mesas" style={{ marginRight: "20px" }}>
              Mesas
            </Button>
            <Button variant="success" as={Link} to="/cardapio" style={{ marginRight: "20px" }}>
              Cardápio
            </Button>
            <Button variant="success" as={Link} to="/cozinha" style={{ marginRight: "20px" }}>
              Cozinha
            </Button>
            <Button variant="success" as={Link} to="/garcom" style={{ marginRight: "20px" }}>
              Garçom
            </Button>
            <Button variant="success" as={Link} to="/pedidos-concluidos" style={{ marginRight: "20px" }}>
              Financeiro
            </Button>

          </nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>{props.children}</Container>
    </>
  );
};

export default Layout;


