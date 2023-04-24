import axios from "axios";
//impotando o css
import "./AllMesas.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMesa,
  fetchALLMesas,
  getAllMesas,
  getLoading,
} from "../features/mesas/mesaslice";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";

const AllMesas = () => {
  const allmesas = useSelector(getAllMesas);
  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  let contentToRender = "";
  const navigate = useNavigate();
  const [itemToDeleteId, setItemToDeleteId] = useState(0);
  const [showModal, setShowModal] = useState(false);

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
        <Row xs={1} md={4} className="g-4">
          {allmesas.map((mesa) => (
            <Col key={mesa.id}>

              
              <Card border="light" style={{ width: '1rem' }}>
               
                <Card.Body className={`mesa ${mesa.status}`}>
                  <Card.Title>Mesa {mesa.nome}</Card.Title>
                  <Card.Text>Lugares: {mesa.cadeiras}</Card.Text>
                  <Card.Text>{mesa.status}</Card.Text>
                  <Button
                    variant="dark"
                    type="button"
                    onClick={() => {
                      navigate(`/edit-mesa/${mesa.id}`);
                    }}
                  >
                    Editar
                  </Button>
                  
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                      openDeleteModalHandler(mesa.id);
                    }}
                  >
                    Excluir
                  </Button>

                  <Button
                    variant="dark"
                    type="button"
                    onClick={() => {
                      navigate(`/exibe-mesa/${mesa.id}`);
                    }}
                  >
                    Detalhes
                  </Button>

                </Card.Body>
              </Card>
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

export default AllMesas;
