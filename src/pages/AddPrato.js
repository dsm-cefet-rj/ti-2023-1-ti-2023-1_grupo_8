import { Col, Container, Form, Row ,Button} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, saveNewPrato } from "../features/pratoslice";
import { useNavigate } from "react-router-dom";

const AddPrato = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: "",
      preco: "",
    },
  });

  const disptach = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);

  const createNewPrato = (data) => {
    let payload = {
      nome: data.nome,
      preco: Number(data.preco),
    };
    disptach(saveNewPrato(payload))
      .unwrap()
      .then(() => {
        navigate("/cardapio");
      });
  };
  return (
    <>
      <Container className="mt-2">
        <Row><Col className="col-md-8 offset-md-2">
            <legend>Adicionar Novo Prato</legend>
            <Form onSubmit={handleSubmit(createNewPrato)}>
                
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>Nome:</Form.Label>
                    <Controller control={control} name="nome"
                    render={({ field }) => (
                        <Form.Control type="text" {...field}
                        placeholder="Entre com o nome do prato" />
                    )} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formValor">
                    <Form.Label>Preço:</Form.Label>
                    <Controller control={control} name="preco"
                    render={({ field }) => (
                        <Form.Control type="text" {...field}
                        placeholder="Entre com o preço do prato" />
                    )} />
                </Form.Group>

                <Button variant="dark" type="submit" disabled={apiStatus === "pending"}>
                    {apiStatus === "pending"? "Adicionando.........": "Adicionar" }
                </Button>
            </Form>
        </Col></Row>
      </Container>
    </>
  );
};

export default AddPrato;
