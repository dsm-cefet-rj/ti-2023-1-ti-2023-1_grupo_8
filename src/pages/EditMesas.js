
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getMesaById,//getMesaById é uma função que está no mesaslice.js e que retorna uma mesa pelo id
  getLoading,//getLoading é uma função que está no mesaslice.js e que retorna o estado da aplicação
  saveNewMesa,//saveNewMesa é uma função que está no mesaslice.js e que dispara uma ação para o redux
  updateMesa,//updateMesa é uma função que está no mesaslice.js e que dispara uma ação para o redux
} from "../features/mesas/mesaslice";
import { useNavigate, useParams } from "react-router-dom";

//handleSubmit é uma função que recebe uma função como parâmetro e que é executada quando o formulário é submetido
const EditMesa = () => {
  const { id } = useParams();//useParams é um hook que retorna os parâmetros da rota
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

  const disptach = useDispatch();//dispatch é uma função que dispara uma ação para o redux e o redux vai atualizar o estado da aplicação
  const navigate = useNavigate();//useNavigate é um hook que permite a navegação entre as rotas
  const apiStatus = useSelector(getLoading);

  const updateMesaForm = (data) => {
    let payload = {//payload é um objeto que contém os dados que serão enviados para o redux 
      id: Number(id),
      nome: data.nome,
      cadeiras: Number(data.cadeiras),
      garcom: data.garcom,
      status: data.status,
      pedidos: data.pedidos,
    };
    disptach(updateMesa(payload))//updateMesa é uma função que está no mesaslice.js e que dispara uma ação para o redux
      .unwrap()
      .then(() => {//then é uma função que é executada após a promise ser resolvida
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
                  control={control}//control é um objeto que contém as funções do react-hook-form
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
