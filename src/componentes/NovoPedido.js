import React from 'react';

function NovoPedido({ onAbrirModal }) {
  return (
    <div>
      <button onClick={onAbrirModal}>Criar Pedido</button>
    </div>
  );
}

export default NovoPedido;