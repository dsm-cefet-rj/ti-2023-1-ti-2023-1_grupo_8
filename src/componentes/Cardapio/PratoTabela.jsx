import React from 'react';
import PratoItem from './PratoItem';

export default function PratoTabela(props) {
  if (props != null && 
      props.pratos != null && 
      props.pratos.length > 0) {
    return (
      <table id="pratoTabela" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prato</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.pratos.map((prato) => (
            <PratoItem prato={prato} key={prato.id}
            onClickExcluirPrato={props.onClickExcluirPrato} />
                     ))}
        </tbody>
      </table>
    );
  } else {
    return (
      <div id="pratoTabelaVazia">
        Nenhum prato foi encontrado no cardapio.
      </div>
    );
  }
}