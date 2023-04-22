import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import PratoTabela from './PratoTabela';
import { useSelector, useDispatch } from 'react-redux';
import { deletePratoServer, fetchPratos, selectAllPratos } from './PratoSlice';

export default function Cardapio() {
  // const pratos = [
  //   {
  //     id: 1,
  //     nome: 'Hamburger',
  //     valor: 25.0
  //   },
  //   {
  //     id: 2,
  //     nome: 'Refrigerante',
  //     valor: 5.0
  //   },
  //   {
  //     id: 3,
  //     nome: 'Batata Frita',
  //     valor: 20.0
  //   }
  // ]

  const pratos = useSelector(selectAllPratos);
  const status = useSelector(state => state.pratos.status);
  const error = useSelector(state => state.pratos.error);
  const dispatch = useDispatch();
  
  function handleClickExcluirPrato(id){
    dispatch(deletePratoServer(id));
  }
  
  useEffect(() => {
    if (status === 'not_loaded' ) {
      dispatch(fetchPratos())
    } else if (status === 'failed') {
      // setTimeout(() => dispatch(fetchPratos()), 5000);
    }
  }, [status, dispatch]);
  
  let pratoTabela;
  if (status === 'loaded' 
   || status === 'saved' 
   || status === 'deleted') {
    pratoTabela = <PratoTabela pratos={pratos} onClickExcluirPrato={handleClickExcluirPrato} />;
  } else if (status === 'loading') {
    pratoTabela = <div id="pratos">Carregando os pratos...</div>;
  } else if (status === 'not_loaded') {
    pratoTabela = '';
  } else {
    // status === 'failed' or any other
    pratoTabela = <div id="pratos">Error: {error}</div>;
  }
  
  return (
    <div>
      <h1>Cardapio</h1>
      <Link to="/cardapio/novo">
        <button id="adicionar_prato" name="btn_adicionar_prato">Adicionar Prato</button>
      </Link>
      <br/>
      {pratoTabela}
    </div>
  );

}