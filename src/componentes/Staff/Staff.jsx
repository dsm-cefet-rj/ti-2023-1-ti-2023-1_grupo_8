import React, { useEffect } from 'react';
import FuncionarioTabela from './FuncionarioTabela'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFuncionarioServer, fetchFuncionarios, selectAllFuncionarios } from './FuncionarioSlice';

export default function Staff() {
  // const funcionarios = [
  //   {
  //     id: 1,
  //     nome: 'Peppino',
  //     cargo: 'Chef',
  //     salario: 900.0
  //   },
  //   {
  //     id: 2,
  //     nome: 'Gustavo',
  //     cargo: 'Assistente de Chef',
  //     salario: 600.0
  //   },
  //   {
  //     id: 3,
  //     nome: 'Mario',
  //     cargo: 'Garcom',
  //     salario: 500.0
  //   },
  //   {
  //     id: 4,
  //     nome: 'Luigi',
  //     cargo: 'Garcom',
  //     salario: 500.0
  //   }
  // ]

  const funcionarios = useSelector(selectAllFuncionarios);
  const status = useSelector(state => state.funcionarios.status);
  const error = useSelector(state => state.funcionarios.error);
  const dispatch = useDispatch();
  
  function handleClickExcluirFuncionario(id){
    dispatch(deleteFuncionarioServer(id));
  }
  
  useEffect(() => {
    if (status === 'not_loaded' ) {
      dispatch(fetchFuncionarios())
    } else if (status === 'failed') {
      // setTimeout(() => dispatch(fetchFuncionarios()), 5000);
    }
  }, [status, dispatch]);
  
  let funcionarioTabela;
  if (status === 'loaded' 
   || status === 'saved' 
   || status === 'deleted') {
    funcionarioTabela = <FuncionarioTabela funcionarios={funcionarios} onClickExcluirFuncionario={handleClickExcluirFuncionario} />;
  } else if (status === 'loading') {
    funcionarioTabela = <div id="funcionarios">Carregando os funcionarios...</div>;
  } else if (status === 'not_loaded') {
    funcionarioTabela = '';
  } else {
    // status === 'failed' or any other
    funcionarioTabela = <div id="funcionarios">Error: {error}</div>;
  }
  
  return (
    <div>
      <h1>Staff</h1>
      <Link to="/staff/novo">
        <button id="adicionar_funcionario" name="btn_adicionar_funcionario">Adicionar Funcionario</button>
      </Link>
      <br/>
      {funcionarioTabela}
    </div>
  );
}