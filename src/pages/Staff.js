import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFuncionario,
  fetchALLFuncionarios,
  getAllFuncionarios,
  getLoading,
} from "../features/funcionarioslice";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";

const Staff = () => {
  const allfuncionarios = useSelector(getAllFuncionarios);
  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  let contentToRender = "";
  const navigate = useNavigate();
  const [itemToDeleteId, setItemToDeleteId] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (allfuncionarios.length === 0) {
      dispatch(fetchALLFuncionarios());
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
    dispatch(deleteFuncionario(itemToDeleteId))
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
                    <th>Funcionario</th>
                    <th>Cargo</th>
                    <th>Salario</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {allfuncionarios.map((funcionario) => (
                    <tr key={funcionario.id}>
                        <td>{funcionario.nome}</td>
                        <td>{funcionario.cargo}</td>
                        <td>{funcionario.salario}</td>
                        <td>
                            <Button variant="dark" type="button"
                            onClick={() => {
                                navigate(`/edit-funcionario/${funcionario.id}`)
                            }}>
                                Editar
                            </Button>
                            <Button variant="danger" type="button"
                            onClick={() => {
                                openDeleteModalHandler(funcionario.id);
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
        body="Tem certeza que deseja excluir este funcionario?"
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
                navigate("/add-funcionario");
            }}>
              Adicionar Funcionario
            </Button>
          </Col>
        </div>
        <Row>{contentToRender}</Row>
      </Container>
    </>
  );
};

export default Staff;
