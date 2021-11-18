import Button from '@restart/ui/esm/Button';
import React,{useState,useEffect} from 'react'
import "../style/order.css"
import { useGoogleMaps } from "react-hook-google-maps";


const Order = (props) => {
    // const data = props.location.state;
    // console.log(data);
    // const uid = props.match.params.uid;
    // const cid = props.match.params.cid;
    // const did = props.match.params.did;
    // console.log(cid, uid,did);
    // console.log(props);
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
      fetch("http://15.206.128.2:4000/api/getDishByID?id="+(dish_id)).then((resp)=> resp.json()).then((d)=>{
        setDish(d);
        console.log("http://15.206.128.2:4000/api/getDishByID?id="+(dish_id),d)
      }).catch((err)=>{
        console.log(err);
      })
    }

    const getOrderbyIDApiData = () => {
      fetch("http://15.206.128.2:4000/api/getOrderDetailsById?id="+(order_id)).then((resp)=> resp.json()).then((d)=>{
        setOrder(d);
        console.log("order data",d)
        getDishbyIDApiData(d.data?.[0].dish_id)
      }).catch((err)=>{
        console.log(err);
      })
    }





    useEffect(() => {

        getOrderbyIDApiData();
    }, [])

    window.navigator.geolocation.getCurrentPosition(function(position){
      console.log("lati",position.coords.latitude);
      console.log("langi",position.coords.longitude);
      setLati(position.coords.latitude);
      setLongi(position.coords.longitude);
    });

    const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    "AIzaSyDRPz7ft8Yi9MPMRf3VD_8nfnplGTEPL2I",
    // NOTE: even if you change options later
    {
      center: { lat: lati, lng: longi },
      zoom: 14,    
    },
  );

  console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  console.log(google);
console.log(chefLati,chefLongi);
// console.log(lati,longi);


if (map){
  // execute when map object is ready
  new google.maps.Marker({ position: userLoc, map });
  new google.maps.Marker({ position: chefLoc, map });

  // new google.maps.Polyline({
  //   path: [
  //     chefLoc,
  //     userLoc, 
  //   ],
  //   geodesic: true,
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2,
  //   map
  // });

  var origin = {lat: chefLati, lng: chefLongi};
  var destination = {lat: lati,lng: longi};
  var travel_mode = "DRIVING";
  var directionsDisplay = new google.maps.DirectionsRenderer({'draggable': false});
  var directionsService = new google.maps.DirectionsService();
  displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay);
  calculateDistance(travel_mode, origin, destination);

}


function calculateDistance(travel_mode, origin, destination) {

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
      });
}

function displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay) {
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
    //   // e.preventDefault();
      
    // }

}
export default Order