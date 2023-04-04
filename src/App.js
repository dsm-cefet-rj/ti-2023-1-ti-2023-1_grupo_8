
import './App.css';

import React, { useState } from 'react';
import ListaMesas from './componentes/ListaMesas/ListaMesas';
import Form from './componentes/Form/Form';

import Banner from './componentes/Banner';
//import './Restaurante.css';

function App() {
  const [mesas, setMesas] = useState([
    { numero: 1, cadeiras: 4, ocupada: false },
    { numero: 2, cadeiras: 6, ocupada: true },
    { numero: 3, cadeiras: 2, ocupada: false },
    { numero: 4, cadeiras: 2, ocupada: true },
  ]);

  const addMesa = (cadeiras) => {
    const numero = mesas.length + 1;
    const ocupada = false;
    const novaMesa = { numero, cadeiras, ocupada };
    setMesas([...mesas, novaMesa]);//operado spread - copia o array original e adiciona a nova mesa no final
  };

  return (
    <div className="app">
      <Banner/>
      <h1>Mesas</h1>
      <ListaMesas mesas={mesas} />
      <Form onSubmit={addMesa} />
    </div>
  );
}

export default App;
