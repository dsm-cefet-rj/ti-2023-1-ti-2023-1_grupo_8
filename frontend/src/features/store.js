import { configureStore } from "@reduxjs/toolkit";
import itemReducer from ".//mesas/itemslice";
import mesaReducer from ".//mesas/mesaslice";
import pedidoReducer from ".//mesas/pedidoslice";
import loginReducer from "../users/LoginSlice";
export const store = configureStore({
  reducer: {
    item: itemReducer,
    mesa: mesaReducer,
    pedido: pedidoReducer,
    login: loginReducer
  },
});
