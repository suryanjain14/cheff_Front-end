import React,{useState,useEffect} from 'react'
import Button from '@restart/ui/esm/Button'
// import * from 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css'
import "../style/dashBoard.css";
import { getUser, removeUserSession } from './comman';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
// import { Row, Table, Col, Button } from "react-bootstrap";






const DashBoard = () => {

     
//  setInterval(() => {window.location.reload();}, 8000);


    const user = getUser();
    const uid = localStorage.getItem('id')
    const [datas,setDatas] =  useState([]);
    const history =  useHistory();
    const [currentIndex,setCurrentIndex] = useState(0);
    const [newRequests,setNewRequests] = useState([]);
    const [pastOrders,setPastOrders] = useState([]);
    // const [orderID, setOrderID] = useState({});

    useEffect(()=>
    {
        requestNewData();
        chefOrders()
    },[])
    const handleLogout = async () => {
        console.log("handleLogout() called");
        const ID = localStorage.getItem('id');
        
        await fetch("http://15.206.128.2:4000/api/signOut", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({id:ID}),
            }).then((data) => data.json());
        localStorage.clear();
        sessionStorage.clear();
        history.push("/login");
        return 
    }
    const handleOnAccept = async (event) =>
    {
        console.log("handleOnAcceot Called : ",event);
        let body = {
            request_id: event.id,
            user_id:event.userid,
            chef_id:event.chefid,
            dish_id:event.dishid,
            charges:event.charges,
            status:"Accepted"
        }
        console.log("Body : ",body);
        await fetch("http://15.206.128.2:4000/api/addOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            }).then((data) => data.json()).then((orderData)=> localStorage.setItem("orderData",orderData));
        // localStorage.clear();
        // sessionStorage.clear();
        history.push("/dashBoard");
        window.location.reload();
        return 
    }

    const handleOnReject = async (event) =>
    {
        console.log("handleOnReject Called : ",event);
        let body = {
            request_id: event.id,
            user_id:event.userid,
            chef_id:event.chefid,
            dish_id:event.dishid,
            charges:event.charges,
            status:"Rejected"
        }
        console.log("Body : ",body);
        await fetch("http://15.206.128.2:4000/api/addOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            }).then((data) => data.json()).then((orderData)=> localStorage.setItem("orderData",orderData));
        // localStorage.clear();
        // sessionStorage.clear();
        history.push("/dashBoard");
        window.location.reload();
        return 
    }

    const requestNewData= async() =>
    {
        return await fetch (`http://15.206.128.2:4000/api/getRequestsByChefId?id=${localStorage.getItem('id').toString()}`,{
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res)=>res.json()).then((data)=> {
            // console.log("data : ",data);
            setNewRequests(data);
        })
    }
    
    const chefOrders = async()=>
    {
        return await fetch (`http://15.206.128.2:4000/api/getOrdersByChefId?id=${localStorage.getItem('id').toString()}`,{
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res)=>res.json()).then((data)=> {
            // console.log("data : ",data);
            setPastOrders(data);
        })
    }

    const setUserLocationApi = (lat,lan) => {
        const credential ={
          "id":uid,
          "lat":lat.toString(),
          "lan":lan.toString(),
        }
        console.log("Location" ,credential);
        return fetch("http://15.206.128.2:4000/api/updateLocation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        }).then((data) => data.json());
      
      }
  
      window.navigator.geolocation.getCurrentPosition(function(position){
        setUserLocationApi(position.coords.latitude,position.coords.longitude);
      });


    console.log("New Requests : ",newRequests);
    console.log("Past Orders : ",pastOrders);
    let acceptedOrders = pastOrders?.data?.filter(item=> item.status === "Accepted")
    let rejectedOrders = pastOrders?.data?.filter(item=> item.status === "Rejected")
    console.log("Accepted Orders",acceptedOrders);
    console.log("Rejected Orders",rejectedOrders);
    let userName = localStorage.getItem('name');
    console.log("user data",user);
    return (
        <div className="dashBoardSection" id="dashBoard">
            <div className="headerSection">
                <div className="d-flex">
                    <p className="homes"><Link className="homes" to={{pathname:"/"}}>CHEFF</Link></p>
                    <p className="userName">{userName}</p>
                </div>
                <Button className="buttons" type="submit" onClick={handleLogout}>Logout</Button>
            </div>
            <div className="tabSection container">
                <div className="tabBar">
                    <div onClick={()=>setCurrentIndex(0)} className={currentIndex === 0 ? "tabs-selected" : "tabs"}>New Order</div>
                    <div onClick={()=>setCurrentIndex(1)} className={currentIndex === 1 ? "tabs-selected" : "tabs"}>Rejected Order</div>
                    <div onClick={()=>setCurrentIndex(2)} className={currentIndex === 2 ? "tabs-selected" : "tabs"}>Accepted Order</div>
                </div>
            </div>
            <div className="cheffList">
                <div className="scrollsections">
                { currentIndex === 0 ? newRequests?.data?.map((item)=>{
                return (
                    <>
                <div className="listSectionn">
                <div className="namePortion">
                <img className="image" src={item?.dishpicture} alt={item?.dishname} />
                <h4 className="des">{item?.dishname}</h4>
                </div>
                <div className="btnGroup">
                    <Button id="acceptButton" type="submit" onClick={()=>handleOnAccept(item)} >Accept</Button> 
                    <Button id="rejectButton" type="submit" onClick={()=>handleOnReject(item)} >Reject</Button>
                </div>
                </div>
                <hr/>
                </>
                );
                }): currentIndex === 1 ?
                rejectedOrders?.map((item)=>{
                    return (
                        <>
                    <div className="listSection">
                    <img className="image" src={item?.dishpicture} alt={item?.dishname} />
                    <h4 className="des" /*style={{textDecoration:"none"}}*/>{item?.dishname}</h4>
                    </div>
                    <hr/>
                    </>
                    );
                    })
                : acceptedOrders?.map((item)=>{
                    return (
                        <>
                    <Link to={{pathname:`/order/${item?.id}`}} style={{textDecoration:"none",color:"black"}}>
                        <div className="listSection">
                            <img className="image" src={item?.dishpicture} alt={item?.dishname} />
                            <h4 className="des" /*style={{textDecoration:"none"}}*/>{item?.dishname}</h4>
                            <div className="btnGroup">
                                <Button id="status" type="submit" style={{float:'right'}}>{item?.status}</Button>
                            </div>
                        </div>
                    </Link>
                    <hr/>
                    </>
                    );
                    })}
                </div>
            </div>
        </div>
    )
}

export default DashBoard
