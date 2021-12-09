import React, {useState, useEffect} from 'react'
import "../style/waitingpage.css"
import {useHistory} from "react-router";


const WaitingPage = (props) => {
    const history = useHistory();
    const reqid = localStorage.getItem('RequestID')
    const [message,setmessage] = useState("Waiting for Chefs Confirmation");
    const [css,setcss]= useState("WaitingPageLoading")
    // let message ="Waiting for Chefs Confirmation"
//   console.log(reqid , "request ye hai")
    //  useEffect(() => {
      
    // }, [])

    const getApiData = () => {
        fetch(`${process.env.REACT_APP_EC2_HOST}/getOrderDetailsByRequestId/?id=` + reqid).then((resp) => resp.json()).then((d) => {
            if (d.status === "success") {
                if(d.data[0].status === "Accepted"){
                    history.push("/userorder/" + d.data[0].id);
                    window.location.reload(); // this is very important please don't remove this line
                    
                }
                else{
                    setmessage("Order declined by Chef Please go back"); 
                    setcss("NoWaitingPageLoading")
                    // history.push("/" );
                    // window.location.reload(); // this is very important please don't remove this line
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    setInterval(() => {
        getApiData();
    }, 8000);


    return (
        <div className="mainSection">
            <img className="mainImage"
                 src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                 alt="image"/>
            <div className="searchSection container">

                <div className="cheffList">
                    <h1 id="dishes">{message}</h1>
                    <div className="scrollsections">
                        <div className={css}>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default WaitingPage
