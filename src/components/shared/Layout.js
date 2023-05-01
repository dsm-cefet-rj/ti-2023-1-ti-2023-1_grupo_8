import { Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';

const Layout = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          Mesas
        </Navbar.Brand>
         - 
        <Navbar.Brand href="/cardapio">
          Cardapio
        </Navbar.Brand>
         - 
        <Navbar.Brand href="/staff">
          Staff
        </Navbar.Brand>
      </Navbar>
      <Container>{props.children}</Container>
    </>
  );
};
export default Layout;
