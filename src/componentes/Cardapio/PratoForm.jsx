import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { addPratoServer, selectPratosById, updatePratoServer } from './PratoSlice';
import { pratoSchema } from './PratoSchema';

export default function PratoForm (props) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();

    const pratoFound = useSelector(state => selectPratosById(state, id));
    const { register, handleSubmit } = useForm({
            resolver: yupResolver(pratoSchema)
        });
        

    const [pratoOnLoad] = useState(
        id ? pratoFound ?? pratoSchema.cast({}): pratoSchema.cast({}));

    const [actionType, ] = useState(
        id ? pratoFound 
                ? 'pratos/updatePrato'
                : 'pratos/addPrato'
                : 'pratos/addPrato');
    
    function onSubmit(prato){
        if(actionType === 'pratos/addPrato'){
            dispatch(addPratoServer(prato));
        }else{
            dispatch(updatePratoServer({...prato, id: pratoFound.id}));
        }
        
        navigate('/cardapio');
    }
    let pageTitle;
    if (actionType === 'pratos/addPrato') {
        pageTitle = 'Novo Prato';
    } else {
        pageTitle = 'Alteração de Prato';
    }

    return (
        <div>
            <h1>{ pageTitle }</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Nome:
                    <input type='text' {...register('nome')} id='nome'
                     defaultValue={pratoOnLoad.nome} />
                    {/* &nbsp;<span id="nome_err_msg">{errors.nome?.message}</span> */}
                </label>
                <br/>
                <label>
                    Preco:
                    <input type='number' {...register('preco')} id='preco'
                     defaultValue={pratoOnLoad.preco}/>
                    {/* &nbsp;<span id="preco_err_msg">{errors.preco?.message}</span> */}
                </label>
                <br/>
                <button type='submit' name='btn_salvar_prato' id='salvar'>Salvar</button>
            </form>
        </div>
    )
}