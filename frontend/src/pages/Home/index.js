import { Link, useLocation } from "react-router-dom";
import "./home.css";

function Home() {
  const location = useLocation();

  return (
    <div className="container">
      <div className="titulo">
        <h1 className="appname">TableMaster</h1>
        <h2 className="pagename">Mais praticidade para você e seus clientes</h2>
      </div>
      <nav className="d-flex flex-wrap justify-content-center">
        <Link
          to="/mesas"
          className={`btn-green ${location.pathname === "/mesas" ? "active" : ""}`}
        >
          Mesas
        </Link>
        <Link
          to="/cozinha"
          className={`btn-green ${location.pathname === "/cozinha" ? "active" : ""}`}
        >
          Cozinha
        </Link>
        <Link
          to="/cardapio"
          className={`btn-green ${location.pathname === "/cardapio" ? "active" : ""}`}
        >
          Cardápio
        </Link>
        <Link
          to="/garcom"
          className={`btn-green ${location.pathname === "/garcom" ? "active" : ""}`}
        >
          Garçom
        </Link>
        <Link
          to="/pedidos-concluidos"
          className={`btn-green ${location.pathname === "/pedidos-concluidos" ? "active" : ""}`}
        >
          Financeiro
        </Link>
      </nav>
    </div>
  );
}

export default Home;


