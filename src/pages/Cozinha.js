import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePedido,
  fetchALLPedidos as fetchAllPedidos,
  getAllPedidos,
  getLoading,
} from "../features/mesas/pedidoslice";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckButton from "../components/CheckButton";

const Cozinha = () => {
  const allPedidos = useSelector(getAllPedidos);
  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllPedidos());
  }, [dispatch]);

  const updatePedidoStatus = async (pedidoId) => {
    try {
      const updatedPedido = allPedidos.find((pedido) => pedido.id === pedidoId);
      await axios.patch(
        `http://localhost:4000/pedidos/${pedidoId}`,
        { status: "pronto" }
      );
      dispatch(updatePedido({ ...updatedPedido, status: "pronto" }));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePedidoPronto = (pedido) => {
    updatePedidoStatus(pedido.id);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const renderPedido = (pedido) => {
    return (
      <Col key={pedido.id}>
        <Card>
          <div>
            <h6>Número do Pedido: {pedido.id}</h6>
            <h6>Mesa: {pedido.idmesa}</h6>
            <h6>Item: {pedido.nome}</h6>
            <h6>Quantidade: {pedido.quantidade}</h6>
            <h6>Status: {pedido.status}</h6>
            <CheckButton
              pedido={pedido}
              onUpdateStatus={() => updatePedidoStatus(pedido.id)}
            />
          </div>
        </Card>
      </Col>
    );
  };

  const renderContent = () => {
    if (apiStatus === "pending") {
      return (
        <div className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    } else if (allPedidos.length === 0) {
      return <h6>Não há pedidos a serem exibidos</h6>;
    } else {
      return (
        <Row xs={1} md={2} lg={3} className="g-4">
          {allPedidos.filter((pedido) => pedido.status === 'pendente').map((pedido) => renderPedido(pedido))}
        </Row>
      );
    }
  };

  return (
    <Container className="mt-2">

      <h2>Cozinha</h2>
      {renderContent()}
    </Container>
  );
};

export default Cozinha;