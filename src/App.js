import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import AllMesas from "./pages/AllMesas";
import AddMesa from "./pages/AddMesa";
import EditMesas from "./pages/EditMesas";
import DetailsMesa from "./pages/DetailsMesa";
import Cozinha from "./pages/Cozinha";
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
        </Routes>
      </Layout>
    </>
  );
}

export default App;
