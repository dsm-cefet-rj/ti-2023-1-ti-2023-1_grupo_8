/*


import axios from "axios";
import { useState } from "react";

import { Form, Button } from "react-bootstrap";

const AddItem = () => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4000/cardapio", {
        nome,
        categoria,
        valor,
      });

      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Adicionar Item</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do item"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="categoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a categoria do item"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="valor">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o valor do item"
            value={valor}
            onChange={(event) => setValor(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Adicionar
        </Button>
      </Form>
    </div>
  );
};

export default AddItem;*/

import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { saveNewItem } from "../features/mesas/itemslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddItem = () => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("Bebidas");
  const [valor, setValor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     // await axios.post("http://localhost:4000/cardapio", {
  //     await saveNewItem({
  //       nome,
  //       categoria,
  //       valor: parseFloat(valor.replace(",", ".")), // Converter para número usando ponto como separador decimal
  //     });

  //     setNome("");
  //     setCategoria("Bebidas");
  //     setValor("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: "",
      categoria: "",
      valor: 0,
    },
  });

  const createNewItem = () => {
    let payload = {
      nome: nome,
      categoria: categoria,
      valor: parseFloat(valor.replace(",", ".")) // Converter para número usando ponto como separador decimal
    };
    dispatch(saveNewItem(payload))
      .unwrap().then(() => {
        navigate("/cardapio");
      });
  };

  const handleValorChange = (event) => {
    const inputValor = event.target.value;
    const regex = /^\d+(\,\d{0,2})?$/; // Expressão regular para validar o formato do valor

    if (regex.test(inputValor)) {
      setValor(inputValor);
    }
  };

  return (
    <div>
      <h1>Adicionar Item</h1>

      <Form onSubmit={handleSubmit(createNewItem)}>
        <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            control={control}
            type="text"
            placeholder="Digite o nome do item"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="categoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            control={control}
            as="select"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          >
            <option value="Bebidas">Bebidas</option>
            <option value="Comidas">Comidas</option>
            <option value="Sobremesas">Sobremesas</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="valor">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            control={control}
            type="text"
            placeholder="Digite o valor do item (ex: 10,90)"
            value={valor}
            onChange={handleValorChange} // Alteração no evento onChange para chamar a função handleValorChange
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Adicionar
        </Button>
      </Form>
    </div>
  );
};

export default AddItem;



