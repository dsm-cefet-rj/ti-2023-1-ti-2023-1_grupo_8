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
  getPedidoByIdmesa,
} from "../features/mesas/pedidoslice";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CheckButton from "../components/CheckButton";

const PedidoItem = ({ pedido, onUpdateStatus }) => {
  return (
    <Col key={pedido.id}>
      <Card>
        <div>
          <h6>Número do Pedido: {pedido.id}</h6>
          <h6>Mesa: {pedido.idmesa}</h6>
          <h6>Item: {pedido.nome}</h6>
          <h6>Quantidade: {pedido.quantidade}</h6>
          <h6>Status: {pedido.status}</h6>
          <CheckButton pedido={pedido} onUpdateStatus={() => onUpdateStatus(pedido.id)} />
        </div>
      </Card>
    </Col>
  );
};

const DetailsMesa = () => {
  const allPedidos = useSelector(getAllPedidos);
  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("ID :", id);

  useEffect(() => {
    dispatch(fetchAllPedidos());
  }, [dispatch]);

  const updatePedidoStatus = async (pedidoId) => {
    try {
      const updatedPedido = allPedidos.find((pedido) => pedido.id === pedidoId);
      console.log(pedidoId);
      await dispatch(updatePedido({ id: pedidoId, status: "pronto" }));
    } catch (error) {
      console.error(error);
    }
  };

  const pedidosFiltrados = useSelector(getPedidoByIdmesa(id)).filter(
    (pedido) => pedido.status === "pendente"
  );

  const PedidoList = () => {
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
      if (pedidosFiltrados.length === 0) {
        return <h6>Não há pedidos para essa mesa</h6>;
      }

      return (
        <Row xs={1} md={2} lg={3} className="g-4">
          {pedidosFiltrados.map((pedido) => (
            <PedidoItem
              key={pedido.id}
              pedido={pedido}
              onUpdateStatus={updatePedidoStatus}
            />
          ))}
        </Row>
      );
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Container className="mt-2">
      <h2>DetailsMesa</h2>
      <PedidoList />
    </Container>
  );
};

export default DetailsMesa;






/*
//quase lá
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPedidosByMesaId, getAllPedidos } from "../features/mesas/pedidoslice";

const DetailsMesa = (idmesa) => {
  const { idmesa } = useParams();
  const dispatch = useDispatch();
  console.log("ID da Mesa:", idmesa);
  useEffect(() => {
    console.log("ID da Mesa:", idmesa); // Verifica o ID da mesa

    dispatch(fetchPedidosByMesaId(idmesa));
  }, [dispatch, idmesa]);

  const pedidos = useSelector(getAllPedidos);
  const totalConsumido = pedidos.reduce(
    (total, pedido) => total + pedido.preco * pedido.quantidade,
    0
  );

  console.log("Pedidos:", pedidos); // Verifica os pedidos
  console.log("Total Consumido:", totalConsumido); // Verifica o total consumido

  return (
    <div>
      <h1>Pedidos da Mesa {idmesa}</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido._id}>
            {pedido.nome} - R${pedido.preco} x {pedido.quantidade}
          </li>
        ))}
      </ul>
      <h2>Total Consumido: R${totalConsumido}</h2>
    </div>
  );
};

export default DetailsMesa;*/








/*import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMesaById } from "../features/mesas/mesaslice";

const DetailsMesa = () => {
  const { id } = useParams();
  const itemToExibe = useSelector(getMesaById(Number(id)));
  const pedidosToExibe = useSelector(state =>
    state.pedidos.pedidosData.filter(pedido => pedido.idmesa === Number(id))
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: itemToExibe?.nome,
      cadeiras: itemToExibe?.cadeiras,
      status: itemToExibe?.status,
      garcom: itemToExibe?.garcom,
      pedidos: pedidosToExibe.map(pedido => ({
        id: pedido.id,
        nome: pedido.nome,
        preco: pedido.preco,
        status: pedido.status,
      })),
    },
  });

  return (
    <Container className="mt-2">
      <Row>
        <Col className="col-md-8 offset-md-2">
          <h1>Detalhes da Mesa</h1>
          <h2>Mesa: {itemToExibe?.id}</h2>
          <h6>Quantidade de cadeiras: {itemToExibe?.cadeiras}</h6>
          <h6>Garçom: {itemToExibe?.garcom}</h6>
          <h6>Status: {itemToExibe?.status}</h6>
          <h6>Pedidos: </h6>
          <ul>
            {pedidosToExibe.map(pedido => (
              <li key={pedido.id}>
                {pedido.nome} - R$ {pedido.preco.toFixed(2)} - {pedido.status}
              </li>
            ))}
          </ul>
          <h6>Consumo: </h6>
          <Button variant="dark" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsMesa;*/


