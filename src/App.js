import logo from './logo.svg';
import './App.css';
import CustomNavbar from './component/CustomNavbar';
import HomePage from './pages/homePage';

import {BrowserRouter,Switch,Route} from 'react-router-dom';
import CheffList from './pages/cheffList';
import OrderConfirm from './pages/orderConfirm';
import SignInPage from './pages/signInPage';
import RegisterPage from './pages/registerPage';
import DashBoard from './pages/dashBoard';
import SelectDishes from "./pages/selectDishes";
import WaitingPage from './pages/waitingpage';
import Order from './pages/order';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
      
      <Route exact path="/dashBoard" component={DashBoard}/>
      <div>
      <CustomNavbar/>
      <Route exact path="/" component={HomePage}/>
        <Route exact path="/cheffList/:id" component={CheffList}/>
        <Route exact path="/orderConfirm/:uid/:cid/:did/:price/:cname" component={OrderConfirm}/>
        <Route exact path="/signUp" component={RegisterPage}/>
        
      <Route exact path="/login" component={SignInPage}/>
        <Route exact path="/selectDishes" component={SelectDishes}/>
        <Route exact path="/waitingPage" component={WaitingPage}/>
        <Route exact path="/order/:oid" component={Order}/>
        


        </div>
      </Switch>
    </BrowserRouter>
  
    </div>
  );
}

export default App;
