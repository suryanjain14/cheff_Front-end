import Button from '@restart/ui/esm/Button';
import React,{useState,useEffect} from 'react'
import "../style/order.css"
import { useGoogleMaps } from "react-hook-google-maps";



function calculateDistance(travel_mode, origin, destination,ref, map, google) {
  console.log("CalulateDistanc")
  var DistanceMatrixService = new google.maps.DistanceMatrixService();
  DistanceMatrixService.getDistanceMatrix(
      {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode[travel_mode],
          // unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
          unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
          avoidHighways: false,
          avoidTolls: false
      }, matrixResults); 
}

function matrixResults(response, status){
  if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;

      for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
              var element = results[j];
              var distance = element.distance.text;
              var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
          }
      }
  }
  // console.log(distance);
  // console.log(duration);
  // console.log(from);
  // console.log(to); as
}

function displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay,ref, map, google) {
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




const Order = (props) => {
    const order_id=props.match.params.oid;
    // const order_id="4547191d-200e-464c-a2f3-1bc3ea2773a6";
    const[lati,setLati] = useState();
    const[longi,setLongi] = useState();
    const [order,setOrder] =  useState([]);
    const [dish,setDish] = useState([]);
    const chefLati = 25.359080098326006;
    const chefLongi = 82.9809349959941;
    const userLoc = {lat: lati, lng: longi};
    const chefLoc = {lat: chefLati, lng: chefLongi};


    
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
        // console.log("order data",d)
        getDishbyIDApiData(d.data?.[0].dish_id)
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

        getOrderbyIDApiData();
        window.navigator.geolocation.getCurrentPosition(function(position){
          // console.log("lati",position.coords.latitude);
          // console.log("langi",position.coords.longitude);
          setLati(position.coords.latitude);
          setLongi(position.coords.longitude);
        });
        
        if (map){
          // execute when map object is ready 
          new google.maps.Marker({ position: userLoc, map });
          new google.maps.Marker({ position: chefLoc, map });
          var origin = {lat: chefLati, lng: chefLongi};
          var destination = {lat: lati,lng: longi};
          var travel_mode = "DRIVING";
          var directionsDisplay = new google.maps.DirectionsRenderer({'draggable': true});
          var directionsService = new google.maps.DirectionsService();
          displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay,ref, map, google);
          calculateDistance(travel_mode, origin, destination,ref, map, google);
        }

    },[map])

    


    const mapStyles = {width: "100%",};
    

    return (
        <div>
            <div id="orderConfirm" className="orderConfirmSection container">
              <div>
              <p style={{paddingTop:"25px"}}><h5>{dish?.data?.[0].name}</h5></p>
            <img className = "confirmImage" src={dish?.data?.[0].picture} alt={dish?.data?.[0].name} />
            
              </div>
              
              <div ref={ref} style={{ width: 400, height: 300 }} />
            <Button className="btns">Time</Button>
        </div>

        </div>
    )

    // const getDistance = () => {
    //   // e.preventDefault(asd);
      
    // }

}
export default Order