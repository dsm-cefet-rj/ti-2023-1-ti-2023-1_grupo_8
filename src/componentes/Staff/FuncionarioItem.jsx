import React from 'react';
import { Link } from "react-router-dom";

export default function FuncionarioItem ({props}) {
  if (props != null && 
    props.funcionario != null && 
    props.funcionario.id > 0) {
    const funcionario = props.funcionario;

    return (
      <tr>
        <td>{funcionario.id}</td>
        <td>{funcionario.nome}</td>
        <td>{funcionario.cargo}</td>
        <td>{funcionario.salario}</td>
        <th>
          <Link to={`/staff/${props.funcionario.id}`}>
            <button id="editar_funcionario" name="btn_editar_funcionario">Editar</button>
          </Link>
          <button id={`remover_funcionario_${props.funcionario.id}`} name="btn_remover_funcionario" onClick={() => props.onClickExcluirFuncionario(props.funcionario.id)}>Remover</button>
        </th>
      </tr>
    );
  } else {
    return (
      <tr>
        <td colSpan={4}>
          Não foi possivel exibir o funcionario
        </td>
      </tr>
    )
  }
}