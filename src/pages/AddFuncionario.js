import { Col, Container, Form, Row ,Button} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, saveNewFuncionario } from "../features/funcionarioslice";
import { useNavigate } from "react-router-dom";

const AddFuncionario = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: "",
      cargo: "",
      salario: "",
    },
  });

  const disptach = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);

  const createNewFuncionario = (data) => {
    let payload = {
      nome: data.nome,
      cargo: data.cargo,
      salario: Number(data.salario),
    };
    disptach(saveNewFuncionario(payload))
      .unwrap()
      .then(() => {
        navigate("/staff");
      });
  };
  return (
    <>
      <Container className="mt-2">
        <Row><Col className="col-md-8 offset-md-2">
            <legend>Adicionar Novo Funcionario</legend>
            <Form onSubmit={handleSubmit(createNewFuncionario)}>
                
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>Nome:</Form.Label>
                    <Controller control={control} name="nome"
                    render={({ field }) => (
                        <Form.Control type="text" {...field}
                        placeholder="Entre com o nome do funcionario" />
                    )} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCargo">
                    <Form.Label>Cargo:</Form.Label>
                    <Controller control={control} name="cargo"
                    render={({ field }) => (
                        <Form.Control type="text" {...field}
                        placeholder="Entre com o cargo do funcionario" />
                    )} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSalario">
                    <Form.Label>Salario:</Form.Label>
                    <Controller control={control} name="salario"
                    render={({ field }) => (
                        <Form.Control type="text" {...field}
                        placeholder="Entre com o salario do funcionario" />
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

export default AddFuncionario;
