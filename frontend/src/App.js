
import "./App.css";
import Layout from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import AllMesas from "./pages/AllMesas";
import AddMesa from "./pages/AddMesa";
import EditMesas from "./pages/EditMesas";
import DetailsMesa from "./pages/DetailsMesa";
import ExibeMesa from "./pages/ExibeMesa";
import Cozinha from "./pages/Cozinha";
import React, { useState } from 'react';
import { Cardapio } from "./pages/Cardapio";
import Home from "./pages/Home";
import CardapioMesa from "./pages/CardapioMesa";
import AddItem from "./pages/AddItem";
import TelaGarcom from "./pages/TelaGarcom";
import ExibePedidosConcluido from "./pages/ExibePedidosConcluidos";
import LoginForm from "./users/LoginForm";
import SignupForm from "./users/SignupForm";
function App() {
  return (
    <>
      <Layout>

      <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mesas" element={<AllMesas />} />
          <Route path="/add-mesa" element={<AddMesa />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/edit-mesa/:id" element={<EditMesas />} />
          <Route path="/exibe-mesa/:id" element={<ExibeMesa />} />
          <Route path="/cozinha" element={<Cozinha />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/cardapio-mesa/:id" element={<CardapioMesa />} />
          <Route path="/garcom" element={<TelaGarcom />} />
          <Route path="/pedidos-concluidos" element={<ExibePedidosConcluido />} />
        </Routes>
      
        {/* <Routes>
          <Route path="/" element={<AllMesas />}/>
          <Route path="/add-mesa" element={<AddMesa />}/>
          <Route path="/edit-mesa/:id" element={<EditMesas />}/>
          <Route path="/exibe-mesa/:id" element={<DetailsMesa />}/>
          <Route path="/cozinha" element={<Cozinha />}/>
          <Route path="/cardapio" element={<Cardapio />}/>

        </Routes> */}
      
        {/* <Pedidos pedidos={pedidos} /> */}
      
      </Layout>
    </>
    
  );
}

export default App;
