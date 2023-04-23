import React, { useState } from "react";
import "./App.css";
import Mesas from "./componentes/Mesas";
import AddMesa from "./componentes/AddMesa";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MesaDetails from "./componentes/MesaDetails";
import EditMesa from "./componentes/EditMesa";
import Cozinha from "./componentes/Cozinha";
//import Cardapio from "./componentes/Cardapio/Cardapio";
//import Staff from "./componentes/Staff/Staff";

const App = () => {
  const [mesas, setMesas] = useState([
    { id: 1, nome: "Mesa 1", lugares: 4, ocupada: true, garcom: "João", pedido: [] },
    { id: 2, nome: "Mesa 2", lugares: 6, ocupada: false, garcom: "Maria", pedido: [] },
    { id: 3, nome: "Mesa 3", lugares: 8, ocupada: true, garcom: "José", pedido: [] },
    { id: 4, nome: "Mesa 4", lugares: 10, ocupada: false, garcom: "Joana", pedido: [] },
  ]);

  const handleMesaAddition = (mesaId) => {
    const newMesas = [...mesas, {
      id: mesaId,
      ocupada: false
    }];

    setMesas(newMesas);
  };

  const handleMesaEdit = (mesaEditada) => {
    const mesaIndex = mesas.findIndex(m => m.id === mesaEditada.id);
    const novasMesas = [...mesas];
    novasMesas[mesaIndex] = mesaEditada;
    setMesas(novasMesas);
  };

  return (
    <Router>
      <div className="container">
        <Route path="/" exact render={() => (
          <>
            <AddMesa handleMesaAddition={handleMesaAddition} />
            <Mesas mesas={mesas} />
           <Cozinha />
          </>
        )} />
        <Route path="/mesa/:id" exact render={({ match }) => (
          <MesaDetails mesa={mesas.find(m => m.id === parseInt(match.params.id))} handleMesaEdit={handleMesaEdit} />
        )} />
        <Route path="/mesa/:id/editar" exact render={({ match }) => (
          <EditMesa mesa={mesas.find(m => m.id === parseInt(match.params.id))} handleMesaEdit={handleMesaEdit} />
        )} />
      </div>
    </Router>
    
  );
};

export default App;



//<Route path="/mesa/:id" exact component={MesaDetails} />