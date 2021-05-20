import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Products from "./views/Products/Products";
import HeroSection from "./components/HeroSection/HeroSection";
import Stores from "./views/Stores/Stores";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/" component={HeroSection} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
