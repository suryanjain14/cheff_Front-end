import Button from '@restart/ui/esm/Button';
import React,{useState,useEffect} from 'react'
import { Form } from "react-bootstrap";
import "../style/orderConfirm.css"
import { useGoogleMaps } from "react-hook-google-maps";
import { handleBreakpoints } from '@mui/system';
import { useHistory,Redirect } from "react-router";



const OrderConfirm = (props) => {
    const history = useHistory();

    const uid = props.match.params.uid;
    const cid = props.match.params.cid;
    const did = props.match.params.did;
    const price = props.match.params.price;
    const cname = props.match.params.cname;
    // console.log(cid, uid,did);
    // console.log(props);
    const [dish,setDish] =  useState([]);

 
    const handelsubmit = async () => {
     
      const tokens = await register({
        "userid":uid.toString(),
        "chefid":cid.toString(),
        "dishid":did.toString(),
        "status":"Waiting",
        "charges":price
      });

      


      // console.log("now here is result again", tokens);
      if(tokens.status === "success"){
          // console.log(tokens.data.id);
          localStorage.setItem("RequestID",tokens.data.id);
         return history.push("/waitingPage");
      }
     
  
  };
  
  const register = async (credential) => {
    // console.log("Credentials : ",credential);

      return fetch(`${process.env.REACT_APP_EC2_HOST}/requestAdd`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
      }).then((data) => data.json());

  };

    const getDishbyIDApiData = async () => {
      return await fetch(`${process.env.REACT_APP_EC2_HOST}/getDishByID?id=`+did.toString()).then((resp)=> resp.json()).then((d)=>{
        setDish(d);
      }).catch((err)=>{
        console.log(err);
      })
    }
    
    const setUserLocationApi = (lat,lan) => {
      const credential ={
        "id":uid.toString(),
        "lat":lat.toString(),
        "lan":lan.toString(),
      }
      // console.log(credential);
      return fetch(`${process.env.REACT_APP_EC2_HOST}/updateLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      }).then((data) => data.json());
    
    }

    window.navigator.geolocation.getCurrentPosition(function(position){
      // console.log("lati",position.coords.latitude);
      // console.log("langi",position.coords.longitude);
      setUserLocationApi(position.coords.latitude,position.coords.longitude);
    });



    useEffect(() => {
        getDishbyIDApiData();

    }, [])

    return (
      
        <div>
            {dish?.data?.map((item) => {
              return (
                <div id="orderConfirm" className="orderConfirmSection container">
                  <img className = "confirmImage" src={item.picture} alt={item.name} />
                  <table>
                  <h1> Order Details</h1>
                    <tr>
                      <td>Dish</td>
                      <td>{item.name}</td>                    
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>₹{price}</td>
                    </tr>
                    <tr>
                      <td>Chef </td>
                      <td>{cname}</td>                    
                    </tr>
                  </table>

                 
                  <Button className="btns" type="button" onClick={handelsubmit}>Confirm {item.name.toString()}</Button>
                </div>

              );
            })}
        </div>
    )
}
export default OrderConfirm
