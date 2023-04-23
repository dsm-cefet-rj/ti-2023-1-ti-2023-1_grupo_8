import React from "react";
import Mesa from "./Mesa";
//fazendo um destructuring no props
const Mesas = ({mesas}) => {
    
    return (
        <>

        {mesas.map((mesa) => (
        <Mesa mesa={mesa}/>))}

        </>
    )
};
export default Mesas;



  

