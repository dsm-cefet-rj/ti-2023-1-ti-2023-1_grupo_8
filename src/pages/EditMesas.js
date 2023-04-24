import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getMesaById,
  getLoading,
  saveNewMesa,
  updateMesa,
} from "../features/mesas/mesaslice";
import { useNavigate, useParams } from "react-router-dom";






const EditMesa = () => {
  const { id } = useParams();
  const itemToEdit = useSelector(getMesaById(Number(id)));
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: itemToEdit.nome,
      cadeiras: itemToEdit.cadeiras,
      status: itemToEdit.status,
      garcom: itemToEdit.garcom,
      pedidos: itemToEdit.pedidos,
    },
  });

  const disptach = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);

  const updateMesaForm = (data) => {
    let payload = {
      id: Number(id),
      nome: data.nome,
      cadeiras: Number(data.cadeiras),
      garcom: data.garcom,
      status: data.status,
      pedidos: data.pedidos,
    };
    disptach(updateMesa(payload))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Atualizar Mesa</legend>
            <Form onSubmit={handleSubmit(updateMesaForm)}>
              
              
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label>Identificação</Form.Label>
                <Controller
                  control={control}
                  name="nome"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} />
                  )}
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formModelCadeiras">
                <Form.Label>Quantidade de cadeiras</Form.Label>
                <Controller
                  control={control}
                  name="cadeiras"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} />
                  )}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formModelGarcom">
                <Form.Label>Garçom</Form.Label>
                <Controller
                  control={control}
                  name="garcom"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} />
                  )}
                />
              </Form.Group>


              
              <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Controller
              control={control}
              name="status"
              render={({ field }) => (
                  <Form.Select {...field}>
                    <option value="">Selecione uma opção</option>
                    <option value="livre">Livre</option>
                    <option value="ocupada">Ocupada</option>
                 </Form.Select>
              )}
              />
              </Form.Group>
              
              
              <Button
                variant="dark"
                type="submit"
                disabled={apiStatus === "pending"}
              >
                {apiStatus === "pending" ? "Atualizando........." : "Atualizar"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditMesa;
