import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { addFuncionarioServer, selectFuncionariosById, updateFuncionarioServer } from './FuncionarioSlice';
import { funcionarioSchema } from './FuncionarioSchema';

export default function FuncionarioForm (props) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();

    const funcionarioFound = useSelector(state => selectFuncionariosById(state, id));
    const { register, handleSubmit } = useForm({
            resolver: yupResolver(funcionarioSchema)
        });
        

    const [funcionarioOnLoad] = useState(
        id ? funcionarioFound ?? funcionarioSchema.cast({}): funcionarioSchema.cast({}));

    const [actionType, ] = useState(
        id ? funcionarioFound 
                ? 'funcionarios/updateFuncionario'
                : 'funcionarios/addFuncionario'
                : 'funcionarios/addFuncionario');
    
    function onSubmit(funcionario){
        if(actionType === 'funcionarios/addFuncionario'){
            dispatch(addFuncionarioServer(funcionario));
        }else{
            dispatch(updateFuncionarioServer({...funcionario, id: funcionarioFound.id}));
        }
        
        navigate('/staff');
    }
    let pageTitle;
    if (actionType === 'funcionarios/addFuncionario') {
        pageTitle = 'Novo Funcionario';
    } else {
        pageTitle = 'Alteração de Funcionario';
    }

    return (
        <div>
            <h1>{ pageTitle }</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Nome:
                    <input type='text' {...register('nome')} id='nome'
                     defaultValue={funcionarioOnLoad.nome} />
                    {/* &nbsp;<span id="nome_err_msg">{errors.nome?.message}</span> */}
                </label>
                <br/>
                <label>
                    Cargo:
                    <input type='text' {...register('cargo')} id='cargo'
                     defaultValue={funcionarioOnLoad.cargo} />
                    {/* &nbsp;<span id="nome_err_msg">{errors.cargo?.message}</span> */}
                </label>
                <br/>
                <label>
                    Salario:
                    <input type='number' {...register('salario')} id='salario'
                     defaultValue={funcionarioOnLoad.preco}/>
                    {/* &nbsp;<span id="preco_err_msg">{errors.salario?.message}</span> */}
                </label>
                <br/>
                <button type='submit' name='btn_salvar_funcionario' id='salvar'>Salvar</button>
            </form>
        </div>
    )
}