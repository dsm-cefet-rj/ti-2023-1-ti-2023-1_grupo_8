import React from 'react';
import Mesa from '../Mesa/Mesa';


//responsável por exibir todas as mesas na tela
//o map percorre o array de mesas e cria uma para cada key 

import './ListaMesas.css';
function ListaMesas(props) {
    const mesas = props.mesas;
  
    return (
      <div className='lista-mesas'>
        {mesas.map(mesa => (
          <Mesa
            key={mesa.numero}
            numero={mesa.numero}
            cadeiras={mesa.cadeiras}
            ocupada={mesa.ocupada}
          />
        ))}
      </div>
    );
  }

  export default ListaMesas; 