import axios from "axios";
//impotando o css
//import "./Cozinha.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateMesa,
  deleteMesa,
  fetchALLMesas,
  getAllMesas,
  getLoading,
} from "../features/mesas/mesaslice";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";
import CheckButton from "../components/CheckButton";


const Cozinha = () => {
  const allmesas = useSelector(getAllMesas);
  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  let contentToRender = "";
  const navigate = useNavigate();
  const [itemToDeleteId, setItemToDeleteId] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const updatePedidoStatus = async (pedidoId) => {
    try {
      const response = await axios.put(`/api/pedidos/${pedidoId}`, {
        status: "pronto",
      });
      const { mesaId } = response.data;
  
      // Atualiza a mesa correspondente no store do Redux
      dispatch(updateMesa({ id: mesaId }));
    } catch (error) {
      console.error(error);
    }
  };
  



  useEffect(() => {
    if (allmesas.length == 0) {
      dispatch(fetchALLMesas());
    }
  }, [dispatch]);

  const openDeleteModalHandler = (id) => {
    setShowModal(true);
    setItemToDeleteId(id);
  };

  const hideDeleteModalHandler = () => {
    setShowModal(false);
    setItemToDeleteId(0);
  };

  const confirmDeleteModalHandler = () => {
    dispatch(deleteMesa(itemToDeleteId))
      .unwrap()
      .then(() => {
        setShowModal(false);
        setItemToDeleteId(0);
      });
  };

  contentToRender =
    apiStatus === "pending" ? (
      <>
        <div className=" d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </>
    ) : (
      <div>
        <Row xs={1} md={1} className="g-4">
          {allmesas.map((mesa) => (
            <Col key={mesa.id}>

            
               
                <ul>

                 {mesa.pedidos.map((pedido) => (
                 <Card>

                 <div key={pedido.id}>
                 <h6>Nº do Pedido: {pedido.id}</h6>
                 <h6>Mesa: {mesa.nome}</h6>
                 <h6>Nome: {pedido.nome}</h6>
                 <h6>Preço: {pedido.preco}</h6>
                 <h6>Status: {pedido.status}</h6>
                 
                 <CheckButton
  pedido={pedido}
  onUpdateStatus={(pedido) => {
    return axios.put(`/api/pedidos/${pedido.id}`, { status: "pronto" })
      .then(() => {
        dispatch(updatePedidoStatus(pedido.id));
      });
  }}
/>





                 </div>
                 </Card>

                 ))}
                </ul>
     
            </Col>
          ))}
        </Row>
      </div>
    );

  return (
    <>
      <DeleteConfirmation
        title="Confirma exclusão!"
        body="Tem certeza que deseja excluir esta mesa?"
        showModal={showModal}
        apiStatus={apiStatus}
        hideDeleteModalHandler={hideDeleteModalHandler}
        confirmDeleteModalHandler={confirmDeleteModalHandler}
      ></DeleteConfirmation>
      <Container className="mt-2">
        <div className="div-1">
          <Col className="col-md-4 offset-md-4">
            <Button
              variant="dark"
              type="button"
              onClick={() => {
                navigate("/add-mesa");
              }}
            >
              Adicionar Mesa
            </Button>
            <Button
              variant="dark"
              type="button"
              onClick={() => {
                navigate("/cozinha");
              }}
            >
              Cozinha
            </Button>
          </Col>
        </div>
        <Row>{contentToRender}</Row>
      </Container>
    </>
  );
};

export default Cozinha;
