import React from 'react';
import { Link } from "react-router-dom";

export default function PratoItem (props) {
  if (props != null && 
      props.prato != null && 
      props.prato.id > 0) {
    const prato = props.prato;
    
    return (
      <tr>
        <td>{prato.id}</td>
        <td>{prato.nome}</td>
        <td>{prato.valor}</td>
        <th>
          <Link to={`/cardapio/${props.prato.id}`}>
            <button id="editar_prato" name="btn_editar_prato">Editar</button>
          </Link>
          <button id={`remover_prato_${props.prato.id}`} name="btn_remover_prato" onClick={() => props.onClickExcluirPrato(props.prato.id)}>Remover</button>
        </th>
      </tr>
    );
  } else {
    return (
      <tr>
        <td colSpan={4}>
          Não foi possivel exibir o prato
        </td>
      </tr>
    )
  }
}