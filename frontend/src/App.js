import "./App.css";
import Router from "./router";
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <CartProvider>
      <Router />
    </CartProvider>
  );
}

export default App;
