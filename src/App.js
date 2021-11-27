import logo from './logo.svg';
import './App.css';
import CustomNavbar from './component/CustomNavbar';
import HomePage from './pages/homePage';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CheffList from './pages/cheffList';
import OrderConfirm from './pages/orderConfirm';
import SignInPage from './pages/signInPage';
import RegisterPage from './pages/registerPage';
import DashBoard from './pages/dashBoard';
import SelectDishes from "./pages/selectDishes";
import WaitingPage from './pages/waitingpage';
import Order from './pages/order';
import UserOrder from './pages/userOrder';
import UserDashBoard from "./pages/userDashboard";

let role = localStorage.getItem("role");
// console.log("role : ",role);
let dashboardpath = (role === "Chef") ? "/dashBoard" : '/userDashboard';
let component = (role === "Chef") ? DashBoard : UserDashBoard;

// console.log("Path : ",dashboardpath);
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>

                    <Route exact path={dashboardpath} component={component}/>
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
                        <Route exact path="/userorder/:oid" component={UserOrder}/>


                    </div>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
