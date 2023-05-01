import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePrato,
  fetchALLPratos,
  getAllPratos,
  getLoading,
} from "../features/pratoslice"; 
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";

const Cardapio = () => {
  const allpratos = useSelector(getAllPratos);
  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  let contentToRender = "";
  const navigate = useNavigate();
  const [itemToDeleteId, setItemToDeleteId] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (allpratos.length === 0) {
      dispatch(fetchALLPratos());
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
    dispatch(deletePrato(itemToDeleteId))
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
        <table>
            <thead>
                <tr>
                    <th>Prato</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {allpratos.map((prato) => (
                    <tr key={prato.id}>
                        <td>{prato.nome}</td>
                        <td>{prato.preco}</td>
                        <td>
                            <Button variant="dark" type="button"
                            onClick={() => {
                                console.log(prato)
                            }}>
                                Pedir Prato
                            </Button>
                            <Button variant="dark" type="button"
                            onClick={() => {
                                navigate(`/edit-prato/${prato.id}`)
                            }}>
                                Editar
                            </Button>
                            <Button variant="danger" type="button"
                            onClick={() => {
                                openDeleteModalHandler(prato.id);
                            }}>
                                Excluir
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    );

  return (
    <>
      <DeleteConfirmation
        title="Confirma exclusão!"
        body="Tem certeza que deseja excluir este prato?"
        showModal={showModal}
        apiStatus={apiStatus}
        hideDeleteModalHandler={hideDeleteModalHandler}
        confirmDeleteModalHandler={confirmDeleteModalHandler}
      ></DeleteConfirmation>
      <Container className="mt-2">
        <div className="div-1">
          <Col className="col-md-4 offset-md-4">
            <Button variant="dark" type="button"
            onClick={() => {
                navigate("/add-prato");
            }}>
              Adicionar Prato
            </Button>
          </Col>
        </div>
        <Row>{contentToRender}</Row>
      </Container>
    </>
  );
};

export default Cardapio;
