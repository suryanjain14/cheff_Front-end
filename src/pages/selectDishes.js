import React, { useState, useEffect } from "react";
import Button from "@restart/ui/esm/Button";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "../style/registerPage.css";
import "../style/homePage.css"
import "../style/selectDishes.css"
import { useHistory } from "react-router";
import { setUserSession } from "./comman";

const SelectDishes = (props) => {
    const history = useHistory();
    // console.log("Props : ",props);
    // const showLoginAlert = () => {
    //     return alert("Please login to access forward");
    //    }
    const [datas,setDatas] =  useState([]);
    const [dishes, setDishes] = useState([]);
    const getApiData = async() => {
        await fetch(`${process.env.REACT_APP_EC2_HOST}/getDish/`).then((resp)=> resp.json()).then((d)=>{
        setDatas(d);
        // console.log("data from fetch API",d)
        }).catch((err)=>{
        console.log(err);
        })
    }
    useEffect(() => {
        getApiData();    
        }, [])
    
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const name = localStorage.getItem('tempName');
        const email = localStorage.getItem('tempemail');
        const password = localStorage.getItem('tempp');
        const mobile_number = localStorage.getItem('tempmno')
        const location = localStorage.getItem('tempLoc')
       
        if (
            name.length !== 0 &&
            email.length !== 0 &&
            password.length !== 0 &&
            mobile_number.length !== 0 &&
            location.length !== 0 
        ) {
        console.log("no error on submit");
        
        const tokens = await register({
        name:name,
        email:email,
        dishes:dishes,
        password:password,
        mobile_number:mobile_number,
        role:"Chef",
        location:location
        });

        // console.log("now here is result again", tokens);
        if(tokens.status === "success" && tokens.data.role === "Chef"){
            localStorage.setItem('access_token',tokens?.data?.access_token)
            localStorage.setItem('name',tokens?.data?.name);
            localStorage.setItem('id',tokens?.data?.id);
            localStorage.setItem('role',tokens?.data?.role);
            setUserSession(tokens.data.access_token,tokens.data);
            history.push("/dashBoard");
        }
        else{
            alert("Something went wrong please try again later");
        }
    } else {
        console.log("no successfull");
    }
    };
    
    const register = async (credential) => {
      // console.log("Credentials : ",credential);
        return fetch(`${process.env.REACT_APP_EC2_HOST}/signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credential),
        }).then((data) => data.json());

    };

    let checkAuth = localStorage.getItem('access_token');

    return (
        <div className="cheffListItem">
          <h3>Select Dishes</h3>
          <Form onSubmit={handleSubmitForm}>
          <div className="scrollSection">
          {datas?.data?.map((item,index) => {
              return (
                <>
                  <div className="listSections" key={index}>
                    <input className="inputCheck" type="checkbox" value={item?.id} id={item?.id} onClick={(e) => {
                      // console.log("E value : ",e.target.value);
                      let value = e.target.value.toString();
                      let index = dishes.indexOf(value);
                      // console.log("Index : ",index);
                      if(index>=0)
                      {
                        dishes.splice(index,1);
                      }
                      else
                      {
                        dishes.push(e.target.value.toString())
                      }
                      }} />
                    <img className="images" src={item?.picture} alt={item?.name} />
                    <h4 className="des" style={{textDecoration:"none"}}>{item?.name}</h4>
                  </div>
                  <hr/>
                </>
              );
            })}
          </div>
           
             <Button variant="primary" type="submit" className="btn">
            Register
          </Button>
            </Form>
         
        </div>
      );
}

export default SelectDishes;