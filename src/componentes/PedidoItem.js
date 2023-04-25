import React, { useState } from 'react';

function PedidoItem({ pedido }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <tr onDoubleClick={handleToggleExpand}>
        <td>{pedido.id}</td>
        <td>{pedido.mesa}</td>
        <td>{pedido.valor}</td>
        <td>{pedido.itens.length}</td>
        <td>
          <button onClick={handleToggleExpand}>
            {expanded ? 'Recolher' : 'Expandir'}
            {expanded ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan="5">
            <ul>
              {pedido.itens.map((item) => (
                <li key={item.id}>
                  {item.nome} - R$ {item.valor}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      )}
    </>
  );
}

export default PedidoItem;