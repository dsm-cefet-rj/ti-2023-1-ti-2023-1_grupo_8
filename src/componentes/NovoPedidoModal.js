import React, { useState } from 'react';

function NovoPedidoModal({ onCloseModal }) {
  const [mesa, setMesa] = useState('');
  const [itens, setItens] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar o novo pedido ao array de pedidos e fechar o modal
    onCloseModal();
  };

  const handleMesaChange = (event) => {
    setMesa(event.target.value);
  };

  const handleItensChange = (event) => {
    setItens(event.target.value);
  };

  return (
    <div>
      <div>Novo Pedido</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mesa">Mesa:</label>
          <input type="text" id="mesa" value={mesa} onChange={handleMesaChange} />
        </div>
        <div>
          <label htmlFor="itens">Itens:</label>
          <textarea id="itens" value={itens} onChange={handleItensChange}></textarea>
        </div>
        <div>
          <button type="submit">Criar Pedido</button>
          <button onClick={onCloseModal}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default NovoPedidoModal;
