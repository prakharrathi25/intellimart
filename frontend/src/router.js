import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Products from "./views/Products/Products";
import HeroSection from "./components/HeroSection/HeroSection";
import Stores from "./views/Stores/Stores";
import About from "./views/About/About";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import StoreInfo from './components/StoreInfo/StoreInfo';
import Cart from './components/Cart/Cart';

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/" component={HeroSection} />
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/store/:id" component={StoreInfo}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
