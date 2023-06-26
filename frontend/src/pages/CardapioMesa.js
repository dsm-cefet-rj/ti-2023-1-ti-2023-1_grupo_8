import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PedidoMesa from "./PedidoMesa";
import { Table } from "react-bootstrap";
import "./CardapioMesa.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchALLItens, getAllItens } from "../features/mesas/itemslice";




const CardapioMesa = () => {
    const cardapio = useSelector(getAllItens);
    const [cardapioPorCategoria, setCardapioPorCategoria] = useState({});
    const { id } = useParams();

    const dispatch = useDispatch();
  
    useEffect(() => {
      console.log(cardapio);
      if (cardapio.length === 0) {
        dispatch(fetchALLItens());
      }
    }, [cardapio, dispatch]);
  




    
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
                    <PedidoMesa itemPedido={{ nome: item.nome, preco: item.valor }} idmesa={id} />

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

