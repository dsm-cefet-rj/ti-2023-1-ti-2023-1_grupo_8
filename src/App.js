import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import AllMesas from "./pages/AllMesas";
import AddMesa from "./pages/AddMesa";
import EditMesas from "./pages/EditMesas";
import DetailsMesa from "./pages/DetailsMesa";
import Cozinha from "./pages/Cozinha";
import React, { useState } from 'react';
import Pedidos from './componentes/Pedidos';
const pedidos = [
  {
    id: 1,
    mesa: 1,
    valor: 50.0,
    itens: [
      { id: 1, nome: 'Hamburguer', valor: 25.0 },
      { id: 2, nome: 'Refrigerante', valor: 5.0 },
      { id: 3, nome: 'Batata Frita', valor: 20.0 },
    ],
  },
  {
    id: 2,
    mesa: 3,
    valor: 35.0,
    itens: [
      { id: 1, nome: 'Pizza', valor: 25.0 },
      { id: 2, nome: 'Suco', valor: 5.0 },
      { id: 3, nome: 'Sobremesa', valor: 5.0 },
    ],
  },
  {
    id: 3,
    mesa: 2,
    valor: 70.0,
    itens: [
      { id: 1, nome: 'Frango à Passarinho', valor: 30.0 },
      { id: 2, nome: 'Cerveja', valor: 10.0 },
      { id: 3, nome: 'Salada', valor: 15.0 },
      { id: 4, nome: 'Sobremesa', valor: 15.0 },
    ],
  },
  {
    id: 4,
    mesa: 4,
    valor: 40.0,
    itens: [
      { id: 1, nome: 'Sanduíche', valor: 20.0 },
      { id: 2, nome: 'Refrigerante', valor: 5.0 },
      { id: 3, nome: 'Batata Frita', valor: 15.0 },
    ],
  },
];

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<AllMesas />}></Route>
          <Route path="/add-mesa" element={<AddMesa />}></Route>
          <Route path="/edit-mesa/:id" element={<EditMesas />}></Route>
          <Route path="/exibe-mesa/:id" element={<DetailsMesa />}></Route>
          <Route path="/cozinha" element={<Cozinha />}></Route>
          <Route path="/cardapio" element={<Cardapio />}></Route>
          <Route path="/add-prato" element={<AddPrato />}></Route>
          <Route path="/edit-prato/:id" element={<EditPrato />}></Route>
          <Route path="/staff" element={<Staff />}></Route>
          <Route path="/add-funcionario" element={<AddFuncionario />}></Route>
          <Route path="/edit-funcionario/:id" element={<EditFuncionario />}></Route>
        </Routes>
        
        <Pedidos pedidos={pedidos} />
      
      </Layout>
    </>
    
  );
}

export default App;
