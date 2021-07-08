import "./App.css";
import Router from "./router";
import { CartProvider } from "react-use-cart";
import { StoreProvider, createStore } from "easy-peasy";
import model from "./model";

const store = createStore(model);

function App() {
  return (
    <StoreProvider store={store}>
      <CartProvider>
        <Router />
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
