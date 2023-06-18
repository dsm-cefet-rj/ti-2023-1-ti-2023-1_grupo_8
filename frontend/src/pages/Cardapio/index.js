import axios from "axios";
import { useEffect, useState } from "react";
import "./estilocardapio.css";
import { Button, Card, Modal } from "react-bootstrap";
import PedidoMesa from "../PedidoMesa";
import AddItem from "../AddItem";
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchALLItens,
  deleteItem,
  getAllItens,
  getLoading,
} from "../../features/mesas/itemslice";
import CurrencyFormat from "react-currency-format";

export const Cardapio = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioPorCategoria, setCardapioPorCategoria] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadCardapio = async () => {
      const { data } = await axios.get("http://localhost:4000/cardapio");
      setCardapio(data);
    };

    loadCardapio();
  }, []);

  const handleDeleteItem = async () => {
    await dispatch(deleteItem(itemIdToDelete));
    dispatch(fetchALLItens());
    setShowModal(false);
    window.location.reload();
  };

  const navigate = useNavigate();

  useEffect(() => {
    const categorias = cardapio.reduce((acc, item) => {
      const categoria = item.categoria;

      if (!acc[categoria]) {
        acc[categoria] = [];
      }

      acc[categoria].push(item);
      return acc;
    }, {});

    setCardapioPorCategoria(categorias);
  }, [cardapio]);

  return (
    <div className="cardapio">
      <h1>Cardápio</h1>

      {Object.entries(cardapioPorCategoria).map(([categoria, itens]) => (
        <div key={categoria}>
          <h2 className="categoria">{categoria}</h2>
          {itens.map((item, index) => (
            <div className="item" key={index}>
              <div className="nome">{item.nome}</div>
              <div className="valor">
  <CurrencyFormat
    value={item.valor}
    displayType={"text"}
    prefix={"R$ "}
    decimalSeparator={","}
    fixedDecimalScale={true}
    decimalScale={2}
  />
</div>
<h6>&nbsp; </h6>
              <Button
                variant="outline-danger"
                onClick={() => {
                  setShowModal(true);
                  setItemIdToDelete(item.id);
                }}
              >
                <i><FaTrash /></i> {/* substitua "Excluir" pelo ícone da lixeira */}
              </Button>
            </div>
          ))}

        </div>

                


      ))}

<Button
            variant="dark"
            type="button"
            onClick={() => {
              navigate("/add-item");
            }}
          >
            Adicionar Item
          </Button>



      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja realmente excluir este item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};







/*

//está funcionando a exclusão de itens, mas não está atualizando a página

import axios from "axios";
import { useEffect, useState } from "react";
import "./estilocardapio.css";
import { Button, Card } from "react-bootstrap";
import PedidoMesa from "../PedidoMesa";
import AddItem from "../AddItem";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchALLItens, deleteItem, getAllItens, getLoading } from "../../features/mesas/itemslice";

export const Cardapio = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioPorCategoria, setCardapioPorCategoria] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCardapio = async () => {
      const { data } = await axios.get("http://localhost:4000/cardapio");
      setCardapio(data);
    };

    loadCardapio();
  }, []);

  const handleDeleteItem = async (id) => {
    await dispatch(deleteItem(id));
    dispatch(fetchALLItens());
  };

  const navigate = useNavigate();

  useEffect(() => {
    const categorias = cardapio.reduce((acc, item) => {
      const categoria = item.categoria;

      if (!acc[categoria]) {
        acc[categoria] = [];
      }

      acc[categoria].push(item);
      return acc;
    }, {});

    setCardapioPorCategoria(categorias);
  }, [cardapio]);

  return (
    <div className="cardapio">
      <h1>Cardápio</h1>

      {Object.entries(cardapioPorCategoria).map(([categoria, itens]) => (
        <div key={categoria}>
          <h2 className="categoria">{categoria}</h2>
          {itens.map((item, index) => (

                <div className="item" key={index}>
                  <div className="nome">{item.nome}</div>
                  <div className="valor">{item.valor}</div>
                  <Button variant="danger" onClick={() => handleDeleteItem(item.id)}>
                    x
                  </Button>
                </div>

          ))}
          <Button
            variant="dark"
            type="button"
            onClick={() => {
              navigate("/add-item");
            }}
          >
            Adicionar Item
          </Button>
        </div>
      ))}
    </div>
  );
};

*/
