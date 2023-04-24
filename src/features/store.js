import { configureStore } from "@reduxjs/toolkit";
import mesaReducer from ".//mesas/mesaslice";
//import pedidoReducer from ".//pedidos/pedidoslice";
export const store = configureStore({
  reducer: {
    mesa: mesaReducer,
  //  pedido: pedidoReducer,
  },
});
