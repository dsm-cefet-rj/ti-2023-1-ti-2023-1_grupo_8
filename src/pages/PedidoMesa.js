import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, saveNewPedido } from "../features/mesas/pedidoslice";
import { useNavigate } from "react-router-dom";

const PedidoMesa = ({ itemPedido, idmesa }) => {
  const { nome, preco } = itemPedido;
  console.log("idmesa:", idmesa);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);

  const { handleSubmit, control } = useForm();

  const [showConfirmation, setShowConfirmation] = useState(false); // estado para controlar a exibição da mensagem

  const onSubmit = (data) => {
    console.log("ID da mesa:", idmesa);
    const payload = { nome, preco, idmesa, status: "pendente", ...data };
    dispatch(saveNewPedido(payload))
      .unwrap()
      .then(() => {
        setShowConfirmation(true); // exibe a mensagem de confirmação quando o pedido é salvo
        setTimeout(() => setShowConfirmation(false), 2000); // oculta a mensagem após 2 segundos
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {nome} - R$ {preco} - {idmesa}
      </div>
      <Controller
        name="quantidade"
        control={control}
        defaultValue={1}
        rules={{ required: true, min: 1 }}
        render={({ field }) => (
          <input type="number" {...field} placeholder="Quantidade" />
        )}
      />
      <Button type="submit">Adicionar</Button>
      {showConfirmation && (
        <div style={{ color: "green" }}>Item adicionado com sucesso!</div>
      )}
    </form>
  );
};
export default PedidoMesa;
