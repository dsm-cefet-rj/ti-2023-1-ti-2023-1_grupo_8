import { Col, Container, Form, Row ,Button} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, saveNewMesa } from "../features/mesas/mesaslice";
import { useNavigate } from "react-router-dom";

const AddMesa = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: "",
      cadeiras: "",
      garcom: "",
      status: "livre",
      pedidos: [],
    },
  });

  const disptach = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);

  const createNewMesa = (data) => {
    let payload = {
      nome: Number(data.nome),
      cadeiras: Number(data.cadeiras),
      garcom: data.garcom,
      status: data.status,
      pedidos: data.pedidos,
    };
    disptach(saveNewMesa(payload))
      .unwrap()
      .then(() => {
        navigate("/mesas");
      });
  };
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Adicionar Nova Mesa</legend>
            <Form onSubmit={handleSubmit(createNewMesa)} >

              <Form.Group className="mb-3" controlId="formModelCadeiras">
                <Form.Label>Quantidade de Cadeiras:</Form.Label>
                <Controller
                  control={control}
                  name="cadeiras"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} placeholder="Entre com a quantidade de cadeiras" />
                  )}
                />
              </Form.Group>
             
             
             
              <Form.Group className="mb-3" controlId="formGarcom">
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
                    <Form.Control type="text" {...field} />
                  )}
                />
              </Form.Group>
             
             
             
             
             
             
             
             
              <Button variant="dark" type="submit" disabled={apiStatus === "pending"}>
                {apiStatus === "pending"? "Adicionando.........": "Adicionar" }
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddMesa;
