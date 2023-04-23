import React from "react";
import "./Mesa.css";
import { useHistory } from "react-router-dom";

const Mesa = ({ mesa }) => {
    const history = useHistory();
  
    const handleMesaClick = () => {
        history.push(`/mesa/${mesa.id}`);
      };
      
      return (
        <div
          className={`mesa ${mesa.ocupada ? "ocupada" : "livre"}`}
          onClick={() => handleMesaClick(mesa)}
        >
          <h1>Mesa:{mesa.id}</h1>
          <h1>Cadeiras:{mesa.lugares}</h1>
          <p>{mesa.ocupada ? 'Ocupada' : 'Livre'}</p>
        </div>
      );
}
  



/*
const Mesa=({mesa})=>{

    const history = useHistory();//history para navegar entre paginas
    const handleMesaClick = () => {
        history.push(`/mesa/${mesa.id}`);
    }


        //className dinamico para mudar a cor da mesa
    return( 
      <div className={`mesa ${mesa.ocupada ? "ocupada" : "livre"}`} onClick={() => handleMesaClick(mesa)}> 
        <h1>Mesa:{mesa.id}</h1>
        <h1>Cadeiras:{mesa.lugares}</h1>
        <p>{mesa.ocupada ? 'Ocupada' : 'Livre'}</p>
      </div>

    );
}*/

export default Mesa;
