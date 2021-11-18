import React,{useState,useEffect} from 'react'
import "../style/waitingpage.css"
import { useHistory} from "react-router";


const WaitingPage = (props) => {
    const history = useHistory();
    const reqid = localStorage.getItem('RequestID')
//   console.log(reqid , "request ye hai")


  const getApiData = () => {
    fetch("http://15.206.128.2:4000/api/getOrderDetailsByRequestId/?id="+reqid).then((resp)=> resp.json()).then((d)=>{
      if(d.status == "success"){
          history.push("/order/"+d.data[0].id);
          window.location.reload(); // this is very important please don't remove this line
      }
    }).catch((err)=>{
      console.log(err);
    })
  }



  setInterval(() => {getApiData();}, 8000);




    return (
        <div className="mainSection">
            <img className="mainImage" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="image" />
            <div className="searchSection container">
          
              <div className="cheffList">

 
                  
                <h1 id = "dishes" >Waiting for Chefs Confirmation</h1>

                <div className="scrollsections">
                <div className="WaitingPageLoading">    
                </div>
                </div>
              </div>
          
            </div>
            
        </div>
    )
}

export default WaitingPage
