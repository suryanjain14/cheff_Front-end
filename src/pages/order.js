import Button from '@restart/ui/esm/Button';
import React,{useState,useEffect} from 'react'
import "../style/order.css"
import { useGoogleMaps } from "react-hook-google-maps";


const Order = (props) => {
    const data = props.location.state;
    console.log(data);
    // const uid = props.match.params.uid;
    // const cid = props.match.params.cid;
    // const did = props.match.params.did;
    // console.log(cid, uid,did);
    console.log(props);

    const[lati,setLati] = useState();
    const[longi,setLongi] = useState();
    const [dish,setDish] =  useState([]);


    const getDishbyIDApiData = () => {
      fetch("http://15.206.128.2:4000/api/getDishByID?id=79a8c45c-fdb5-48b5-acb6-62db9e0b5dc1").then((resp)=> resp.json()).then((d)=>{
        setDish(d);
        console.log(d)
      }).catch((err)=>{
        console.log(err);
      })
    }


    useEffect(() => {
        getDishbyIDApiData();
    }, [])

    window.navigator.geolocation.getCurrentPosition(function(position){
      console.log("lati",position.coords.latitude);
      console.log("langi",position.coords.longitude);
      setLati(position.coords.latitude);
      setLongi(position.coords.longitude);
    });

    const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    "AIzaSyDsT5efCRqDBGLtqKwpInj62KhdSlX9MwA",
    // NOTE: even if you change options later
    {

      center: { lat: lati, lng: longi },
      zoom: 1,
    },
  );

  console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  console.log(google);

    const mapStyles = {
        width: "100%",
      };
    console.log("confirm order",data);
    return (
        <div>
            <div id="orderConfirm" className="orderConfirmSection container">
              <div>
            <img className = "confirmImage" src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Momo_nepal.jpg" alt={dish?.data?.title} />
            <p style={{paddingTop:"25px"}}>{data?.title}</p>
              </div>
              <div ref={ref} style={{ width: 400, height: 300 }} />
            <Button className="btns">Time</Button>
        </div>

        </div>
    )
}
export default Order