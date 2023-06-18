import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPedidosByMesaId,
  getPedidoByIdmesa,
  getLoading,
  atualizarStatusPedido,
  deletePedido as excluirPedido,
} from "../features/mesas/pedidoslice";
import "./ExibeMesa.css";
import QRCode from "qrcode.react";

const ExibeMesa = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const idmesa = location.pathname.split("/")[2];
  const pedidos = useSelector(getPedidoByIdmesa(parseInt(idmesa)));
  const loading = useSelector(getLoading);
  const [totalValue, setTotalValue] = useState(0);
  const [fecharContaClicked, setFecharContaClicked] = useState(false);
  const [registrarPagamentoClicked, setRegistrarPagamentoClicked] = useState(false);

  useEffect(() => {
    const mesaId = parseInt(idmesa);
    if (!isNaN(mesaId)) {
      console.log("ID da Mesa:", mesaId);
      dispatch(fetchPedidosByMesaId(mesaId));
    }
  }, [dispatch, idmesa]);

  useEffect(() => {
    console.log("Valor de idmesa:", idmesa);
  }, [idmesa]);

  useEffect(() => {
    // Filtrar os pedidos concluídos
    const pedidosEmAndamento = pedidos.filter((pedido) => pedido.status !== "concluído");

    // Calcula o valor total dos pedidos em andamento
    const calculatedTotalValue = pedidosEmAndamento.reduce(
      (total, pedido) => total + pedido.preco * pedido.quantidade,
      0
    );
    setTotalValue(calculatedTotalValue);
  }, [pedidos]);

  const handleFecharConta = () => {
    console.log("Fechando conta...");
    setFecharContaClicked(true);
  };

  const handleRegistrarPagamento = () => {
    // Alterar o status de todos os pedidos para "concluído"
    pedidos.forEach((pedido) => {
      if (pedido.status !== "concluído") {
        dispatch(atualizarStatusPedido({ id: pedido.id, status: "concluído" }));
      }
    });

    console.log("Pagamento registrado com sucesso!");
    setRegistrarPagamentoClicked(true);
  };

  const handleExcluirPedido = (pedidoId) => {
    // Alterar o status do pedido para "cancelado"
    dispatch(atualizarStatusPedido({ id: pedidoId, status: "cancelado" }));

    // Excluir o pedido
    dispatch(excluirPedido(pedidoId));
  };

  if (loading === "pending") {
    return <div>Carregando...</div>;
  }

  if (!idmesa || isNaN(parseInt(idmesa))) {
    return <div>ID da Mesa inválido.</div>;
  }

  // Filtrar pedidos concluídos
  const pedidosExibicao = pedidos.filter((pedido) => pedido.status !== "concluído");

  return (
    <div className="exibe-mesa">
      <h2>Pedidos da Mesa {idmesa}</h2>
      <div className="pedidos-container">
        {pedidosExibicao.length > 0 ? (
          pedidosExibicao.map((pedido) => (
            <div key={pedido._id} className={`pedido-item status-${pedido.status}`}>
              <p>Item: {pedido.nome}</p>
              <p>Preço: R$ {pedido.preco}</p>
              
              <p>Quantidade: {pedido.quantidade}</p>
              {!fecharContaClicked && (
                <button onClick={() => handleExcluirPedido(pedido.id)}>Excluir</button>
              )}
              {pedido.status === "pendente" && <span className="bandeirinha pendente">Pendente</span>}
              {pedido.status === "pronto" && <span className="bandeirinha pronto">Pronto</span>}
              {pedido.status === "entregue" && <span className="bandeirinha entregue">Entregue</span>}
            </div>
          ))
        ) : (
          <p>Nenhum pedido em andamento encontrado para a mesa {idmesa}.</p>
        )}
      </div>
      <div className="total-container">
        <p className="total-text">Total:</p>
        <p className="total-value">R$ {totalValue.toFixed(2)}</p>
      </div>
      {(
        <button className="fechar-conta-button" onClick={handleFecharConta}>
          Fechar Conta
        </button>
      )}
      {(
        <button className="registrar-pagamento-button" onClick={handleRegistrarPagamento}>
          Registrar Pagamento
        </button>
      )}
      {fecharContaClicked && (
        <div className="qrcode-container">
          <QRCode
            value={`00020126360014BR.GOV.BCB.PIX0114+55219864077575204000053039865404${totalValue.toFixed(
              2
            )}5802BR5925Ricardo Fernandes de Arau6014Rio de Janeiro62070503***6304B804`}
            size={300}
          />
        </div>
      )}
    </div>
  );
};

export default ExibeMesa;



