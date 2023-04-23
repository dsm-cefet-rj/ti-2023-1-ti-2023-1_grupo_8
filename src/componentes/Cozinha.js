import React, { useState } from 'react';

const Cozinha = () => {
  const [pedidos, setPedidos] = useState([    { id: 1, mesa: 'Mesa 1', garcom: 'João', status: 'pendente', itens: ['Café', 'Pão de Queijo'], hora: '10:00' },
    { id: 2, mesa: 'Mesa 2', garcom: 'Maria', status: 'em preparo', itens: ['Hambúrguer', 'Batata Frita'], hora: '12:30' },
    { id: 3, mesa: 'Mesa 3', garcom: 'José', status: 'pronto', itens: ['Pizza', 'Refrigerante'], hora: '14:00' },
    { id: 4, mesa: 'Mesa 4', garcom: 'Joana', status: 'entregue', itens: ['Sushi', 'Cerveja'], hora: '18:45' },
  ]);

  const handleStatusChange = (pedidoId, novoStatus) => {
    const pedidoIndex = pedidos.findIndex(p => p.id === pedidoId);
    const novosPedidos = [...pedidos];
    novosPedidos[pedidoIndex].status = novoStatus;
    setPedidos(novosPedidos);
  };

  return (
    <div className="cozinha-container">
      <h1>Cozinha</h1>
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Mesa</th>
            <th>Garçom</th>
            <th>Itens do Cardápio</th>
            <th>Hora do Pedido</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.mesa}</td>
              <td>{pedido.garcom}</td>
              <td>{pedido.itens.join(', ')}</td>
              <td>{pedido.hora}</td>
              <td>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name={`status-${pedido.id}`}
                      value="pendente"
                      checked={pedido.status === 'pendente'}
                      onChange={() => handleStatusChange(pedido.id, 'pendente')}
                    />
                    Pendente
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`status-${pedido.id}`}
                      value="em preparo"
                      checked={pedido.status === 'em preparo'}
                      onChange={() => handleStatusChange(pedido.id, 'em preparo')}
                    />
                    Em preparo
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`status-${pedido.id}`}
                      value="pronto"
                      checked={pedido.status === 'pronto'}
                      onChange={() => handleStatusChange(pedido.id, 'pronto')}
                    />
                    Pronto
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`status-${pedido.id}`}
                      value="entregue"
                      checked={pedido.status === 'entregue'}
                      onChange={() => handleStatusChange(pedido.id, 'entregue')}
                    />
                    Entregue
                  </label>
                </div>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>

    );
};


export default Cozinha;
/*
import React, { useState } from 'react';

const Cozinha = () => {
  const [pedidos, setPedidos] = useState([
    { 
      id: 1, 
      mesa: 'Mesa 1', 
      garcom: 'João', 
      status: 'pendente', 
      itens: [
        { id: 1, nome: 'Hambúrguer', quantidade: 2 },
        { id: 2, nome: 'Batata frita', quantidade: 1 },
        { id: 3, nome: 'Refrigerante', quantidade: 2 },
      ],
      horaPedido: new Date(2023, 3, 23, 12, 30),
    },
    { 
      id: 2, 
      mesa: 'Mesa 2', 
      garcom: 'Maria', 
      status: 'em preparo', 
      itens: [
        { id: 1, nome: 'Pizza', quantidade: 1 },
        { id: 4, nome: 'Cerveja', quantidade: 3 },
      ],
      horaPedido: new Date(2023, 3, 23, 13, 10),
    },
    { 
      id: 3, 
      mesa: 'Mesa 3', 
      garcom: 'José', 
      status: 'pronto', 
      itens: [
        { id: 5, nome: 'Sorvete', quantidade: 2 },
      ],
      horaPedido: new Date(2023, 3, 23, 14, 20),
    },
    { 
      id: 4, 
      mesa: 'Mesa 4', 
      garcom: 'Joana', 
      status: 'entregue', 
      itens: [
        { id: 2, nome: 'Batata frita', quantidade: 1 },
        { id: 3, nome: 'Refrigerante', quantidade: 1 },
      ],
      horaPedido: new Date(2023, 3, 23, 15, 0),
    },
  ]);

  const handleStatusChange = (pedidoId, novoStatus) => {
    const pedidoIndex = pedidos.findIndex(p => p.id === pedidoId);
    const novosPedidos = [...pedidos];
    novosPedidos[pedidoIndex].status = novoStatus;
    setPedidos(novosPedidos);
  };

  return (
    <div className="cozinha-container">
      <h1>Cozinha</h1>
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Mesa</th>
            <th>Garçom</th>
            <th>Status</th>
            <th>Itens</th>
            <th>Hora do Pedido</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.mesa}</td>
              <td>{pedido.garcom}</td>
              <td>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name={`status-${pedido.id}`}
                      value="pendente"
                      checked={pedido.status === 'pendente'}
                      onChange={() => handleStatusChange(pedido.id, 'pendente')}
                    />
                    Pendente
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`status-${pedido.id}`}
                      value="em preparo"
                      checked={pedido.status === 'em preparo'}
                      onChange={() => handleStatusChange(pedido.id, 'em preparo')}
                    />
                    Em preparo
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`status-${pedido.id}`}
                      value="pronto"
                      checked={pedido.status === 'pronto'}
                      onChange={() => handleStatusChange(pedido.id, 'pronto')}
                    />
                    Pronto
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`status-${pedido.id}`}
                      value="entregue"
                      checked={pedido.status === 'entregue'}
                      onChange={() => handleStatusChange(pedido.id, 'entregue')}
                    />
                    Entregue
                  </label>
                </div>
                </td>





        

        </tbody>
        </table>
    </div>
    );
};




*/



