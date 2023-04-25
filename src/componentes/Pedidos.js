import React, { useState } from 'react';
import PedidoItem from './PedidoItem';
import NovoPedidoModal from './NovoPedidoModal';
import './NovoPedidoButton.css';
import './PedidosCSS.css';

function Pedidos({ pedidos }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Pedidos</h1>
      <table>
        <thead>
          <tr>
            <th>ID do Pedido</th>
            <th>Mesa</th>
            <th>Valor</th>
            <th>Itens</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <PedidoItem key={pedido.id} pedido={pedido} />
          ))}
        </tbody>
      </table>
      <div className="novo-pedido-button">
        <button onClick={() => setShowModal(true)}>Criar pedido</button>
      </div>
      {showModal && <NovoPedidoModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Pedidos;