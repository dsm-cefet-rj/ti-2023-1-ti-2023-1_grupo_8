import React from 'react';
import Button from './button';
import { useParams, useHistory } from 'react-router-dom';

const MesaDetails = ({ mesa }) => {
const params = useParams();
const history = useHistory();

const handleVoltarClick = () => {
history.goBack();
}

return (
<>
<div className='mesa-details-container'>
<h1>Mesa: {mesa.id}</h1>
<p>Garçom: {mesa.garcom}</p>
<p>Lugares: {mesa.lugares}</p>
<p>Status: {mesa.ocupada ? 'Ocupada' : 'Livre'}</p>
<p>Pedidos: {mesa.pedido.join(', ')}</p>
</div>
<div className='mesa-details'>
<Button onClick={handleVoltarClick}>Voltar</Button>

</div>
</>
);
}

export default MesaDetails;

