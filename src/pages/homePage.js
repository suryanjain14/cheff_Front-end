import React, {useState, useEffect} from 'react'
import "../style/homePage.css"
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import {Link} from 'react-router-dom'
import * as commanData from "./comman";
import {useHistory, Redirect} from "react-router";

const HomePage = () => {
    const history = useHistory();
    localStorage.setItem('city', "Mumbai");
    const [datas, setDatas] = useState([]);
    const getApiData = () => {
        fetch(`${process.env.REACT_APP_EC2_HOST}/getDish/`).then((resp) => resp.json()).then((d) => {
            setDatas(d);
            console.log(d)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {

        getApiData();
        navigator.geolocation.getCurrentPosition(function (position) {
            // console.log("lati",position.coords.latitude);
            // console.log("langi",position.coords.longitude);
            const getData = commanData.getUser();
            // console.log("getting token",getData);

        });

    }, [])

    const handleOnSearch = (string, results) => {

    }


    const handleOnHover = (result) => {
        // the item hovered
        // console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        // console.log("/cheffList/" + item.id)
        
        return history.push("/cheffList/" + item.id);
        
    }

    const handleOnFocus = () => {
        // console.log('Focused')
    }

    const formatResult = (item) => {
        return item;
    }

    let checkAuth = localStorage.getItem('access_token');

    const showLoginAlert = () => {
        return alert("Please login to access forward");
    }
    // let userName = localStorage.getItem('name');
    return (
        <div className="mainSection">
            <img className="mainImage"
                 src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                 alt="image"/>
            <div className="searchSection container">
                <div id="search">
                <ReactSearchAutocomplete
                    items={datas.data}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    placeholder="Search your favourite dish here"
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                />

                </div>
                

                <div className="cheffList">
                    <h1 id="dishes">Dishes</h1>
                    <div className="scrollsections">
                        {datas?.data?.map((item) => {
                            return (
                                <>
                                    <Link style={{textDecoration: "none"}} to={{
                                        pathname: /*checkAuth === undefined || checkAuth === null ? showLoginAlert : */"/cheffList/" + item.id,
                                        state: item
                                    }}>
                                        <div className="listSection">
                                            <img className="image" src={item?.picture} alt={item?.name}/>
                                            <h4 className="des" /*style={{textDecoration:"none"}}*/>{item?.name}</h4>
                                        </div>
                                    </Link>
                                    <hr/>
                                </>
                            );
                        })}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HomePage
