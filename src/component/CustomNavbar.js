import React,{useState} from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/customeNavbar.css";

const CustomNavbar = () => {

  const [changeData,setChangeData] = useState();

  // console.log("selected data is here",changeData);
  localStorage.setItem('city',changeData);
  let userName = localStorage.getItem('name');
  let role = localStorage.getItem("role");
  // console.log("role : ",role);
  let dashboardpath = (role==="Chef")?"/dashBoard":'/userDashboard';
  // console.log("Path : ",dashboardpath);

  // console.log(`Username : ${userName.split(" ")[0]} ${userName.split(" ")[1].split("")[0].toUpperCase()}.`);
  let userToken = localStorage.getItem('access_token');

  // console.log("yes ok here",userToken);
  
  // console.log("yes ok here is",userName);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed>
        <Container>
          <Navbar.Brand href="/">CHEF</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <div classname="location">
                <Form.Select
                  aria-label="Default select example"
                  className="locationSelect" onChange={(e)=>{setChangeData(e.target.value);} } value={changeData}
                >
                  <option>Location</option>
                  <option value="Banglore">Banglore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                </Form.Select>
              </div>
              <Nav.Link eventKey={2} as={Link} to={{
                pathname:userToken === undefined || userToken === null ? "/login": dashboardpath,
                state:{currentLocation: changeData}
              }}  >
               {userToken === undefined || userToken === null  ? "Login": userName }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
