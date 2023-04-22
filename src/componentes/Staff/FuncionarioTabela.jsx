import React from 'react';
import FuncionarioItem from './FuncionarioItem';

export default function FuncionarioTabela(props) {
  if (props != null && 
      props.funcionarios != null && 
      props.funcionarios.length > 0) {
    return (
      <table id="funcionarioTabela" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Salario</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.funcionarios.map((funcionario) => (
            <FuncionarioItem funcionario={funcionario} key={funcionario.id}
            onClickExcluirFuncionario={props.onClickExcluirFuncionario} />
                     ))}
        </tbody>
      </table>
    );
  } else {
    return (
      <div id="funcionarioTabelaVazia">
        Nenhum funcionario foi encontrado.
      </div>
    );
  }
}