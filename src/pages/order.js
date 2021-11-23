import Button from '@restart/ui/esm/Button';
import React,{useState,useEffect} from 'react'
import "../style/order.css"
import { useGoogleMaps } from "react-hook-google-maps";

var time="Calculating time"

function calculateDistance(travel_mode, origin, destination,ref, map, google) {
  console.log("CalulateDistance")
  var DistanceMatrixService = new google.maps.DistanceMatrixService();
  DistanceMatrixService.getDistanceMatrix(
      {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode[travel_mode],
          unitSystem: google.maps.UnitSystem.metric, // kilometers and mete rs.
          avoidHighways: false,
          avoidTolls: false
      }, matrixResults); 
}
//  
function matrixResults(response, status){
  console.log("MatrixResult")
  if (status === 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      time=response.rows[0].elements[0].duration.text
  }

  // console.log(distance);
  // console.log(duration);
  // console.log(from); 
  // console.log(to); 
}

function displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay,ref, map, google) {
console.log("DisplayRoute")  
directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode[travel_mode],
    avoidTolls: true
}, function (response, status) {
    if (status === 'OK') {
        directionsDisplay.setMap(map);
        directionsDisplay.setDirections(response);
    } else {
        directionsDisplay.setMap(null);
        directionsDisplay.setDirections(null);
        alert('Could not display directions due to: ' + status);
    }
});
}

function mapRun(map,google,ref,chefLongi,chefLati,userLoc,chefLoc,lati,longi){
  if (map){
    // execute when map object is rea dy 
    new google.maps.Marker({ position: userLoc, map });
    new google.maps.Marker({ position: chefLoc, map });
    var origin = chefLoc;
    var destination = userLoc;
    var travel_mode = "DRIVING";
    var directionsDisplay = new google.maps.DirectionsRenderer({'draggable': true});
    var directionsService = new google.maps.DirectionsService();
    displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay,ref, map, google);
    calculateDistance(travel_mode, origin, destination,ref, map, google);
    // console.log(matrixResults());
  }
}



const Order = (props) => {
    const order_id=props.match.params.oid;
    // const order_id="4547191d-200e-464c-a2f3-1bc3ea2773a6";
    const[lati,setLati] = useState();
    const[longi,setLongi] = useState();
    const [order,setOrder] =  useState([]);
    const [dish,setDish] = useState([]);
    const chefLati = 25.359080098326006;
    const chefLongi = 82.9809349959941;
    // const userLoc = {lat: lati, lng: longi};
    const chefLoc = {lat: lati, lng: longi};
    var userLoc={}

    const getLocationbyUserIDApiData = (user_id) => {
      fetch(`${process.env.REACT_APP_EC2_HOST}/getLocation?id=`+(user_id)).then((resp)=> resp.json()).then((d)=>{
        // setDish(d);
        if(d?.data.lat){
          userLoc ={lat:parseFloat(d?.data.lat), lng:parseFloat(d?.data.lan)};
        }
        
        console.log(`${process.env.REACT_APP_EC2_HOST}/getLocation?id=`+(user_id),userLoc)
      }).catch((err)=>{
        console.log(err);
      })
    }
    


    
    const getDishbyIDApiData = (dish_id) => {
      fetch(`${process.env.REACT_APP_EC2_HOST}/getDishByID?id=`+(dish_id)).then((resp)=> resp.json()).then((d)=>{
        setDish(d);
        // console.log(`${process.env.REACT_APP_EC2_HOST}/getDishByID?id=`+(dish_id),d)
      }).catch((err)=>{
        console.log(err);
      })
    }

    const getOrderbyIDApiData = () => {
      fetch(`${process.env.REACT_APP_EC2_HOST}/getOrderDetailsById?id=`+(order_id)).then((resp)=> resp.json()).then((d)=>{
        setOrder(d);
        console.log("order data",d)
        getDishbyIDApiData(d.data?.[0].dish_id)
        getLocationbyUserIDApiData(d.data?.[0].user_id)

      }).catch((err)=>{
        console.log(err);
      })
    }

    const { ref, map, google } = useGoogleMaps(
      "AIzaSyDRPz7ft8Yi9MPMRf3VD_8nfnplGTEPL2I",//API key
      {
        center: { lat: lati, lng: longi },
        zoom: 14,    
      },
    );
  
    // console.log("map")
    // console.log(google); 
  // console.log(chefLati,chefLongi);
  // console.log(lati,longi);

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(function(position){
          // console.log("lati",position.coords.latitude);
          // console.log("langi",position.coords.longitude);  
          setLati(position.coords.latitude);
          setLongi(position.coords.longitude);
        });
        getOrderbyIDApiData();
        mapRun(map,google,ref,chefLongi,chefLati,userLoc,chefLoc,lati,longi);
        
   
    },[map])

    // const mapStyles = {width: "100 % ",};  
   




    if (time != "Calculating time"){document.getElementById("time").innerHTML = time+" remaining"}

    return (
        <div>
            <div id="orderConfirm" className="orderConfirmSection container">
              <div>
              <p style={{paddingTop:"25px"}}><h5>{dish?.data?.[0]?.name}</h5></p>
            <img className = "confirmImage" src={dish?.data?.[0]?.picture} alt={dish?.data?.[0].name} />
            
              </div>
              
              <div ref={ref} style={{ width: 400, height: 300 }} />
            <Button id ="time" className="btns">Time</Button>
        </div>

        </div>
    )

    // const getDistance = () => {
    //   // e.preventDefault(asd);
      
    // }

}
export default Order