import { Link, useLocation } from "react-router-dom";
import "./home.css"
function Home() {
  const location = useLocation();

  return (
    <>

    <div className="titulo">
        <h1 className="appname">TableMaster</h1>
        <h2 className="pagename">Mais praticidade para você e seus clientes</h2>
    </div>
      <nav>
        <ul>
          <li>
            <Link to="/mesas" className={`btn-green ${location.pathname === "/mesas" ? "active" : "" }`}>
              Mesas
            </Link>
          </li>
          <li>
            <Link to="/cozinha" className={`btn-green ${location.pathname === "/cozinha" ? "active" : ""}`}>
              Cozinha
            </Link>
          </li>
          <li>
            <Link to="/cardapio" className={`btn-green ${location.pathname === "/cardapio" ? "active" : ""}`}>
              Cardápio
            </Link>
          </li>
          <li>
            <Link to="/garcom" className={`btn-green ${location.pathname === "/garcom" ? "active" : ""}`}>
              Garçom
            </Link>
          </li>
          <li>
            <Link to="/pedidos-concluidos" className={`btn-green ${location.pathname === "/pedidos-concluidos" ? "active" : ""}`}>
              Financeiro
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Home;