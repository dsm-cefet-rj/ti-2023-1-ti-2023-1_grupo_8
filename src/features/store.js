import { configureStore } from "@reduxjs/toolkit";
import mesaReducer from ".//mesas/mesaslice";
import pedidoReducer from ".//mesas/pedidoslice";
export const store = configureStore({
  reducer: {
    mesa: mesaReducer,
    pedido: pedidoReducer,
  },
});
