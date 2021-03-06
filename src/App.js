import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import LogOut from "./containers/Auth/LogOut";

function App() {
  // const [showState, setshowState] = useState({show: true})

  // useEffect(() => {
  //   //console.log("[App.js] 1st useEffect");
  // });

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setshowState({
  //       show: false
  //     });
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timer);
  //     //console.log("[App.js] Cleanup work in useEffect");
  //   };
  // }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          {/* {showState.show ? <BurgerBuilder/> : null} */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
