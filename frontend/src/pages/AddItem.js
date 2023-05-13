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

const AddItem = () => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("Bebidas"); // Inicializado com "Bebidas"
  const [valor, setValor] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4000/cardapio", {
        nome,
        categoria,
        valor,
      });

      // Limpa os campos do formulário após a submissão bem-sucedida
      setNome("");
      setCategoria("Bebidas");
      setValor("");
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
            as="select" // Mudança aqui para o input do tipo "select"
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

export default AddItem;


