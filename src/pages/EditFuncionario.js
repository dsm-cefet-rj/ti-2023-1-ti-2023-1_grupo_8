import { Col, Container, Form, Row ,Button} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getFuncionarioById, getLoading, updateFuncionario } from "../features/funcionarioslice";
import { useNavigate, useParams } from "react-router-dom";

const EditFuncionario = () => {
    const { id } = useParams();
    const itemToEdit = useSelector(getFuncionarioById(Number(id)));
    const { control, handleSubmit } = useForm({
      defaultValues: {
        nome: itemToEdit.nome,
        cargo: itemToEdit.cargo,
        salario: itemToEdit.salario,
      },
  });

  const disptach = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);

  const updateFuncionarioForm = (data) => {
    let payload = {
      id: Number(id),
      nome: data.nome,
      cargo: data.cargo,
      salario: Number(data.salario),
    };
    disptach(updateFuncionario(payload))
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
            <Form onSubmit={handleSubmit(updateFuncionarioForm)}>
                
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
                    {apiStatus === "pending"? "Atualizando.........": "Atualizar" }
                </Button>
            </Form>
        </Col></Row>
      </Container>
    </>
  );
};

export default EditFuncionario;
