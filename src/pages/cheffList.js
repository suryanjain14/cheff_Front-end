import React,{useState,useEffect} from "react";
import { Row, Table, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/cheffList.css";



const CheffList = (props) => {


  const [datas,setDatas] =  useState([]);
 
  const getApiData = () => {
    // console.log("Props : ",props);
    let city = localStorage.getItem('city');
    // console.log("City : ",city);
    // console.log(`${process.env.REACT_APP_EC2_HOST}/getChefByDishAndLocation?dishId=${props.match.params.id}&location=${city}`);
    fetch(`${process.env.REACT_APP_EC2_HOST}/getChefByDishAndLocation?dishId=${props.match.params.id}&location=${city}`).then((resp)=> resp.json()).then((d)=>{
      setDatas(d);
      // console.log(d);
    }).catch((err)=>{
      console.log(err);
    })
  }


  useEffect(() => {
    
    getApiData();
  
  }, [])






// if (true){
  
//   var origin = {lat: chefLati, lng: chefLongi};
//   var destination = {lat: lati,lng: longi};
//   var travel_mode = "DRIVING";
//   calculateDistance(travel_mode, origin, destination);

// }
  


//   function calculateDistance(travel_mode, origin, destination) {

//     var DistanceMatrixService = new google.maps.DistanceMatrixService();
//     DistanceMatrixService.getDistanceMatrix(
//         {
//             origins: [origin],
//             destinations: [destination],
//             travelMode: google.maps.TravelMode[travel_mode],
//             // unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
//             unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
//             avoidHighways: false,
//             avoidTolls: false
//         }, matrixResults);
//   }
  
//   function matrixResults(response, status){
//     if (status == 'OK') {
//         var origins = response.originAddresses;
//         var destinations = response.destinationAddresses;
  
//         for (var i = 0; i < origins.length; i++) {
//             var results = response.rows[i].elements;
//             for (var j = 0; j < results.length; j++) {
//                 var element = results[j];
//                 var distance = element.distance.text;
//                 var duration = element.duration.text;
//                 var from = origins[i];
//                 var to = destinations[j];
//             }
//         }
//     }
//     // console.log(distance);
//     // console.log(duration);
//     // console.log(from);
//     // console.log(to);
//   }


  return (
    <div id="/cheffList">

        <Row className ="header-row" >
            <Col lg={3}>Name</Col>
            <Col lg={3}>Time</Col>
            <Col lg={3}>Price</Col>
            <Col lg={3}>Rating</Col>
        </Row>

        <Row className="content-row">
        {
             datas?.data?.map((item,index)=>{
                 return  <Link to={{pathname:"/orderConfirm/"+localStorage.getItem("id")+"/"+item.id+"/"+props.match.params.id+"/"+item.charges+"/"+item.name,state:props.location.state}} style={{textDecoration:"none",color:"black"}}>
                  
                 <div className="section"> 
                 <Col className="col" lg={3} key={index}>{item.name}</Col>
                 <Col className="col" lg={3} key={index}>{item.mobile_number}</Col>
                 <Col className="col" lg={3} key={index}>{item.charges}</Col>
                 <Col className="col" lg={3} key={index}>{item.rating}</Col>
                  </div>
                 </Link>
             })
             
             }
        </Row>

         {/* {
             cheff.map((item,index)=>{
                 return  <Link to={{pathname:"/orderConfirm",state:props.location.state}} style={{textDecoration:"none",color:"black"}}>
                 <div className="section"> 
                 <Col className="col" lg={3} key={index}>{item.name}</Col>
                 <Col className="col" lg={3} key={index}>{item.time}</Col>
                 <Col className="col" lg={3} key={index}>{item.price}</Col>
                 <Col className="col" lg={3} key={index}>{item.rating}</Col>
                  </div>
                 </Link>
             })
             
             }
        </Row> */}
        


      {/* <Table responsive striped bordered >
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Time</th>
      <th>Price</th>
      <th>Rating</th>
    </tr>
  </thead>
  <tbody>
    
      {
          cheff.map((item,index)=>{
              return  <tr>
              <td className="cheffitem" key={index + 1}>{index}</td>
              <td className="cheffitem" key={index}>{item.name}</td>
              <td className="cheffitem" key={index}>{item.time}</td>
              <td className="cheffitem" key={index}>{item.price}</td>
              <td className="cheffitem" key={index}>{item.rating}</td>
              </tr>
          })
      }
    
    {/* <tr>
      <td>2</td>
      {Array.from({ length: 12 }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
    <tr>
      <td>3</td>
      {Array.from({ length: 12 }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr> */}
      {/* </tbody>
</Table>      */}
    </div>
  );
};

export default CheffList;
