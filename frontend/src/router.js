import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Products from "./views/Products/Products";
import HeroSection from "./components/HeroSection/HeroSection";
import Stores from "./views/Stores/Stores";
import Contact from "./views/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import StoreInfo from "./components/StoreInfo/StoreInfo";
import Cart from "./components/Cart/Cart";

function Router() {
  const isLoggedIn =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login")).user_id
      ? true
      : false;
  // console.log(isLoggedIn);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/" component={HeroSection} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/store/:id" component={StoreInfo} />
        <Route component={HeroSection} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
