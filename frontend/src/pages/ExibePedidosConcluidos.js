import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchALLPedidos, getPedidoByIdmesa } from "../features/mesas/pedidoslice";
import "./ExibePedidosConcluido.css";
import { Chart } from 'chart.js/auto';

const ExibePedidosConcluido = () => {
  const dispatch = useDispatch();
  const pedidos = useSelector((state) =>
    state.pedido.pedidosData.filter((pedido) => pedido.status === "concluído")
  );

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    dispatch(fetchALLPedidos());
  }, [dispatch]);

  // Função para agrupar os pedidos por nome e calcular os totais
  const agruparPedidosPorNome = () => {
    const pedidosAgrupados = {};

    pedidos.forEach((pedido) => {
      if (pedido.nome in pedidosAgrupados) {
        pedidosAgrupados[pedido.nome].quantidade += pedido.quantidade;
        pedidosAgrupados[pedido.nome].total += pedido.quantidade * pedido.preco;
      } else {
        pedidosAgrupados[pedido.nome] = {
          quantidade: pedido.quantidade,
          total: pedido.quantidade * pedido.preco,
        };
      }
    });

    return pedidosAgrupados;
  };

  const pedidosAgrupados = agruparPedidosPorNome();

  const calcularTotalGeral = () => {
    let totalGeral = 0;

    for (const nome in pedidosAgrupados) {
      totalGeral += pedidosAgrupados[nome].total;
    }

    return totalGeral;
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const labels = Object.keys(pedidosAgrupados);
      const data = Object.values(pedidosAgrupados).map((pedido) => pedido.total.toFixed(2));

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Valor Arrecadado",
              data: data,
              backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "R$ " + value,
              },
            },
          },
        },
      });
    }
  }, [pedidosAgrupados]);

  return (
    <div className="relatorio">
      <h1 className="relatorio-title">Relatório Gerencial</h1>
      {Object.keys(pedidosAgrupados).length === 0 ? (
        <p className="relatorio-message">Nenhum pedido concluído.</p>
      ) : (
        <>
          <table className="relatorio-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pedidosAgrupados).map(([nome, pedido]) => (
                <tr key={nome}>
                  <td>{nome}</td>
                  <td>{pedido.quantidade}</td>
                  <td>R$ {pedido.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total Geral</td>
                <td>R$ {calcularTotalGeral().toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="chart-container">
            <canvas ref={chartRef}></canvas>
          </div>
        </>
      )}
    </div>
  );
};

export default ExibePedidosConcluido;








