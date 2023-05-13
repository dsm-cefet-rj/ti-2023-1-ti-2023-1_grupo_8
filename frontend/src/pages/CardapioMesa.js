import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PedidoMesa from "./PedidoMesa";
import { Table } from "react-bootstrap";
import "./CardapioMesa.css";
import { useNavigate, useParams } from "react-router-dom";

const CardapioMesa = () => {
    const [cardapio, setCardapio] = useState([]);
    const [cardapioPorCategoria, setCardapioPorCategoria] = useState({});
    const { id } = useParams();
  
    useEffect(() => {
      const loadCardapio = async () => {
        const { data } = await axios.get("http://localhost:4000/cardapio");
        setCardapio(data);
      };
  
      loadCardapio();
    }, []);
  
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
        <h1>Cardápio Mesa {id}</h1>
  
        {Object.entries(cardapioPorCategoria).map(([categoria, itens]) => (
          <div key={categoria}>
            <h2 className="categoria">{categoria}</h2>
            <Table responsive>
              <tbody>
                {itens.map((item, index) => (
                  <tr key={index}>

                    <td>
                      <PedidoMesa
                        itemPedido={{ nome: item.nome, preco: item.valor }}
                        
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
      </div>
    );
  };

export default CardapioMesa;
