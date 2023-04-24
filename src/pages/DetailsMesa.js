import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getMesaById } from "../features/mesas/mesaslice";
import { useNavigate, useParams } from "react-router-dom";

const DetailsMesa = () => {
  const { id } = useParams();
  const itemToExibe = useSelector(getMesaById(Number(id)));

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: itemToExibe.nome,
      cadeiras: itemToExibe.cadeiras,
      status: itemToExibe.status,
      garcom: itemToExibe.garcom,
      pedidos: itemToExibe.pedidos.map((pedido) => {
        return {
          id: pedido.id,
          nome: pedido.nome,
          preco: pedido.preco,
          status: pedido.status,
        };
      }),
    },
  });

  const navigate = useNavigate();

  return (
    <Container className="mt-2">
      <Row>
        <Col className="col-md-8 offset-md-2">
          <h1>Detalhes da Mesa</h1>
          <h2>Mesa: {itemToExibe.nome}</h2>
          <h6>Quantidade de cadeiras: {itemToExibe.cadeiras}</h6>
          <h6>Garçom: {itemToExibe.garcom}</h6>
          <h6>Status: {itemToExibe.status}</h6>
          <h6>Pedidos: </h6>
          <ul>
            {itemToExibe.pedidos.map((pedido) => {
              return (
                <li key={pedido.id}>
                  {pedido.nome} - R$ {pedido.preco.toFixed(2)} - {pedido.status}
                </li>
              );
            })}
          </ul>
          <h6>Consumo: </h6>

          <Button variant="dark" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsMesa;

