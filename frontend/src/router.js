import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Products from "./views/Products/Products";
import HeroSection from "./components/HeroSection/HeroSection";
import Stores from "./views/Stores/Stores";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={HeroSection} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
